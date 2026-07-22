'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Icon,
  Input,
  StatusDot,
  Tag,
  Textarea
} from '@efolusi/meridian';

const stageProducts = [
  {
    id: 'zoyya',
    mark: 'Zo',
    icon: 'brain',
    section: 'Artificial Intelligence',
    title: 'ZOYYA',
    desc: 'General autonomous intelligence. It reasons through complex problems, learns your context and acts without requiring direction at every step.',
    specs: ['Autonomous', 'Context-aware', 'Self-directed'],
    href: 'https://zoyya.xyz',
    buttonLabel: 'Visit ZOYYA',
    tag: 'AI',
    summary: 'General autonomous intelligence — reasons, learns your context and acts on its own.'
  },
  {
    id: 'komando',
    mark: 'Ko',
    icon: 'server',
    section: 'Cloud Infrastructure',
    title: 'Komando',
    desc: 'Centralized cloud infrastructure. Every server, deployment, pipeline and alert - full visibility, managed from a single interface.',
    specs: ['Unified', 'Full visibility', 'Single pane'],
    href: 'https://komando.efolusi.com',
    buttonLabel: 'Visit Komando',
    tag: 'Infrastructure',
    summary: 'Centralized cloud infrastructure — every server, deployment and alert in one interface.'
  },
  {
    id: 'toolips',
    mark: 'To',
    icon: 'package',
    section: 'Productivity',
    title: 'Toolips',
    desc: 'All-in-one productivity tools. 100+ utilities to convert, compress, edit and export - no accounts, no subscriptions, always available.',
    specs: ['100+ utilities', 'No account', 'Always free'],
    href: 'https://toolips.xyz',
    buttonLabel: 'Visit Toolips',
    tag: 'Productivity',
    summary: '100+ productivity utilities — convert, compress, edit and export. No accounts, free.'
  },
  {
    id: 'trady',
    mark: 'Tr',
    icon: 'sparkles',
    section: 'Content Generation',
    title: 'Trady',
    desc: 'General content generator. Input a brief, receive a finished campaign - text, audio, video and images in one workflow. Weeks into hours.',
    specs: ['Text + Audio', 'Video + Image', 'One workflow'],
    href: 'https://trady.efolusi.com',
    buttonLabel: 'Visit Trady',
    tag: 'Content',
    summary: 'General content generator — brief in, finished campaign out across text, audio, video, image.'
  },
  {
    id: 'kongkow',
    mark: 'Kg',
    icon: 'message-square',
    section: 'Social Media',
    title: 'Kongkow',
    desc: 'Social media command center. Publish once to Facebook, Instagram, TikTok, YouTube, LinkedIn, X and 20+ more platforms at the same time.',
    specs: ['20+ platforms', 'Publish once', 'One center'],
    href: 'https://kongkow.xyz',
    buttonLabel: 'Visit Kongkow',
    tag: 'Social',
    summary: 'Social media command center — publish once to 20+ platforms at the same time.'
  },
  {
    id: 'cuwan',
    mark: 'Cu',
    icon: 'chart-candlestick',
    section: 'Automated Trading',
    title: 'Cuwan',
    desc: 'Automated trading platform. One dashboard for 100+ CEX and DEX markets - set a strategy and let it execute autonomously, around the clock.',
    specs: ['100+ markets', 'CEX + DEX', '24/7'],
    href: 'https://cuwan.xyz',
    buttonLabel: 'Visit Cuwan',
    tag: 'Trading',
    summary: 'Automated trading — one dashboard for 100+ CEX and DEX markets, executing 24/7.'
  }
];

const stats = [
  ['06', '', 'Products across the portfolio - one standard of craft'],
  ['100', '+', 'Exchanges, utilities and integrations connected'],
  ['20', '+', 'Social channels reached from one publish'],
  ['24', '/7', 'Autonomous, always-on - built to keep moving']
];

const team = [
  ['01', 'Sugeng Agung Suganda', 'Founder & CEO'],
  ['02', 'Rakha Febryza Rasendriya', 'Co-founder']
];

const quotes = [
  [
    'Rangga',
    'Komando replaced three dashboards for us. Every deploy, alert and pipeline lives in one place - and I actually trust what it tells me.',
    'Platform Lead'
  ],
  [
    'Maya',
    'I brief Trady once and walk away with a full campaign - copy, video, the lot. It compressed a two-week sprint into an afternoon.',
    'Content Creator'
  ],
  [
    'Farhan',
    'Cuwan runs my strategy across CEX and DEX while I sleep. One dashboard, every market - it is the tool I wished existed for years.',
    'Quant Trader'
  ]
];

