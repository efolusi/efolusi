import { releases, withRelease } from '../lib/products.js';
import * as legal from './legal-en.js';

const en = {
  htmlLang: 'en',
  ogLocale: 'en_US',

  common: {
    nav: { portfolio: 'Portfolio', token: 'Token', company: 'Company', careers: 'Careers' },
    getInTouch: 'Get in touch',
  signIn: 'Sign in',
    contact: 'Contact',
    toggleMenu: 'Toggle menu',
    skipToContent: 'Skip to main content',
    switchLanguage: 'Ganti ke Bahasa Indonesia',
    langLabel: 'ID',
    notFound: {
      meta: 'Page not found · Efolusi',
      code: 'Error 404',
      titleA: 'This page',
      titleEm: 'wandered',
      titleB: 'off.',
      body: 'The link may be old, or the page has moved. Everything we build is still one click away.',
      home: 'Back to home',
      portfolio: 'See the portfolio'
    },
    footer: {
      tagline: 'PT Efolusi Dunia Teknologi. We build software and run it ourselves. Made in Indonesia.',
      companyHead: 'Company',
      ecosystemHead: 'Token',
      legalHead: 'Legal',
      about: 'About',
      careers: 'Careers',
      brand: 'Brand',
      status: 'Status',
      efoToken: '$EFO token',
      bscscan: 'BscScan',
      privacy: 'Privacy notice',
      terms: 'Platform terms',
      rights: '© 2026 PT Efolusi Dunia Teknologi. All rights reserved.',
      madeIn: 'Made in Indonesia'
    }
  },

  home: {
    meta: {
      title: 'Efolusi · We build software and run it',
      description:
        'Efolusi is a software company in Indonesia. We build our own products: open-source command lines for servers, files, video, social posts and trading bots, plus the design systems behind them.'
    },
    hero: {
      lead: 'Tools that',
      build: 'quietly',
      trail: 'make your work',
      products: 'lighter.',
      sub: "We're Efolusi, a small team in Indonesia. We build our own software, the kind that takes something slow or fiddly and makes it feel easy. Everything here is a product we wanted for ourselves first.",
      viewPortfolio: "See what we've built",
      getInTouch: 'Get in touch',
      proof: 'Every product starts as an open-source command line that runs on your own machine. Release numbers below are the latest tags.'
    },
    marquee: ['We build it, then we run it', 'Boring where boring is better', 'Made to stay up', 'No magic, just software that works', 'We use what we ship'],
    glance: {
      headA: 'One studio,',
      headEm: 'three',
      headB: 'things to know.',
      cards: {
        products: {
          titleA: 'Our',
          titleEm: 'own',
          titleB: 'products',
          body: "Open-source command lines for slow, repetitive work, each with its release number and status.",
          cta: 'See the portfolio'
        },
        token: {
          titleA: 'The $EFO',
          titleEm: 'token',
          titleB: '',
          body: 'Our own token, live on BNB Smart Chain and trading on Uniswap. Everything official is in one place.',
          cta: 'About the token'
        },
        standard: {
          titleA: 'One',
          titleEm: 'rule',
          titleB: '',
          body: "If it doesn't make someone's actual job easier, it doesn't ship.",
          cta: 'How we work'
        }
      }
    },
    portfolio: {
      headA: "What would you",
      headEm: "like to do",
      headB: "?",
      lede: "Run your servers, clip a video, schedule posts or run a trading bot. Each one is a command line you and your AI agent can use. Accounts and billing are shared across all of them through Efolusi SSO and Pay."
    },
    products: {
      komando: {
        headline: "One safe command line for your servers.",
        section: "Servers & infrastructure",
        desc: "Servers, databases, caches, queues, storage, clusters and VPNs behind one command that you and your AI agent can both use. Passwords stay in an encrypted vault the agent never sees.",
        specs: ['Open source CLI', releases.komando, 'macOS, Linux & Windows'].filter(Boolean),
        buttonLabel: 'Visit Komando',
        tag: "Servers & infrastructure",
        summary: "One command line for servers, databases, storage, clusters and VPNs, safe to hand to an AI agent."
      },
      trady: {
        section: "Video",
        desc: "A command line that turns long recordings into short captioned clips on your own machine.",
        specs: ['Open source CLI', releases.trady, 'Runs locally'].filter(Boolean),
        buttonLabel: 'Visit Trady',
        tag: "Video",
        summary: "Turn long recordings into short captioned clips on your own machine."
      },
      toolips: {
        section: "Files",
        desc: "A command line for PDFs, images, secret scans and TLS checks. Your files stay on your machine.",
        specs: ['Open source CLI', releases.toolips, 'Runs locally'].filter(Boolean),
        buttonLabel: 'Visit Toolips',
        tag: "Files",
        summary: "PDFs, images, secret scans and TLS checks from one local command line."
      },
      cuwan: {
        section: "Trading bots",
        desc: "A command line for grid trading bots on crypto exchanges. The bots run on your own machine.",
        specs: ['Open source CLI', releases.cuwan, 'Runs locally'].filter(Boolean),
        buttonLabel: 'Visit Cuwan',
        tag: "Trading bots",
        summary: "Run grid trading bots on crypto exchanges from your own machine."
      },
      kongkow: {
        section: "Social posts",
        desc: "A command line to draft, schedule and publish your social media posts.",
        specs: ['Open source CLI', releases.kongkow, 'Runs locally'].filter(Boolean),
        buttonLabel: 'Visit Kongkow',
        tag: "Social posts",
        summary: "Draft, schedule and publish social media posts from one command line."
      },
      meridian: {
        section: "Design system",
        desc: "The design system for our web products: React components and tokens, published on npm.",
        specs: ['Open source', 'Web, React', 'Apache-2.0'],
        buttonLabel: 'Visit Meridian',
        tag: "Design system",
        summary: "React components and tokens for our web products, published as @efolusi/meridian."
      },
      glamor: {
        section: "Design system",
        desc: "The native design system for our Mac, iPhone and iPad apps, built on SwiftUI.",
        specs: ['Open source', 'SwiftUI', 'Apache-2.0'],
        buttonLabel: 'View Glamor on GitHub',
        tag: "Design system",
        summary: "SwiftUI components and tokens for our Mac, iPhone and iPad apps."
      },
      'design-tokens': {
        section: "Design system",
        desc: "One set of colour, type and spacing tokens shared by Meridian and Glamor.",
        specs: ['Open source', 'JSON', 'Apache-2.0'],
        buttonLabel: 'View tokens on GitHub',
        tag: "Design system",
        summary: "The shared colour, type and spacing tokens behind Meridian and Glamor."
      }
    },
    team: {
      statementA: 'Built in Indonesia,',
      engineered: 'used',
      statementB: 'everywhere, and',
      led: 'looked after',
      statementC: 'by the same people who wrote it.'
    },
    ecosystem: {
      titleA: 'One token behind everything we build:',
      titleEm: '$EFO',
      titleB: '.',
      lede: 'EFO is our own token, live on BNB Smart Chain and trading on Uniswap. The contract address, the on-chain facts, every announcement, all of it lives on the token page and nowhere else.',
      about: 'About $EFO',
      bscscan: 'BscScan',
      tradable: 'Tradable on Uniswap v4',
      bep20: 'BEP-20',
      contractLabel: 'Official contract address',
      facts: [
        ['Network', 'BNB Smart Chain'],
        ['Symbol', 'EFO'],
        ['Total supply', '100,000,000,000'],
        ['Pool', 'EFO/USDT on Uniswap v4']
      ],
      note: "Check this address before you touch anything that calls itself EFO. It's the only one we publish."
    },
    careers: {
      titleA: 'Care about how software gets built?',
      titleEm: "Let's talk.",
      body: 'We like people who build things that help. Say hello, even if none of the roles below fit you yet.',
      reachOut: 'Ask about a role',
      roles: [
        ['Senior JavaScript Engineer', 'Remote · Full-time'],
        ['AI Research Engineer', 'Remote · Full-time'],
        ['Product Designer (UI/UX)', 'Remote · Full-time']
      ]
    },
    faq: {
      headA: 'Answers to what we',
      headEm: 'hear most',
      headB: '.',
      lede: 'Still wondering about something? The form below lands straight with us.',
      items: [
        [
          'What is Efolusi?',
          "A small software company from Indonesia. We build and validate software products, maintain open-source projects, and operate internal infrastructure. The legal name is PT Efolusi Dunia Teknologi, in case you need it for partnership paperwork."
        ],
        [
          'Where are you based?',
          "Indonesia. Our team is spread out and works online, and the products are built so you can open them from anywhere."
        ],
        [
          'Are you hiring?',
          "Of course. We're looking for a Senior JavaScript Engineer, an AI Research Engineer, and a Product Designer; details are on the careers page. Nothing fits? Send us your best work anyway, we'll read it."
        ],
        [
          'What if I need help with a product?',
          "Go straight to the product's site; each one has its own docs and support team. The form on this page is for everything else: partnerships, general questions, or just saying hi."
        ],
        [
          'Can we work together?',
          "Sure. Tell us the idea through the form, rough is fine. A human reads it, not a bot, and if it clicks we'll write back."
        ]
      ]
    },
    contact: {
      titleA: 'Tell us what',
      titleEm: "you're building",
      titleB: '.',
      lede: 'Questions, partnerships, press, or just hello. Whatever you send reaches a person, and we read all of it.',
      legalEntity: 'Legal entity',
      headquarters: 'Headquarters',
      headquartersValue: 'Indonesia · Distributed team',
      email: 'Email',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'you@company.com',
      messageLabel: 'Message',
      messagePlaceholder: "What's on your mind?",
      send: 'Send message',
      errFields: 'Please fill in every field.',
      errEmail: "That email doesn't look right.",
      success: "Thanks. We'll be in touch soon.",
      errSend: "We couldn't send your message. Please try again in a moment."
    },
    newsletter: {
      titleA: 'Stay in the',
      titleEm: 'loop',
      titleB: '.',
      sub: 'Product launches and company news, a few times a year. No spam, and you can leave anytime.',
      placeholder: 'you@email.com',
      subscribe: 'Subscribe',
      errEmail: 'Please enter a valid email address.',
      success: "Thanks, you're on the list.",
      errSend: "We couldn't subscribe you. Please try again in a moment."
    },
    closer: {
      titleA: 'Find the product built for',
      titleEm: 'your work',
      titleB: '.',
      body: "Everything here started because we needed it and couldn't find anything good enough. Maybe you're in the same spot. Take a look.",
      cta: 'See the portfolio'
    }
  },

  about: {
    meta: {
      title: 'About · Efolusi',
      description:
        'Efolusi (PT Efolusi Dunia Teknologi) is a small, self-funded software company in Indonesia. We build our own products and keep them running.'
    },
    heroA: 'We build software,',
    heroEm: 'then run it ourselves',
    heroB: '.',
    lede: "Efolusi is a small, self-funded software company from Indonesia. We started it to build the tools we kept wishing we had, and we've kept going the same way ever since: find the problem that annoys us, build the product, keep it running. The legal name is PT Efolusi Dunia Teknologi, in case you need it for partnership paperwork.",
    splitTitleA: 'We take on a lot,',
    splitTitleEm: 'on purpose.',
    splitBig: "We're not a one-product company. When a problem keeps getting in the way, we build a product for it and use it ourselves.",
    splitBody: "The rule is simple: everything has to be good enough that we'd use it ourselves. If it isn't, it doesn't go out.",
    values: ['We use it first', 'Ships when it deserves to', 'Maintained, not abandoned', 'Real problems, not trends'],
    bandA: 'Built in Indonesia,',
    bandEm: 'used',
    bandB: 'everywhere. Open our products anywhere and they work the same.',
    foundersTitleA: 'Founder-led and',
    foundersTitleEm: 'hands-on',
    foundersTitleB: '.',
    foundersLede: 'Decisions stay close to the products. Both are hands-on, making sure every product runs the way it should.',
    caseTitleA: 'Proof beats',
    caseTitleEm: 'promises',
    caseTitleB: '.',
    caseLede: "One principle runs through everything here: we only build products that are useful to us and likely useful to someone else. Each one is told the same way: the problem, what we built, and what you can check right now.",
    caseLabels: { problem: 'The problem', solution: 'What we built', result: 'Where it stands' },
    cases: [
      {
        name: 'Komando',
        href: 'https://komando.efolusi.com',
        problem: 'Servers, databases, storage and clusters each come with their own logins and commands, and an AI agent given those passwords can break things.',
        solution: 'One command line in front of all of them. Passwords stay in an encrypted vault, it only reads unless you say otherwise, and every action is recorded.',
        result: `Open source${withRelease(releases.komando, 'release')}. Desktop and mobile apps come next; there is no web app.`
      },
      {
        name: 'Toolips',
        href: 'https://toolips.xyz',
        problem: 'Small file jobs like converting and compressing always end up on some ad-filled site you have never heard of.',
        solution: 'A local command line for PDFs, images, secret scans and TLS checks, so the files never leave your machine.',
        result: `Open source${withRelease(releases.toolips, 'first release')}. A web app and desktop app are planned.`
      },
      {
        name: 'Trady',
        href: 'https://trady.efolusi.com',
        problem: 'One long video holds a week of content, but cutting it by hand eats an entire evening.',
        solution: 'A local command line: long recording in, short captioned clips out, rendered on your own machine.',
        result: `Open source${withRelease(releases.trady, 'first release')}. A desktop app for local rendering is planned.`
      },
      {
        name: 'Kongkow',
        href: 'https://kongkow.xyz',
        problem: 'The same post had to be pasted into platform after platform, and something always got missed.',
        solution: 'A command line to draft, schedule and publish social posts. The schedule runs on your own machine.',
        result: `Open source${withRelease(releases.kongkow, 'release')}. A web app is first in line, then a mobile app.`
      },
      {
        name: 'Cuwan',
        href: 'https://cuwan.xyz',
        problem: 'Running a grid by hand means orders go in late when the price swings hard.',
        solution: 'A command line for grid trading bots on crypto exchanges, running on your own machine with your own exchange keys.',
        result: 'Open source, no release yet. The only trading product we make.'
      },
      {
        name: 'Meridian, Glamor and Design Tokens',
        href: 'https://meridian.efolusi.com',
        problem: 'Every product needs the same buttons, forms and colours, and a small team cannot redesign them for each one.',
        solution: 'Meridian for the web (React), Glamor for Mac, iPhone and iPad (SwiftUI), and one shared set of design tokens under both.',
        result: 'All three are open source under Apache-2.0. Meridian is on npm as @efolusi/meridian.'
      }
    ],
    paperTitleA: 'The company',
    paperTitleEm: 'on paper',
    paperTitleB: '.',
    facts: [
      ['Legal entity', 'PT Efolusi Dunia Teknologi'],
      ['Headquarters', 'Indonesia · Distributed team'],
      ['Email', 'hi@efolusi.com'],
      ['Open source', 'github.com/efolusi']
    ],
    closerA: 'See what',
    closerEm: "we've built",
    closerB: '.',
    closerBody: 'The same care goes into everything we ship. Go find the one that fits your work.',
    closerCta: 'View the portfolio'
  },

  careers: {
    meta: {
      title: 'Careers · Efolusi',
      description:
        'Work with a small, self-funded software company in Indonesia. Small teams, real ownership, and products people actually use.'
    },
    heroA: 'Care about how software gets built?',
    heroEm: "Let's talk.",
    lede: "We like people who build things that help. Look through the open roles, or just say hello. The best people we've worked with almost never matched a job post exactly.",
    whatTitleA: "What it's",
    whatTitleEm: 'actually like',
    whatTitleB: '.',
    perks: [
      [
        'key',
        'Real ownership',
        "Every product is built by a small team running the whole stack. You'll ship things people use the same month."
      ],
      [
        'globe',
        'Distributed by default',
        "We're in Indonesia and work async across timezones. We care what you ship, not when you're online."
      ],
      [
        'sparkles',
        'Less process, more building',
        'Code review is real. Design review is real. "Good enough" actually has to be good, not a box you tick.'
      ],
      ['trending-up', 'A growing portfolio', 'New products mean new problems worth digging into, not ignoring without a fix.']
    ],
    hiringTitleA: "Where we're",
    hiringTitleEm: 'hiring now',
    hiringBody: "Tell us what you've built and what you want to build next. A portfolio or a repo beats a long CV every time.",
    reachOut: 'Ask about a role',
    roles: [
      ['Senior JavaScript Engineer', 'Remote · Full-time'],
      ['AI Research Engineer', 'Remote · Full-time'],
      ['Product Designer (UI/UX)', 'Remote · Full-time']
    ],
    closerA: "Don't see",
    closerEm: 'your role',
    closerB: '?',
    closerBody: 'Write anyway. If you care about software that helps and can show us something you made, we want to hear from you.',
    closerCta: 'Say hello'
  },

  token: {
    meta: {
      title: '$EFO token · Efolusi',
      description:
        "$EFO is Efolusi's own token on BNB Smart Chain, tradable on Uniswap. The official contract address, on-chain facts, trading links, and safety notes are all on this page."
    },
    heroA: "Efolusi's own",
    heroEm: 'token',
    heroB: '.',
    lede: "EFO is Efolusi's own token, live on BNB Smart Chain. This page is its official home: the contract address, the on-chain facts, and every announcement we make about it.",
    tradable: 'Tradable on Uniswap v4',
    bep20: 'BEP-20',
    addrTitleA: 'One address.',
    addrTitleEm: "Don't get it wrong",
    addrTitleB: '.',
    addrLede: "This is the only official $EFO contract address. Anything else that calls itself EFO isn't ours. Check it here first.",
    facts: [
      ['Contract address', '0xb61a09e93b4f14585e9afbac3adaea626f25fb07'],
      ['Token name', 'EFOLUSI'],
      ['Symbol', 'EFO'],
      ['Network', 'BNB Smart Chain (BEP-20)'],
      ['Decimals', '18'],
      ['Total supply', '100,000,000,000 EFO'],
      ['Pool', 'EFO/USDT on Uniswap v4']
    ],
    readNote: 'Read from the contract on 22 July 2026.',
    viewBscscan: 'View on BscScan',
    poolTitleA: 'One pool,',
    poolTitleEm: 'linked from here',
    poolTitleB: '.',
    poolLede: 'Prices and liquidity move all day, so we point you to real-time sources instead of a fake chart.',
    trade: {
      swapTitle: 'Swap on Uniswap',
      swapDesc: 'Swap EFO with Uniswap on BNB Chain',
      chartTitle: 'Live chart on GeckoTerminal',
      chartDesc: 'Price, liquidity, and trades for the EFO/USDT pool',
      contractTitle: 'Contract on BscScan',
      contractDesc: 'Holders, transfers, and the verified source'
    },
    nomicsTitleA: 'Where the supply',
    nomicsTitleEm: 'lives',
    nomicsTitleB: '.',
    nomicsLede: 'How the 100 billion EFO are allocated. Simple on purpose, and verifiable on-chain.',
    allocations: [
      ['Liquidity pool', 50, 'Paired with USDT in the Uniswap v4 pool'],
      ['TRADY to EFO migration', 30, 'Reserved for holders migrating from TRADY to EFO'],
      ['Team, locked', 15, 'Team allocation under lock'],
      ['Burned', 5, 'Sent to the burn address, permanently out of circulation']
    ],
    bbTitleA: 'Buyback and burn,',
    bbTitleEm: 'live',
    bbTitleB: '.',
    bbLede: 'Revenue funds buybacks from the dev wallet, and bought-back EFO gets burned. These bars are read straight from the chain every time you load this page, not typed in by us.',
    bbBurned: 'Burned',
    bbBuyback: 'Buyback wallet',
    bbRevenue: 'Revenue wallet (USDT)',
    bbOfSupply: 'of total supply',
    bbLoading: 'Reading from the chain…',
    bbError: "Couldn't reach the chain right now. The links below always work.",
    bbUpdated: 'Read live from BNB Smart Chain',
    bbWallets: [
      ['Dev wallet (buyback & burn)', '0x23bb2435a859ec52736bab3180806b8c7ae85fc6'],
      ['Revenue wallet', '0x0297e732858a4d99f5e6aa5ec72fb9f715396f4e'],
      ['Burn address', '0x000000000000000000000000000000000000dEaD']
    ],
    utilTitleA: 'Utility, documented',
    utilTitleEm: 'before it ships',
    utilTitleB: '.',
    utilLede: "We wire EFO into our products one piece at a time. Each bit of utility, tokenomics, and documentation shows up here once it's live. We'd rather show you something that works than talk about something that might.",
    flywheel: [
      ['Products charge ordinary money', 'Any product subscription is denominated in ordinary money. Nobody is ever required to pay in EFO.'],
      ['Buybacks are on-chain', 'When company funds are used for an EFO buyback, the transaction must come from a disclosed wallet and remain independently verifiable on-chain.'],
      ['Buybacks get burned', 'Bought-back EFO is sent to the burn address, permanently out of circulation. The bars above track it live.']
    ],
    faqTitleA: 'Straight',
    faqTitleEm: 'answers',
    faqTitleB: '.',
    faq: [
      [
        'Is EFO tradable right now?',
        "Yes, in the EFO/USDT pool on Uniswap v4. Start from the links above rather than searching for it, so you know you're in the real pool."
      ],
      [
        'Where does official token information live?',
        'Right here, and only here. This page is the single source of truth for the $EFO contract address and any announcement about the token. Treat anything else as unofficial until you see it here.'
      ],
      [
        'How do I avoid scams?',
        "Check the contract address here, character by character, before you interact with anything. And remember: we never message you first, we'll never ask for your seed phrase, and we don't run surprise airdrops or presales anywhere but this site."
      ]
    ],
    closerA: 'Questions about',
    closerEm: '$EFO',
    closerB: '?',
    closerBody: 'Partnerships, integrations, or anything about the token. Write to us and a person will read it.',
    closerCta: 'Get in touch'
  },

  brand: {
    meta: {
      title: 'Brand · Efolusi',
      description:
        'Official Efolusi brand assets and usage rules: the owl mark, the wordmark, and what not to do with them.'
    },
    heroA: 'The owl, the wordmark,',
    heroEm: 'and the rules',
    heroB: '.',
    lede: "The owl and the wordmark are ours, and we're a little protective of them. Everything here is free to use for press, partners, or anyone writing about us, as long as you stick to the few rules below. The site's code is MIT licensed; the Efolusi name, the owl, and our names aren't.",
    owlTitleA: 'One owl,',
    owlTitleEm: 'treated well',
    owlTitleB: '.',
    owlMark: 'Owl mark',
    owlMeta: 'PNG · transparent · 668×668',
    download: 'Download',
    wordmark: 'Wordmark',
    wordmarkMeta: 'Bricolage Grotesque · 650 to 700 · tracking -0.02em',
    wordmarkNote: 'Render in type; there is no separate logotype file.',
    marksTitleA: 'Product marks,',
    marksTitleEm: 'one ink',
    marksTitleB: '.',
    marksMeta: 'SVG · single colour',
    marksNote: 'Each mark is one solid colour on warm or white paper, drawn in the same 64 by 64 square so all eight take the same space.',
    rulesTitleA: 'The rules,',
    rulesTitleEm: 'briefly',
    rulesTitleB: '.',
    dos: [
      'Show the owl as it is, on a warm or white background',
      'Write "Efolusi" in Bricolage Grotesque, semibold and up',
      'Give the owl at least 24px so its face stays clear',
      'Link to efolusi.com whenever you mention us or $EFO'
    ],
    donts: [
      'Recolor, redraw, stretch, or add effects to the owl',
      'Use our name or owl to brand your product or token',
      "Imply we endorse or partner with you when we don't",
      'Call any contract address ours except the one on the token page'
    ],
    closerA: 'Need something',
    closerEm: 'else',
    closerB: '?',
    closerBody: "Need a bigger file, a product logo, or a quote for a story? Email us, we're quick.",
    closerCta: 'Email us'
  },

  privacy: legal.privacy,
  terms: legal.terms
};

export default en;
