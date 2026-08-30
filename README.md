# Efolusi

The open-source marketing site for [Efolusi](https://efolusi.com), a software studio from Indonesia. It covers the product portfolio, the $EFO ecosystem token, the company, careers, brand assets and the contact and newsletter forms, styled entirely with the [Meridian design system](https://github.com/efolusi/meridian).

Repository: <https://github.com/efolusi/efolusi>

## Tech Stack

- Next.js 15 App Router
- React 18
- @efolusi/meridian design system (components, tokens, self-hosted fonts)
- Brevo API for the contact form and newsletter subscriptions
- Cloudflare Workers deployment via @opennextjs/cloudflare

## Getting Started

Clone and install dependencies:

```bash
git clone https://github.com/efolusi/efolusi.git
cd efolusi
npm install
```

Start the development server:

```bash
npm run dev
```

Open the site at:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
```

Runs the local Next.js development server.

```bash
npm run build
```

Creates a production build and checks the app for build-time issues.

```bash
npm run preview
```

Builds the Cloudflare Worker with OpenNext and serves it locally in the workerd runtime. Use this to test the site exactly as it runs in production.

```bash
npm run deploy
```

Builds and deploys the site to Cloudflare Workers.

## Environment Variables

For local Next.js development, put the variables in `.env.local`. For `npm run preview` (workerd runtime), put them in `.dev.vars`. Both files are ignored by git.

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
wrangler.jsonc            Cloudflare Workers configuration (incl. rate limits)
open-next.config.ts       OpenNext Cloudflare adapter configuration
```

## Endpoint protections

Both API endpoints reject cross-origin POSTs, cap field lengths, and rate limit per IP (5 requests per minute) through the Workers rate limiting binding. The contact form also carries a honeypot field; submissions that fill it are silently dropped.

Missing or failing rate-limit bindings deny requests. Local development may explicitly opt into an unbound limiter with `ALLOW_UNBOUND_RATE_LIMIT_IN_DEVELOPMENT=true`; production always ignores that bypass.

## Content Updates

Home page copy, product entries, leadership, roles and FAQ items live in the arrays at the top of `app/page.js`. Each other page keeps its own copy at the top of its `page.js`. Update those arrays before touching the rendered JSX.

Site metadata lives in `app/layout.js`.

## Deployment

The landing page deploys from `dev` and `main` through the Efolusi self-hosted
runner. The shared deployment helper pulls the exact branch into
`/home/deploy/efolusi-{dev|prod}/efolusi`, builds it with NVM Node.js 22, and
restarts the matching PM2 process. Cloudflare Workers deployment is disabled.

## Notes

- `node` version must be `>=20`.
- `.env.local`, `.dev.vars`, `.next`, `.open-next`, `.wrangler`, and `node_modules` are intentionally ignored.

## License

MIT, see [LICENSE](LICENSE). The Efolusi name and the owl mark are not covered by the MIT grant; do not use them to brand derived sites.