const roles = [
  ['Senior Go Engineer', 'Remote - Full-time'],
  ['Product Designer', 'Remote - Full-time'],
  ['AI Research Engineer', 'Remote - Full-time'],
  ['Growth Lead', 'Indonesia - Full-time']
];

const faqItems = [
  [
    'What is Efolusi?',
    'Efolusi is a technology company based in Indonesia. We build independent software products across AI, cloud infrastructure, productivity, content creation, social media and automation. The portfolio is broad by design: different categories, one standard for clarity, usefulness and craft.'
  ],
  [
    'Where are you based?',
    'We are headquartered in Indonesia. Our team is distributed, and our products are built to global standards for users everywhere.'
  ],
  [
    'Are you hiring?',
    'Yes. We are always looking for people who care deeply about craft and want to build products across categories. If that sounds like you, reach out through our contact form.'
  ],
  [
    'How do I get support for a product?',
    'Each product has its own support channel. Visit the product website directly for documentation, help, or to contact the product team.'
  ],
  [
    'Can I partner with Efolusi?',
    'We are open to partnerships that align with what we are building. If you have a proposal or want to explore working together, get in touch through our contact form.'
  ]
];

const marqueeItems = [
  'Built for the world',
  'Quality before growth',
  'Opinionated by design',
  'Built with one standard',
  'No feature bloat'
];

const navLinks = [
  ['Products', '#products'],
  ['Approach', '#approach'],
  ['Team', '#team'],
  ['Careers', '#careers'],
  ['FAQ', '#faq']
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

/* Scrollspy for the header nav. */
function useActiveSection(ids) {
  const [active, setActive] = useState('');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
}

/* Count-up number that starts when it scrolls into view. */
function CountUp({ value, suffix }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value.replace(/[1-9]/g, '0'));

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const target = parseInt(value, 10);
    const digits = value.length;
    let raf = 0;

    const run = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setDisplay(value);
        return;
      }
      const start = performance.now();
      const dur = 900;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(String(Math.round(target * eased)).padStart(digits, '0'));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
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
    };
  }, [value]);

  return (
    <div className="stat-num" ref={ref}>
      {display}
      {suffix ? <span className="suffix">{suffix}</span> : null}
    </div>
  );
}

/* Sun/moon glyphs copied from Lucide (24px grid, stroke 2 source, rendered at 1.5). */
function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      window.localStorage.setItem('efolusi-theme', next);
    } catch {
      /* private mode */
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}

function SectionHeading({ kicker, title, lede }) {
  return (
    <div className="reveal">
      <span className="eyebrow eyebrow--mono">{kicker}</span>
      <h2 className="section-title">{title}</h2>
      {lede ? <p className="section-lede">{lede}</p> : null}
    </div>
  );
}

