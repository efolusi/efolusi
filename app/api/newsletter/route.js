import { isSameOrigin, passesRateLimit } from '../_lib/guard.js';

/* Newsletter mutation stays disabled until an authoritative Brevo double-opt-in
   configuration contract is reviewed and supplied. The request body is
   intentionally never read, logged, persisted, or forwarded. */
export async function POST(req) {
  if (!isSameOrigin(req)) {
    return Response.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }
  if (!(await passesRateLimit(req, 'NEWSLETTER_RATE_LIMIT'))) {
    return Response.json({ ok: false, error: 'Too many requests. Please try again in a minute.' }, { status: 429 });
  }
  return Response.json(
    { ok: false, error: 'Newsletter subscriptions are pending double-opt-in configuration' },
    { status: 503 }
  );
}
