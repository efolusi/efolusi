'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@efolusi/meridian';
import ThemeToggle from './ThemeToggle.jsx';

const navLinks = [
  ['Portfolio', '/#products', 'products'],
  ['Token', '/token', 'token'],
  ['Company', '/about', 'about'],
  ['Careers', '/careers', 'careers'],
  ['FAQ', '/#faq', 'faq']
];

/* `active` is a page key ('token', 'about', 'careers') on subpages, or the
   scrollspy section id on the home page. */
export default function SiteHeader({ active = '' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap site-header-inner">
        <a href="/" className="brand" aria-label="Efolusi home" onClick={() => setMenuOpen(false)}>
          <img src="/efolusi/logo-owl.png" alt="" width="30" height="30" />
          Efolusi
        </a>

        <nav className="site-nav" aria-label="Primary">
          {navLinks.map(([label, href, key]) => (
            <a key={key} href={href} className={active === key ? 'is-active' : ''}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a className="ef-btn ef-btn--primary ef-btn--md" href="/#contact" onClick={() => setMenuOpen(false)}>
            Get in touch
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen ? 'true' : 'false'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <Icon name={menuOpen ? 'x' : 'menu'} size={18} />
          </button>
        </div>
      </div>

      <nav className={`mobile-menu${menuOpen ? ' is-open' : ''}`} aria-label="Mobile">
        {navLinks.map(([label, href, key]) => (
          <a key={key} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
        <a href="/#contact" onClick={() => setMenuOpen(false)}>
          Contact
        </a>
      </nav>
    </header>
  );
}
