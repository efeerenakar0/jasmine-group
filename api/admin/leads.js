const { requireAdmin } = require('../_lib/auth');
const { supabaseRequest } = require('../_lib/supabase');

const STATUSES = ['new', 'contacted', 'qualified', 'viewing', 'won', 'lost'];

module.exports = async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (!requireAdmin(request, response)) return;

  try {
    if (request.method === 'GET') {
      const leads = await supabaseRequest('/rest/v1/leads?select=*&order=created_at.desc');
      return response.status(200).json({ leads });
    }
    if (request.method === 'PATCH') {
      const id = Number(request.query?.id);
      const status = String(request.body?.status || '');
      const notes = String(request.body?.notes || '').trim().slice(0, 4000);
      if (!id || !STATUSES.includes(status)) return response.status(400).json({ error: 'Geçerli talep ve durum gerekli.' });
      const updated = await supabaseRequest(`/rest/v1/leads?id=eq.${id}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify({ status, notes, updated_at: new Date().toISOString() }),
      });
      return response.status(200).json({ lead: updated?.[0] });
    }
    response.setHeader('Allow', 'GET, PATCH');
    return response.status(405).json({ error: 'Desteklenmeyen istek.' });
  } catch (error) {
    const status = error.code === 'SUPABASE_NOT_CONFIGURED' ? 503 : 500;
    return response.status(status).json({ error: status === 503 ? 'CRM veritabanı henüz yapılandırılmadı.' : 'CRM işlemi tamamlanamadı.' });
  }
};
