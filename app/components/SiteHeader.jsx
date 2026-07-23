'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@efolusi/meridian';
import ThemeToggle from './ThemeToggle.jsx';

const navLinks = [
  ['Portfolio', '/#products', null],
  ['Token', '/token', '/token'],
  ['Company', '/about', '/about'],
  ['Careers', '/careers', '/careers']
];

/* The highlight marks the page you are on, nothing else. Anchor links into
   home sections never light up. */
export default function SiteHeader() {
  const pathname = usePathname();
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
        <Link href="/" className="brand" aria-label="Efolusi home" onClick={() => setMenuOpen(false)}>
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
          <ThemeToggle />
          <Link className="pill pill--primary pill--sm" href="/#contact" onClick={() => setMenuOpen(false)}>
            Get in touch
            <span className="pill-arrow">
              <Icon name="arrow-up-right" size={14} />
            </span>
          </Link>
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
        {navLinks.map(([label, href]) => (
          <Link key={label} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </Link>
        ))}
        <Link href="/#contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
