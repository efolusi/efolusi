import { getCloudflareContext } from '@opennextjs/cloudflare';

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

/* Rate limits are Workers Rate Limiting bindings (wrangler.jsonc `ratelimits`),
   counted per Cloudflare location, so every isolate shares them. */
function workerContext() {
  return getCloudflareContext();
}

/* CF-Connecting-IP is set by Cloudflare on every request to the Worker. */
function clientKey(req) {
  return req.headers.get('cf-connecting-ip') || 'unknown';
}

/* Per-IP rate limit. Missing/failing enforcement is a denial everywhere
   except an explicitly opted-in, non-production dev run. */
export async function passesRateLimit(req, bindingName, options = {}) {
  const nodeEnv = options.nodeEnv ?? process.env.NODE_ENV;
  const allowDevelopmentBypass =
    nodeEnv !== 'production' &&
    (options.allowDevelopmentBypass ?? process.env.ALLOW_UNBOUND_RATE_LIMIT_IN_DEVELOPMENT) === 'true';
  const getContext = options.getContext ?? workerContext;
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
