'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@efolusi/meridian';
import { getDictionary, isLocale } from '../dictionaries/config.js';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

/* not-found boundaries receive no params, so the locale comes from the path. */
export default function NotFound() {
  const pathname = usePathname() || '';
  const segment = pathname.split('/')[1];
  const lang = isLocale(segment) ? segment : 'en';
  const dict = getDictionary(lang);
  const t = dict.common.notFound;

  return (
    <>
      <SiteHeader lang={lang} t={dict.common} />
      <main className="not-found">
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
