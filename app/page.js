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
import Section from './components/Section.jsx';

const EFO_CONTRACT = '0xb61a09e93b4f14585e9afbac3adaea626f25fb07';

/* Category tint backgrounds, used for the stage watermark wash. */
const TINT_BG = {
  caramel: 'var(--brand-100)',
  green: 'var(--success-100)',
  amber: 'var(--warning-100)',
  coral: 'var(--danger-100)',
  peach: 'var(--brand-200)'
};

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
  ['01', 'Sugeng Agung Suganda', 'Founder & Chief Executive Officer'],
  ['02', 'Rakha Febryza Rasendriya', 'Co-founder']
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

/* The ecosystem orbit: product tiles circling the owl very slowly, staying
   upright, each clickable. Pointer tilt is skipped on touch and reduced motion. */
const orbitTiles = [
  { id: 'efo', label: '$EFO token', href: '/token', angle: -90, w: 104, h: 52, d: 0.5, text: '$EFO', tint: 'cocoa' },
  { id: 'zoyya', label: 'ZOYYA', href: 'https://zoyya.xyz', angle: -38.6, size: 92, d: 0.15, text: 'Zo', tint: 'caramel' },
  { id: 'komando', label: 'Komando', href: 'https://komando.efolusi.com', angle: 12.8, size: 86, d: 0.2, text: 'Ko', tint: 'green' },
  { id: 'toolips', label: 'Toolips', href: 'https://toolips.xyz', angle: 64.3, size: 80, d: 0.25, text: 'To', tint: 'amber' },
  { id: 'trady', label: 'Trady', href: 'https://trady.efolusi.com', angle: 115.7, size: 86, d: 0.3, text: 'Tr', tint: 'coral' },
  { id: 'kongkow', label: 'Kongkow', href: 'https://kongkow.xyz', angle: 167.1, size: 78, d: 0.35, text: 'Kg', tint: 'peach' },
  { id: 'cuwan', label: 'Cuwan', href: 'https://cuwan.xyz', angle: 218.6, size: 88, d: 0.4, text: 'Cu', tint: 'green' }
];

