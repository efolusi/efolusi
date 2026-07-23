'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  Avatar,
  Badge,
  Button,
  CopyField,
  Icon,
  Input,
  StatusDot,
  Tag,
  Textarea
} from '@efolusi/meridian';
import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';

const EFO_CONTRACT = '0xb61a09e93b4f14585e9afbac3adaea626f25fb07';

const stageProducts = [
  {
    id: 'zoyya',
    tint: 'caramel',
    mark: 'Zo',
    icon: 'brain',
    section: 'Artificial Intelligence',
    title: 'ZOYYA',
    desc: 'General autonomous intelligence. It reasons through complex problems, learns your context and acts without requiring direction at every step.',
    specs: ['Autonomous', 'Context-aware', 'Self-directed'],
    href: 'https://zoyya.xyz',
    buttonLabel: 'Visit ZOYYA',
    tag: 'AI',
    summary: 'General autonomous intelligence that reasons, learns your context and acts on its own.'
  },
  {
    id: 'komando',
    tint: 'green',
    mark: 'Ko',
    icon: 'server',
    section: 'Cloud Infrastructure',
    title: 'Komando',
    desc: 'Centralized cloud infrastructure. Every server, deployment, pipeline and alert in one interface, with full visibility.',
    specs: ['Unified', 'Full visibility', 'Single pane'],
    href: 'https://komando.efolusi.com',
    buttonLabel: 'Visit Komando',
    tag: 'Infrastructure',
    summary: 'Centralized cloud infrastructure. Every server, deployment and alert in one interface.'
  },
  {
    id: 'toolips',
    tint: 'amber',
    mark: 'To',
    icon: 'package',
    section: 'Productivity',
    title: 'Toolips',
    desc: 'All-in-one productivity tools. 100+ utilities to convert, compress, edit and export. No accounts, no subscriptions, always available.',
    specs: ['100+ utilities', 'No account', 'Always free'],
    href: 'https://toolips.xyz',
    buttonLabel: 'Visit Toolips',
    tag: 'Productivity',
    summary: '100+ productivity utilities to convert, compress, edit and export. No accounts, free.'
  },
  {
    id: 'trady',
    tint: 'coral',
    mark: 'Tr',
    icon: 'sparkles',
    section: 'Content Generation',
    title: 'Trady',
    desc: 'General content generator. Input a brief, receive a finished campaign: text, audio, video and images in one workflow. Weeks into hours.',
    specs: ['Text + Audio', 'Video + Image', 'One workflow'],
    href: 'https://trady.efolusi.com',
    buttonLabel: 'Visit Trady',
    tag: 'Content',
    summary: 'General content generator. Brief in, finished campaign out across text, audio, video and image.'
  },
  {
    id: 'kongkow',
    tint: 'peach',
    mark: 'Kg',
    icon: 'message-square',
    section: 'Social Media',
    title: 'Kongkow',
    desc: 'Social media command center. Publish once to Facebook, Instagram, TikTok, YouTube, LinkedIn, X and 20+ more platforms at the same time.',
    specs: ['20+ platforms', 'Publish once', 'One center'],
    href: 'https://kongkow.xyz',
    buttonLabel: 'Visit Kongkow',
    tag: 'Social',
    summary: 'Social media command center. Publish once to 20+ platforms at the same time.'
  },
  {
    id: 'cuwan',
    tint: 'green',
    mark: 'Cu',
    icon: 'chart-candlestick',
    section: 'Automated Trading',
    title: 'Cuwan',
    desc: 'Automated trading platform. One dashboard for 100+ CEX and DEX markets. Set a strategy and let it execute autonomously, around the clock.',
    specs: ['100+ markets', 'CEX + DEX', '24/7'],
    href: 'https://cuwan.xyz',
    buttonLabel: 'Visit Cuwan',
    tag: 'Trading',
    summary: 'Automated trading. One dashboard for 100+ CEX and DEX markets, executing 24/7.'
  }
];

