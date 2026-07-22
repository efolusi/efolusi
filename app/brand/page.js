import { Icon } from '@efolusi/meridian';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import Section from '../components/Section.jsx';

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
      <SiteHeader active="" />

      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="masthead-meta">
              <span>Brand</span>
              <div className="m-right">
                <span>1 owl</span>
                <span>MIT excludes the mark</span>
              </div>
            </div>
            <h1>
              The owl, the wordmark, <span className="accent">and the rules</span>.
            </h1>
            <p className="page-lede">
              Assets for press, partners and the community. The site's source code is MIT licensed, but the Efolusi name, the owl mark and product names are not covered by that grant.
            </p>
          </div>
        </section>

        <Section label="The mark" fact="PNG · 668×668">
          <h2 className="section-title">One owl, treated well.</h2>
          <div className="brand-assets">
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
        </Section>

        <Section label="Usage" fact="Do and don't">
          <h2 className="section-title">The rules, briefly.</h2>
          <div className="approach-grid" style={{ marginTop: 32 }}>
            <div>
              <div className="brand-rules">
                {dos.map((item) => (
                  <div className="check" key={item}>
                    <span className="tick">
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
                    <span className="tick tick--danger">
                      <Icon name="x" size={15} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <section className="band closer">
          <div className="wrap">
            <h2>Need something else?</h2>
            <p>Higher resolutions, product marks, or a press question. We're quick over email.</p>
            <div className="closer-actions">
              <a className="band-btn" href="mailto:hi@efolusi.com">
                Email us <Icon name="arrow-right" size={16} />
              </a>
              <a className="band-link" href="/">
                Back to efolusi.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
