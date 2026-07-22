export const metadata = {
  title: 'Privacy policy · Efolusi',
  description: 'How PT. Efolusi Dunia Teknologi handles data collected through efolusi.com.',
  alternates: { canonical: '/privacy' }
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <a className="back-home" href="/">
        ← Back to efolusi.com
      </a>
      <h1>Privacy policy</h1>
      <p className="legal-meta">PT. Efolusi Dunia Teknologi · Effective 22 July 2026</p>

      <p>
        This policy describes what data efolusi.com collects and how it is used. It applies to this website only. Each Efolusi product has its own privacy policy on its own website.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Contact form:</strong> your name, email address and message. We use them solely to read and reply to your message. Delivery runs through Brevo, our email processor.
        </li>
        <li>
          <strong>Newsletter:</strong> your email address, stored with Brevo so we can send product launches and company updates. Every email includes an unsubscribe link.
        </li>
        <li>
          <strong>Theme preference:</strong> your light or dark choice is stored in your browser only (localStorage). It never leaves your device.
        </li>
        <li>
          <strong>Server logs:</strong> the site is served by Cloudflare, which processes standard request logs (IP address, user agent) to operate and protect the service.
        </li>
      </ul>

      <h2>What we do not do</h2>
      <ul>
        <li>We do not run advertising or third-party analytics trackers on this site.</li>
        <li>We do not sell or share your data with anyone beyond the processors named above.</li>
        <li>We do not use cookies for tracking.</li>
      </ul>

      <h2>Retention and your rights</h2>
      <p>
        Contact messages are kept only as long as needed to handle your request. You can unsubscribe from the newsletter at any time, and you can ask us to delete any data we hold about you by writing to <a href="mailto:hi@efolusi.com">hi@efolusi.com</a>.
      </p>

      <h2>Changes</h2>
      <p>If this policy changes, the new version is published on this page with an updated effective date.</p>
    </main>
  );
}