const stats = [
  ['06', '', 'Products in operation'],
  ['06', '', 'Categories, from AI to trading'],
  ['100', '+', 'Exchanges and integrations connected']
];

const leadership = [
  ['Sugeng Agung Suganda', 'Founder & Chief Executive Officer'],
  ['Rakha Febryza Rasendriya', 'Co-founder']
];

const roles = [
  ['Senior Go Engineer', 'Remote · Full-time'],
  ['Product Designer', 'Remote · Full-time'],
  ['AI Research Engineer', 'Remote · Full-time'],
  ['Growth Lead', 'Indonesia · Full-time']
];

const faqItems = [
  [
    'What is Efolusi?',
    "Efolusi (PT. Efolusi Dunia Teknologi) is a software studio based in Indonesia. We build and run independent software products across six categories, and we hold every one of them to one standard for clarity, usefulness and craft."
  ],
  [
    'Where are you based?',
    "We're headquartered in Indonesia and work as a distributed team. Our products are built to global standards for users everywhere."
  ],
  [
    'Are you hiring?',
    "Yes. We're always looking for people who care deeply about craft and want to build across categories. Sounds like you? Drop us a line through the contact form."
  ],
  [
    'How do I get support for a product?',
    "Every product has its own support team. Head to the product's website for docs, help, or to reach the team directly; they'll take care of you."
  ],
  [
    'Can I partner with Efolusi?',
    "We're open to partnerships that fit what we're building. If you have a proposal or just want to explore an idea together, we'd love to hear it. The contact form goes straight to us."
  ]
];

const marqueeItems = [
  'Built for the world',
  'Quality before growth',
  'Opinionated by design',
  'Built with one standard',
  'No feature bloat'
];

/* Decorations live in the two gutters beside the centered text column, in
   staggered vertical slots so neighbours never touch. They are hidden below
   1200px, where the gutters get too narrow to hold them. */
const edgeTiles = [
  { id: 'zoyya', text: 'Zo', tint: 'caramel', href: 'https://zoyya.xyz', style: { left: '3%', top: 30, '--rot': '-8deg', '--fd': '0.4s' }, size: 72 },
  { id: 'kongkow', text: 'Kg', tint: 'peach', href: 'https://kongkow.xyz', style: { left: '2%', top: 210, '--rot': '5deg', '--fd': '1.4s' }, size: 62 },
  { id: 'trady', text: 'Tr', tint: 'coral', href: 'https://trady.efolusi.com', style: { left: '10%', top: 450, '--rot': '7deg', '--fd': '0.8s' }, size: 64 },
  { id: 'efo', text: '$EFO', tint: 'cocoa', href: '/token', style: { right: '4%', top: 30, '--rot': '6deg', '--fd': '0.6s' }, w: 96, h: 48 },
  { id: 'komando', text: 'Ko', tint: 'green', href: 'https://komando.efolusi.com', style: { right: '2%', top: 205, '--rot': '6deg', '--fd': '1.2s' }, size: 68 },
  { id: 'toolips', text: 'To', tint: 'amber', href: 'https://toolips.xyz', style: { right: '14%', top: 385, '--rot': '-6deg', '--fd': '1.7s' }, size: 66 },
  { id: 'cuwan', text: 'Cu', tint: 'green', href: 'https://cuwan.xyz', style: { right: '9%', top: 530, '--rot': '-5deg', '--fd': '0.2s' }, size: 70 }
];