function HeroConstellation() {
  const fieldRef = useRef(null);

  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (window.matchMedia('(hover: none)').matches) return undefined;

    let raf = 0;
    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--tiltX', `${(-y * 8).toFixed(2)}deg`);
        el.style.setProperty('--tiltY', `${(x * 10).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      el.style.setProperty('--tiltX', '0deg');
      el.style.setProperty('--tiltY', '0deg');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="orbit" aria-label="The Efolusi portfolio">
      <div className="orbit-field" ref={fieldRef}>
        <a className="orbit-center" href="#products" aria-label="View the portfolio" style={{ '--d': '0s' }}>
          <span className="tile-card" style={{ width: 128, height: 128 }}>
            <img src="/efolusi/logo-owl.png" alt="" width="72" height="72" />
          </span>
        </a>
        {orbitTiles.map((tile) => (
          <a
            key={tile.id}
            className="orbit-slot"
            href={tile.href}
            target={tile.href.startsWith('http') ? '_blank' : undefined}
            rel={tile.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={tile.label}
            style={{ '--angle': `${tile.angle}deg`, '--d': `${tile.d}s` }}
          >
            <span
              className={`tile-card tint-${tile.tint}`}
              style={{ width: tile.w || tile.size, height: tile.h || tile.size }}
            >
              {tile.text}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ title, lede }) {
  return (
    <div className="reveal">
      <h2 className="section-title">{title}</h2>
      {lede ? <p className="section-lede">{lede}</p> : null}
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
        <section className="hero" id="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <h1 className="reveal">
                  We build and run{' '}
                  <span className="accent">
                    independent software{' '}
                    <span className="scribble">
                      products
                      <svg viewBox="0 0 220 26" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M6 16 C 48 22, 88 6, 126 13 S 196 21, 214 9" pathLength="100" />
                      </svg>
                    </span>
                  </span>
                  .
                </h1>
                <p className="hero-sub reveal">
                  We're Efolusi, a software studio from Indonesia. Our products span AI, cloud infrastructure, productivity, content, social media and automated trading. Six platforms so far, more on the way, each built with the same care.
                </p>

                <div className="hero-actions reveal">
                  <a className="ef-btn ef-btn--primary ef-btn--lg" href="#products">
                    View the portfolio <Icon name="arrow-right" size={16} />
                  </a>
                  <a className="ef-btn ef-btn--secondary ef-btn--lg" href="#contact">
                    Get in touch
                  </a>
                </div>

                <div className="hero-proof reveal">
                  <StatusDot state="ok" pulse />
                  <span>Every platform is live and used every day.</span>
                </div>
              </div>

              <HeroConstellation />
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

        <Section label="In numbers" fact="July 2026">
          <div className="ruled-cells stats-cells" data-cols="3">
            {stats.map(([num, suffix, label]) => (
              <div className="reveal" key={label}>
                <CountUp value={num} suffix={suffix} />
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="products" label="Portfolio" fact="6 platforms">
          <SectionHeading
            title={
              <>
                Independent platforms, <span className="accent">one portfolio</span>.
              </>
            }
            lede="Each product has its own team, roadmap and infrastructure. What they share is the standard. Pick one to take a closer look."
          />

            <div className="stage-wrap reveal">
              <div className="stage">
                <div
                  className="stage-watermark"
                  key={activeProduct.id}
                  aria-hidden="true"
                  style={{ color: TINT_BG[activeProduct.tint] }}
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
        </Section>

        <Section id="approach" label="How we operate" fact="One standard">
          <SectionHeading
            title={
              <>
                Independent products. <span className="accent">Shared discipline.</span>
              </>
            }
          />
          <div className="approach-body reveal">
            <p className="big">Every product runs on its own: its own roadmap, its own releases, its own users to answer to.</p>
            <p className="body">The studio's job is keeping the bar high. If a product doesn't make its category clearer, faster or more useful, it doesn't ship. That discipline keeps the portfolio broad without getting scattered.</p>
          </div>
          <div className="ruled-cells reveal" data-cols="2" style={{ marginTop: 32 }}>
            {['No feature bloat', 'Opinionated by design', 'Built to scale globally', 'Quality before growth'].map((item, index) => (
              <div className="check" key={item}>
                <span className={`tick tick--${['caramel', 'green', 'amber', 'coral'][index % 4]}`}>
                  <Icon name="check" size={15} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </Section>

        <section className="band">
          <div className="wrap band-grid">
            <h3 className="band-title reveal">Built in Indonesia. Engineered for every market.</h3>
            <p className="reveal">
              We work from one of the world's fastest-growing markets, and that shapes every product decision we make. Wherever you use our products, the standard is the same: emerging-market insight, careful engineering, and software that's built for everywhere from day one.
            </p>
          </div>
        </section>

        <Section id="ecosystem" label="Ecosystem" fact="BEP-20 · BSC">
            <div className="eco-grid">
              <div className="reveal">
                <h2 className="section-title">
                  One token across the portfolio: <span className="accent">$EFO</span>.
                </h2>
                <p className="section-lede">
                  EFO is the ecosystem token of Efolusi, live on BNB Smart Chain. The official contract address, on-chain facts and every announcement live on the token page.
                </p>
                <div className="eco-actions">
                  <a className="ef-btn ef-btn--primary ef-btn--md" href="/token">
                    About $EFO <Icon name="arrow-right" size={16} />
                  </a>
                  <a
                    className="ef-btn ef-btn--secondary ef-btn--md"
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
                  <Badge tone="success">Tradable on Uniswap v4 · BSC</Badge>
                  <Badge>BEP-20</Badge>
                </div>
                <CopyField label="Official contract address" value={EFO_CONTRACT} />
                <p className="eco-note">Verify this address before interacting with anything that calls itself EFO.</p>
              </div>
            </div>
        </Section>

        <Section id="team" label="Leadership" fact="Founder-led">
            <SectionHeading
              title={
                <>
                  Founder-led and <span className="accent">hands-on</span>.
                </>
              }
              lede="Decisions sit close to the products. These are the people who look after the standard."
            />

            <div className="ruled-cells team-cells reveal" data-cols="2">
              {leadership.map(([idx, name, role]) => (
                <div key={name}>
                  <Avatar name={name} size={64} />
                  <div className="nm">{name}</div>
                  <div className="ro">{role}</div>
                </div>
              ))}
            </div>
        </Section>

        <Section id="careers" label="Careers" fact="4 open roles">
            <div className="careers-grid">
              <div className="reveal">
                <h2 className="section-title">
                  Care deeply about craft? <span className="accent">Let's build.</span>
                </h2>
                <p className="body">We're always happy to meet people who love building useful things. Say hi, even if your role isn't listed yet.</p>
                <a className="ef-btn ef-btn--primary ef-btn--md" href="#contact">
                  Reach out about a role <Icon name="arrow-right" size={16} />
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
        </Section>

        <Section id="faq" label="FAQ" fact="5 answers">
            <SectionHeading title="Clear answers to what we hear most." lede="Anything else, ask us directly through the contact form." />
            <div className="reveal" style={{ marginTop: 32 }}>
              <Accordion
                items={faqItems.map(([question, answer], index) => ({
                  id: `faq-${index}`,
                  title: question,
                  content: answer
                }))}
              />
            </div>
        </Section>

        <Section id="contact" label="Contact" fact="hi@efolusi.com">
            <div className="contact-grid">
              <div className="reveal">
                <h2 className="section-title">Tell us what you're building.</h2>
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
        </Section>

        <Section label="Newsletter" fact="No noise">
            <div className="news reveal">
              <div>
                <h3>Stay in the loop.</h3>
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
        </Section>

        <section className="band closer">
          <div className="wrap">
            <h2 className="reveal">Find the product built for your work.</h2>
            <p className="reveal">Every product we build starts from the belief that the existing solution isn't good enough. We think you'll agree.</p>
            <div className="closer-actions reveal">
              <a className="band-btn" href="#products">
                See the portfolio <Icon name="arrow-right" size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
