// Serverless handler for /api/chat
// Forwards conversation to OpenRouter (rotates keys) and returns a
// normalized `candidates` response that the frontend expects.

const API_KEYS = (process.env.OPENROUTER_API_KEYS || '').split(',').map(k => k.trim()).filter(Boolean);
let keyIndex = 0;

function getNextKey() {
  if (!API_KEYS.length) return null;
  const k = API_KEYS[keyIndex];
  keyIndex = (keyIndex + 1) % API_KEYS.length;
  return k;
}

async function callOpenRouterOnce(key, payload) {
  const url = 'https://openrouter.ai/api/v1/chat/completions';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
    // timeout handled by platform
  });
  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };
}

function normalizeResponse(data) {
  // Try several common provider shapes and return a single text string.
  if (!data) return null;
  // 1) candidates -> content.parts[].text (some Gemini-like shape)
  if (data.candidates && Array.isArray(data.candidates) && data.candidates.length) {
    try { return data.candidates[0].content.parts[0].text; } catch(e) {}
  }
  // 2) choices[].message.content.parts
  if (data.choices && Array.isArray(data.choices) && data.choices.length) {
    const c = data.choices[0];
    if (c.message && c.message.content) {
      if (Array.isArray(c.message.content.parts)) {
        try { return c.message.content.parts[0].text || c.message.content.parts[0]; } catch(e) {}
      }
      if (typeof c.message.content === 'string') return c.message.content;
    }
    if (typeof c.text === 'string') return c.text;
  }
  // 3) output[0].content.parts
  if (data.output && Array.isArray(data.output) && data.output.length) {
    try {
      const p = data.output[0].content;
      if (Array.isArray(p.parts)) return p.parts[0].text || p.parts[0];
    } catch(e) {}
  }
  // 4) direct `text` or `result` fields
  if (typeof data.text === 'string') return data.text;
  if (data.result && typeof data.result === 'string') return data.result;

  // Fallback: stringify a small portion
  try { return JSON.stringify(data).slice(0, 1000); } catch(e) { return null; }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!API_KEYS.length) {
    return res.status(500).json({ error: 'OPENROUTER_API_KEYS not configured' });
  }

  const body = req.body || {};
  const contents = body.contents || [];

  // Map incoming `contents` -> messages for OpenRouter
  const messages = contents.map((c) => {
    const rawText = (c.parts && c.parts[0] && (c.parts[0].text || c.parts[0])) || c.text || '';
    let role = (c.role || 'user').toLowerCase();
    if (role === 'model') role = 'assistant';
    if (!['user','assistant','system'].includes(role)) role = 'user';
    return { role, content: rawText };
  });

  const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';

  let lastError = null;
  for (let i = 0; i < API_KEYS.length; i++) {
    const key = getNextKey();
    if (!key) break;
    try {
      const payload = { model, messages };
      const { ok, status, data } = await callOpenRouterOnce(key, payload);
      if (!ok) {
        lastError = data || { status };
        // retry on rate/unauthorized errors
        if (status === 429 || status === 401 || status === 403) continue;
        return res.status(500).json({ error: data || `HTTP ${status}` });
      }

      const aiText = normalizeResponse(data) || 'I apologize, but I was unable to process your request.';

      return res.status(200).json({
        candidates: [
          { content: { parts: [{ text: aiText }] } }
        ]
      });
    } catch (err) {
      lastError = err;
      continue; // try next key
    }
  }

  return res.status(500).json({ error: lastError ? (lastError.message || String(lastError)) : 'All API keys failed' });
}
