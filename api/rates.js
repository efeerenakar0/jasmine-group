const ECB_DAILY_RATES = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
const ALLOWED = new Set(['USD', 'TRY', 'GBP', 'CHF', 'SEK', 'NOK', 'CNY', 'CAD']);

module.exports = async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Yalnızca GET isteği kabul edilir.' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    let upstream;
    try {
      upstream = await fetch(ECB_DAILY_RATES, {
        headers: { 'User-Agent': 'JasmineGroup/1.0 (+https://www.jasminegroup.com.tr)' },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }
    if (!upstream.ok) throw new Error('ECB response unavailable');

    const xml = await upstream.text();
    const asOf = xml.match(/<Cube time='([^']+)'/)?.[1];
    const rates = { EUR: 1 };
    for (const match of xml.matchAll(/<Cube currency='([A-Z]{3})' rate='([0-9.]+)'\/>/g)) {
      if (ALLOWED.has(match[1])) rates[match[1]] = Number(match[2]);
    }
    if (!asOf || Object.keys(rates).length < 2) throw new Error('ECB response invalid');

    response.setHeader('Cache-Control', 'public, max-age=900, s-maxage=3600, stale-while-revalidate=86400');
    return response.status(200).json({ base: 'EUR', asOf, source: 'European Central Bank', rates });
  } catch {
    response.setHeader('Cache-Control', 'no-store');
    return response.status(503).json({ error: 'Güncel döviz kurları şu anda alınamıyor.' });
  }
};
