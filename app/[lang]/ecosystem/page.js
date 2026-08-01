import { Badge, Icon } from '@efolusi/meridian';
import { getDictionary } from '../../dictionaries/config.js';
import { productMeta } from '../../lib/products.js';
import SiteHeader from '../../components/SiteHeader.jsx';
import SiteFooter from '../../components/SiteFooter.jsx';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return {
    title: d.eco.meta.title,
    description: d.eco.meta.description,
    alternates: {
      canonical: `/${lang}/ecosystem`,
      languages: { en: '/en/ecosystem', id: '/id/ecosystem', 'x-default': '/en/ecosystem' }
    }
  };
}

export default async function EcosystemPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const d = dict.eco;

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
                {d.productsTitleA} <span className="script accent">{d.productsTitleEm}</span>
                {d.productsTitleB}
              </h2>
              <p className="section-lede">{d.productsLede}</p>
            </div>

            <div className="plist" style={{ marginTop: 40 }}>
              {productMeta.map((product) => {
                const isLive = product.status === 'live';
                const copy = dict.home.products[product.id];
                const Row = isLive ? 'a' : 'div';
                const rowProps = isLive ? { href: product.href, target: '_blank', rel: 'noopener noreferrer' } : {};
                return (
                  <Row key={product.id} className={`plist-row${isLive ? '' : ' plist-row--building'}`} {...rowProps}>
                    <span className={`plist-mark tint-${product.tint}`} aria-hidden="true">
                      {product.mark}
                    </span>
                    <span>
                      <span className="plist-name">
                        {product.title}
                        <Badge tone={isLive ? 'success' : 'neutral'}>{d.status[product.status]}</Badge>
                        {isLive && (
                          <span className="plist-arrow">
                            <Icon name="arrow-up-right" size={17} />
                          </span>
                        )}
                      </span>
                      <span className="plist-cat">{copy.section}</span>
                    </span>
                    <span className="plist-sum">{copy.summary}</span>
                  </Row>
                );
              })}
            </div>
          </div>
        </section>

        <section className="csec csec--rule">
          <div className="wrap">
            <div className="csec-head">
              <h2>
                {d.platformTitleA} <span className="script accent">{d.platformTitleEm}</span>
                {d.platformTitleB}
              </h2>
              <p className="section-lede">{d.platformLede}</p>
            </div>

            <div className="ruled-cells" data-cols="2" style={{ marginTop: 40 }}>
              {d.platform.map(([title, body]) => (
                <div className="flywheel-cell" key={title}>
                  <div>
                    <div className="nm">{title}</div>
                    <div className="ro">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="csec csec--rule">
          <div className="wrap">
            <div className="csec-head">
              <h2>
                {d.tokenTitleA} <span className="script accent">{d.tokenTitleEm}</span>
                {d.tokenTitleB}
              </h2>
              <p className="section-lede">{d.tokenLede}</p>
            </div>
            <div className="fact-foot" style={{ justifyContent: 'center' }}>
              <a className="ca-link" href={`/${lang}/token`}>
                {d.tokenCta} <Icon name="arrow-up-right" size={14} />
              </a>
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
