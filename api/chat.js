// openrouter-rotate.js
// Simpan API keys di Vercel Environment Variable: OPENROUTER_API_KEYS
// Format: sk-or-v1-xxx,sk-or-v1-yyy,sk-or-v1-zzz (comma-separated, tanpa spasi)

const API_KEYS = (process.env.OPENROUTER_API_KEYS || '').split(',').filter(k => k.trim());
let currentIndex = 0;

function getNextKey() {
  const key = API_KEYS[currentIndex]?.trim();
  currentIndex = (currentIndex + 1) % API_KEYS.length;
  return key;
}

async function callOpenRouter(body) {
  if (API_KEYS.length === 0) {
    throw new Error('OPENROUTER_API_KEYS tidak ditemukan di environment variables');
  }

  const attemptedKeys = new Set();

  for (let i = 0; i < API_KEYS.length; i++) {
    const key = getNextKey();

    // Hindari coba key yang sama kalau lebih dari 1 key
    if (attemptedKeys.has(key) && API_KEYS.length > 1) continue;
    attemptedKeys.add(key);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.VERCEL_URL || 'http://localhost',
          'X-Title': 'MyApp',
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        return await res.json();
      }

      // 429 = rate limit habis, lanjut ke key berikutnya
      if (res.status === 429) {
        console.log(`Key ke-${i + 1} limit habis, ganti key...`);
        continue;
      }

      // 401 = key invalid, lanjut ke key berikutnya
      if (res.status === 401) {
        console.log(`Key ke-${i + 1} invalid, ganti key...`);
        continue;
      }

      // Error lain, throw langsung
      const error = await res.json();
      throw new Error(`Error ${res.status}: ${JSON.stringify(error)}`);

    } catch (err) {
      // Network error atau fetch gagal, coba key berikutnya
      if (i < API_KEYS.length - 1) {
        console.log(`Key ke-${i + 1} error (${err.message}), coba key lain...`);
        continue;
      }
      throw err;
    }
  }

  throw new Error('Semua API keys habis limit atau error');
}

// Contoh penggunaan
async function main() {
  try {
    const result = await callOpenRouter({
      model: 'openai/gpt-4o-mini',
      messages: [{ role: 'user', content: 'Halo, apa kabar?' }],
    });
    console.log(result.choices[0].message.content);
  } catch (err) {
    console.error('Gagal:', err.message);
  }
}

main();