function PortfolioPanel() {
  return (
    <div className="panel hero-visual reveal">
      <div className="panel-chrome" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>efolusi.com/portfolio</span>
      </div>
      <div className="panel-stats">
        {[
          ['Platforms', '06'],
          ['Integrations', '100+'],
          ['Uptime', '24/7']
        ].map(([k, v]) => (
          <div className="panel-stat" key={k}>
            <div className="k">{k}</div>
            <div className="v">{v}</div>
          </div>
        ))}
      </div>
      <div className="panel-rows">
        {stageProducts.map((product) => (
          <div className="panel-row" key={product.id}>
            <StatusDot state="ok" pulse={product.id === 'zoyya'} />
            <span className="nm">{product.title}</span>
            <span className="cat">{product.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  useRevealOnScroll();

  const activeSection = useActiveSection(['products', 'approach', 'team', 'careers', 'faq']);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStage, setActiveStage] = useState('zoyya');
  const [contactStatus, setContactStatus] = useState({ type: '', text: '' });
  const [newsletterStatus, setNewsletterStatus] = useState({ type: '', text: '' });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeProduct = stageProducts.find((item) => item.id === activeStage) || stageProducts[0];

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !message) {
      setContactStatus({ type: 'error', text: 'Please fill in every field.' });
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setContactStatus({ type: 'error', text: 'That email does not look right.' });
      return;
    }

    setContactStatus({ type: 'sending', text: '' });

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || (data && data.ok === false)) throw new Error(data.error || 'Send failed');
        setContactStatus({ type: 'success', text: 'Thanks — we will be in touch shortly.' });
        formEl.reset();
      })
      .catch((err) => {
        console.error('Send error', err);
        setContactStatus({ type: 'error', text: 'We could not send your message right now. Please try again in a moment.' });
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
        setNewsletterStatus({ type: 'success', text: 'Thanks — you are on the list.' });
        formEl.reset();
      })
      .catch((err) => {
        console.error('Newsletter error', err);
        setNewsletterStatus({ type: 'error', text: 'We could not subscribe you right now. Please try again in a moment.' });
      });
  };

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap site-header-inner">
          <a href="#top" className="brand" aria-label="Efolusi home" onClick={() => setMenuOpen(false)}>
            <img src="/efolusi/logo-owl.png" alt="" />
            Efolusi
          </a>

          <nav className="site-nav" aria-label="Primary">
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} className={activeSection === href.slice(1) ? 'is-active' : ''}>
                {label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <Button size="sm" onClick={() => { setMenuOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Get in touch
            </Button>
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
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow reveal">General software studio · Made in Indonesia</span>
              <h1 className="reveal">
                General-purpose software. Built with <span className="accent">one standard</span>.
              </h1>
              <p className="hero-sub reveal">
                We build independent products across AI, infrastructure, productivity, content, social and automation. Different categories, one standard: software that earns its place in everyday work.
              </p>

              <div className="hero-actions reveal">
                <Button size="lg" iconRight="arrow-right" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                  Browse our products
                </Button>
                <Button size="lg" variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get in touch
                </Button>
              </div>

              <div className="hero-proof reveal">
                <AvatarGroup>
                  {stageProducts.slice(0, 4).map((product) => (
                    <Avatar key={product.id} name={product.title} size={28} />
                  ))}
                </AvatarGroup>
                <span>Six platforms, built for modern digital work.</span>
              </div>
            </div>

            <PortfolioPanel />
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

        <section className="section" aria-label="By the numbers">
          <div className="wrap">
            <div className="stats">
              {stats.map(([num, suffix, label]) => (
                <div className="reveal" key={label}>
                  <CountUp value={num} suffix={suffix} />
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--rule" id="products">
          <div className="wrap">
            <SectionHeading
              kicker="01 / What we make"
              title={
                <>
                  Six platforms. <span className="accent">One standard.</span>
                </>
              }
              lede="Different categories, one product philosophy: make useful software clearer, faster and easier to trust. Select one to look closer."
            />

            <div className="stage-wrap reveal">
              <div className="stage">
                <div className="stage-watermark" key={activeProduct.id} aria-hidden="true">
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

            <div className="products-grid">
              {stageProducts.map((product) => (
                <a key={product.id} className="product-card" href={product.href} target="_blank" rel="noopener noreferrer">
                  <div className="product-card-head">
                    <Icon name={product.icon} size={22} />
                    <Badge>{product.tag}</Badge>
                  </div>
                  <h3>{product.title}</h3>
                  <p>{product.summary}</p>
                  <span className="visit">
                    Visit <Icon name="arrow-up-right" size={15} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--rule" id="approach">
          <div className="wrap">
            <div className="approach-grid">
              <div className="reveal">
                <span className="eyebrow eyebrow--mono">02 / Approach</span>
                <h2 className="section-title">
                  We build across categories, but hold every product to <span className="accent">one standard</span>.
                </h2>
              </div>
              <div className="reveal">
                <p className="big">We are not tied to one field. We look for broad digital problems, build focused products and hold each one to the same standard.</p>
                <p className="body">If a product does not make its category clearer, faster or more useful, we keep working. That discipline keeps the portfolio broad without becoming scattered.</p>
                <div className="checks">
                  {['No feature bloat', 'Opinionated by design', 'Built to scale globally', 'Quality before growth'].map((item) => (
                    <div className="check" key={item}>
                      <span className="tick">
                        <Icon name="check" size={15} />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="band">
          <div className="wrap band-grid">
            <h3 className="band-title reveal">Built in Indonesia. Engineered for every market.</h3>
            <p className="reveal">
              We operate from one of the world's fastest-growing markets. That experience informs every product decision we make - and we hold each one to the same standard regardless of where it is used. Emerging-market insight, careful engineering and products built for use across markets from day one.
            </p>
          </div>
        </section>

        <section className="section" id="team">
          <div className="wrap">
            <SectionHeading
              kicker="03 / The studio"
              title={
                <>
                  A small team, <span className="accent">distributed</span> - building across categories.
                </>
              }
              lede="A focused group of builders who care deeply about useful software."
            />

            <div className="team-grid">
              {team.map(([idx, name, role]) => (
                <div className="member reveal" key={name}>
                  <span className="idx">{idx}</span>
                  <div style={{ marginTop: 16 }}>
                    <Avatar name={name} size={56} />
                  </div>
                  <div className="nm">{name}</div>
                  <div className="ro">{role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--rule" id="testimonials">
          <div className="wrap">
            <SectionHeading kicker="04 / In the wild" title="Used every day." />

            <div className="quotes">
              {quotes.map(([name, body, role]) => (
                <figure className="quote reveal" key={name}>
                  <p>{body}</p>
                  <figcaption className="who">
                    <Avatar name={name} size={36} />
                    <span>
                      <span className="nm">{name}</span>
                      <span className="ro">{role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--rule" id="careers">
          <div className="wrap">
            <div className="careers-grid">
              <div className="reveal">
                <span className="eyebrow eyebrow--mono">05 / Join us</span>
                <h2 className="section-title">
                  Care deeply about craft? <span className="accent">Let's build.</span>
                </h2>
                <p className="body">We are always looking for people who want to build useful products across different fields. If that sounds like you, reach out - even if you do not see your exact role below.</p>
                <Button
                  iconRight="arrow-right"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact us about roles
                </Button>
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

        <section className="section section--rule" id="faq">
          <div className="wrap">
            <SectionHeading kicker="06 / FAQ" title="Clear answers to what we hear most." />

            <div className="faq-wrap reveal">
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

        <section className="section section--rule" id="contact">
          <div className="wrap">
            <div className="contact-grid">
              <div className="reveal">
                <span className="eyebrow eyebrow--mono">07 / Contact</span>
                <h2 className="section-title">Tell us what you are building.</h2>
                <p className="section-lede">Questions, partnerships, or just hello - we read everything.</p>
                <div className="contact-aside">
                  <div className="k">Headquarters</div>
                  <div className="v">Indonesia - Distributed team</div>
                </div>
              </div>

              <form className="contact-form reveal" noValidate onSubmit={handleContactSubmit}>
                <Input label="Name" name="name" type="text" placeholder="Your name" required autoComplete="name" />
                <Input label="Email" name="email" type="email" placeholder="you@company.com" required autoComplete="email" />
                <Textarea label="Message" name="message" placeholder="What is on your mind?" rows={5} required />
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

        <section className="section section--rule" aria-label="Newsletter">
          <div className="wrap">
            <div className="news reveal">
              <div>
                <h3>Get product news from the studio.</h3>
                <p className="sub">New launches and updates. No noise, unsubscribe anytime.</p>
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
            <h2 className="reveal">Find the product built for your work.</h2>
            <p className="reveal">Every product we build starts from the belief that the existing solution is not good enough. We think you will agree.</p>
            <div className="closer-actions reveal">
              <Button
                variant="secondary"
                size="lg"
                iconRight="arrow-right"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See the products
              </Button>
              <a className="band-link" href="#contact">
                Contact us
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div>
              <a href="#top" className="brand">
                <img src="/efolusi/logo-owl.png" alt="" />
                Efolusi
              </a>
              <p className="tag-line">General-purpose software products built with intent. Made in Indonesia, engineered for every market.</p>
              <div className="socials">
                <a href="#" aria-label="Efolusi on X">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4l16 16M20 4L4 20" />
                  </svg>
                </a>
                <a href="#" aria-label="Efolusi on LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                    <path d="M8 10.5v6" />
                    <path d="M8 7.6v.1" />
                    <path d="M12 16.5v-3.6a2.4 2.4 0 0 1 4.8 0v3.6" />
                  </svg>
                </a>
                <a href="#" aria-label="Efolusi on Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="#" aria-label="Efolusi on YouTube">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="6" width="18" height="12" rx="4" />
                    <path d="M10.5 9.5l4 2.5-4 2.5z" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="fcol">
              <h4>Products</h4>
              {stageProducts.map((product) => (
                <a key={product.id} href={product.href} target="_blank" rel="noopener noreferrer">
                  {product.title}
                </a>
              ))}
            </div>
            <div className="fcol">
              <h4>Company</h4>
              <a href="#approach">Approach</a>
              <a href="#team">Team</a>
              <a href="#careers">Careers</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
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
    </>
  );
}
