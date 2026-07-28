function configuration() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url: url.replace(/\/$/, ''), key } : null;
}

async function supabaseRequest(path, options = {}) {
  const config = configuration();
  if (!config) {
    const error = new Error('Supabase yapılandırılmamış.');
    error.code = 'SUPABASE_NOT_CONFIGURED';
    throw error;
  }

  const response = await fetch(`${config.url}${path}`, {
    ...options,
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const details = await response.text();
    const error = new Error(`Supabase request failed (${response.status}).`);
    error.status = response.status;
    error.details = details.slice(0, 500);
    throw error;
  }

  if (response.status === 204 || options.headers?.Prefer === 'return=minimal') return null;
  return response.json();
}

function publicStorageUrl(bucket, objectPath) {
  const config = configuration();
  if (!config) return null;
  return `${config.url}/storage/v1/object/public/${bucket}/${objectPath}`;
}

module.exports = { configuration, publicStorageUrl, supabaseRequest };
