'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@efolusi/meridian';
import ThemeToggle from './ThemeToggle.jsx';

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
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap site-header-inner">
        <Link href={base} className="brand" aria-label="Efolusi home" onClick={() => setMenuOpen(false)}>
          <img src="/efolusi/logo-owl.png" alt="" width="30" height="30" />
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
          <Link className="lang-switch" href={switchHref} aria-label={t.switchLanguage} onClick={() => setMenuOpen(false)}>
            {t.langLabel}
          </Link>
          <ThemeToggle />
          <a className="pill pill--sm pill--plain sign-in-pill" href={`https://accounts.efolusi.com/sign-in?lang=${lang}`}>
            {t.signIn}
          </a>
          <Link className="pill pill--primary pill--sm pill--plain" href={`${base}/#contact`} onClick={() => setMenuOpen(false)}>
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
        <a href={`https://accounts.efolusi.com/sign-in?lang=${lang}`} onClick={() => setMenuOpen(false)}>
          {t.signIn}
        </a>
      </nav>
    </header>
  );
}