const stickers = [
  { text: '#AI', tint: 'caramel', style: { left: '12%', top: 120, '--rot': '-7deg', '--fd': '0.5s' } },
  { text: '#infrastructure', tint: 'green', style: { left: '8%', top: 300, '--rot': '-5deg', '--fd': '1.8s' } },
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

/* Count-up number that starts when it scrolls into view. Announced to screen
   readers as the final value; the animation is visual only. */
function CountUp({ value, suffix }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value.replace(/[1-9]/g, '0'));

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const target = parseInt(value, 10);
    const digits = value.length;
    let raf = 0;
    let doneTimer = 0;

    const run = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setDisplay(value);
        return;
      }
      const start = performance.now();
      const dur = 900;
      const tick = (now) => {
        const t = Math.min(1, Math.max(0, (now - start) / dur));
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(String(Math.round(target * eased)).padStart(digits, '0'));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      // rAF can be throttled to a stop in background tabs; guarantee the final value.
      doneTimer = window.setTimeout(() => setDisplay(value), dur + 200);
    };

    if (!('IntersectionObserver' in window)) {
      setDisplay(value);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(doneTimer);
    };
  }, [value]);

  return (
    <div className="stat-num" ref={ref} role="img" aria-label={`${value}${suffix || ''}`}>
      <span aria-hidden="true">
        {display}
        {suffix ? <span className="suffix">{suffix}</span> : null}
      </span>
    </div>
  );
}

