import Link from 'next/link';
import { Icon } from '@efolusi/meridian';
import { getDictionary } from '../dictionaries/config.js';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';

/* The branded 404 body, shared by app/global-not-found.js (server render of
   every unknown URL) and app/[lang]/not-found.js (client navigation). */
export default function NotFoundView({ lang }) {
  const dict = getDictionary(lang);
  const t = dict.common.notFound;

  return (
    <>
      <SiteHeader lang={lang} t={dict.common} />
      <main id="top" tabIndex={-1} className="not-found">
        <section className="page-hero">
          <div className="wrap">
            <span className="eyebrow">{t.code}</span>
            <h1>
              {t.titleA} <span className="script accent">{t.titleEm}</span> {t.titleB}
            </h1>
            <p className="page-lede">{t.body}</p>
            <div className="hero-actions">
              <Link className="pill pill--primary" href={`/${lang}`}>
                {t.home}
                <span className="pill-arrow">
                  <Icon name="arrow-up-right" size={16} />
                </span>
              </Link>
              <Link className="pill pill--outline" href={`/${lang}/portfolio`}>
                {t.portfolio}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} t={dict.common} />
    </>
  );
}
