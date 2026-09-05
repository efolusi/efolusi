'use client';

import { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Avatar, AvatarFallback, Badge, Button, CopyField, Icon, Input, StatusDot, Tag, Textarea } from '@efolusi/meridian';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';
import { SocialIcon } from '../lib/social-icons.js';

const EFO_CONTRACT = '0xb61a09e93b4f14585e9afbac3adaea626f25fb07';

/* Structural data (ids, tints, marks, icons, links, titles) is locale-agnostic;
   the copy for each product is merged in from the dictionary by id. */
const productMeta = [
  { id: 'zoyya', title: 'ZOYYA', tint: 'caramel', mark: 'Zo', icon: 'brain', href: 'https://zoyya.xyz' },
  { id: 'komando', title: 'Komando', tint: 'green', mark: 'Ko', icon: 'server', href: 'https://komando.efolusi.com' },
  { id: 'toolips', title: 'Toolips', tint: 'amber', mark: 'To', icon: 'package', href: 'https://toolips.xyz' },
  { id: 'trady', title: 'Trady', tint: 'coral', logo: '/trady-otter.png', icon: 'sparkles', href: 'https://trady.efolusi.com' },
  { id: 'kongkow', title: 'Kongkow', tint: 'peach', mark: 'Kg', icon: 'message-square', href: 'https://kongkow.xyz' },
  { id: 'cuwan', title: 'Cuwan', tint: 'green', mark: 'Cu', icon: 'chart-candlestick', href: 'https://cuwan.xyz' },
  { id: 'meridian', title: 'Meridian', tint: 'cocoa', brandMark: true, icon: 'layout-dashboard', href: 'https://meridian.efolusi.com' }
];

const leadership = [
  [
    'Sugeng Agung Suganda',
    'Founder & Chief Executive Officer',
    [
      ['LinkedIn', 'https://linkedin.com/in/sgnd'],
      ['GitHub', 'https://github.com/sgnd']
    ]
  ],
  ['Rakha Febryza Rasendriya', 'Co-founder']
];

/* Decorations live in the two gutters beside the centered text column, in
   staggered vertical slots so neighbours never touch. They are hidden below
   1200px, where the gutters get too narrow to hold them. */
const edgeTiles = [
  { id: 'zoyya', text: 'Zo', tint: 'caramel', href: 'https://zoyya.xyz', style: { left: '3%', top: 30, '--rot': '-8deg', '--fd': '0.4s' }, size: 72 },
  { id: 'kongkow', text: 'Kg', tint: 'peach', href: 'https://kongkow.xyz', style: { left: '2%', top: 210, '--rot': '5deg', '--fd': '1.4s' }, size: 62 },
  { id: 'trady', logo: '/trady-otter.png', tint: 'coral', href: 'https://trady.efolusi.com', style: { left: '10%', top: 450, '--rot': '7deg', '--fd': '0.8s' }, size: 64 },
  { id: 'efo', text: '$EFO', tint: 'cocoa', href: 'token', style: { right: '4%', top: 30, '--rot': '6deg', '--fd': '0.6s' }, w: 96, h: 48 },
  { id: 'komando', text: 'Ko', tint: 'green', href: 'https://komando.efolusi.com', style: { right: '2%', top: 205, '--rot': '6deg', '--fd': '1.2s' }, size: 68 },
  { id: 'toolips', text: 'To', tint: 'amber', href: 'https://toolips.xyz', style: { right: '14%', top: 385, '--rot': '-6deg', '--fd': '1.7s' }, size: 66 },
  { id: 'cuwan', text: 'Cu', tint: 'green', href: 'https://cuwan.xyz', style: { right: '9%', top: 530, '--rot': '-5deg', '--fd': '0.2s' }, size: 70 },
  { id: 'meridian', brandMark: true, tint: 'cocoa', href: 'https://meridian.efolusi.com', style: { left: '9%', top: 550, '--rot': '-6deg', '--fd': '1.6s' }, size: 64 }
];

const stickers = [
  { text: '#AI', tint: 'caramel', style: { left: '12%', top: 120, '--rot': '-7deg', '--fd': '0.5s' } },
  { text: '#infrastructure', tint: 'green', style: { left: '8%', top: 300, '--rot': '-5deg', '--fd': '1.8s' } },
  { text: '#open-source', tint: 'caramel', style: { left: '2%', top: 385, '--rot': '6deg', '--fd': '1.3s' } },
  { text: '#content', tint: 'coral', style: { left: '1%', top: 520, '--rot': '4deg', '--fd': '1.1s' } },
  { text: '#trading', tint: 'green', style: { right: '12%', top: 120, '--rot': '5deg', '--fd': '1s' } },
  { text: '#productivity', tint: 'amber', style: { right: '6%', top: 295, '--rot': '-4deg', '--fd': '2s' } },
  { text: '#social', tint: 'peach', style: { right: '2%', top: 465, '--rot': '-4deg', '--fd': '1.5s' } }
];

