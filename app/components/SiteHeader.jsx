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
  /* null = signed out (default while loading, so the button never flashes
     from "Account" back to "Sign in"). The SSO cookie lives on .efolusi.com,
     so the accounts API can answer from this origin. */
  const [user, setUser] = useState(null);
  /* Where to send the browser back to after signing in. Read from
     window.location in an effect (this renders on the server too); until it
     resolves, the link still works — accounts just lands on its own account
     page instead of back here. */
  const [returnTo, setReturnTo] = useState('');

  useEffect(() => {
    setReturnTo(encodeURIComponent(window.location.href));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://accounts-api.efolusi.com/api/auth/get-session', {
      credentials: 'include',
      signal: controller.signal
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => {});
    return () => controller.abort();
  }, []);

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
          <Link className="lang-switch" href={switchHref} aria-label={t.switchLanguage} onClick={() => setMenuOpen(false)}>
            {t.langLabel}
          </Link>
          <ThemeToggle />
          <a
            className="pill pill--sm pill--plain sign-in-pill"
            href={user ? 'https://accounts.efolusi.com/account' : `https://accounts.efolusi.com/sign-in?lang=${lang}${returnTo ? `&next=${returnTo}` : ''}`}
          >
            {user ? t.account ?? 'Account' : t.signIn}
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
        {/* Duplicates the header pill, so it only shows once the pill hides (<=480px). */}
        <a
          className="menu-signin"
          href={user ? 'https://accounts.efolusi.com/account' : `https://accounts.efolusi.com/sign-in?lang=${lang}${returnTo ? `&next=${returnTo}` : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          {user ? t.account ?? 'Account' : t.signIn}
        </a>
      </nav>
    </header>
  );
}
