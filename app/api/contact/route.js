function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* Accepts both a bare address and the nodemailer-era "Name <address>" form. */
function parseSender(raw) {
  const match = raw.match(/^(.*)<([^>]+)>\s*$/);
  if (match) {
    const name = match[1].trim().replace(/^"|"$/g, '').trim();
    return { name: name || 'Efolusi website', email: match[2].trim() };
  }
  return { name: 'Efolusi website', email: raw };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing fields' }), { status: 400 });
    }

    if (!validateEmail(email)) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid email' }), { status: 400 });
    }

    const apiKey = String(process.env.BREVO_API_KEY || '').trim();
    const to = String(process.env.EMAIL_TO || '').trim();
    const from = String(process.env.EMAIL_FROM || '').trim();

    if (!apiKey || !to || !from) {
      console.error('Contact form not configured: BREVO_API_KEY, EMAIL_TO and EMAIL_FROM are required');
      return new Response(JSON.stringify({ ok: false, error: 'Contact form not configured' }), { status: 500 });
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        sender: parseSender(from),
        to: [{ email: to }],
        replyTo: { email, name },
        subject: `Contact form: ${name}`,
        textContent: `${message}\n\nFrom: ${name} <${email}>`,
        htmlContent: `<p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p><p>From: ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`
      })
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      console.error('Brevo contact error', response.status, data);
      return new Response(JSON.stringify({ ok: false, error: 'Send failed' }), { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('Contact send error', err);
    return new Response(JSON.stringify({ ok: false, error: 'Send failed' }), { status: 500 });
  }
}
