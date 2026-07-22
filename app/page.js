'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  Avatar,
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
    summary: 'General autonomous intelligence that reasons, learns your context and acts on its own.'
  },
  {
    id: 'komando',
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
  ['06', '', 'Independent products, each with its own roadmap'],
  ['06', '', 'Categories, from AI to automated trading'],
  ['100', '+', 'Exchanges, utilities and integrations connected'],
  ['01', '', 'Standard of craft across everything we ship']
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
    "Efolusi (PT. Efolusi Dunia Teknologi) is a general software studio based in Indonesia. We build and run independent software products across AI, cloud infrastructure, productivity, content creation, social media and automated trading. The portfolio is broad on purpose and keeps growing, and we hold every product to one standard for clarity, usefulness and craft."
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

const navLinks = [
  ['Portfolio', '#products'],
  ['Company', '#approach'],
  ['Leadership', '#team'],
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

/* Scrollspy for the header nav. Observing the hero clears the highlight at the top. */
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
            setActive(entry.target.id === 'hero' ? '' : entry.target.id);
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
          ['Products', '06'],
          ['Categories', '06'],
          ['Standard', '01']
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

  const activeSection = useActiveSection(['hero', 'products', 'approach', 'team', 'careers', 'faq']);
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
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap site-header-inner">
          <a href="#top" className="brand" aria-label="Efolusi home" onClick={() => setMenuOpen(false)}>
            <img src="/efolusi/logo-owl.png" alt="" width="30" height="30" />
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
            <a className="ef-btn ef-btn--primary ef-btn--sm" href="#contact" onClick={() => setMenuOpen(false)}>
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
        <section className="hero" id="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow reveal">General software studio · Indonesia</span>
              <h1 className="reveal">
                We build and run <span className="accent">independent software products</span>.
              </h1>
              <p className="hero-sub reveal">
                We're Efolusi, a software studio from Indonesia. We build and run products across AI, cloud infrastructure, productivity, content, social media and automated trading. Six platforms so far, more on the way, and every one of them is built with the same care.
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

        <section className="section" aria-label="The company in numbers">
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
              kicker="01 / Portfolio"
              title={
                <>
                  Independent platforms, <span className="accent">one portfolio</span>.
                </>
              }
              lede="Each product has its own team, roadmap and infrastructure. What they share is the standard. The portfolio keeps growing; pick one to take a closer look."
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
                <span className="eyebrow eyebrow--mono">02 / How we operate</span>
                <h2 className="section-title">
                  Independent products. <span className="accent">Shared discipline.</span>
                </h2>
              </div>
              <div className="reveal">
                <p className="big">Every product runs on its own: its own roadmap, its own releases, its own users to answer to.</p>
                <p className="body">The studio's job is keeping the bar high. If a product doesn't make its category clearer, faster or more useful, it doesn't ship. That discipline keeps the portfolio broad without getting scattered.</p>
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
              We work from one of the world's fastest-growing markets, and that shapes every product decision we make. Wherever you use our products, the standard is the same: emerging-market insight, careful engineering, and software that's built for everywhere from day one.
            </p>
          </div>
        </section>

        <section className="section" id="team">
          <div className="wrap">
            <SectionHeading
              kicker="03 / Leadership"
              title={
                <>
                  Founder-led and <span className="accent">hands-on</span>.
                </>
              }
              lede="Decisions sit close to the products. These are the people who look after the standard."
            />

            <div className="team-grid">
              {leadership.map(([idx, name, role]) => (
                <div className="member reveal" key={name}>
                  <span className="idx">{idx}</span>
                  <div style={{ marginTop: 16 }}>
                    <Avatar name={name} size={64} />
                  </div>
                  <div className="nm">{name}</div>
                  <div className="ro">{role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--rule" id="careers">
          <div className="wrap">
            <div className="careers-grid">
              <div className="reveal">
                <span className="eyebrow eyebrow--mono">04 / Careers</span>
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
          </div>
        </section>

        <section className="section section--rule" id="faq">
          <div className="wrap">
            <div className="faq-grid">
              <SectionHeading kicker="05 / FAQ" title="Clear answers to what we hear most." lede="Anything else, ask us directly through the contact form." />

              <div className="reveal">
                <Accordion
                  items={faqItems.map(([question, answer], index) => ({
                    id: `faq-${index}`,
                    title: question,
                    content: answer
                  }))}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section section--rule" id="contact">
          <div className="wrap">
            <div className="contact-grid">
              <div className="reveal">
                <span className="eyebrow eyebrow--mono">06 / Contact</span>
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
          </div>
        </section>

        <section className="section section--rule" aria-label="Newsletter">
          <div className="wrap">
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
          </div>
        </section>

        <section className="band closer">
          <div className="wrap">
            <h2 className="reveal">Find the product built for your work.</h2>
            <p className="reveal">Every product we build starts from the belief that the existing solution isn't good enough. We think you'll agree.</p>
            <div className="closer-actions reveal">
              <a className="band-btn" href="#products">
                See the portfolio <Icon name="arrow-right" size={16} />
              </a>
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
              {stageProducts.map((product) => (
                <a key={product.id} href={product.href} target="_blank" rel="noopener noreferrer">
                  {product.title}
                </a>
              ))}
            </div>
            <div className="fcol">
              <h4>Company</h4>
              <a href="#approach">How we operate</a>
              <a href="#team">Leadership</a>
              <a href="#careers">Careers</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
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
    </>
  );
}
