'use client';

import Link from 'next/link';
import { Icon } from '@efolusi/meridian';

export default function SiteFooter({ lang, t }) {
  const base = `/${lang}`;

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href={base} className="brand">
              <img src="/efolusi/logo-owl-240.png" alt="" width="28" height="28" />
              Efolusi
            </Link>
            <p className="tag-line">{t.footer.tagline}</p>
            <a className="footer-mail" href="mailto:hi@efolusi.com">
              <Icon name="mail" size={15} /> hi@efolusi.com
            </a>
          </div>

          <div className="fcol">
            <h4>{t.footer.companyHead}</h4>
            <Link href={`${base}/about`}>{t.footer.about}</Link>
            <Link href={`${base}/careers`}>{t.footer.careers}</Link>
            <Link href={`${base}/brand`}>{t.footer.brand}</Link>
          </div>
          <div className="fcol">
            <h4>{t.footer.ecosystemHead}</h4>
            <Link href={`${base}/token`}>{t.footer.efoToken}</Link>
            <a
              href="https://bscscan.com/token/0xb61a09e93b4f14585e9afbac3adaea626f25fb07"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.footer.bscscan}
            </a>
          </div>
          <div className="fcol">
            <h4>{t.footer.legalHead}</h4>
            <Link href={`${base}/privacy`}>{t.footer.privacy}</Link>
            <Link href={`${base}/terms`}>{t.footer.terms}</Link>
          </div>
        </div>

        <div className="footer-bot">
          <p>{t.footer.rights}</p>
          <span className="made">
            <span className="flag">
              <i />
              <i />
            </span>
            {t.footer.madeIn}
          </span>
        </div>
      </div>
    </footer>
  );
}
