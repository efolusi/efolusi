'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, ThemeToggle, buttonVariants } from '@efolusi/meridian';

const my = { web: 'https://my.efolusi.com' };

/* Header buttons are Meridian buttons: lg is the 44 px target, pill is the site's shape.
   `header-pill` only lets the phone layout hide them (the menu repeats both). */
const signInButton = buttonVariants({ variant: 'secondary', size: 'lg', shape: 'pill', className: 'header-pill' });
const contactButton = buttonVariants({ variant: 'primary', size: 'lg', shape: 'pill', className: 'header-pill' });

/* The highlight marks the page you are on, nothing else. Anchor links into
   home sections never light up. */
export default function SiteHeader({ lang, t }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const base = `/${lang}`;
  const navLinks = [
    [t.nav.portfolio, `${base}/#products`, null],
    [t.nav.token, `${base}/token`, `${base}/token`],
    [t.nav.company, `${base}/about`, `${base}/about`],
    [t.nav.careers, `${base}/careers`, `${base}/careers`]
  ];

  const other = lang === 'en' ? 'id' : 'en';
  const rest = pathname.replace(/^\/(en|id)/, '');
  const switchHref = `/${other}${rest}`;

  return (
    <>
      {/* First stop for keyboard users. Every page that renders this header puts
          its content in <main id="top" tabIndex={-1}>, so following the link
          moves focus into the page, not just the scroll position. */}
      <a className="skip-link" href="#top">
        {t.skipToContent}
      </a>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap site-header-inner">
          <Link href={base} className="brand" aria-label="Efolusi home" onClick={() => setMenuOpen(false)}>
            <img src="/efolusi/logo-owl-240.png" alt="" width="30" height="30" />
            Efolusi
          </Link>

          <nav className="site-nav" aria-label="Primary">
            {navLinks.map(([label, href, page]) => (
              <Link key={label} href={href} className={page && pathname === page ? 'is-active' : ''}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link
              className="lang-switch"
              href={switchHref}
              hrefLang={other}
              lang={other}
              aria-label={t.switchLanguage}
              onClick={() => setMenuOpen(false)}
            >
              {t.langLabel}
            </Link>
            <ThemeToggle lang={lang} />
            <a className={signInButton} href={`${my.web}/sign-in?lang=${lang}`}>
              {t.signIn}
            </a>
            <Link className={contactButton} href={`${base}/#contact`} onClick={() => setMenuOpen(false)}>
              {t.getInTouch}
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-label={t.toggleMenu}
              aria-expanded={menuOpen ? 'true' : 'false'}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <Icon name={menuOpen ? 'x' : 'menu'} size={18} />
            </button>
          </div>
        </div>

        <nav className={`mobile-menu${menuOpen ? ' is-open' : ''}`} aria-label="Mobile">
          {navLinks.map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href={`${base}/#contact`} onClick={() => setMenuOpen(false)}>
            {t.contact}
          </Link>
          {/* Duplicates the header pill, so it only shows once the pill hides (<=480px). */}
          <a className="menu-signin" href={`${my.web}/sign-in?lang=${lang}`} onClick={() => setMenuOpen(false)}>
            {t.signIn}
          </a>
        </nav>
      </header>
    </>
  );
}
