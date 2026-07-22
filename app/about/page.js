import { Avatar, Icon } from '@efolusi/meridian';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import Section from '../components/Section.jsx';

export const metadata = {
  title: 'About · Efolusi',
  description:
    'Efolusi (PT. Efolusi Dunia Teknologi) is a software studio from Indonesia, building and running independent software products held to one standard of craft.',
  alternates: { canonical: '/about' }
};

const leadership = [
  ['Sugeng Agung Suganda', 'Founder & Chief Executive Officer'],
  ['Rakha Febryza Rasendriya', 'Co-founder']
];

const values = ['No feature bloat', 'Opinionated by design', 'Built to scale globally', 'Quality before growth'];

export default function AboutPage() {
  return (
    <>
      <SiteHeader active="about" />

      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="masthead-meta">
              <span>Company</span>
              <div className="m-right">
                <span>Indonesia</span>
                <span>Founder-led</span>
                <span>Distributed</span>
              </div>
            </div>
            <h1>
              A studio that ships, <span className="accent">then keeps its word</span>.
            </h1>
            <p className="page-lede">
              Efolusi is the trade name of PT. Efolusi Dunia Teknologi, a software studio headquartered in Indonesia with a distributed team. We build and run independent software products, and we hold every one of them to the same standard.
            </p>
          </div>
        </section>

        <Section label="The idea" fact="Broad on purpose">
          <h2 className="section-title">
            Broad on purpose. <span className="accent">Sharp by discipline.</span>
          </h2>
          <div className="approach-body">
            <p className="big">We are not tied to one field. We look for broad digital problems, build focused products, and run each one as its own platform with its own roadmap.</p>
            <p className="body">The studio's job is keeping the bar high. If a product doesn't make its category clearer, faster or more useful, it doesn't ship. That discipline is what lets the portfolio grow without getting scattered.</p>
          </div>
          <div className="ruled-cells" data-cols="2" style={{ marginTop: 32 }}>
            {values.map((item) => (
              <div className="check" key={item}>
                <span className="tick">
                  <Icon name="check" size={15} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </Section>

        <section className="band">
          <div className="wrap band-grid">
            <h3 className="band-title">Built in Indonesia. Engineered for every market.</h3>
            <p>
              We work from one of the world's fastest-growing markets, and that shapes every product decision we make. Wherever you use our products, the standard is the same: emerging-market insight, careful engineering, and software that's built for everywhere from day one.
            </p>
          </div>
        </section>

        <Section label="Leadership" fact="Founder-led">
          <h2 className="section-title">
            Founder-led and <span className="accent">hands-on</span>.
          </h2>
          <p className="section-lede">Decisions sit close to the products. These are the people who look after the standard.</p>

          <div className="ruled-cells team-cells" data-cols="2">
            {leadership.map(([name, role]) => (
              <div key={name}>
                <Avatar name={name} size={64} />
                <div className="nm">{name}</div>
                <div className="ro">{role}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section label="The facts" fact="PT. Efolusi Dunia Teknologi">
          <h2 className="section-title">The company on paper.</h2>
          <div className="token-facts" style={{ marginTop: 32, maxWidth: 640 }}>
            <div className="token-fact">
              <div className="k">Legal entity</div>
              <div className="v">PT. Efolusi Dunia Teknologi</div>
            </div>
            <div className="token-fact">
              <div className="k">Headquarters</div>
              <div className="v">Indonesia · Distributed team</div>
            </div>
            <div className="token-fact">
              <div className="k">Email</div>
              <div className="v">
                <a href="mailto:hi@efolusi.com">hi@efolusi.com</a>
              </div>
            </div>
            <div className="token-fact">
              <div className="k">Open source</div>
              <div className="v">
                <a href="https://github.com/efolusi" target="_blank" rel="noopener noreferrer">
                  github.com/efolusi
                </a>
              </div>
            </div>
          </div>
        </Section>

        <section className="band closer">
          <div className="wrap">
            <h2>See what we've built.</h2>
            <p>Six independent products, one standard of craft. Find the one built for your work.</p>
            <div className="closer-actions">
              <a className="band-btn" href="/#products">
                View the portfolio <Icon name="arrow-right" size={16} />
              </a>
              <a className="band-link" href="/careers">
                Join the studio
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
