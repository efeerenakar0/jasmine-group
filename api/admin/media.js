const crypto = require('crypto');
const { requireAdmin } = require('../_lib/auth');
const { configuration, publicStorageUrl } = require('../_lib/supabase');

const TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

function matchesFileSignature(file, mimeType) {
  if (mimeType === 'image/jpeg') return file.length >= 3 && file[0] === 0xff && file[1] === 0xd8 && file[2] === 0xff;
  if (mimeType === 'image/png') return file.length >= 8 && file.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'));
  if (mimeType === 'image/webp') return file.length >= 12
    && file.subarray(0, 4).toString('ascii') === 'RIFF'
    && file.subarray(8, 12).toString('ascii') === 'WEBP';
  return false;
}

module.exports = async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (!requireAdmin(request, response)) return;
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Yalnızca POST isteği kabul edilir.' });
  }

  const config = configuration();
  if (!config) return response.status(503).json({ error: 'Medya sistemi henüz yapılandırılmadı.' });

  const mimeType = String(request.body?.mimeType || '');
  const extension = TYPES[mimeType];
  const encoded = String(request.body?.data || '').replace(/^data:[^;]+;base64,/, '');
  if (!extension || !encoded) return response.status(400).json({ error: 'JPEG, PNG veya WebP görsel gerekli.' });

  const file = Buffer.from(encoded, 'base64');
  if (!file.length || file.length > 4 * 1024 * 1024) {
    return response.status(413).json({ error: 'Görsel boyutu en fazla 4 MB olabilir.' });
  }
  if (!matchesFileSignature(file, mimeType)) {
    return response.status(400).json({ error: 'Dosya içeriği seçilen görsel türüyle eşleşmiyor.' });
  }

  const propertyId = String(request.body?.propertyId || 'general').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 80);
  const objectPath = `${propertyId}/${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${extension}`;
  const bucket = process.env.SUPABASE_MEDIA_BUCKET || 'property-media';

  const upload = await fetch(`${config.url}/storage/v1/object/${bucket}/${objectPath}`, {
    method: 'POST',
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      'Content-Type': mimeType,
      'Cache-Control': '31536000',
      'x-upsert': 'false',
    },
    body: file,
  });

  if (!upload.ok) return response.status(502).json({ error: 'Görsel yüklenemedi.' });
  return response.status(201).json({ url: publicStorageUrl(bucket, objectPath), path: objectPath });
};
