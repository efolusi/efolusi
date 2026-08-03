const en = {
  htmlLang: 'en',
  ogLocale: 'en_US',

  common: {
    nav: { portfolio: 'Portfolio', token: 'Token', company: 'Company', careers: 'Careers' },
    getInTouch: 'Get in touch',
  signIn: 'Sign in',
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
      proof: 'Everything here is live, and we use it every day.'
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
          body: "Software for the slow, repetitive parts of the day. Some of it's free, some open source. We use every one of them ourselves.",
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
      lede: 'Each one lives its own life, with its own users. The common thread is us, the same people behind all of them. Have a look around.'
    },
    products: {
      zoyya: {
        section: 'Artificial Intelligence',
        desc: "An AI assistant that's easy to work with. Tell it where you're headed and it figures out the route; no spoon-feeding every step.",
        specs: ['Autonomous', 'Context-aware', 'Self-directed'],
        buttonLabel: 'Visit ZOYYA',
        tag: 'AI',
        summary: 'Tell it the goal; it works out the steps on its own.'
      },
      komando: {
        section: 'Cloud Infrastructure',
        desc: 'So servers stop making you nervous. Every server, deployment, pipeline, and alert sits together on one screen, where trouble shows up before it grows.',
        specs: ['Unified', 'Full visibility', 'Single pane'],
        buttonLabel: 'Visit Komando',
        tag: 'Infrastructure',
        summary: 'Every server, deployment, and alert, tidy on one screen.'
      },
      toolips: {
        section: 'Productivity',
        desc: 'For the little jobs that pop up out of nowhere: convert, compress, edit, export. Over 100 tools you just open and use. No account, no subscription.',
        specs: ['100+ tools', 'No account', 'Always free'],
        buttonLabel: 'Visit Toolips',
        tag: 'Productivity',
        summary: '100+ file tools you just open and use. No account, free.'
      },
      trady: {
        section: 'Video Repurposing',
        desc: 'One hour of footage, dozens of short clips. Trady cuts the best moments, captions them, and lines them up ready to post. You just pick.',
        specs: ['Long video in', 'Short clips out', 'Auto captions'],
        buttonLabel: 'Visit Trady',
        tag: 'Video',
        summary: 'Long videos become their best moments, ready to post.'
      },
      kongkow: {
        section: 'Social Media',
        desc: 'Tired of pasting the same post into ten apps? Publish once here and it goes out to Facebook, Instagram, TikTok, YouTube, LinkedIn, X, and 20+ more at the same time.',
        specs: ['20+ platforms', 'Publish once', 'One center'],
        buttonLabel: 'Visit Kongkow',
        tag: 'Social',
        summary: 'Publish once; it goes out to 20+ platforms at the same time.'
      },
      cuwan: {
        section: 'Grid Trading',
        desc: 'A spot grid bot that runs wherever you trade, CEX or DEX. Set the price range once and it buys and sells inside it, around the clock without a break.',
        specs: ['Spot grid bot', 'CEX + DEX', '24/7'],
        buttonLabel: 'Visit Cuwan',
        tag: 'Trading',
        summary: 'A spot grid bot for every CEX and DEX, running 24/7.'
      },
      meridian: {
        section: 'Design System',
        desc: "The reason our products all feel like family. An open-source design system: 109 React components and 177 tokens, no build step. The site you're reading runs on it.",
        specs: ['109 components', 'No build step', 'MIT licensed'],
        buttonLabel: 'Visit Meridian',
        tag: 'Design',
        summary: 'The open-source design system behind everything we make, this site included.'
      },
      earthos: {
        section: 'Geospatial',
        desc: 'Earth, live, in a browser tab. Satellites, aircraft, earthquakes, and storms move together on one globe, 100,000+ objects at 60fps, and every data source just plugs in.',
        specs: ['Real-time 3D', 'Plugin-based', 'Open source'],
        buttonLabel: 'Visit EarthOS',
        tag: 'Geospatial',
        summary: 'Earth live in the browser: satellites, flights, and weather on one globe.'
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
        ['Senior Go Engineer', 'Remote · Full-time'],
        ['Product Designer', 'Remote · Full-time'],
        ['AI Research Engineer', 'Remote · Full-time'],
        ['Growth Lead', 'Indonesia · Full-time']
      ]
    },
    faq: {
      headA: 'Answers to what we',
      headEm: 'hear most',
      headB: '.',
      lede: "Didn't find it? Ask us through the form below.",
      items: [
        [
          'What is Efolusi?',
          'Efolusi (PT. Efolusi Dunia Teknologi) is a software company in Indonesia. We build our own products, across cloud, infrastructure, AI, and the tools businesses run on, and the same team keeps them running. Nothing gets thrown over a wall.'
        ],
        [
          'Where are you based?',
          "We're in Indonesia and work as a distributed team. Our products get used all over, so we build them to work anywhere."
        ],
        [
          'Are you hiring?',
          'Yes. We look for people who care about how software gets built and like jumping between different problems. The contact form reaches us directly.'
        ],
        [
          'How do I get support for a product?',
          "Each product has its own support team. Head to that product's site for docs, help, or to reach the team."
        ],
        [
          'Can we work together?',
          "We're open to it if it fits what we build. Send a proposal or a rough idea through the contact form and it comes straight to us."
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
    lede: "Efolusi is a small, self-funded software company from Indonesia. We started it to build the tools we kept wishing we had, and we've kept going the same way ever since: find a problem that annoys us, build the thing, keep it running. The legal name is PT. Efolusi Dunia Teknologi, if you ever need it.",
    splitTitleA: 'We take on a lot,',
    splitTitleEm: 'on purpose.',
    splitBig: "We're not a one-thing company. When some problem keeps getting in the way, we build a product for it and let that product stand on its own.",
    splitBody: "The rule is simple: everything has to be good enough that we'd use it ourselves. If it isn't, it doesn't go out. That's how the list grows without filling up with junk.",
    values: ['Fewer features, done well', 'Boring beats clever', 'Grows with you', 'We answer to our users'],
    bandA: 'Built in Indonesia,',
    bandEm: 'used',
    bandB: 'everywhere. Open our products anywhere and they work the same.',
    foundersTitleA: 'Founder-led and',
    foundersTitleEm: 'hands-on',
    foundersTitleB: '.',
    foundersLede: 'Decisions stay close to the products. These two are still in the code and the details every day.',
    caseTitleA: 'Proof beats',
    caseTitleEm: 'promises',
    caseTitleB: '.',
    caseLede: "One principle runs through everything here: nothing gets announced before it ships. These are the products that are live today, told the same way we judge them ourselves: the problem, what we built, and what you can check right now.",
    caseLabels: { problem: 'The problem', solution: 'What we built', result: 'Where it stands' },
    cases: [
      {
        name: 'Meridian',
        href: 'https://meridian.efolusi.com',
        problem: 'Every product we started needed the same buttons, forms, and colors, and a small team cannot afford to redesign them eight times.',
        solution: 'One open-source design system: 109 React components and 177 tokens, no build step, MIT licensed.',
        result: 'Every Efolusi product runs on it, including this site. The code is public, so you can judge it yourself.'
      },
      {
        name: 'EarthOS',
        href: 'https://earthos.efolusi.com',
        problem: "Live data about Earth (satellites, aircraft, earthquakes, storms) is scattered across dozens of sources with nothing tying it together.",
        solution: 'A real-time 3D digital twin of Earth in the browser, where every data source is a plugin on one globe.',
        result: 'Over 100,000 live objects rendered at 60fps, open source, running in a browser tab today.'
      },
      {
        name: 'ZOYYA',
        href: 'https://zoyya.xyz',
        problem: 'Most AI assistants wait to be told every step, which makes them a second job instead of help.',
        solution: 'An autonomous assistant that takes a goal, works out the steps itself, and learns your context as it goes.',
        result: 'Live at zoyya.xyz, and the assistant we use for our own work every day.'
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
        "Each product is a small team running the whole stack. You'll ship things people use the same month, not tickets in a queue."
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
      ['trending-up', 'A growing portfolio', 'New products mean new problems to dig into, not reorgs to survive.']
    ],
    hiringTitleA: "Where we're",
    hiringTitleEm: 'hiring now',
    hiringBody: "A person reads every application. Tell us what you've built and what you want to build next. A portfolio or a repo beats a long CV every time.",
    reachOut: 'Ask about a role',
    roles: [
      ['Senior Go Engineer', 'Remote · Full-time'],
      ['Product Designer', 'Remote · Full-time'],
      ['AI Research Engineer', 'Remote · Full-time'],
      ['Growth Lead', 'Indonesia · Full-time']
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
    addrTitleA: 'One address. Check it',
    addrTitleEm: 'every time',
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
    poolLede: 'Prices and liquidity move all day, so we point you to the live sources instead of printing numbers that go stale by lunchtime.',
    trade: {
      swapTitle: 'Swap on Uniswap',
      swapDesc: 'Opens the swap with EFO pre-selected on BNB Chain',
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
    utilLede: "We wire EFO into our products one piece at a time. Each bit of utility, tokenomics, and documentation shows up here once it's live, never before. We'd rather show you something that works than talk about something that might.",
    flywheel: [
      ['Products earn revenue', 'Subscriptions across the Efolusi ecosystem are paid in ordinary money. Nobody is ever required to pay in EFO.'],
      ['Revenue funds buybacks', 'A portion of what the business earns buys EFO back from the open market, from the dev wallet listed above.'],
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
    lede: "The owl and the wordmark are ours, and we're a little protective of them. Everything here is free to use for press, partners, or anyone writing about us, as long as you stick to the few rules below. The site's code is MIT licensed; the Efolusi name, the owl, and our product names aren't.",
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
      'Use the owl as we made it, on warm paper or a white background',
      'Set "Efolusi" in Bricolage Grotesque, semibold or heavier',
      'Keep the owl at 24px or bigger so it stays readable',
      'Link back to efolusi.com when you mention us or $EFO'
    ],
    donts: [
      'Recolor, redraw, stretch, or add effects to the owl',
      'Use our name or owl to brand your own product or token',
      "Suggest we've endorsed or partnered with you when we haven't",
      'Pass off any contract address as ours except the one on the token page'
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
      'This policy describes what data efolusi.com collects and how it is used. It applies to this website only. Each Efolusi product has its own privacy policy on its own website.',
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
      'By using efolusi.com you agree to these terms. This website presents PT. Efolusi Dunia Teknologi (Efolusi) and its product portfolio. It is provided for information purposes, as is, without warranties of any kind.',
    productsHead: 'Products',
    products:
      "Efolusi products (ZOYYA, Komando, Toolips, Trady, Kongkow, Cuwan) are operated on their own websites under their own terms. Using a product means agreeing to that product's terms, not these.",
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
