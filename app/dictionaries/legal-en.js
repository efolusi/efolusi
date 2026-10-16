/*
 * Efolusi Platform Terms and Platform Privacy Notice, English.
 *
 * Every factual sentence here describes what the product code does today
 * (see the PR that introduced this file for the per-product fact sheets).
 * Keep legal-id.js in step: same section ids, same facts.
 *
 * VERSION must match LEGAL_TERMS_VERSION and LEGAL_PRIVACY_VERSION on the
 * my.efolusi.com API, or accounts are not asked to accept this version.
 *
 * Inline markup: [label](href) and **strong**; see app/lib/legal-inline.js.
 */

export const LEGAL_VERSION = '2026-10-16';

const ENTITY = 'PT Efolusi Dunia Teknologi';
const ADDRESS = 'Bumi Cikande Indah, Blok D12 No 15, Cikande, Kab. Serang, Banten 42186, Indonesia';
const EMAIL = '[hi@efolusi.com](mailto:hi@efolusi.com)';
const META_LINE = `${ENTITY} · Version ${LEGAL_VERSION} · Last updated 16 October 2026`;

export const terms = {
  meta: {
    title: 'Platform Terms · Efolusi',
    description:
      'The terms for your Efolusi account at my.efolusi.com, for efolusi.com, and for the Efolusi products that do not have terms of their own.'
  },
  back: '← Back to efolusi.com',
  title: 'Efolusi Platform Terms',
  metaLine: META_LINE,
  contentsHead: 'Contents',
  intro: [
    `These terms are an agreement between you and ${ENTITY} ("Efolusi", "we", "us"), ${ADDRESS}. By creating an Efolusi account, or by using efolusi.com or any product these terms cover, you accept them.`,
    `How we handle personal data is explained in the [Platform Privacy Notice](/{lang}/privacy), which forms part of these terms.`
  ],
  sections: [
    {
      id: 'scope',
      head: 'What these terms cover',
      blocks: [
        'These terms cover:',
        {
          ul: [
            '**Your Efolusi account** at my.efolusi.com, the one account you use to sign in to Efolusi products.',
            '**efolusi.com**, this website.',
            '**Relay, Loop, Runa, Komando, Sanctum and Kongkow.** These products have no terms of their own. What each one does, and the rules that apply only to it, are in the [product schedule](#schedule) at the end of this page.'
          ]
        },
        'Trady, Cuwan, ZOYYA and Toolips have their own terms and privacy policies. When you use one of them, its own terms apply, and where they differ from these terms, the product terms prevail for that product. These terms still cover the Efolusi account you sign in with.',
        {
          ul: [
            'Trady: [terms](https://trady.efolusi.com/{lang}/terms) and [privacy policy](https://trady.efolusi.com/{lang}/privacy)',
            'Cuwan: [terms](https://cuwan.xyz/terms), [privacy policy](https://cuwan.xyz/privacy) and [risk disclosure](https://cuwan.xyz/risk)',
            'ZOYYA: [terms](https://zoyya.xyz/terms), [privacy policy](https://zoyya.xyz/privacy) and [refund policy](https://zoyya.xyz/refund)',
            'Toolips: [terms](https://toolips.xyz/{lang}/terms) and [privacy policy](https://toolips.xyz/{lang}/privacy)'
          ]
        },
        'Meridian, our design system, is open source under the MIT licence, and that licence governs its use. Efolusi Pay is the payment service our products use to take payments; it is not offered to the public as a product of its own.'
      ]
    },
    {
      id: 'account',
      head: 'Your Efolusi account',
      blocks: [
        'You must be at least 18 years old to create an Efolusi account and use the products. Give accurate details when you sign up and keep your email address current, because it is how we reach you.',
        'Relay, Loop, Runa, Komando, Sanctum and Kongkow send you to my.efolusi.com to sign in and never ask for your Efolusi password themselves. When you sign in to a product, my.efolusi.com tells it who you are: your account id, email address, name and profile picture. Your account page lists the products connected to your account and lets you remove their access.',
        `Keep your password private, and turn on two-step verification with an authenticator app on your account page. You are responsible for what happens under your account. If you think someone else has access to it, change your password and tell us at ${EMAIL}.`,
        'Some products let you work in a shared space: a Relay workspace, a Runa company or a Sanctum team. The owner of that space decides who is in it and what happens to its data. If you leave or are removed, the data stays with the space.'
      ]
    },
    {
      id: 'use',
      head: 'Using the products fairly',
      blocks: [
        'You must not, and must not let anyone using your account:',
        {
          ul: [
            'break the law, or use a product to help someone else break it;',
            "upload, generate or share content that is illegal, infringes someone else's rights, sexualises minors, or threatens, harasses or incites hatred against anyone;",
            'impersonate anyone, or deceive or defraud people;',
            'send spam or unsolicited bulk messages through any product;',
            'get around a plan limit, rate limit, quota or security control, or try to reach data that is not yours;',
            "probe, scan or attack our systems or anyone else's through a product;",
            'store or spread malware, or use a product to mine cryptocurrency;',
            'resell a product or offer it to others as your own service without our written agreement;',
            'scrape or copy the products, except where the law allows it.'
          ]
        },
        'Some products send traffic to addresses you choose: Komando monitors, Runa agents, and the webhooks and integrations you add to Relay, Runa or Kongkow. Only point them at hosts and services that you own or have permission to use this way. That traffic comes from our servers, so if the owner of a target complains, we may pass the complaint to you and stop the traffic.',
        'If you break these rules we may remove content, limit a feature, or suspend or close your account. Where it is reasonable, we will tell you why first and give you a chance to respond. We may report illegal activity to the authorities.'
      ]
    },
    {
      id: 'ai',
      head: 'AI features',
      blocks: [
        'Several products use AI models run by other companies. Loop, Sanctum and Kongkow reach those models through Relay, our AI gateway. In Runa, each agent uses the AI provider you set up for it, with your own key or account. The [product schedule](#schedule) says what each product sends.',
        'AI output can be wrong, incomplete or out of date, even when it reads well. Review it before you rely on it, publish it or act on it, and do not use it as your only basis for legal, medical, financial or safety decisions. Nothing an AI feature produces is advice from us.',
        'Each AI provider handles the requests it receives under its own terms, and you must follow its usage policy when you use its models through our products. We do not use your content to train AI models.',
        'Runa agents act for you. They can run commands, call tools and contact the websites and APIs you set up, and they can make mistakes. You are responsible for what your agents do and for the AI usage they consume with your keys.'
      ]
    },
    {
      id: 'content',
      head: 'Your content',
      blocks: [
        'What you put into a product stays yours, and so does what a product generates for you, as far as the law allows. You allow us to store, process, copy and display your content only as needed to run the products for you, keep them secure and meet our legal obligations. That permission ends when the content is deleted, apart from copies in backups until those backups expire.',
        "You confirm that you have the right to give us your content, and that it does not include other people's personal data unless you are allowed to share it.",
        'Public posts and profiles on Kongkow can be seen by other users and by anyone who opens a public page, and other users can share them inside Kongkow.',
        'If you send us ideas or feedback, we may use them without owing you anything.'
      ]
    },
    {
      id: 'refunds',
      head: 'Payments and refunds',
      blocks: [
        'Komando, Runa and Kongkow are free. Loop, Sanctum and Relay can be used for free and also offer paid plans, with prices shown in each product. Payment is completed through Efolusi Pay and the payment partner shown at checkout.',
        {
          ul: [
            '**Loop Pro** costs Rp149.000, paid once by QRIS. It is not a subscription and does not renew.',
            '**Sanctum Pro** costs Rp49.000 for 30 days or Rp490.000 for 365 days, and **Sanctum Team** costs Rp199.000 for 30 days or Rp1.990.000 for 365 days. Each purchase covers the period you choose and does not renew automatically.',
            '**Relay** shows its plans in the dashboard. For a paid plan, the price, currency and billing period are shown at checkout before you pay.'
          ]
        },
        `To ask for a refund, write to ${EMAIL} from the email address on your account, with the product and the date of the payment. If you were charged twice, charged the wrong amount, or paid for a plan that was never applied to your account and we cannot fix it, we refund the payment in full. Other requests are reviewed one by one. Approved refunds are processed through Efolusi Pay. When a Sanctum payment is refunded, the plan it paid for ends.`,
        'This section does not limit any refund right that consumer protection law gives you, including Indonesian Law No. 8 of 1999 on Consumer Protection.',
        'Purchases in Trady, Cuwan, ZOYYA and Toolips follow the billing and refund terms of that product.'
      ]
    },
    {
      id: 'availability',
      head: 'Availability and changes to the products',
      blocks: [
        'The products are run by a small team on servers we operate. We work to keep them available, but we do not promise they will be uninterrupted or free of errors, and we take them offline from time to time for maintenance. Keep your own copy of anything important.',
        'We may change, limit or stop a product or a feature. If we stop a paid feature during a period you have already paid for, we refund the unused part.'
      ]
    },
    {
      id: 'ending',
      head: 'Closing your account',
      blocks: [
        'You can stop using a product at any time. To close your Efolusi account, sign in at [my.efolusi.com](https://my.efolusi.com), open your account page and use **Delete account** at the bottom of the page. You confirm with your password, and the account is deleted straight away. This cannot be undone. If your account has no password, write to us and we will delete it for you.',
        `Once the account is deleted, you can no longer use it to sign in to any product. Deleting the account does not yet delete the data each product holds for you. To have that removed as well, write to ${EMAIL} from the same email address and tell us which products you used. The [Privacy Notice](/{lang}/privacy#deletion) explains what is deleted and what is kept.`,
        'We may suspend or close an account that breaks these terms, that the law requires us to close, or that puts the products or other people at risk. Unless it is urgent or unlawful to do so, we will tell you first.'
      ]
    },
    {
      id: 'liability',
      head: 'Disclaimers and liability',
      blocks: [
        'The products and this website are provided "as is" and "as available". As far as the law allows, we give no warranties beyond those in these terms. We work to keep the information on this website accurate but do not guarantee it, and nothing on it is financial, legal or professional advice.',
        'As far as the law allows, we are not liable for indirect or consequential loss, for lost profits, revenue or data, for losses caused by AI output or agent actions, or for losses caused by third-party services that a product contacts for you. Our total liability for all claims in any 12-month period is limited to the amount you paid us for the product concerned in the 12 months before the claim.',
        'Nothing in these terms limits liability that cannot be limited by law, such as liability for fraud, wilful misconduct or gross negligence, or takes away rights you have as a consumer under Indonesian law.'
      ]
    },
    {
      id: 'token',
      head: 'The $EFO token',
      blocks: [
        "$EFO is Efolusi's own token on BNB Smart Chain. It is not a share, a security, or an investment product, and nothing on this website is an offer to sell or a solicitation to buy any financial instrument. Nothing here is financial advice.",
        'Digital assets are volatile and carry a risk of total loss: you can lose everything you put in. Please do your own research and follow the laws where you live before interacting with any digital asset.',
        'The only official contract address is the one published on [the token page](/{lang}/token). Any address published anywhere else is not ours. We never send you the first message, we never ask for your seed phrase, and we never announce airdrops or presales outside this site.'
      ]
    },
    {
      id: 'trademarks',
      head: 'Content and trademarks',
      blocks: [
        `The Efolusi name, the owl mark and the product names belong to ${ENTITY}. The source code of this website is open source under the MIT licence at [github.com/efolusi/efolusi](https://github.com/efolusi/efolusi); the MIT licence does not cover the names or the mark. Apart from the open-source projects, the products, their software and their design remain ours.`
      ]
    },
    {
      id: 'law',
      head: 'Governing law and disputes',
      blocks: [
        'These terms are governed by the laws of the Republic of Indonesia.',
        `If you have a complaint or a dispute, write to ${EMAIL} first. We will try to resolve it with you within 30 days.`,
        'Nothing here takes away your right as a consumer to use the dispute channels that Indonesian law gives you, such as the Consumer Dispute Settlement Body (BPSK).'
      ]
    },
    {
      id: 'changes',
      head: 'Changes to these terms',
      blocks: [
        'We update these terms as the products change. Each version carries the version and date shown at the top of this page. When a change matters to you, for example a new obligation, a new payment rule or a change in how we handle data, your account page at my.efolusi.com shows a notice asking you to read and accept the new version.',
        'These terms are published in English and Indonesian. If the two differ, the Indonesian version prevails for users in Indonesia and the English version prevails for everyone else.'
      ]
    },
    {
      id: 'contact',
      head: 'Contact',
      blocks: [`${ENTITY}, ${ADDRESS}.`, `Questions about these terms, refunds, security reports and complaints: ${EMAIL}.`]
    },
    {
      id: 'schedule',
      head: 'Product schedule',
      blocks: [
        'Each entry says what the product does, what data it processes and which AI providers are involved. Rules in an entry apply only to that product. The [Privacy Notice](/{lang}/privacy#products) has the full detail on data and how long it is kept.',
        { h3: 'Efolusi account (my.efolusi.com)', id: 'my' },
        {
          ul: [
            '**What it does:** sign-up, sign-in, password reset, two-step verification, connected apps, data export and account deletion for the Efolusi products.',
            '**Data it processes:** your email address, name and profile picture, a hashed password, two-step verification secrets, sessions with IP address and browser, security events, the terms and privacy versions you accepted, and a wallet address if you link one.',
            '**AI providers:** none.',
            '**Price:** free.'
          ]
        },
        { h3: 'Relay (relay.efolusi.com)', id: 'relay' },
        {
          ul: [
            '**What it does:** one API key and endpoint in front of many AI providers, with routing, fallbacks, budgets, usage tracking and encrypted storage for provider keys you add.',
            "**Data it processes:** workspace and member details, API keys, provider keys you add (encrypted), and a usage record for each request with the model, provider, tokens, cost, status and timing. The request log does not store the text of prompts or responses. For video requests, the provider's job response is stored.",
            '**AI providers:** the ones you route requests to. Relay can connect to Anthropic, OpenAI, Google Gemini, OpenRouter, xAI, DeepSeek, Mistral, Groq and the other providers listed in the dashboard, using Efolusi platform keys or keys you add.',
            "**Rules:** follow the usage policy of every provider your requests reach. Only add provider keys or accounts that you are allowed to use through a third-party gateway. Do not use Relay to get around a provider's ban or rate limit, and do not resell Relay access without our written agreement.",
            '**Price:** free starter use, and paid plans as shown in the dashboard.'
          ]
        },
        { h3: 'Loop (loop.efolusi.com)', id: 'loop' },
        {
          ul: [
            '**What it does:** turns a product idea or brief into a structured specification with sections, versions and readiness checks, and exports it as a LOOP.md bundle. You can give Runa or ZOYYA time-limited access to a project.',
            '**Data it processes:** your idea or brief, the specification and every version of it including the instructions you give when regenerating, revision proposals, baselines, change requests and reports, the access you grant, and plan and payment records.',
            '**AI providers:** your idea or brief, and when you regenerate, the current specification and your instruction, are sent through Relay to a language model. The default configuration uses an OpenAI model.',
            '**Rules:** generated sections are drafts, so review them before you hand them to anyone or build from them. Daily limits apply: 10 generations and 30 regenerations a day on Free, 100 and 300 on Pro.',
            '**Price:** Free, or Pro for Rp149.000 paid once.'
          ]
        },
        { h3: 'Runa (runa.efolusi.com)', id: 'runa' },
        {
          ul: [
            '**What it does:** a control plane for teams of AI agents. You create a company, set up agents with goals, projects, routines and approvals, and Runa runs them on a schedule or on demand.',
            '**Data it processes:** company and member details, agent settings, issues, goals, documents and attachments, run records and logs (which can contain your content and what agents produced), approvals, cost estimates, and secrets you store (encrypted).',
            "**AI providers:** each agent uses the AI provider or tool you configure for it, for example Anthropic Claude, OpenAI Codex or Google Gemini, with your own API key or account. The agent's instructions, the task context and the files it works on are sent to that provider.",
            '**Rules:** agents run on our servers and can run commands, call tools and contact the websites and APIs you configure. Point them only at systems you own or may use this way, and do not use them for spam, deception, attacks or cryptocurrency mining. On the hosted service, connect providers with API keys; signing in with a personal Claude or ChatGPT subscription is not supported.',
            '**Price:** free. You pay your AI providers directly for the usage your agents consume.'
          ]
        },
        { h3: 'Komando (komando.efolusi.com)', id: 'komando' },
        {
          ul: [
            '**What it does:** uptime, TLS certificate and DNS monitors for your websites and hosts, plus an inventory of your servers and cloud resources. Results are shown in the dashboard. Komando does not send alerts.',
            '**Data it processes:** the monitors you add and their targets, check results for the last 30 days (status, response time, status code and a message that can include the IP addresses a target resolves to), and inventory records. Inventory holds no passwords or keys, only a reference you choose.',
            '**AI providers:** none.',
            '**Rules:** monitor only hosts, domains and endpoints that you own or are authorised to monitor. Checks come from our servers with the user agent komando-monitor/1.0. Each account can have up to 50 monitors, and a monitor can be scheduled no more often than once a minute. Do not use Komando to scan ports or to send traffic at a target.',
            '**Price:** free.'
          ]
        },
        { h3: 'Sanctum (sanctum.efolusi.com)', id: 'sanctum' },
        {
          ul: [
            '**What it does:** an encrypted vault for passwords, secure items, notes and files, plus an AI memory that agents can read over MCP within limits you set.',
            '**Data it processes:** vault items, notes and attachments in the secret tier are encrypted in your browser and we store only the encrypted form. Memory in the sensitive tier is encrypted on our servers with a key we hold. Memory in the public tier is stored as plain text. We also keep folders, devices, MCP keys (as hashes), usage counters, an audit log and plan records.',
            '**AI providers:** only memory you mark as allowed for AI, in the public or sensitive tier, is sent through Relay to a language model (Anthropic Claude Haiku by default), after Sanctum removes secrets, tokens and email addresses. The summaries it writes are stored in the public tier. The secret tier is never sent.',
            '**Rules:** we cannot read your secret tier, so we cannot recover it. If you lose both your passphrase and your recovery code, that data is gone. Memories are deleted automatically 90 days after they are created, except summaries.',
            '**Price:** Free (up to 50 vault items), or Pro and Team as listed under [Payments and refunds](#refunds).'
          ]
        },
        { h3: 'Kongkow (kongkow.xyz)', id: 'kongkow' },
        {
          ul: [
            '**What it does:** a social network with a feed, posts, comments, stories, direct messages, groups and a bot API.',
            '**Data it processes:** your profile, posts, comments, likes, follows, stories, direct and group messages, uploaded media, reports and bots. Direct messages are not end-to-end encrypted. If you connect a social channel, its access token is stored encrypted.',
            '**AI providers:** AI enhance and Explain with AI send the text you chose to rewrite or explain through Relay to a language model (Anthropic Claude Haiku by default), only when you click them.',
            "**Rules:** no harassment, hate, threats, sexual content involving minors, intimate images shared without consent, spam, impersonation, or posting other people's personal data without their permission. You can report posts and comments, and we may remove content or limit accounts that break these rules.",
            "**Price:** free. Kongkow's former Solana wallet, tipping and paid-post features are retired, and cross-posting to other networks does not publish anywhere yet."
          ]
        }
      ]
    }
  ]
};

