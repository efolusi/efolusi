import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: (process.env.SMTP_SECURE === 'true') || false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
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

    const mail = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.EMAIL_TO || process.env.SMTP_USER,
      subject: `Contact form: ${name}`,
      text: `${message}\n\nFrom: ${name} <${email}>`,
      html: `<p>${message.replace(/\n/g, '<br/>')}</p><p>From: ${name} &lt;${email}&gt;</p>`
    };

    const info = await transport.sendMail(mail);

    // Nodemailer may resolve but still report rejected recipients
    if (info && Array.isArray(info.rejected) && info.rejected.length > 0) {
      console.error('Mail rejected', info);
      return new Response(JSON.stringify({ ok: false, error: 'Message rejected by SMTP server' }), { status: 502 });
    }

    if (info && Array.isArray(info.accepted) && info.accepted.length === 0) {
      console.error('No accepted recipients', info);
      return new Response(JSON.stringify({ ok: false, error: 'No recipients accepted by SMTP server' }), { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true, info }), { status: 200 });
  } catch (err) {
    console.error('Contact send error', err);
    return new Response(JSON.stringify({ ok: false, error: 'Send failed' }), { status: 500 });
  }
}
