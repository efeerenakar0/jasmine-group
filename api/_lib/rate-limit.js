const buckets = new Map();

function clientKey(request, namespace) {
  const forwarded = String(request.headers?.['x-forwarded-for'] || '').split(',')[0].trim();
  const address = forwarded || String(request.headers?.['x-real-ip'] || 'unknown');
  return `${namespace}:${address}`;
}

function checkRateLimit(request, namespace, limit, windowMs) {
  const key = clientKey(request, namespace);
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  current.count += 1;
  if (buckets.size > 1000) {
    for (const [bucketKey, value] of buckets) {
      if (value.resetAt <= now) buckets.delete(bucketKey);
    }
  }
  return {
    allowed: current.count <= limit,
    retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

module.exports = { checkRateLimit };
