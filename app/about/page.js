import { Avatar, Icon } from '@efolusi/meridian';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

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

const companyFacts = [
  ['Legal entity', 'PT. Efolusi Dunia Teknologi'],
  ['Headquarters', 'Indonesia · Distributed team'],
  ['Email', 'hi@efolusi.com'],
  ['Open source', 'github.com/efolusi']
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="page-hero">
          <div className="wrap">
            <h1>
              A studio that ships, <span className="script accent">then keeps its word</span>.
            </h1>
            <p className="page-lede">
              Efolusi is the trade name of PT. Efolusi Dunia Teknologi, a software studio headquartered in Indonesia with a distributed team. We build and run independent software products, and we hold every one of them to the same standard.
            </p>
          </div>
        </section>

        <section className="csec csec--rule">
          <div className="wrap">
            <div className="csec-head">
              <h2>
                Broad on purpose. <span className="script accent">Sharp by discipline.</span>
              </h2>
            </div>
            <div className="approach-body" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <p className="big">We are not tied to one field. We look for broad digital problems, build focused products, and run each one as its own platform with its own roadmap.</p>
              <p className="body">The studio's job is keeping the bar high. If a product doesn't make its category clearer, faster or more useful, it doesn't ship. That discipline is what lets the portfolio grow without getting scattered.</p>
            </div>
            <div className="ruled-cells" data-cols="2" style={{ marginTop: 36 }}>
              {values.map((item, index) => (
                <div className="check" key={item}>
                  <span className={`tick tick--${['caramel', 'green', 'amber', 'coral'][index % 4]}`}>
                    <Icon name="check" size={15} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-team">
          <div className="wrap">
            <p className="band-statement">
              Built in Indonesia, <span className="script" style={{ color: 'var(--brand-300)' }}>engineered</span> for every market. Wherever you use our products, the standard is the same.
            </p>
          </div>
        </section>

        <section className="csec">
          <div className="wrap">
            <div className="csec-head">
              <h2>
                Founder-led and <span className="script accent">hands-on</span>.
              </h2>
              <p className="section-lede">Decisions sit close to the products. These are the people who look after the standard.</p>
            </div>

            <div className="founders founders--light">
              {leadership.map(([name, role]) => (
                <div className="founder" key={name}>
                  <span className="founder-blob">
                    <Avatar name={name} size={84} />
                  </span>
                  <span className="nm">{name}</span>
                  <span className="ro">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="csec csec--rule">
          <div className="wrap">
            <div className="csec-head">
              <h2>
                The company <span className="script accent">on paper</span>.
              </h2>
            </div>
            <div className="token-facts" style={{ maxWidth: 640, margin: '36px auto 0' }}>
              {companyFacts.map(([k, v]) => (
                <div className="token-fact" key={k}>
                  <div className="k">{k}</div>
                  <div className="v">
                    {k === 'Email' ? <a href="mailto:hi@efolusi.com">{v}</a> : null}
                    {k === 'Open source' ? (
                      <a href="https://github.com/efolusi" target="_blank" rel="noopener noreferrer">
                        {v}
                      </a>
                    ) : null}
                    {k !== 'Email' && k !== 'Open source' ? v : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band closer">
          <div className="wrap">
            <h2>
              See what <span className="script" style={{ color: 'var(--brand-300)' }}>we've built</span>.
            </h2>
            <p>Six independent products, one standard of craft. Find the one built for your work.</p>
            <div className="closer-actions">
              <a className="pill pill--cream" href="/#products">
                View the portfolio
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