export default function HomePage() {
  useRevealOnScroll();

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
      setContactStatus({ type: 'error', text: 'Please fill in every field.' });
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setContactStatus({ type: 'error', text: "That email doesn't look right." });
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
        setContactStatus({ type: 'success', text: "Thanks. We'll be in touch soon." });
        formEl.reset();
      })
      .catch((err) => {
        console.error('Send error', err);
        setContactStatus({ type: 'error', text: "We couldn't send your message just now. Please try again in a moment." });
      });
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const formEl = event.currentTarget;

    const formData = new FormData(formEl);
    const email = String(formData.get('email') || '').trim();

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setNewsletterStatus({ type: 'error', text: 'Please enter a valid email address.' });
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
        setNewsletterStatus({ type: 'success', text: "Thanks, you're on the list." });
        formEl.reset();
      })
      .catch((err) => {
        console.error('Newsletter error', err);
        setNewsletterStatus({ type: 'error', text: "We couldn't subscribe you just now. Please try again in a moment." });
      });
  };

  return (
    <>
      <SiteHeader />

      <main id="top">
        <section className="hero hero-center" id="hero">
          <div className="wrap">
            {stickers.map((s) => (
              <span key={s.text} className={`sticker tint-${s.tint} hero-deco`} style={s.style} aria-hidden="true">
                {s.text}
              </span>
            ))}
            {edgeTiles.map((tile) => (
              <a
                key={tile.id}
                className="edge-tile hero-deco"
                href={tile.href}
                target={tile.href.startsWith('http') ? '_blank' : undefined}
                rel={tile.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={tile.id}
                style={tile.style}
              >
                <span
                  className={`tile-card tint-${tile.tint}`}
                  style={{ width: tile.w || tile.size, height: tile.h || tile.size, fontSize: tile.w ? 17 : 26 }}
                >
                  {tile.text}
                </span>
              </a>
            ))}
            <div className="hero-doodle hero-deco" style={{ left: '1%', top: 385, width: 64, height: 64 }} aria-hidden="true">
              <svg viewBox="0 0 64 64">
                <path d="M50 6 C 20 10, 10 28, 22 44 M22 44 l-8 -4 M22 44 l2 -10" />
              </svg>
            </div>

            <h1 className="reveal">
              We <span className="script accent">build</span> and run independent software{' '}
              <span className="scribble">
                products
                <svg viewBox="0 0 220 26" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M6 16 C 48 22, 88 6, 126 13 S 196 21, 214 9" pathLength="100" />
                </svg>
              </span>
              .
            </h1>
            <p className="hero-sub reveal">
              We're Efolusi, a software studio from Indonesia. Our products span AI, cloud infrastructure, productivity, content, social media and automated trading. Six platforms so far, more on the way, each built with the same care.
            </p>

            <div className="hero-actions reveal">
              <a className="pill pill--primary" href="#products">
                View the portfolio
                <span className="pill-arrow">
                  <Icon name="arrow-up-right" size={16} />
                </span>
              </a>
              <a className="pill pill--outline" href="#contact">
                Get in touch
              </a>
            </div>

            <div className="hero-proof reveal">
              <StatusDot state="ok" pulse />
              <span>Every platform is live and used every day.</span>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
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
                One studio, <span className="script accent">three</span> things to know.
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
                  Six independent <span className="script">products</span>
                </h3>
                <p>From AI to automated trading, each with its own team and roadmap.</p>
                <span className="feat-cta">
                  See the portfolio <Icon name="arrow-right" size={15} />
                </span>
              </a>

              <a className="feat-card feat-card--cocoa reveal" href="/token">
                <span className="feat-icon">
                  <Icon name="coins" size={22} />
                </span>
                <span className="feat-deco" aria-hidden="true">
                  <svg width="84" height="40" viewBox="0 0 84 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M4 20 q 10 -16 20 0 t 20 0 t 20 0 t 16 0" />
                  </svg>
                </span>
                <h3>
                  $EFO, the ecosystem <span className="script">token</span>
                </h3>
                <p>Live on BNB Smart Chain, tradable on Uniswap v4.</p>
                <span className="feat-cta">
                  About the token <Icon name="arrow-right" size={15} />
                </span>
              </a>

              <a className="feat-card feat-card--amber reveal" href="/about">
                <span className="feat-icon">
                  <Icon name="sparkles" size={22} />
                </span>
                <span className="feat-deco" aria-hidden="true">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor">
                    {[8, 24, 40, 56].map((x) => [8, 24, 40, 56].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" />))}
                  </svg>
                </span>
                <h3>
                  One standard of <span className="script">craft</span>
                </h3>
                <p>If it doesn't make its category clearer, faster or more useful, it doesn't ship.</p>
                <span className="feat-cta">
                  How we operate <Icon name="arrow-right" size={15} />
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="csec csec--rule" aria-label="The studio in numbers">
          <div className="wrap">
            <div className="ruled-cells stats-cells" data-cols="3">
              {stats.map(([num, suffix, label]) => (
                <div className="reveal" key={label}>
                  <CountUp value={num} suffix={suffix} />
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="csec csec--rule" id="products">
          <div className="wrap">
            <div className="csec-head reveal">
              <h2>
                Independent platforms, <span className="script accent">one portfolio</span>.
              </h2>
              <p className="section-lede">Each product has its own team, roadmap and infrastructure. What they share is the standard. Pick one to take a closer look.</p>
            </div>

            <div className="stage-wrap reveal">
              <div className="stage">
                <div
                  className={`stage-watermark wm-${activeProduct.tint}`}
                  key={activeProduct.id}
                  aria-hidden="true"
                >
                  {activeProduct.mark}
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
                    {product.mark}
                  </span>
                  <span>
                    <span className="plist-name">{product.title}</span>
                    <span className="plist-cat">{product.section}</span>
                  </span>
                  <span className="plist-sum">{product.summary}</span>
                  <span className="plist-arrow">
                    <Icon name="arrow-up-right" size={18} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-team" id="team">
          <div className="wrap">
            <p className="band-statement reveal">
              Built in Indonesia, <span className="script" style={{ color: 'var(--brand-300)' }}>engineered</span> for every market, and{' '}
              <span className="script" style={{ color: 'var(--brand-300)' }}>led</span> by the people who ship it.
            </p>

            <div className="founders reveal">
              {leadership.map(([name, role], index) => (
                <div className="founder" key={name}>
                  <span className="founder-blob">
                    <Avatar name={name} size={84} />
                  </span>
                  <span className="nm">{name}</span>
                  <span className="ro">{role}</span>
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
                  One token across the portfolio: <span className="accent">$EFO</span>.
                </h2>
                <p className="section-lede">
                  EFO is the ecosystem token of Efolusi, live on BNB Smart Chain. The official contract address, on-chain facts and every announcement live on the token page.
                </p>
                <div className="eco-actions">
                  <a className="pill pill--primary" href="/token">
                    About $EFO
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
                    BscScan
                  </a>
                </div>
              </div>
              <div className="eco-card reveal">
                <div className="eco-badges">
                  <Badge tone="success">Tradable on Uniswap v4</Badge>
                  <Badge>BEP-20</Badge>
                </div>
                <CopyField label="Official contract address" value={EFO_CONTRACT} />
                <p className="eco-note">Verify this address before interacting with anything that calls itself EFO.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="csec csec--rule" id="careers">
          <div className="wrap">
            <div className="careers-grid">
              <div className="reveal">
                <h2 className="section-title">
                  Care deeply about craft? <span className="script accent">Let's build.</span>
                </h2>
                <p className="body">We're always happy to meet people who love building useful things. Say hi, even if your role isn't listed yet.</p>
                <a className="pill pill--primary" href="#contact">
                  Reach out about a role
                  <span className="pill-arrow">
                    <Icon name="arrow-up-right" size={16} />
                  </span>
                </a>
              </div>

              <div className="roles reveal">
                {roles.map(([title, meta]) => (
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
                Clear answers to what we <span className="script accent">hear most</span>.
              </h2>
              <p className="section-lede">Anything else, ask us directly through the contact form.</p>
            </div>
            <div className="reveal" style={{ maxWidth: 760, margin: '36px auto 0' }}>
              <Accordion
                items={faqItems.map(([question, answer], index) => ({
                  id: `faq-${index}`,
                  title: question,
                  content: answer
                }))}
              />
            </div>
          </div>
        </section>

        <section className="csec csec--rule" id="contact">
          <div className="wrap">
            <div className="contact-grid">
              <div className="reveal">
                <h2 className="section-title">
                  Tell us what <span className="script accent">you're building</span>.
                </h2>
                <p className="section-lede">Questions, partnerships, press, or just hello. We read everything.</p>
                <div className="contact-aside">
                  <div className="ci">
                    <div className="k">Legal entity</div>
                    <div className="v">PT. Efolusi Dunia Teknologi</div>
                  </div>
                  <div className="ci">
                    <div className="k">Headquarters</div>
                    <div className="v">Indonesia · Distributed team</div>
                  </div>
                  <div className="ci">
                    <div className="k">Email</div>
                    <div className="v">
                      <a href="mailto:hi@efolusi.com">hi@efolusi.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <form className="contact-form reveal" noValidate onSubmit={handleContactSubmit}>
                <Input label="Name" name="name" type="text" placeholder="Your name" required autoComplete="name" />
                <Input label="Email" name="email" type="email" placeholder="you@company.com" required autoComplete="email" />
                <Textarea label="Message" name="message" placeholder="What is on your mind?" rows={5} required />
                <div className="hp" aria-hidden="true">
                  <label htmlFor="cf-company">Company</label>
                  <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <Button type="submit" fullWidth iconRight="send" loading={contactStatus.type === 'sending'}>
                  Send message
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
                  Stay in the <span className="script accent">loop</span>.
                </h3>
                <p className="sub">Product launches and studio updates. No noise, unsubscribe anytime.</p>
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
                <Input type="email" placeholder="you@email.com" aria-label="Email address" name="email" required />
                <Button type="submit" loading={newsletterStatus.type === 'sending'}>
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section className="band closer">
          <div className="wrap">
            <h2 className="reveal">
              Find the product built for <span className="script" style={{ color: 'var(--brand-300)' }}>your work</span>.
            </h2>
            <p className="reveal">Every product we build starts from the belief that the existing solution isn't good enough. We think you'll agree.</p>
            <div className="closer-actions reveal">
              <a className="pill pill--cream" href="#products">
                See the portfolio
                <span className="pill-arrow">
                  <Icon name="arrow-up-right" size={16} />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
