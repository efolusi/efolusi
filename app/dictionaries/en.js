const en = {
  htmlLang: 'en',
  ogLocale: 'en_US',

  common: {
    nav: { portfolio: 'Portfolio', token: 'Token', company: 'Company', careers: 'Careers' },
    getInTouch: 'Get in touch',
  signIn: 'Sign in',
    account: 'Account',
    contact: 'Contact',
    toggleMenu: 'Toggle menu',
    switchLanguage: 'Ganti ke Bahasa Indonesia',
    langLabel: 'ID',
    footer: {
      tagline: 'PT. Efolusi Dunia Teknologi. We build software and run it ourselves. Made in Indonesia.',
      companyHead: 'Company',
      ecosystemHead: 'Token',
      legalHead: 'Legal',
      about: 'About',
      careers: 'Careers',
      brand: 'Brand',
      efoToken: '$EFO token',
      bscscan: 'BscScan',
      privacy: 'Privacy policy',
      terms: 'Terms of use',
      rights: '© 2026 PT. Efolusi Dunia Teknologi. All rights reserved.',
      madeIn: 'Made in Indonesia'
    }
  },

  home: {
    meta: {
      title: 'Efolusi · We build software and run it',
      description:
        'Efolusi (PT. Efolusi Dunia Teknologi) is a software company in Indonesia. We build our own products, across cloud, infrastructure, AI, and the tools businesses run on, and we keep them running ourselves.'
    },
    hero: {
      lead: 'Tools that',
      build: 'quietly',
      trail: 'make your work',
      products: 'lighter.',
      sub: "We're Efolusi, a small team in Indonesia. We build our own software, the kind that takes something slow or fiddly and makes it feel easy. Everything here is a product we wanted for ourselves first.",
      viewPortfolio: "See what we've built",
      getInTouch: 'Get in touch',
      proof: 'Active products, validations, open source, and internal infrastructure—shown with their real status.'
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
          body: "Software for slow, repetitive work. Some is active, some under validation, some open source, and some internal only.",
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
      headA: 'Our products,',
      headEm: 'one portfolio',
      headB: '.',
      lede: 'Our portfolio includes active products, revenue validations, internal shared platforms, open source, and assets temporarily taken out. A reachable page is not the same as a production product.'
    },
    products: {
      zoyya: {
        section: 'Design & applications',
        desc: 'Create designs, websites, mobile apps, backends, databases, previews, and domain-ready releases with AI.',
        specs: ['Design', 'Web & mobile apps', 'Backend to domain'],
        buttonLabel: 'Visit ZOYYA',
        tag: 'Design & apps',
        summary: 'Turn an idea into a designed, working application with AI.'
      },
      runa: {
        section: 'AI teams',
        desc: 'Build and coordinate a personal or business AI team: set goals, delegate work, review results, and connect approved Efolusi products as tools.',
        specs: ['Personal & business', 'Goals & delegation', 'Tool orchestration'],
        buttonLabel: 'Visit Runa',
        tag: 'AI',
        summary: 'The orchestration control plane for personal and business AI teams.'
      },
      relay: {
        section: 'AI Infrastructure',
        desc: 'One control plane for every AI provider: a single gateway in front of all LLM providers, with one key and one bill.',
        specs: ['AI gateway', 'Multi-provider', 'One control plane'],
        buttonLabel: 'Visit Relay',
        tag: 'AI',
        summary: 'One control plane for every AI provider.'
      },
      trady: {
        section: 'Content Clipping',
        desc: 'A content clipper: long video in, short clips out. Turns long recordings into packages of short, captioned clips.',
        specs: ['Content clipper', 'Long video in', 'Short clips out'],
        buttonLabel: 'Visit Trady',
        tag: 'Video',
        summary: 'Content clipper: long video in, short clips out.'
      },
      toolips: {
        section: 'Productivity',
        desc: 'All-in-one tools for everyday file jobs, running directly in the browser. Drop. Fix. Download.',
        specs: ['All-in-one tools', 'In the browser', 'No account needed'],
        buttonLabel: 'Visit Toolips',
        tag: 'Productivity',
        summary: 'All-in-one tools: Drop. Fix. Download.'
      },
      cuwan: {
        section: 'Trading Automation',
        desc: 'Automated grid and DCA trading bots. The only trading product in the portfolio, gated by risk disclosure and auditable performance.',
        specs: ['Grid & DCA bots', 'Automation', 'Risk disclosed'],
        buttonLabel: 'Visit Cuwan',
        tag: 'Trading',
        summary: 'Automated grid & DCA trading bots.'
      },
      kongkow: {
        section: 'Social Media',
        desc: 'A community social network with cross-posting — write once and publish to every social network you connect.',
        specs: ['Social network', 'Cross-post', 'Write once'],
        buttonLabel: 'Visit Kongkow',
        tag: 'Social',
        summary: 'Post once, publish everywhere.'
      },
      pay: {
        section: 'Payments',
        desc: 'The centralized payment gateway behind every Efolusi product: one integration, every payment gateway.',
        specs: ['Payment gateway', 'One integration', 'Platform'],
        buttonLabel: 'Visit Pay',
        tag: 'Payments',
        summary: 'One integration, every payment gateway.'
      },
      my: {
        section: 'Identity',
        desc: 'Identity and single sign-on for the whole portfolio: one Efolusi account for every product.',
        specs: ['SSO', 'One account', 'Every product'],
        buttonLabel: 'Visit My',
        tag: 'Identity',
        summary: 'One account for every Efolusi product.'
      },
      loop: {
        section: 'Specifications',
        desc: 'A specification workspace where PRDs and specs are reviewed and versioned before development. The spec comes first.',
        specs: ['Spec workspace', 'Reviewed', 'Versioned'],
        buttonLabel: 'Visit Loop',
        tag: 'Productivity',
        summary: 'The spec comes first.'
      },
      sanctum: {
        section: 'Privacy',
        desc: 'A vault and private knowledge system: a vault your AI can use but never read.',
        specs: ['Vault', 'Private knowledge', 'Zero knowledge'],
        buttonLabel: 'Visit Sanctum',
        tag: 'Privacy',
        summary: 'A vault your AI can use but never read.'
      },
      komando: {
        section: 'Cloud Infrastructure',
        desc: 'Omni cloud, server, and monitoring in one dashboard: one terminal for every server, database, URL, and cert you own.',
        specs: ['Servers', 'Monitoring', 'One dashboard'],
        buttonLabel: 'Visit Komando',
        tag: 'Infrastructure',
        summary: 'One terminal for every server, database, URL and cert you own.'
      },
      meridian: {
        section: 'Design System',
        desc: 'The Efolusi design system, published as the npm package @efolusi/meridian and used across every product. Its code, documentation, and license can be inspected publicly.',
        specs: ['Open source', 'Design system', 'MIT licensed'],
        buttonLabel: 'Visit Meridian',
        tag: 'Design',
        summary: 'The Efolusi design system.'
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
          "A small software company from Indonesia. We build and validate software products, maintain open-source projects, and operate internal infrastructure. The legal name is PT. Efolusi Dunia Teknologi, in case you need it for partnership paperwork."
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
        'Efolusi (PT. Efolusi Dunia Teknologi) is a small, self-funded software company in Indonesia. We build our own products and keep them running.'
    },
    heroA: 'We build software,',
    heroEm: 'then run it ourselves',
    heroB: '.',
    lede: "Efolusi is a small, self-funded software company from Indonesia. We started it to build the tools we kept wishing we had, and we've kept going the same way ever since: find the problem that annoys us, build the product, keep it running. The legal name is PT. Efolusi Dunia Teknologi, in case you need it for partnership paperwork.",
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
        name: 'ZOYYA',
        href: 'https://zoyya.xyz',
        problem: 'Most AI assistants wait to be told every single step, which turns them into a second job instead of actual help.',
        solution: 'An agent workspace that takes a goal, works out the steps itself, and learns your context as it goes.',
        result: 'Active beta at zoyya.xyz. Zoyya acts, you watch: every run is visible and reviewable.'
      },
      {
        name: 'Runa',
        href: 'https://runa.efolusi.com',
        problem: 'Running a small company means the same operational work every week, and nobody left to hand it to.',
        solution: 'A control plane where teams build, run, and govern AI agents across the org — the platform layer products like Zoyya build on.',
        result: 'In build, run on our own operations first; external availability is not claimed yet.'
      },
      {
        name: 'Relay',
        href: 'https://relay.efolusi.com',
        problem: 'Every product needed its own keys, quotas, and billing for every LLM provider, and none of it was comparable.',
        solution: 'One control plane in front of every AI provider, with a single key, one set of limits, and one bill.',
        result: 'Live as the gateway all Efolusi products call for AI; provider routing and spend are visible in one place.'
      },
      {
        name: 'Trady',
        href: 'https://trady.efolusi.com',
        problem: 'One long video actually holds a week of content, but cutting it by hand still eats up an entire evening.',
        solution: 'A content clipper: long video in, short captioned clips out, with a review pass before anything ships.',
        result: 'Being validated as a paid service for agencies and content teams; not represented as a mature product.'
      },
      {
        name: 'Toolips',
        href: 'https://toolips.xyz',
        problem: 'Small file jobs like converting and compressing always end up on some ad-filled, tracker-heavy site you have never heard of.',
        solution: 'A collection of file utilities that run directly in the browser without an account.',
        result: 'Live at toolips.xyz with a free tier and a paid Pro plan.'
      },
      {
        name: 'Cuwan',
        href: 'https://cuwan.xyz',
        problem: 'Running a grid by hand means orders go in late: when the price swings up or down hard, the profit opportunity is already gone.',
        solution: 'Automated grid and DCA trading bots with manual or model-assisted configuration.',
        result: 'In revenue validation with legal, credential-security, and auditable-performance gates. The only trading product we make.'
      },
      {
        name: 'Kongkow',
        href: 'https://kongkow.xyz',
        problem: 'The same content had to be pasted into platform after platform, every single day, and something always got missed.',
        solution: 'A social network where you write once and cross-post to every social account you connect.',
        result: 'Being repositioned and tested for revenue; product-market fit is not yet proven.'
      },
      {
        name: 'Pay',
        href: 'https://pay.efolusi.com',
        problem: 'Every product that wanted to charge money had to integrate a payment gateway again, and each one differed.',
        solution: 'A centralized payment gateway: one integration for the whole portfolio, every provider behind it.',
        result: 'Live as the billing path for Efolusi products; no product talks to a payment provider directly anymore.'
      },
      {
        name: 'My',
        href: 'https://my.efolusi.com',
        problem: 'A portfolio of products meant a separate account and a separate password for each one.',
        solution: 'One identity provider: a single Efolusi account, with SSO into every product.',
        result: 'Live at my.efolusi.com; products sign in through it instead of keeping their own passwords.'
      },
      {
        name: 'Loop',
        href: 'https://loop.efolusi.com',
        problem: 'Work started before anybody agreed what was being built, so the rework arrived later and cost more.',
        solution: 'A specification workspace where PRDs and specs are reviewed and versioned before development starts.',
        result: 'In build and used on our own products first: the spec comes first.'
      },
      {
        name: 'Sanctum',
        href: 'https://sanctum.efolusi.com',
        problem: 'Giving an AI assistant useful context usually means handing it your secrets in plain text.',
        solution: 'A vault and private knowledge system your AI can use but never read.',
        result: 'In build; the encryption model is the product and is being reviewed before any public claim.'
      },
      {
        name: 'Komando',
        href: 'https://komando.efolusi.com',
        problem: 'Our own infrastructure was spread across servers and dashboards, and every incident started with a search.',
        solution: 'One dashboard for every server, database, URL, and certificate you own, with monitoring attached.',
        result: 'Being built as a shared operations layer; cross-product adoption is not claimed before it is evidenced.'
      },
      {
        name: 'Meridian',
        href: 'https://meridian.efolusi.com',
        problem: 'Every product we started needed the same buttons, forms, and colors, and a small team cannot afford to redesign them a dozen times.',
        solution: 'A design system for reusable components, tokens, and interface patterns, published as an npm package.',
        result: 'Published as @efolusi/meridian under the MIT license; its contribution to product consistency can be inspected directly.'
      }
    ],
    paperTitleA: 'The company',
    paperTitleEm: 'on paper',
    paperTitleB: '.',
    facts: [
      ['Legal entity', 'PT. Efolusi Dunia Teknologi'],
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

  privacy: {
    meta: {
      title: 'Privacy policy · Efolusi',
      description: 'How PT. Efolusi Dunia Teknologi handles data collected through efolusi.com.'
    },
    back: '← Back to efolusi.com',
    title: 'Privacy policy',
    metaLine: 'PT. Efolusi Dunia Teknologi · Effective 22 July 2026',
    intro:
      'This policy describes what data efolusi.com collects and what we use it for. The short version: very little, and it is never sold. It applies to this website only; each Efolusi product has its own privacy policy on its own website.',
    collectHead: 'What we collect',
    collect: [
      ['Contact form:', ' your name, email address, and message. We use them solely to read and reply to your message. Delivery runs through Brevo, our email processor.'],
      ['Newsletter:', ' your email address, stored with Brevo so we can send product launches and company updates. Every email includes an unsubscribe link.'],
      ['Theme preference:', ' your light or dark choice is stored in your browser only (localStorage). It never leaves your device.'],
      ['Server logs:', ' the site is served by Cloudflare, which processes standard request logs (IP address, user agent) to operate and protect the service.']
    ],
    notHead: 'What we do not do',
    not: [
      'We do not run advertising or third-party analytics trackers on this site.',
      'We do not sell or share your data with anyone beyond the processors named above.',
      'We do not use cookies for tracking.'
    ],
    retentionHead: 'Retention and your rights',
    retention:
      'Contact messages are kept only as long as needed to handle your request. You can unsubscribe from the newsletter at any time, and you can ask us to delete any data we hold about you by writing to ',
    changesHead: 'Changes',
    changes: 'If this policy changes, the new version is published on this page with an updated effective date.'
  },

  terms: {
    meta: {
      title: 'Terms of use · Efolusi',
      description: 'Terms of use for efolusi.com, the website of PT. Efolusi Dunia Teknologi.'
    },
    back: '← Back to efolusi.com',
    title: 'Terms of use',
    metaLine: 'PT. Efolusi Dunia Teknologi · Effective 22 July 2026',
    intro:
      'By using efolusi.com you agree to these terms. This website introduces PT. Efolusi Dunia Teknologi (Efolusi) and its product portfolio; it is provided for information purposes, as is, without warranties of any kind.',
    productsHead: 'Products',
    products:
      "Efolusi products (Relay, Trady, Cuwan, ZOYYA, Toolips, Pay, My, Meridian, Loop, Sanctum, Kongkow, Komando, Runa) are operated on their own websites under their own terms. Using a product means agreeing to that product's terms, not these.",
    trademarksHead: 'Content and trademarks',
    trademarksA:
      'The Efolusi name, the owl mark, and product names are property of PT. Efolusi Dunia Teknologi. The source code of this website is open source under the MIT license at ',
    trademarksB: '; the MIT grant does not cover the names or the mark.',
    tokenHead: 'The $EFO token',
    tokenP1:
      '$EFO is Efolusi\'s own token on BNB Smart Chain. It is not a share, a security, or an investment product, and nothing on this website is an offer to sell or a solicitation to buy any financial instrument. Nothing here is financial advice.',
    tokenP2:
      'Digital assets are volatile and carry a risk of total loss: you can lose everything you put in. Please do your own research and follow the laws where you live before interacting with any digital asset.',
    tokenP3a: 'The only official contract address is the one published on ',
    tokenP3link: 'the token page',
    tokenP3b:
      '. Any address published anywhere else is not ours. We never send you the first message, we never ask for your seed phrase, and we never announce airdrops or presales outside this site.',
    liabilityHead: 'Liability',
    liability:
      'We work to keep the information on this site accurate but do not guarantee it. Efolusi is not liable for damages arising from the use of this website. Nothing on this site is financial, legal, or professional advice.',
    contactHead: 'Contact',
    contactA: 'Questions about these terms: '
  }
};

export default en;
