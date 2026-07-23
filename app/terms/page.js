export const metadata = {
  title: 'Terms of use · Efolusi',
  description: 'Terms of use for efolusi.com, the website of PT. Efolusi Dunia Teknologi.',
  alternates: { canonical: '/terms' }
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <a className="back-home" href="/">
        ← Back to efolusi.com
      </a>
      <h1>Terms of use</h1>
      <p className="legal-meta">PT. Efolusi Dunia Teknologi · Effective 22 July 2026</p>

      <p>
        By using efolusi.com you agree to these terms. This website presents PT. Efolusi Dunia Teknologi (Efolusi) and its product portfolio. It is provided for information purposes, as is, without warranties of any kind.
      </p>

      <h2>Products</h2>
      <p>
        Efolusi products (ZOYYA, Komando, Toolips, Trady, Kongkow, Cuwan) are operated on their own websites under their own terms. Using a product means agreeing to that product's terms, not these.
      </p>

      <h2>Content and trademarks</h2>
      <p>
        The Efolusi name, the owl mark and product names are property of PT. Efolusi Dunia Teknologi. The source code of this website is open source under the MIT license at{' '}
        <a href="https://github.com/efolusi/efolusi" target="_blank" rel="noopener noreferrer">
          github.com/efolusi/efolusi
        </a>
        ; the MIT grant does not cover the names or the mark.
      </p>

      <h2>The $EFO token</h2>
      <p>
        $EFO is the ecosystem token of Efolusi on BNB Smart Chain. It is not a share, a security, or an investment product, and nothing on this website is an offer to sell or a solicitation to buy any financial instrument. Nothing here is financial advice.
      </p>
      <p>
        Digital assets are volatile and carry a risk of total loss: you can lose everything you put in. Please do your own research and follow the laws where you live before interacting with any digital asset.
      </p>
      <p>
        The only official contract address is the one published on <a href="/token">the token page</a>. Any address published anywhere else is not ours. We never send you the first message, we never ask for your seed phrase, and we never announce airdrops or presales outside this site.
      </p>

      <h2>Liability</h2>
      <p>
        We work to keep the information on this site accurate but do not guarantee it. Efolusi is not liable for damages arising from the use of this website. Nothing on this site is financial, legal or professional advice.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href="mailto:hi@efolusi.com">hi@efolusi.com</a>.
      </p>
    </main>
  );
}
