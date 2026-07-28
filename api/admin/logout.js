const { clearSessionCookie } = require('../_lib/auth');

module.exports = async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Yalnızca POST isteği kabul edilir.' });
  }
  response.setHeader('Set-Cookie', clearSessionCookie());
  return response.status(200).json({ ok: true });
};
