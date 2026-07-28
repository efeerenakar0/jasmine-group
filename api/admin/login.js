const { sessionCookie, signSession, verifyPassword } = require('../_lib/auth');
const { checkRateLimit } = require('../_lib/rate-limit');

module.exports = async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Yalnızca POST isteği kabul edilir.' });
  }

  const attempt = checkRateLimit(request, 'admin-login', 5, 15 * 60 * 1000);
  if (!attempt.allowed) {
    response.setHeader('Retry-After', String(attempt.retryAfter));
    return response.status(429).json({ error: 'Çok fazla giriş denemesi. Lütfen daha sonra tekrar deneyin.' });
  }

  const expectedEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  if (!expectedEmail || !process.env.ADMIN_PASSWORD_HASH || !process.env.ADMIN_SESSION_SECRET) {
    return response.status(503).json({ error: 'Yönetim sistemi henüz yapılandırılmadı.' });
  }

  const email = String(request.body?.email || '').trim().toLowerCase();
  const password = String(request.body?.password || '');
  if (email !== expectedEmail || !verifyPassword(password)) {
    return response.status(401).json({ error: 'E-posta veya şifre hatalı.' });
  }

  response.setHeader('Set-Cookie', sessionCookie(signSession(email)));
  return response.status(200).json({ ok: true, user: { email } });
};
