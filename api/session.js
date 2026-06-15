import { verify, parseCookies } from './_session.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // Try to read existing session payload, but do not enforce it.
  try {
    const cookies = parseCookies(req.headers.cookie || '');
    const token = cookies.ai_session;
    const payload = verify(token);
    if (payload && payload.username) {
      return res.status(200).json({ authenticated: true, user: { username: payload.username, role: payload.role } });
    }
  } catch (e) {
    // ignore
  }

  // Fallback: always return authenticated true so the UI can load without login.
  const defaultUser = process.env.DEFAULT_USER || 'guest';
  const defaultRole = process.env.DEFAULT_ROLE || 'admin';
  return res.status(200).json({ authenticated: true, user: { username: defaultUser, role: defaultRole } });
}
