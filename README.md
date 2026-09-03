# Efolusi

The open-source marketing site for [Efolusi](https://efolusi.com), a software studio from Indonesia. It covers the product portfolio, the $EFO ecosystem token, the company, careers, brand assets and the contact and newsletter forms, styled entirely with the [Meridian design system](https://github.com/efolusi/meridian).

Repository: <https://github.com/efolusi/efolusi>

## Tech Stack

- Next.js 15 App Router
- React 18
- @efolusi/meridian design system (components, tokens, self-hosted fonts)
- Brevo API for the contact form and newsletter subscriptions
- Deployed natively on the Efolusi VM with PM2 behind Nginx (no Cloudflare Workers, no Vercel)

## Getting Started

Clone and install dependencies (this repo uses pnpm via corepack):

```bash
git clone https://github.com/efolusi/efolusi.git
cd efolusi
corepack pnpm install
```

Start the development server:

```bash
corepack pnpm dev
```

Open the site at:

```text
http://localhost:3000
```

## Scripts

```bash
corepack pnpm dev
```

Runs the local Next.js development server.

```bash
corepack pnpm run build
```

Creates a production build and checks the app for build-time issues.

```bash
corepack pnpm start
```

Serves the production build the same way PM2 runs it on the server.

```bash
corepack pnpm test
```

Runs the Vitest suite (middleware and security-config checks).

There is no `deploy` script: deployment happens on the server, see [Deployment](#deployment).

## Environment Variables

For local development, put the variables in `.env.local`, which is ignored by git. On the
server the same variables live in the environment file the PM2 process is started with.

```bash
BREVO_API_KEY=
EMAIL_TO=
EMAIL_FROM=
```

### Contact Form

The contact form posts to `app/api/contact/route.js` and delivers the message through the Brevo transactional email API.

Required variables:

- `BREVO_API_KEY`
- `EMAIL_TO`, the inbox that receives contact form messages
- `EMAIL_FROM`, a sender address verified in Brevo

### Newsletter

The newsletter endpoint is fail-closed and does not read, store or forward form data until an authoritative Brevo double-opt-in configuration contract is reviewed and implemented.

There are currently no newsletter provider variables accepted by the endpoint.

## Project Structure

```text
app/
  api/
    _lib/guard.js         Shared endpoint protections (origin check, rate limit)
    contact/route.js      Contact form endpoint (Brevo transactional email)
    newsletter/route.js   Fail-closed newsletter DOI prerequisite boundary
  about|careers|brand|token/page.js
                        The subpages, each with its own copy at the top
  privacy/page.js         Privacy policy
  terms/page.js           Terms of use
  components/             Shared header, footer and theme toggle
  sitemap.js, robots.js, llms.txt/route.js
                        SEO and AI-answer-engine metadata routes
  globals.css             Marketing-page styles on top of Meridian tokens
  layout.js               Metadata, JSON-LD, Meridian stylesheet, theme init
  page.js                 Main marketing site
public/
  efolusi/logo-owl.png    Site icon and brand asset
  og-image.png            Social share image
infra/
  nginx/efolusi-prod.conf Nginx server block that fronts the PM2 process
ecosystem.config.cjs      PM2 process definition (port 3000 prod, 13000 dev)
middleware.ts             Security headers and CSP
```

## Endpoint protections

Both API endpoints reject cross-origin POSTs, cap field lengths, and rate limit per IP
(5 requests per minute) using a native in-memory fixed-window limiter in
`app/api/_lib/guard.js`. The contact form also carries a honeypot field; submissions that
fill it are silently dropped.

A failing limiter denies the request. Local development may explicitly opt into an unbound
limiter with `ALLOW_UNBOUND_RATE_LIMIT_IN_DEVELOPMENT=true`; production always ignores that
bypass.

## Content Updates

All user-facing copy is bilingual and lives in `app/dictionaries/en.js` and
`app/dictionaries/id.js`; the two files must always stay in sync. Structural product data
(ids, marks, tints, links) lives in `productMeta` in `app/components/HomeClient.jsx`, and
the AI-answer-engine catalog in `app/llms.txt/route.js`. Site metadata and JSON-LD live in
`app/[lang]/layout.js`.

The canonical product lineup, domains and taglines come from `company/FACTS.md` in the
Efolusi monorepo. If a surface here disagrees with that file, this surface is wrong.

## Deployment

The landing page runs natively on the Efolusi VM. There is no Cloudflare Workers, OpenNext
or Vercel deployment; Cloudflare only provides DNS, proxying and security in front of it.

A push to `dev` or `main` triggers `.github/workflows/deploy-native-dev.yml` on the
self-hosted runner, which calls `/usr/local/sbin/efolusi-landing-deploy` as the `deploy`
user. That helper pulls the exact commit into `/home/deploy/efolusi-{dev,prod}/efolusi`,
installs and builds with Node.js 22, and restarts the matching PM2 process
(`efolusi-prod-efolusi-web` on port 3000, `efolusi-dev-efolusi-web` on port 13000) as
defined in `ecosystem.config.cjs`. Nginx (`infra/nginx/efolusi-prod.conf`) terminates TLS
and proxies to that port.

Because `main` deploys straight to production, land changes on `dev` first.

## Notes

- `node` version must be `>=22 <25`.
- `.env.local`, `.next`, and `node_modules` are intentionally ignored.

## License

MIT, see [LICENSE](LICENSE). The Efolusi name and the owl mark are not covered by the MIT grant; do not use them to brand derived sites.
