'use client';

import Link from 'next/link';
import { Icon } from '@efolusi/meridian';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand">
              <img src="/efolusi/logo-owl.png" alt="" width="28" height="28" />
              Efolusi
            </Link>
            <p className="tag-line">PT. Efolusi Dunia Teknologi. A software studio that builds its own products and runs them. Made in Indonesia, engineered for every market.</p>
            <a className="footer-mail" href="mailto:hi@efolusi.com">
              <Icon name="mail" size={15} /> hi@efolusi.com
            </a>
          </div>

          <div className="fcol">
            <h4>Company</h4>
            <Link href="/about">About</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/brand">Brand</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="/#contact">Contact</Link>
          </div>
          <div className="fcol">
            <h4>Ecosystem</h4>
            <Link href="/token">$EFO token</Link>
            <a
              href="https://bscscan.com/token/0xb61a09e93b4f14585e9afbac3adaea626f25fb07"
              target="_blank"
              rel="noopener noreferrer"
            >
              BscScan
            </a>
          </div>
          <div className="fcol">
            <h4>Legal</h4>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of use</Link>
          </div>
        </div>

        <div className="footer-bot">
          <p>© 2026 PT. Efolusi Dunia Teknologi. All rights reserved.</p>
          <span className="made">
            <span className="flag">
              <i />
              <i />
            </span>
            Made in Indonesia
          </span>
        </div>
      </div>
    </footer>
  );
}
