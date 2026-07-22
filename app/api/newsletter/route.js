import { isSameOrigin, passesRateLimit, tooLong } from '../_lib/guard.js';

function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function getListIds() {
  const raw = String(process.env.BREVO_LIST_ID || '').trim();
  if (!raw) return [];

  const listId = Number(raw);
  return Number.isFinite(listId) ? [listId] : [];
}

export async function POST(req) {
  try {
    if (!isSameOrigin(req)) {
      return new Response(JSON.stringify({ ok: false, error: 'Forbidden' }), { status: 403 });
    }

    if (!(await passesRateLimit(req, 'NEWSLETTER_RATE_LIMIT'))) {
      return new Response(JSON.stringify({ ok: false, error: 'Too many requests. Please try again in a minute.' }), { status: 429 });
    }

    const body = await req.json();
    const email = String(body.email || '').trim();

    if (!email || tooLong(email, 320)) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing email' }), { status: 400 });
    }

    if (!validateEmail(email)) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid email' }), { status: 400 });
    }

    const apiKey = String(process.env.BREVO_API_KEY || '').trim();
    if (!apiKey) {
      return new Response(JSON.stringify({ ok: false, error: 'Newsletter API not configured' }), { status: 500 });
    }

    const payload = {
      email,
      updateEnabled: true
    };

    const listIds = getListIds();
    if (listIds.length > 0) {
      payload.listIds = listIds;
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('Brevo newsletter error', response.status, data);
      const message = data?.message || data?.error || 'Newsletter signup failed';
      return new Response(JSON.stringify({ ok: false, error: message }), { status: response.status });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('Newsletter send error', err);
    return new Response(JSON.stringify({ ok: false, error: 'Subscribe failed' }), { status: 500 });
  }
}