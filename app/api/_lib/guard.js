import Redis from 'ioredis';

const WINDOW_MS = 60_000;
const REQUEST_LIMIT = 5;
const RATE_LIMIT_SCRIPT = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then
  redis.call('PEXPIRE', KEYS[1], ARGV[1])
end
return count
`;

let sharedRedis;

function redisClient(url = process.env.REDIS_URL) {
  if (!url) throw new Error('REDIS_URL is required');
  const parsed = new URL(url);
  if (parsed.protocol !== 'redis:' && parsed.protocol !== 'rediss:') {
    throw new Error('REDIS_URL must use redis:// or rediss://');
  }
  if (!sharedRedis) {
    sharedRedis = new Redis(url, {
      lazyConnect: true,
      enableOfflineQueue: false,
      maxRetriesPerRequest: 1,
    });
  }
  return sharedRedis;
}

async function incrementNativeRateLimit(key, windowMs) {
  const client = redisClient();
  if (client.status === 'wait') await client.connect();
  return Number(await client.eval(RATE_LIMIT_SCRIPT, 1, key, String(windowMs)));
}

/* Cross-origin POSTs are rejected. Browsers always send Origin on cross-origin
   requests; same-origin and non-browser clients without one pass through. */
export function isSameOrigin(req) {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(req.url).host;
  } catch {
    return false;
  }
}

/* Per-IP rate limiting uses the shared dev/prod Valkey service through
   REDIS_URL. Missing or failed shared-resource enforcement stays fail-closed. */
export async function passesRateLimit(req, namespace, options = {}) {
  const nodeEnv = options.nodeEnv ?? process.env.NODE_ENV;
  const allowDevelopmentBypass =
    nodeEnv !== 'production' &&
    (options.allowDevelopmentBypass ?? process.env.ALLOW_UNBOUND_RATE_LIMIT_IN_DEVELOPMENT) === 'true';
  const increment = options.increment ?? incrementNativeRateLimit;
  const limit = options.limit ?? REQUEST_LIMIT;
  const windowMs = options.windowMs ?? WINDOW_MS;
  try {
    const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const address = forwarded || req.headers.get('x-real-ip') || 'unknown';
    const count = await increment(`efolusi:rate-limit:${namespace}:${address}`, windowMs);
    return Number.isInteger(count) && count > 0 && count <= limit;
  } catch {
    return allowDevelopmentBypass;
  }
}

export function tooLong(value, max) {
  return typeof value === 'string' && value.length > max;
}

export function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}
