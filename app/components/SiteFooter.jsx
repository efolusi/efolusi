'use client';

import { Icon } from '@efolusi/meridian';

const products = [
  ['ZOYYA', 'https://zoyya.xyz'],
  ['Komando', 'https://komando.efolusi.com'],
  ['Toolips', 'https://toolips.xyz'],
  ['Trady', 'https://trady.efolusi.com'],
  ['Kongkow', 'https://kongkow.xyz'],
  ['Cuwan', 'https://cuwan.xyz']
];

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <a href="/" className="brand">
              <img src="/efolusi/logo-owl.png" alt="" width="28" height="28" />
              Efolusi
            </a>
            <p className="tag-line">PT. Efolusi Dunia Teknologi. A general software studio building and operating independent software products. Made in Indonesia, engineered for every market.</p>
            <a className="footer-mail" href="mailto:hi@efolusi.com">
              <Icon name="mail" size={15} /> hi@efolusi.com
            </a>
          </div>

          <div className="fcol">
            <h4>Portfolio</h4>
            {products.map(([name, href]) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer">
                {name}
              </a>
            ))}
          </div>
          <div className="fcol">
            <h4>Company</h4>
            <a href="/about">About</a>
            <a href="/careers">Careers</a>
            <a href="/brand">Brand</a>
            <a href="/#faq">FAQ</a>
            <a href="/#contact">Contact</a>
          </div>
          <div className="fcol">
            <h4>Ecosystem</h4>
            <a href="/token">$EFO token</a>
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
            <a href="/privacy">Privacy policy</a>
            <a href="/terms">Terms of use</a>
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
