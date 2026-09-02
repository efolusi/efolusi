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

/* Native in-memory rate limiting: fixed window per limiter name + client IP.
   Single PM2 fork process, so one process-local Map is the whole state. */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_BUCKETS = 10_000;
const rateLimitBuckets = new Map();

function createMemoryLimiter(name) {
  return {
    async limit({ key }) {
      const now = Date.now();
      const id = `${name}:${key}`;
      const bucket = rateLimitBuckets.get(id);
      if (!bucket || now - bucket.start >= RATE_LIMIT_WINDOW_MS) {
        if (rateLimitBuckets.size >= RATE_LIMIT_MAX_BUCKETS) {
          for (const [staleId, staleBucket] of rateLimitBuckets) {
            if (now - staleBucket.start >= RATE_LIMIT_WINDOW_MS) rateLimitBuckets.delete(staleId);
          }
        }
        rateLimitBuckets.set(id, { start: now, count: 1 });
        return { success: true };
      }
      bucket.count += 1;
      return { success: bucket.count <= RATE_LIMIT_MAX_REQUESTS };
    },
  };
}

const memoryLimiters = new Map();

function nativeContext() {
  return {
    env: new Proxy({}, {
      get(_target, name) {
        if (typeof name !== 'string') return undefined;
        if (!memoryLimiters.has(name)) memoryLimiters.set(name, createMemoryLimiter(name));
        return memoryLimiters.get(name);
      },
    }),
  };
}

/* nginx sets X-Real-IP; Cloudflare's CF-Connecting-IP passes through in front
   of it and is more precise, so it wins when present. */
function clientKey(req) {
  return (
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-real-ip') ||
    (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    'unknown'
  );
}

/* Per-IP rate limit. Missing/failing enforcement is a denial everywhere
   except an explicitly opted-in, non-production dev run. */
export async function passesRateLimit(req, bindingName, options = {}) {
  const nodeEnv = options.nodeEnv ?? process.env.NODE_ENV;
  const allowDevelopmentBypass =
    nodeEnv !== 'production' &&
    (options.allowDevelopmentBypass ?? process.env.ALLOW_UNBOUND_RATE_LIMIT_IN_DEVELOPMENT) === 'true';
  const getContext = options.getContext ?? nativeContext;
  try {
    const { env } = getContext();
    const limiter = env[bindingName];
    if (!limiter || typeof limiter.limit !== 'function') return allowDevelopmentBypass;
    const { success } = await limiter.limit({ key: clientKey(req) });
    return success === true;
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
