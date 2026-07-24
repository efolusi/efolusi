import { Icon } from '@efolusi/meridian';
import { getDictionary } from '../../dictionaries/config.js';
import SiteHeader from '../../components/SiteHeader.jsx';
import SiteFooter from '../../components/SiteFooter.jsx';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return {
    title: d.brand.meta.title,
    description: d.brand.meta.description,
    alternates: {
      canonical: `/${lang}/brand`,
      languages: { en: '/en/brand', id: '/id/brand', 'x-default': '/en/brand' }
    }
  };
}

export default async function BrandPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const d = dict.brand;

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
          <div className="csec-head">
            <h2>
              {d.owlTitleA} <span className="script accent">{d.owlTitleEm}</span>
              {d.owlTitleB}
            </h2>
          </div>
          <div className="brand-assets" style={{ marginTop: 36 }}>
            <div className="brand-tile">
              <div className="brand-preview">
                <img src="/efolusi/logo-owl.png" alt="The Efolusi owl mark" width="120" height="120" />
              </div>
              <div className="brand-meta">
                <div className="nm">{d.owlMark}</div>
                <div className="ro">{d.owlMeta}</div>
                <a className="brand-download" href="/efolusi/logo-owl.png" download="efolusi-owl.png">
                  {d.download} <Icon name="download" size={14} />
                </a>
              </div>
            </div>
            <div className="brand-tile">
              <div className="brand-preview">
                <span className="brand-wordmark">Efolusi</span>
              </div>
              <div className="brand-meta">
                <div className="nm">{d.wordmark}</div>
                <div className="ro">{d.wordmarkMeta}</div>
                <span className="ro">{d.wordmarkNote}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="csec csec--rule">
        <div className="wrap">
          <div className="csec-head">
            <h2>
              {d.rulesTitleA} <span className="script accent">{d.rulesTitleEm}</span>
              {d.rulesTitleB}
            </h2>
          </div>
          <div className="approach-grid" style={{ marginTop: 36 }}>
            <div>
              <div className="brand-rules">
                {d.dos.map((item) => (
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
                {d.donts.map((item) => (
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
            {d.closerA} <span className="script" style={{ color: 'var(--brand-300)' }}>{d.closerEm}</span>
            {d.closerB}
          </h2>
          <p>{d.closerBody}</p>
          <div className="closer-actions">
            <a className="pill pill--cream" href="mailto:hi@efolusi.com">
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
