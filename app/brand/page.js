import { Icon } from '@efolusi/meridian';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export const metadata = {
  title: 'Brand · Efolusi',
  description: 'Official Efolusi brand assets and usage rules: the owl mark, the wordmark, and what not to do with them.',
  alternates: { canonical: '/brand' }
};

const dos = [
  'Use the owl mark as provided, on warm paper or white backgrounds',
  'Set the wordmark "Efolusi" in Bricolage Grotesque, semibold or bolder',
  'Keep the mark at 24px or larger so it stays legible',
  'Link to efolusi.com when referencing us or the $EFO token'
];

const donts = [
  'Recolor, redraw, distort or add effects to the owl mark',
  'Use the Efolusi name or mark to brand your own product or token',
  'Imply endorsement or partnership we have not confirmed',
  'Present any contract address as ours except the one on the token page'
];

export default function BrandPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="page-hero">
          <div className="wrap">
            <h1>
              The owl, the wordmark, <span className="script accent">and the rules</span>.
            </h1>
            <p className="page-lede">
              Assets for press, partners and anyone writing about us. The site's source code is MIT licensed, but the Efolusi name, the owl mark and our product names aren't part of that grant.
            </p>
          </div>
        </section>

        <section className="csec csec--rule">
          <div className="wrap">
            <div className="csec-head">
              <h2>
                One owl, <span className="script accent">treated well</span>.
              </h2>
            </div>
            <div className="brand-assets" style={{ marginTop: 36 }}>
              <div className="brand-tile">
                <div className="brand-preview">
                  <img src="/efolusi/logo-owl.png" alt="The Efolusi owl mark" width="120" height="120" />
                </div>
                <div className="brand-meta">
                  <div className="nm">Owl mark</div>
                  <div className="ro">PNG · transparent · 668×668</div>
                  <a className="brand-download" href="/efolusi/logo-owl.png" download="efolusi-owl.png">
                    Download <Icon name="download" size={14} />
                  </a>
                </div>
              </div>
              <div className="brand-tile">
                <div className="brand-preview">
                  <span className="brand-wordmark">Efolusi</span>
                </div>
                <div className="brand-meta">
                  <div className="nm">Wordmark</div>
                  <div className="ro">Bricolage Grotesque · 650 to 700 · tracking -0.02em</div>
                  <span className="ro">Render in type; there is no separate logotype file.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="csec csec--rule">
          <div className="wrap">
            <div className="csec-head">
              <h2>
                The rules, <span className="script accent">briefly</span>.
              </h2>
            </div>
            <div className="approach-grid" style={{ marginTop: 36 }}>
              <div>
                <div className="brand-rules">
                  {dos.map((item) => (
                    <div className="check" key={item}>
                      <span className="tick tick--green">
                        <Icon name="check" size={15} />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="brand-rules">
                  {donts.map((item) => (
                    <div className="check" key={item}>
                      <span className="tick tick--coral">
                        <Icon name="x" size={15} />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="band closer">
          <div className="wrap">
            <h2>
              Need something <span className="script" style={{ color: 'var(--brand-300)' }}>else</span>?
            </h2>
            <p>Need a higher resolution, a product mark, or an answer for a story? Email us; we're quick.</p>
            <div className="closer-actions">
              <a className="pill pill--cream" href="mailto:hi@efolusi.com">
                Email us
                <span className="pill-arrow">
                  <Icon name="arrow-up-right" size={16} />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
