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

/* Per-IP rate limit via the Workers rate limiting binding. Fails open: outside
   the Cloudflare runtime (next dev) or without the binding, requests pass. */
export async function passesRateLimit(req, bindingName) {
  try {
    const { env } = getCloudflareContext();
    const limiter = env[bindingName];
    if (!limiter) return true;
    const key = req.headers.get('cf-connecting-ip') || 'unknown';
    const { success } = await limiter.limit({ key });
    return success;
  } catch {
    return true;
  }
}

export function tooLong(value, max) {
  return typeof value === 'string' && value.length > max;
}
