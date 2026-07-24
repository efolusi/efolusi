import { Icon } from '@efolusi/meridian';
import { getDictionary } from '../../dictionaries/config.js';
import SiteHeader from '../../components/SiteHeader.jsx';
import SiteFooter from '../../components/SiteFooter.jsx';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return {
    title: d.careers.meta.title,
    description: d.careers.meta.description,
    alternates: {
      canonical: `/${lang}/careers`,
      languages: { en: '/en/careers', id: '/id/careers', 'x-default': '/en/careers' }
    }
  };
}

export default async function CareersPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const d = dict.careers;
  const contact = `/${lang}/#contact`;

  return (
    <>
      <SiteHeader lang={lang} t={dict.common} />
    <main>
      <section className="page-hero">
        <div className="wrap">
          <h1>
            {d.heroA} <span className="script accent">{d.heroEm}</span>
          </h1>
          <p className="page-lede">{d.lede}</p>
        </div>
      </section>

      <section className="csec csec--rule">
        <div className="wrap">
          <div className="csec-head">
            <h2>
              {d.whatTitleA} <span className="script accent">{d.whatTitleEm}</span>
              {d.whatTitleB}
            </h2>
          </div>
          <div className="ruled-cells" data-cols="2" style={{ marginTop: 36 }}>
            {d.perks.map(([icon, title, body], index) => (
              <div className="perk" key={title}>
                <span className={`tick tick--${['caramel', 'green', 'amber', 'coral'][index % 4]}`}>
                  <Icon name={icon} size={16} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="csec csec--rule">
        <div className="wrap">
          <div className="careers-grid">
            <div>
              <h2 className="section-title">
                {d.hiringTitleA} <span className="script accent">{d.hiringTitleEm}</span>
              </h2>
              <p className="body">{d.hiringBody}</p>
              <a className="pill pill--primary" href={contact}>
                {d.reachOut}
                <span className="pill-arrow">
                  <Icon name="arrow-up-right" size={16} />
                </span>
              </a>
            </div>

            <div className="roles">
              {d.roles.map(([title, meta]) => (
                <a className="role" href={contact} key={title}>
                  <div>
                    <div className="rt">{title}</div>
                    <div className="rm">{meta}</div>
                  </div>
                  <span className="role-arrow">
                    <Icon name="arrow-right" size={18} />
                  </span>
                </a>
              ))}
            </div>
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
            <a className="pill pill--cream" href={contact}>
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
