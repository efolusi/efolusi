'use client';

import { useEffect, useRef, useState } from 'react';

const stageProducts = [
  {
    id: 'zoyya',
    mark: 'Zo',
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
  ['06', 'Products in the portfolio - each built to lead its category'],
  ['100+', 'Exchanges, utilities and integrations connected'],
  ['20+', 'Social channels reached from one publish'],
  ['24/7', 'Autonomous, always-on - built to run without you']
];

const team = [
  ['01', 'S', 'Sugeng Agung Suganda', 'Founder & CEO'],
  ['02', 'R', 'Rakha Febryza Rasendriya', 'Co-founder']
];

const quotes = [
  [
    'R',
    'Komando replaced three dashboards for us. Every deploy, alert and pipeline lives in one place - and I actually trust what it tells me.',
    'Rangga',
    'Platform Lead'
  ],
  [
    'M',
    'I brief Trady once and walk away with a full campaign - copy, video, the lot. It compressed a two-week sprint into an afternoon.',
    'Maya',
    'Content Creator'
  ],
  [
    'F',
    'Cuwan runs my strategy across CEX and DEX while I sleep. One dashboard, every market - it is the tool I wished existed for years.',
    'Farhan',
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
    'Efolusi is a technology company based in Indonesia. We build independent software products across AI, cloud infrastructure, productivity, content creation, social media and automated trading. Each product is its own platform, made to be the best in its category.'
  ],
  [
    'Where are you based?',
    'We are headquartered in Indonesia. Our team is distributed, and our products are built to global standards for users everywhere.'
  ],
  [
    'Are you hiring?',
    'Yes. We are always looking for people who care deeply about craft and want to build products that last. If that sounds like you, reach out through our contact form.'
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

function useRevealOnScroll() {
  useEffect(() => {
    document.body.classList.add('loaded');

    const reveals = Array.from(document.querySelectorAll('.reveal'));

    if (!('IntersectionObserver' in window)) {
      reveals.forEach((element) => element.classList.add('in'));
      return () => {
        document.body.classList.remove('loaded');
      };
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
      document.body.classList.remove('loaded');
    };
  }, []);
}

function AppButton({ href, children, outline = false, external = false, onClick, className = '' }) {
  const classes = ['btn', outline ? 'btn--outline' : 'btn--primary', className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

function SectionHeading({ kicker, title, lede }) {
  return (
    <div className="shead reveal">
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
      <p className="lede">{lede}</p>
    </div>
  );
}

export default function HomePage() {
  useRevealOnScroll();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStage, setActiveStage] = useState('zoyya');
  const [contactStatus, setContactStatus] = useState({ type: '', text: '' });
  const [newsletterButton, setNewsletterButton] = useState('Subscribe');
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const faqRefs = useRef([]);
  const [faqHeights, setFaqHeights] = useState([]);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const update = () => {
      setFaqHeights(faqRefs.current.map((el) => (el ? el.scrollHeight : 0)));
    };

    // initial measurement and on window resize
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const onChange = () => setIsNarrow(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    // fallback for older browsers
    if (!mq.addEventListener) mq.addListener(onChange);
    return () => {
      mq.removeEventListener?.('change', onChange);
      if (!mq.removeEventListener) mq.removeListener(onChange);
    };
  }, []);

  const activeProduct = stageProducts.find((item) => item.id === activeStage) || stageProducts[0];

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
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

    setContactStatus({ type: 'sending', text: 'Sending…' });

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || (data && data.ok === false)) throw new Error(data.error || 'Send failed');
        setContactStatus({ type: 'success', text: 'Thanks — we will be in touch shortly.' });
        event.currentTarget.reset();
      })
      .catch((err) => {
        console.error('Send error', err);
        setContactStatus({ type: 'error', text: err?.message || 'Sorry — there was an error sending your message.' });
      });
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') || '').trim();

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      event.currentTarget.querySelector('input')?.focus();
      return;
    }

    setNewsletterButton('Subscribed ✓');
    event.currentTarget.reset();

    window.setTimeout(() => {
      setNewsletterButton('Subscribe');
    }, 2600);
  };

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <header className={`nav${menuOpen ? ' menu-open' : ''}`} id="nav">
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Efolusi home" onClick={() => setMenuOpen(false)}>
            <img className="glyph" src="/efolusi/logo-owl.png" alt="" />
            Efolusi
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a className="nav-link" href="#products" onClick={() => setMenuOpen(false)}>
              Products
            </a>
            <a className="nav-link" href="#approach" onClick={() => setMenuOpen(false)}>
              Approach
            </a>
            <a className="nav-link" href="#team" onClick={() => setMenuOpen(false)}>
              Team
            </a>
            <a className="nav-link" href="#careers" onClick={() => setMenuOpen(false)}>
              Careers
            </a>
            <a className="nav-link" href="#faq" onClick={() => setMenuOpen(false)}>
              FAQ
            </a>
          </nav>

          <div className="nav-right">
            <AppButton href="#contact" className="btn--primary" onClick={() => setMenuOpen(false)}>
              Get in touch
            </AppButton>
            <button
              className="nav-toggle"
              id="navToggle"
              aria-label="Toggle menu"
              aria-expanded={menuOpen ? 'true' : 'false'}
              onClick={() => setMenuOpen((value) => !value)}
              type="button"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero" id="hero">
          <div className="wrap hero-main">
            <div className="hero-top mono" data-rise="2">
              <span>Independent software studio</span>
              <span>Made in Indonesia</span>
            </div>

            <h1 data-rise="2">
              Tools people love using. <span className="it">Built to lead</span> their category.
            </h1>

            <div className="hero-row">
              <div>
                <p className="hero-sub" data-rise="3">
                  Independent software for developers, creators, traders and operators. Every product earns its place in your workflow - or we do not ship it.
                </p>

                <div className="hero-actions" data-rise="4">
                  <AppButton href="#products">
                    Browse our products <span className="arr">↗</span>
                  </AppButton>
                  <AppButton href="#contact" outline>
                    Get in touch
                  </AppButton>
                </div>

                <div className="hero-proof" data-rise="5">
                  <div className="avatars">
                    <span className="av">D</span>
                    <span className="av">C</span>
                    <span className="av">T</span>
                    <span className="av">O</span>
                  </div>
                  <p>Used by developers, creators and traders every day.</p>
                </div>
              </div>

              <div className="hero-meta" data-rise="5">
                <div className="row">
                  <span>Discipline</span>
                  <span>One standard</span>
                </div>
                <div className="row">
                  <span>Origin</span>
                  <span>Indonesia</span>
                </div>
                <div className="row">
                  <span>Reach</span>
                  <span>Global</span>
                </div>
                <div className="row">
                  <span>Portfolio</span>
                  <span>06 platforms</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-ghost" aria-hidden="true">
            E
          </div>
        </section>

        <div className="strip" aria-hidden="true">
          <div className="strip-track">
            <span>Built for the world</span>
            <span>Quality before growth</span>
            <span>Opinionated by design</span>
            <span>Built to lead the category</span>
            <span>No feature bloat</span>
            <span>Built for the world</span>
            <span>Quality before growth</span>
            <span>Opinionated by design</span>
            <span>Built to lead the category</span>
            <span>No feature bloat</span>
          </div>
        </div>

        <section className="section" aria-label="By the numbers">
          <div className="wrap">
            <div className="stats">
              {stats.map(([num, label]) => (
                <div className="stat reveal" key={label}>
                  <div className="num">
                    {num}
                    {num.includes('+') ? <em /> : null}
                  </div>
                  <div className="lbl">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section rule" id="products">
          <div className="wrap">
            <div className="shead reveal">
              <span className="kicker">01 / What we make</span>
              <h2>
                Six platforms. <span className="it acc">One standard.</span>
              </h2>
              <p className="lede">Each product starts from a single question - what does the best version of this look like? Select one to look closer.</p>
            </div>

            <div className="stage-wrap reveal" id="stage-wrap">
              <div className="stage">
                <div className="stage-watermark" id="stageWatermark" aria-hidden="true">
                  {activeProduct.mark}
                </div>

                {stageProducts.map((product) => (
                  <article key={product.id} className={`stage-panel${activeStage === product.id ? ' is-active' : ''}`} data-id={product.id} data-mark={product.mark}>
                    <div className="sp-top">
                      <span className="sp-mono">
                        {String(stageProducts.findIndex((item) => item.id === product.id) + 1).padStart(2, '0')} - {product.section}
                      </span>
                      <span className="sp-mark">{product.mark}</span>
                    </div>
                    <h3>{product.title}</h3>
                    <p className="desc">{product.desc}</p>
                    <ul className="spec">
                      {product.specs.map((spec) => (
                        <li key={spec}>{spec}</li>
                      ))}
                    </ul>
                    <div className="sp-cta">
                      <AppButton href={product.href} external>
                        {product.buttonLabel} <span className="arr">↗</span>
                      </AppButton>
                    </div>
                  </article>
                ))}
              </div>

              <ol className="switch" id="switch">
                {stageProducts.map((product, index) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      data-target={product.id}
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

            <div className="products" id="products-grid">
              {stageProducts.map((product) => (
                <a key={product.id} className="card" href={product.href} target="_blank" rel="noopener noreferrer">
                  <div className="card-top">
                    <span className="mark">{product.mark}</span>
                    <span className="tag">{product.tag}</span>
                  </div>
                  <h3>{product.title}</h3>
                  <p className="one">{product.summary}</p>
                  <span className="card-foot">
                    Visit <span className="arr">↗</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="manifesto" id="approach">
          <div className="wrap">
            <div className="manifesto-grid">
              <div className="reveal">
                <span className="kicker">02 / Approach</span>
                <h2 style={{ marginTop: 18 }}>
                  We do not enter a category unless we believe we can <span className="it acc">lead</span> it.
                </h2>
              </div>
              <div className="reveal">
                <p className="big">Every product starts from the same question: what does the best version of this look like - and why has no one built it yet?</p>
                <p>If we cannot answer that clearly, we do not build it. That discipline keeps the portfolio small and every product sharp.</p>
                <div className="checks">
                  <div className="check">
                    <span className="tick">
                      <svg viewBox="0 0 12 12" fill="none">
                        <path d="M2 6.5 5 9.5 10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    No feature bloat
                  </div>
                  <div className="check">
                    <span className="tick">
                      <svg viewBox="0 0 12 12" fill="none">
                        <path d="M2 6.5 5 9.5 10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Opinionated by design
                  </div>
                  <div className="check">
                    <span className="tick">
                      <svg viewBox="0 0 12 12" fill="none">
                        <path d="M2 6.5 5 9.5 10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Built to scale globally
                  </div>
                  <div className="check">
                    <span className="tick">
                      <svg viewBox="0 0 12 12" fill="none">
                        <path d="M2 6.5 5 9.5 10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Quality before growth
                  </div>
                </div>
              </div>
            </div>

            <div className="origin">
              <div className="reveal">
                <h3>Built in Indonesia. Engineered for every market.</h3>
              </div>
              <div className="reveal">
                <p>
                  We operate in one of the world's fastest-growing markets. That experience informs every product decision we make - and we hold each one to the same standard regardless of where it is used. Global-first architecture, emerging-market insight, world-class engineering, built for scale from day one.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="team">
          <div className="wrap">
            <SectionHeading
              kicker="03 / The studio"
              title={
                <>
                  A small team, <span className="it acc">distributed</span> - held to one standard.
                </>
              }
              lede={
                <>
                  A focused group of builders who care deeply about craft. <em>Names and avatars are placeholders - send me the real team and I will drop them in.</em>
                </>
              }
            />

            <div className="team-grid">
              {team.map(([mono, letter, name, role]) => (
                <div className="member reveal" key={name}>
                  <div className="face" data-mono={mono}>
                    {letter}
                  </div>
                  <div className="nm">{name}</div>
                  <div className="ro">{role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section rule" id="testimonials">
          <div className="wrap">
            <SectionHeading kicker="04 / In the wild" title="Used every day." lede={<em>Placeholder quotes - swap in real testimonials when you have them.</em>} />

            <div className="quotes">
              {quotes.map(([letter, body, name, role]) => (
                <figure className="quote reveal" key={name}>
                  <div className="mk">”</div>
                  <p>{body}</p>
                  <figcaption className="who">
                    <span className="av">{letter}</span>
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

        <section className="section rule" id="careers">
          <div className="wrap">
            <div className="join-grid join">
              <div className="reveal">
                <span className="kicker">05 / Join us</span>
                <h2 style={{ marginTop: 18 }}>
                  Care deeply about craft? <span className="it acc">Let's build.</span>
                </h2>
                <p>We are always looking for people who want to build products that last. If that sounds like you, reach out - even if you do not see your exact role below.</p>
                <AppButton href="#contact" className="btn--primary" onClick={() => setMenuOpen(false)}>
                  See open roles <span className="arr">↗</span>
                </AppButton>
              </div>

              <div className="roles reveal">
                {roles.map(([title, meta]) => (
                  <a className="role" href="#contact" key={title}>
                    <div>
                      <div className="rt">{title}</div>
                      <div className="rm">{meta}</div>
                    </div>
                    <span className="ar">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section rule" id="faq">
          <div className="wrap">
            <SectionHeading kicker="06 / FAQ" title="Clear answers to what we hear most." lede="" />

            <div className="faq faq-items">
              {isNarrow ? (
                <div className="faq-col">
                  {faqItems.map(([question, answer], index) => {
                    const open = openFaqIndex === index;
                    return (
                      <div className={`faq-item${open ? ' open' : ''}`} key={question}>
                        <button className="faq-q" type="button" onClick={() => setOpenFaqIndex(open ? -1 : index)} aria-expanded={open}>
                          {question}
                          <span className="pm" />
                        </button>
                        <div
                          className="faq-a"
                          ref={(el) => {
                            faqRefs.current[index] = el;
                          }}
                          style={{ maxHeight: open ? `${faqHeights[index] || 0}px` : '0px' }}
                        >
                          <div className="faq-a-inner">{answer}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <div className="faq-col">
                    {faqItems
                      .map((pair, i) => [pair, i])
                      .filter(([, i]) => i % 2 === 0)
                      .map(([questionAndAnswer, index]) => {
                        const [question, answer] = questionAndAnswer;
                        const open = openFaqIndex === index;

                        return (
                          <div className={`faq-item${open ? ' open' : ''}`} key={question}>
                            <button className="faq-q" type="button" onClick={() => setOpenFaqIndex(open ? -1 : index)} aria-expanded={open}>
                              {question}
                              <span className="pm" />
                            </button>
                            <div
                              className="faq-a"
                              ref={(el) => {
                                faqRefs.current[index] = el;
                              }}
                              style={{ maxHeight: open ? `${faqHeights[index] || 0}px` : '0px' }}
                            >
                              <div className="faq-a-inner">{answer}</div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className="faq-col">
                    {faqItems
                      .map((pair, i) => [pair, i])
                      .filter(([, i]) => i % 2 === 1)
                      .map(([questionAndAnswer, index]) => {
                        const [question, answer] = questionAndAnswer;
                        const open = openFaqIndex === index;

                        return (
                          <div className={`faq-item${open ? ' open' : ''}`} key={question}>
                            <button className="faq-q" type="button" onClick={() => setOpenFaqIndex(open ? -1 : index)} aria-expanded={open}>
                              {question}
                              <span className="pm" />
                            </button>
                            <div
                              className="faq-a"
                              ref={(el) => {
                                faqRefs.current[index] = el;
                              }}
                              style={{ maxHeight: open ? `${faqHeights[index] || 0}px` : '0px' }}
                            >
                              <div className="faq-a-inner">{answer}</div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="section rule" id="contact">
          <div className="wrap">
            <div className="contact-grid">
              <div className="reveal">
                <span className="kicker">07 / Contact</span>
                <h2 style={{ fontSize: 'clamp(32px,4.4vw,54px)', marginTop: 18 }}>Tell us what you are building.</h2>
                <p className="lede" style={{ marginTop: 20 }}>
                  Questions, partnerships, or just hello - we read everything.
                </p>
                <div className="contact-aside">
                  <div className="ci">
                    <div className="k">Headquarters</div>
                    <div className="v">Indonesia - Distributed team</div>
                  </div>
                </div>
              </div>

              <form className="reveal" id="contactForm" noValidate onSubmit={handleContactSubmit}>
                <div className="field">
                  <label htmlFor="cf-name">Name</label>
                  <input id="cf-name" name="name" type="text" placeholder="Your name" required />
                </div>
                <div className="field">
                  <label htmlFor="cf-email">Email</label>
                  <input id="cf-email" name="email" type="email" placeholder="you@company.com" required />
                </div>
                <div className="field">
                  <label htmlFor="cf-msg">Message</label>
                  <textarea id="cf-msg" name="message" placeholder="What is on your mind?" required />
                </div>
                <button className="btn btn--primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                  Send message <span className="arr">↗</span>
                </button>
                <div className="form-msg" id="formMsg" role="status" style={{ color: contactStatus.type === 'error' ? 'var(--accent-deep)' : 'var(--accent)' }}>
                  {contactStatus.text}
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="section rule" aria-label="Newsletter">
          <div className="wrap">
            <div className="news reveal">
              <div className="nt">
                <h3>Get product news from the studio.</h3>
                <p>New launches and updates. No noise, unsubscribe anytime.</p>
              </div>
              <form id="newsForm" onSubmit={handleNewsletterSubmit}>
                <input type="email" placeholder="you@email.com" aria-label="Email address" name="email" required />
                <button className="btn btn--primary" type="submit">
                  {newsletterButton}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="closer">
          <div className="wrap">
            <h2 className="reveal">
              Find the product built for <span className="it acc">your</span> work.
            </h2>
            <p className="reveal">Every product we build starts from the belief that the existing solution is not good enough. We think you will agree.</p>
            <div className="closer-actions reveal">
              <AppButton href="#products">
                See the products <span className="arr">↗</span>
              </AppButton>
              <AppButton href="#contact" outline>
                Contact us
              </AppButton>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div className="fbrand">
              <a href="#top" className="brand">
                <img className="glyph" src="/efolusi/logo-owl.png" alt="" />
                Efolusi
              </a>
              <p className="tag-line">Software products built to lead their category. Made in Indonesia, engineered for every market.</p>
              <div className="socials">
                <a href="#" aria-label="Efolusi on X">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4l16 16M20 4L4 20" />
                  </svg>
                </a>
                <a className="li" href="#" aria-label="Efolusi on LinkedIn">
                  in
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

            <div className="fcols">
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
          </div>

          <div className="footer-bot">
            <p>© 2026 PT. Efolusi Dunia Teknologi. All rights reserved.</p>
            <span className="made">
              <span className="flag">
                <i />
                <i />
              </span>
              Made within Indonesia
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}