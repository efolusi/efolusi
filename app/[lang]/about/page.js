import { Avatar, Icon } from '@efolusi/meridian';
import { getDictionary } from '../../dictionaries/config.js';
import SiteHeader from '../../components/SiteHeader.jsx';
import SiteFooter from '../../components/SiteFooter.jsx';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return {
    title: d.about.meta.title,
    description: d.about.meta.description,
    alternates: {
      canonical: `/${lang}/about`,
      languages: { en: '/en/about', id: '/id/about', 'x-default': '/en/about' }
    }
  };
}

const leadership = [
  ['Sugeng Agung Suganda', 'Founder & Chief Executive Officer'],
  ['Rakha Febryza Rasendriya', 'Co-founder']
];

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const d = dict.about;

  return (
    <>
      <SiteHeader lang={lang} t={dict.common} />
    <main>
      <section className="page-hero">
        <div className="wrap">
          <h1>
            {d.heroA} <span className="script accent">{d.heroEm}</span>
            {d.heroB}
          </h1>
          <p className="page-lede">{d.lede}</p>
        </div>
      </section>

      <section className="csec csec--rule">
        <div className="wrap">
          <div className="split-grid">
            <div>
              <h2 className="section-title">
                {d.splitTitleA} <span className="script accent">{d.splitTitleEm}</span>
              </h2>
              <p className="big">{d.splitBig}</p>
              <p className="body">{d.splitBody}</p>
            </div>

            <div className="values-panel">
              {d.values.map((item, index) => (
                <div className="check" key={item}>
                  <span className={`tick tick--${['caramel', 'green', 'amber', 'coral'][index % 4]}`}>
                    <Icon name="check" size={15} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="band band-team">
        <div className="wrap">
          <p className="band-statement">
            {d.bandA} <span className="script" style={{ color: 'var(--brand-300)' }}>{d.bandEm}</span> {d.bandB}
          </p>
        </div>
      </section>

      <section className="csec">
        <div className="wrap">
          <div className="csec-head">
            <h2>
              {d.foundersTitleA} <span className="script accent">{d.foundersTitleEm}</span>
              {d.foundersTitleB}
            </h2>
            <p className="section-lede">{d.foundersLede}</p>
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
              {d.paperTitleA} <span className="script accent">{d.paperTitleEm}</span>
              {d.paperTitleB}
            </h2>
          </div>
          <div className="token-facts" style={{ maxWidth: 640, margin: '36px auto 0' }}>
            {d.facts.map(([k, v]) => (
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
            {d.closerA} <span className="script" style={{ color: 'var(--brand-300)' }}>{d.closerEm}</span>
            {d.closerB}
          </h2>
          <p>{d.closerBody}</p>
          <div className="closer-actions">
            <a className="pill pill--cream" href={`/${lang}/#products`}>
              {d.closerCta}
              <span className="pill-arrow">
                <Icon name="arrow-up-right" size={16} />
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>

      <SiteFooter lang={lang} t={dict.common} />
    </>
  );
}