export const privacy = {
  meta: {
    title: 'Platform Privacy Notice · Efolusi',
    description:
      'How PT Efolusi Dunia Teknologi handles personal data in your Efolusi account, on efolusi.com, and in the Efolusi products that do not have their own privacy policy.'
  },
  back: '← Back to efolusi.com',
  title: 'Efolusi Platform Privacy Notice',
  metaLine: META_LINE,
  contentsHead: 'Contents',
  intro: [
    `This notice explains what personal data ${ENTITY} ("Efolusi", "we") collects, why, who we share it with, how long we keep it, and how you can control it. We are responsible for that data as its controller. We do not sell personal data.`
  ],
  sections: [
    {
      id: 'scope',
      head: 'What this notice covers',
      blocks: [
        'This notice covers your Efolusi account at my.efolusi.com, this website (efolusi.com), and Relay, Loop, Runa, Komando, Sanctum and Kongkow.',
        'Trady, Cuwan, ZOYYA and Toolips have their own privacy policies, which prevail for those products: [Trady](https://trady.efolusi.com/{lang}/privacy), [Cuwan](https://cuwan.xyz/privacy), [ZOYYA](https://zoyya.xyz/privacy) and [Toolips](https://toolips.xyz/{lang}/privacy). This notice still covers the Efolusi account you sign in to them with.',
        'When you work in a shared space that someone else owns, such as a Relay workspace, a Runa company or a Sanctum team, the owner decides what goes into it, and we process that content to provide the product to them.',
        "We process personal data in line with Indonesia's Personal Data Protection Law (Law No. 27 of 2022)."
      ]
    },
    {
      id: 'account-data',
      head: 'Your Efolusi account',
      blocks: [
        {
          ul: [
            '**Profile:** email address, name and profile picture. Pictures you upload are kept in our object storage.',
            '**Sign-in:** a hashed password, your two-step verification secret and backup codes, and sessions with the IP address and browser they came from. A session lasts 30 days.',
            '**Security events:** sign-ins, password and email changes, two-step verification changes and administrative actions. They can include email addresses and are kept for two years.',
            '**Connected apps:** the products you have signed in to and the access you granted them.',
            '**Consent:** which version of the Platform Terms and this notice you accepted, and when.',
            '**Wallet, if you link one:** your BNB Smart Chain wallet address, and a daily record of its public EFO balance, which sets your EFO membership tier.'
          ]
        },
        'When you sign in to a product, my.efolusi.com shares your account id, email address, name and profile picture with it.',
        'When you set or change a password, we check it against the Have I Been Pwned list of breached passwords. Only the first five characters of a hash of the password leave our server, never the password itself.',
        'Account emails, such as email verification, password reset and email change, are sent through Resend.'
      ]
    },
    {
      id: 'website',
      head: 'efolusi.com',
      blocks: [
        {
          ul: [
            '**Contact form:** your name, email address and message, delivered to us by email through Brevo so we can read and reply.',
            '**Newsletter form:** it is not accepting sign-ups at the moment. What you type into it is not stored or sent anywhere.',
            '**Language:** a cookie named lang remembers whether you read the site in English or Indonesian, for one year.',
            '**Theme:** your light or dark choice is stored in your browser only.',
            '**Sign-in status:** the site asks my.efolusi.com whether you are signed in, so the header can show your account. Your account cookie goes with that request, and efolusi.com stores nothing from it.',
            '**Server logs:** the site is served through Cloudflare, which processes standard request data such as your IP address and browser to deliver and protect it.'
          ]
        }
      ]
    },
    {
      id: 'products',
      head: 'Data in each product',
      blocks: [
        'Besides your account, each product processes the data below. Where we say you can delete something yourself, that is what the product offers today.',
        { h3: 'Relay', id: 'relay-data' },
        {
          ul: [
            'Workspace name, member email addresses and roles, API keys, routing settings, budgets, webhook addresses, and the provider keys or connections you add, which are encrypted.',
            "A usage record for every request: time, API key, model, provider, token counts, cost, status and timing. The request log does not store the text of prompts or responses. For video requests, the provider's job response is stored.",
            'Prompts and responses are sent to the AI provider your request is routed to.',
            "Usage records, audit events and finished video jobs are deleted after your workspace's retention setting of 7, 30, 90 or 365 days (90 by default). Billing records and webhook delivery records are not removed by that setting.",
            'Workspace owners and admins can download the workspace configuration, and owners can delete the whole workspace from the dashboard.'
          ]
        },
        { h3: 'Loop', id: 'loop-data' },
        {
          ul: [
            'Your ideas and briefs, the specifications and every version of them including your regenerate instructions, revision proposals, baselines, change requests and reports, the project access you give to Runa or ZOYYA, and your plan and payment records.',
            'Your idea or brief, and when you regenerate, the current specification and your instruction, are sent through Relay to a language model.',
            'Loop keeps projects until they are deleted. You can archive a project and export its specification, but Loop does not yet have a delete button, so write to us to delete a project or all of your Loop data.'
          ]
        },
        { h3: 'Runa', id: 'runa-data' },
        {
          ul: [
            'Company and member details, agents and their settings, issues, comments, goals, projects, routines, documents and attachments, approvals, cost estimates, and secrets you store, which are encrypted.',
            'Run records and logs. These can contain your content, the instructions agents received and what they produced.',
            'Agents send their instructions, task context and working files to the AI provider you configure, and contact the tools, websites and APIs you set up.',
            "Run records are kept until the agent or the company is deleted. Runa's database is backed up every hour, and backups are kept on a rolling schedule of seven daily, four weekly and one monthly copy.",
            'A company board can export the company and delete it in Runa. To delete the personal data in your Runa profile, write to us.'
          ]
        },
        { h3: 'Komando', id: 'komando-data' },
        {
          ul: [
            'Your monitors and their targets, check results (status, response time, status code and a message that can include the IP addresses a target resolves to), and inventory records. Inventory holds no passwords or keys.',
            'Check history older than 30 days is deleted every hour. You can delete monitors and inventory items yourself, and deleting a monitor deletes its history.',
            'Komando uses no AI and sends no alerts. Its checks contact only the targets you add.',
            'Komando has no data export or account deletion of its own. Write to us for either.'
          ]
        },
        { h3: 'Sanctum', id: 'sanctum-data' },
        {
          ul: [
            '**Secret tier:** vault items, notes and attachments are encrypted in your browser before they reach us. We store only the encrypted form and cannot read it.',
            '**Sensitive tier:** memory you mark as sensitive is encrypted on our servers with a key we hold, so our servers can read it to run the features you use.',
            '**Public tier:** memory you mark as public, and the summaries Sanctum writes, are stored as plain text.',
            'Sanctum also keeps folders, devices, MCP keys (stored as hashes), usage counters, an audit log that can include IP addresses, and plan and payment records. Files are kept in our object storage, and Sanctum emails are sent through Resend.',
            'Only memory you mark as allowed for AI is sent through Relay to a language model, after secrets, tokens and email addresses are removed. Secret-tier data is never sent.',
            'Memories are deleted automatically 90 days after they are created, except summaries. You can delete vault items and notes yourself, and you can export notes and attachments in readable form from a desktop Chromium browser.',
            'Sanctum does not yet have a delete-account button. Write to us and we will delete your Sanctum data, including your vault.'
          ]
        },
        { h3: 'Kongkow', id: 'kongkow-data' },
        {
          ul: [
            'Your profile, posts, comments, likes, follows, stories, direct and group messages, uploaded media, reports and bots. Direct messages are stored on our servers in readable form; they are not end-to-end encrypted.',
            'Public posts and profiles can be seen by anyone. If you create a bot, the updates it receives are sent to the webhook address you set.',
            'When you delete a post it is hidden from everyone, and when you delete a message it is hidden for you, but both stay in our database. Stories disappear from view after 24 hours but are kept, and uploaded media is kept.',
            'AI enhance and Explain with AI send the text you chose through Relay to a language model when you click them.',
            "If you connect a social channel, its access token is stored encrypted. Wallet records and encrypted wallet keys from Kongkow's retired Solana wallet feature are still stored.",
            'Kongkow has no data export or account deletion of its own yet. Write to us and we will export or delete your Kongkow data.'
          ]
        }
      ]
    },
    {
      id: 'ai',
      head: 'AI providers',
      blocks: [
        "Relay is our AI gateway. When Loop, Sanctum or Kongkow use AI, the content described above goes through Relay to an AI provider, which processes it to produce a response. Loop's default configuration uses an OpenAI model, and Sanctum and Kongkow use Anthropic's Claude Haiku by default. When you use Relay directly, your requests go to the providers you route them to. In Runa, agents use the provider you configure.",
        'Most of these providers are based in the United States, and each handles requests under its own terms and privacy policy. We do not use your content to train AI models.'
      ]
    },
    {
      id: 'sharing',
      head: 'Who we share data with',
      blocks: [
        'We share personal data only as needed to run the products:',
        {
          ul: [
            '**Service providers:** Cloudflare (network delivery and protection), Resend (account and product emails), Brevo (contact form emails), Sentry (error reports, which we strip of personal details before sending), Have I Been Pwned (the breached password check), and our payment service Efolusi Pay with its payment partners when you buy a plan.',
            '**AI providers:** as described under AI providers.',
            '**Third parties you point a product at:** the websites, APIs, hosts, webhooks and channels you set up.',
            '**Other Efolusi products:** when you sign in to a product, or give one product access to another, such as a Loop project to Runa.',
            '**Public BNB Smart Chain nodes:** if you link a wallet, its address is looked up there.',
            '**Authorities:** when the law requires it.'
          ]
        },
        'Some of these providers are outside Indonesia, including in the United States. We do not sell personal data and do not use it for advertising.'
      ]
    },
    {
      id: 'retention',
      head: 'How long we keep data',
      blocks: [
        'We keep data while your account or the product data exists, and for the periods given above. In short:',
        {
          ul: [
            'Account sessions: 30 days. Account security events: two years.',
            'Relay usage and audit records: your workspace setting, 90 days by default.',
            'Komando check history: 30 days.',
            'Sanctum memories: 90 days, except summaries.',
            'Efolusi account backups: 14 days. Deleted data can remain in backups until those backups expire.'
          ]
        }
      ]
    },
    {
      id: 'deletion',
      head: 'Deleting your account and data',
      blocks: [
        'You can delete your Efolusi account at [my.efolusi.com](https://my.efolusi.com): open your account page, use **Delete account** at the bottom and confirm with your password. If your account has no password, write to us instead.',
        'Deletion is immediate. It removes your profile, password, two-step verification, sessions, connected apps, product memberships and linked wallet. Security events stay for their two-year period, daily wallet balance records stay because they are kept by wallet address, and copies stay in backups for up to 14 days. An uploaded profile picture is not yet removed automatically; ask us and we will delete it.',
        `Deleting your account does not yet delete the data each product holds. To remove it, use the delete options inside the product where they exist (listed above), or write to ${EMAIL} from your account email address and tell us which products you used. We will confirm when it is done.`,
        'You can download a copy of your account data as a JSON file with **Download my data** on your account page.'
      ]
    },
    {
      id: 'rights',
      head: 'Your rights',
      blocks: [
        `Under Indonesian law you can ask to see the personal data we hold about you and get a copy, have it corrected, have it deleted, receive it in a portable format, withdraw consent you have given, and object to or limit some processing. Write to ${EMAIL} from the email address on your account. We may ask you to confirm it is you, and we reply within the time the law requires.`,
        'If you think we have not handled your data properly, tell us first so we can put it right. You can also complain to the Indonesian authority responsible for personal data protection.'
      ]
    },
    {
      id: 'security',
      head: 'Security',
      blocks: [
        "Connections to our sites are encrypted. Account passwords are stored as hashes, two-step verification is available for every account, provider keys in Relay, secrets in Runa and channel tokens in Kongkow are encrypted, and Sanctum's secret tier is encrypted on your device. No system is perfectly secure. If a personal data breach affects you, we will tell you and the authorities as Indonesian law requires."
      ]
    },
    {
      id: 'cookies',
      head: 'Cookies and browser storage',
      blocks: [
        'We use cookies and browser storage only to keep you signed in and to remember your choices. We do not use advertising or tracking cookies.',
        {
          ul: [
            'my.efolusi.com sets the session cookies for your account on efolusi.com and its subdomains, and cookies named efolusi_lang and efolusi_theme that remember your language and theme for one year.',
            'Each product sets its own session cookie when you sign in to it, plus short-lived cookies that protect the sign-in step.',
            'efolusi.com sets a lang cookie for one year and keeps your theme in your browser storage.',
            'Cloudflare may set cookies it needs to protect the sites against bots and abuse.'
          ]
        }
      ]
    },
    {
      id: 'children',
      head: 'Children',
      blocks: [
        'The products are for people aged 18 and over. We do not knowingly collect data from children. If you believe a child has an account, write to us and we will delete it.'
      ]
    },
    {
      id: 'changes',
      head: 'Changes to this notice',
      blocks: [
        'When we update this notice, we publish the new version here with a new version and date. If a change matters to you, your account page at my.efolusi.com asks you to read and accept it.',
        'This notice is published in English and Indonesian. If the two differ, the Indonesian version prevails for users in Indonesia and the English version prevails for everyone else.'
      ]
    },
    {
      id: 'contact',
      head: 'Contact',
      blocks: [`${ENTITY}, ${ADDRESS}.`, `Privacy questions and requests: ${EMAIL}.`]
    }
  ]
};