/* Reveal-on-scroll: soft settle with sibling stagger, Meridian motion tokens do the rest. */
function useRevealOnScroll() {
  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll('.reveal'));

    if (!('IntersectionObserver' in window)) {
      reveals.forEach((element) => element.classList.add('in'));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target;
          const siblings = Array.from(element.parentNode.children).filter((child) =>
            child.classList.contains('reveal')
          );
          const index = siblings.indexOf(element);

          element.style.transitionDelay = `${Math.max(0, index) * 70}ms`;
          element.classList.add('in');
          io.unobserve(element);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    reveals.forEach((element) => io.observe(element));

    const fallbackTimer = window.setTimeout(() => {
      reveals.forEach((element) => element.classList.add('in'));
    }, 1600);

    return () => {
      io.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, []);
}

export default function HomeClient({ d, common, lang }) {
  useRevealOnScroll();

  const base = `/${lang}`;
  const stageProducts = productMeta.map((meta) => ({ ...meta, ...d.products[meta.id] }));

  const [activeStage, setActiveStage] = useState('zoyya');
  const [contactStatus, setContactStatus] = useState({ type: '', text: '' });
  const [newsletterStatus, setNewsletterStatus] = useState({ type: '', text: '' });

  const activeProduct = stageProducts.find((item) => item.id === activeStage) || stageProducts[0];

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const company = String(formData.get('company') || '').trim();

    if (!name || !email || !message) {
      setContactStatus({ type: 'error', text: d.contact.errFields });
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setContactStatus({ type: 'error', text: d.contact.errEmail });
      return;
    }

    setContactStatus({ type: 'sending', text: '' });

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, company })
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || (data && data.ok === false)) throw new Error(data.error || 'Send failed');
        setContactStatus({ type: 'success', text: d.contact.success });
        formEl.reset();
      })
      .catch((err) => {
        console.error('Send error', err);
        setContactStatus({ type: 'error', text: d.contact.errSend });
      });
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const formEl = event.currentTarget;

    const formData = new FormData(formEl);
    const email = String(formData.get('email') || '').trim();

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setNewsletterStatus({ type: 'error', text: d.newsletter.errEmail });
      formEl.querySelector('input')?.focus();
      return;
    }

    setNewsletterStatus({ type: 'sending', text: '' });

    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || (data && data.ok === false)) throw new Error(data.error || 'Subscribe failed');
        setNewsletterStatus({ type: 'success', text: d.newsletter.success });
        formEl.reset();
      })
      .catch((err) => {
        console.error('Newsletter error', err);
        setNewsletterStatus({ type: 'error', text: d.newsletter.errSend });
      });
  };

  return (
    <>
      <SiteHeader lang={lang} t={common} />

    <main id="top">
      <section className="hero hero-center" id="hero">
        <div className="wrap">
          {stickers.map((s) => (
            <span key={s.text} className={`sticker tint-${s.tint} hero-deco`} style={s.style} aria-hidden="true">
              {s.text}
            </span>
          ))}
          {edgeTiles.map((tile) => {
            const href = tile.href.startsWith('http') ? tile.href : `${base}/${tile.href}`;
            const external = tile.href.startsWith('http');
            return (
              <a
                key={tile.id}
                className="edge-tile hero-deco"
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={tile.id}
                style={tile.style}
              >
                <span
                  className={`tile-card tint-${tile.tint}`}
                  style={{ width: tile.w || tile.size, height: tile.h || tile.size, fontSize: tile.w ? 17 : 26 }}
                >
                  {tile.brandMark ? (
                    <span className="meridian-mark" aria-hidden="true" />
                  ) : tile.logo ? (
                    <img className="product-logo product-logo--tile" src={tile.logo} alt="" />
                  ) : tile.text}
                </span>
              </a>
            );
          })}
          <h1 className="reveal">
            {d.hero.lead} <span className="script accent">{d.hero.build}</span> {d.hero.trail}{' '}
            <span className="scribble">
              {d.hero.products}
              <svg viewBox="0 0 220 26" preserveAspectRatio="none" aria-hidden="true">
                <path d="M6 16 C 48 22, 88 6, 126 13 S 196 21, 214 9" pathLength="100" />
              </svg>
            </span>
          </h1>
          <p className="hero-sub reveal">{d.hero.sub}</p>

          <div className="hero-actions reveal">
            {/* Curls in from the left and points at the portfolio button. */}
            <span className="hero-doodle hero-deco" aria-hidden="true">
              <svg viewBox="0 0 72 56">
                <path d="M4 6 C 10 34, 26 46, 58 44 M58 44 l-13 -7 M58 44 l-11 9" />
              </svg>
            </span>
            <a className="pill pill--primary" href="#products">
              {d.hero.viewPortfolio}
              <span className="pill-arrow">
                <Icon name="arrow-up-right" size={16} />
              </span>
            </a>
            <a className="pill pill--outline" href="#contact">
              {d.hero.getInTouch}
            </a>
          </div>

          <div className="hero-proof reveal">
            <StatusDot status="ok" pulse />
            <span>{d.hero.proof}</span>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...d.marquee, ...d.marquee].map((item, index) => (
            <span className="marquee-item" key={`${item}-${index}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <section className="csec" aria-label="At a glance">
        <div className="wrap">
          <div className="csec-head reveal">
            <h2>
              {d.glance.headA} <span className="script accent">{d.glance.headEm}</span> {d.glance.headB}
            </h2>
          </div>
          <div className="feat-grid">
            <a className="feat-card feat-card--peach reveal" href="#products">
              <span className="feat-icon">
                <Icon name="package" size={22} />
              </span>
              <span className="feat-deco" aria-hidden="true">
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="36" cy="36" r="10" />
                  <circle cx="36" cy="36" r="20" />
                  <circle cx="36" cy="36" r="30" />
                </svg>
              </span>
              <h3>
                {d.glance.cards.products.titleA} <span className="script">{d.glance.cards.products.titleEm}</span>{' '}
                {d.glance.cards.products.titleB}
              </h3>
              <p>{d.glance.cards.products.body}</p>
              <span className="feat-cta">
                {d.glance.cards.products.cta} <Icon name="arrow-right" size={15} />
              </span>
            </a>

            <a className="feat-card feat-card--cocoa reveal" href={`${base}/token`}>
              <span className="feat-icon">
                <Icon name="coins" size={22} />
              </span>
              <span className="feat-deco" aria-hidden="true">
                <svg width="84" height="40" viewBox="0 0 84 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M4 20 q 10 -16 20 0 t 20 0 t 20 0 t 16 0" />
                </svg>
              </span>
              <h3>
                {d.glance.cards.token.titleA} <span className="script">{d.glance.cards.token.titleEm}</span>
              </h3>
              <p>{d.glance.cards.token.body}</p>
              <span className="feat-cta">
                {d.glance.cards.token.cta} <Icon name="arrow-right" size={15} />
              </span>
            </a>

            <a className="feat-card feat-card--amber reveal" href={`${base}/about`}>
              <span className="feat-icon">
                <Icon name="sparkles" size={22} />
              </span>
              <span className="feat-deco" aria-hidden="true">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor">
                  {[8, 24, 40, 56].map((x) => [8, 24, 40, 56].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" />))}
                </svg>
              </span>
              <h3>
                {d.glance.cards.standard.titleA} <span className="script">{d.glance.cards.standard.titleEm}</span>
              </h3>
              <p>{d.glance.cards.standard.body}</p>
              <span className="feat-cta">
                {d.glance.cards.standard.cta} <Icon name="arrow-right" size={15} />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="csec csec--rule" id="products">
        <div className="wrap">
          <div className="csec-head reveal">
            <h2>
              {d.portfolio.headA} <span className="script accent">{d.portfolio.headEm}</span>
              {d.portfolio.headB}
            </h2>
            <p className="section-lede">{d.portfolio.lede}</p>
          </div>

          <div className="stage-wrap reveal">
            <div className="stage">
              <div
                className={`stage-watermark wm-${activeProduct.tint}${activeProduct.brandMark ? ' stage-watermark--brand' : ''}${activeProduct.logo ? ' stage-watermark--logo' : ''}`}
                key={activeProduct.id}
                aria-hidden="true"
              >
                {activeProduct.brandMark ? (
                  <span className="meridian-mark meridian-mark--watermark" />
                ) : activeProduct.logo ? (
                  <img className="product-logo product-logo--watermark" src={activeProduct.logo} alt="" />
                ) : activeProduct.mark}
              </div>

              {stageProducts.map((product, index) => (
                <article key={product.id} className={`stage-panel${activeStage === product.id ? ' is-active' : ''}`}>
                  <span className="eyebrow eyebrow--mono">
                    {String(index + 1).padStart(2, '0')} / {product.section}
                  </span>
                  <h3>{product.title}</h3>
                  <p className="desc">{product.desc}</p>
                  <div className="specs">
                    {product.specs.map((spec) => (
                      <Tag key={spec}>{spec}</Tag>
                    ))}
                  </div>
                  <div className="cta">
                    <Button
                      variant="brand"
                      iconRight="arrow-up-right"
                      onClick={() => window.open(product.href, '_blank', 'noopener,noreferrer')}
                    >
                      {product.buttonLabel}
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            <ol className="switch">
              {stageProducts.map((product, index) => (
                <li key={product.id}>
                  <button
                    type="button"
                    className={activeStage === product.id ? 'is-active' : ''}
                    onMouseEnter={() => setActiveStage(product.id)}
                    onFocus={() => setActiveStage(product.id)}
                    onClick={() => setActiveStage(product.id)}
                  >
                    <span className="sw-n">{String(index + 1).padStart(2, '0')}</span>
                    <span className="sw-nm">{product.title}</span>
                    <span className="sw-c">{product.tag}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="plist reveal">
            {stageProducts.map((product) => (
              <a key={product.id} className="plist-row" href={product.href} target="_blank" rel="noopener noreferrer">
                <span className={`plist-mark tint-${product.tint}`} aria-hidden="true">
                  {product.brandMark ? (
                    <span className="meridian-mark" />
                  ) : product.logo ? (
                    <img className="product-logo product-logo--list" src={product.logo} alt="" />
                  ) : product.mark}
                </span>
                <span>
                  <span className="plist-name">
                    {product.title}
                    <span className="plist-arrow">
                      <Icon name="arrow-up-right" size={17} />
                    </span>
                  </span>
                  <span className="plist-cat">{product.section}</span>
                </span>
                <span className="plist-sum">{product.summary}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-team" id="team">
        <div className="wrap">
          <p className="band-statement reveal">
            {d.team.statementA} <span className="script" style={{ color: 'var(--brand-300)' }}>{d.team.engineered}</span>{' '}
            {d.team.statementB} <span className="script" style={{ color: 'var(--brand-300)' }}>{d.team.led}</span>{' '}
            {d.team.statementC}
          </p>

          <div className="founders reveal">
            {leadership.map(([name, role, socials]) => (
              <div className="founder" key={name}>
                <span className="founder-blob">
                  <Avatar size="lg" style={{ width: 84, height: 84 }}>
                    <AvatarFallback>{name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</AvatarFallback>
                  </Avatar>
                </span>
                <span className="nm">{name}</span>
                <span className="ro">{role}</span>
                {socials ? (
                  <span className="founder-socials">
                    {socials.map(([label, href]) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                        <SocialIcon name={label} />
                      </a>
                    ))}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="csec" id="ecosystem">
        <div className="wrap">
          <div className="eco-grid">
            <div className="reveal">
              <h2 className="section-title">
                {d.ecosystem.titleA} <span className="accent">{d.ecosystem.titleEm}</span>
                {d.ecosystem.titleB}
              </h2>
              <p className="section-lede">{d.ecosystem.lede}</p>
              <div className="eco-actions">
                <a className="pill pill--primary" href={`${base}/token`}>
                  {d.ecosystem.about}
                  <span className="pill-arrow">
                    <Icon name="arrow-up-right" size={16} />
                  </span>
                </a>
                <a
                  className="pill pill--outline"
                  href={`https://bscscan.com/token/${EFO_CONTRACT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {d.ecosystem.bscscan}
                </a>
              </div>
            </div>
            <div className="eco-card reveal">
              <div className="eco-badges">
                <Badge className="badge-success">{d.ecosystem.tradable}</Badge>
                <Badge variant="secondary">{d.ecosystem.bep20}</Badge>
              </div>
              <CopyField label={d.ecosystem.contractLabel} value={EFO_CONTRACT} />
              <div className="token-facts eco-facts">
                {d.ecosystem.facts.map(([k, v]) => (
                  <div className="token-fact" key={k}>
                    <div className="k">{k}</div>
                    <div className="v">{v}</div>
                  </div>
                ))}
              </div>
              <p className="eco-note">{d.ecosystem.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="csec csec--rule" id="careers">
        <div className="wrap">
          <div className="careers-grid">
            <div className="reveal">
              <h2 className="section-title">
                {d.careers.titleA} <span className="script accent">{d.careers.titleEm}</span>
              </h2>
              <p className="body">{d.careers.body}</p>
              <a className="pill pill--primary" href="#contact">
                {d.careers.reachOut}
                <span className="pill-arrow">
                  <Icon name="arrow-up-right" size={16} />
                </span>
              </a>
            </div>

            <div className="roles reveal">
              {d.careers.roles.map(([title, meta]) => (
                <a className="role" href="#contact" key={title}>
                  <div>
                    <div className="rt">{title}</div>
                    <div className="rm">{meta}</div>
                  </div>
                  <span className="role-arrow">
                    <Icon name="arrow-right" size={18} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="csec csec--rule" id="faq">
        <div className="wrap">
          <div className="csec-head reveal">
            <h2>
              {d.faq.headA} <span className="script accent">{d.faq.headEm}</span>
              {d.faq.headB}
            </h2>
            <p className="section-lede">{d.faq.lede}</p>
          </div>
          <div className="reveal" style={{ maxWidth: 760, margin: '36px auto 0' }}>
            <Accordion type="single" collapsible>
              {d.faq.items.map(([question, answer], index) => (
                <AccordionItem key={question} value={`faq-${index}`}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="csec csec--rule" id="contact">
        <div className="wrap">
          <div className="contact-grid">
            <div className="reveal">
              <h2 className="section-title">
                {d.contact.titleA} <span className="script accent">{d.contact.titleEm}</span>
                {d.contact.titleB}
              </h2>
              <p className="section-lede">{d.contact.lede}</p>
              <div className="contact-aside">
                <div className="ci">
                  <div className="k">{d.contact.legalEntity}</div>
                  <div className="v">PT. Efolusi Dunia Teknologi</div>
                </div>
                <div className="ci">
                  <div className="k">{d.contact.headquarters}</div>
                  <div className="v">{d.contact.headquartersValue}</div>
                </div>
                <div className="ci">
                  <div className="k">{d.contact.email}</div>
                  <div className="v">
                    <a href="mailto:hi@efolusi.com">hi@efolusi.com</a>
                  </div>
                </div>
              </div>
            </div>

            <form className="contact-form reveal" noValidate onSubmit={handleContactSubmit}>
              <Input label={d.contact.nameLabel} name="name" type="text" placeholder={d.contact.namePlaceholder} required autoComplete="name" />
              <Input label={d.contact.emailLabel} name="email" type="email" placeholder={d.contact.emailPlaceholder} required autoComplete="email" />
              <Textarea label={d.contact.messageLabel} name="message" placeholder={d.contact.messagePlaceholder} rows={5} required />
              <div className="hp" aria-hidden="true">
                <label htmlFor="cf-company">Company</label>
                <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <Button type="submit" fullWidth iconRight="send" loading={contactStatus.type === 'sending'}>
                {d.contact.send}
              </Button>
              <div
                className={`form-status${contactStatus.type === 'success' ? ' is-success' : ''}${contactStatus.type === 'error' ? ' is-error' : ''}`}
                role="status"
              >
                {contactStatus.type === 'success' ? <Icon name="circle-check" size={15} /> : null}
                {contactStatus.type === 'error' ? <Icon name="circle-alert" size={15} /> : null}
                {contactStatus.text}
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="csec csec--rule" aria-label="Newsletter">
        <div className="wrap">
          <div className="news reveal">
            <div>
              <h3>
                {d.newsletter.titleA} <span className="script accent">{d.newsletter.titleEm}</span>
                {d.newsletter.titleB}
              </h3>
              <p className="sub">{d.newsletter.sub}</p>
              <div
                className={`form-status${newsletterStatus.type === 'success' ? ' is-success' : ''}${newsletterStatus.type === 'error' ? ' is-error' : ''}`}
                role="status"
              >
                {newsletterStatus.type === 'success' ? <Icon name="circle-check" size={15} /> : null}
                {newsletterStatus.type === 'error' ? <Icon name="circle-alert" size={15} /> : null}
                {newsletterStatus.text}
              </div>
            </div>
            <form onSubmit={handleNewsletterSubmit}>
              <Input type="email" placeholder={d.newsletter.placeholder} aria-label={d.contact.emailLabel} name="email" required />
              <Button type="submit" loading={newsletterStatus.type === 'sending'}>
                {d.newsletter.subscribe}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="band closer">
        <div className="wrap">
          <h2 className="reveal">
            {d.closer.titleA} <span className="script" style={{ color: 'var(--brand-300)' }}>{d.closer.titleEm}</span>
            {d.closer.titleB}
          </h2>
          <p className="reveal">{d.closer.body}</p>
          <div className="closer-actions reveal">
            <a className="pill pill--cream" href="#products">
              {d.closer.cta}
              <span className="pill-arrow">
                <Icon name="arrow-up-right" size={16} />
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>

      <SiteFooter lang={lang} t={common} />
    </>
  );
}
