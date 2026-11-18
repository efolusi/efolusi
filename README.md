# Efolusi

The open-source marketing site for [Efolusi](https://efolusi.com), a software studio from Indonesia. It covers the product portfolio, the $EFO ecosystem token, the company, careers, brand assets and the contact and newsletter forms, styled entirely with the [Meridian design system](https://github.com/efolusi/meridian).

Repository: <https://github.com/efolusi/efolusi>

## Tech Stack

- Next.js 15 App Router
- React 18
- @efolusi/meridian design system (components, tokens, self-hosted fonts)
- Brevo API for the contact form and newsletter subscriptions
- Deployed to Cloudflare Workers with OpenNext (`@opennextjs/cloudflare`), Worker `efolusi-web`

## Getting Started

Clone and install dependencies with pnpm 11.24.0 (`npm install -g pnpm@11.24.0`; Node 26 has no corepack):

```bash
git clone https://github.com/efolusi/efolusi.git
cd efolusi
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open the site at:

```text
http://localhost:3000
```

## Scripts

```bash
pnpm dev
```

Runs the local Next.js development server.

```bash
pnpm run build
```

Creates a production build and checks the app for build-time issues.

```bash
pnpm preview
```

Builds the Worker with OpenNext and serves it locally with wrangler, the way Cloudflare runs it.

```bash
pnpm test
```

Runs the Vitest suite (middleware and security-config checks).

`pnpm deploy` builds and deploys the Worker, see [Deployment](#deployment).

## Environment Variables

For local development, put the variables in `.env.local`, which is ignored by git. On the
Worker they are secrets, set once with `wrangler secret put <NAME>`. Plain values
(`EFOLUSI_EXTERNAL_ORIGIN`, `SENTRY_ENVIRONMENT`) live in `vars` in `wrangler.jsonc`.

```bash
BREVO_API_KEY=
EMAIL_TO=
EMAIL_FROM=
SENTRY_DSN=
SENTRY_ENVIRONMENT=
```

### Error Reporting

When `SENTRY_DSN` is set, server-side errors are posted to Sentry by `instrumentation.ts` and `app/_lib/observability.js`. A report carries the error type, message and stack, the route pattern and path without its query string, the release (`SENTRY_RELEASE`, if set), the environment (`SENTRY_ENVIRONMENT`, else `NODE_ENV`), the host name and the time. It never carries headers, cookies, request bodies, query strings, emails or IPs. Unset, nothing is sent.

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
open-next.config.ts       OpenNext adapter config (prerendered pages served from assets)
wrangler.jsonc            Worker name, assets, vars and rate limit bindings
middleware.ts             Security headers and CSP
```

## Endpoint protections

Both API endpoints reject cross-origin POSTs, cap field lengths, and rate limit per IP
(5 requests per minute, keyed by `CF-Connecting-IP`) using the Workers Rate Limiting
bindings `CONTACT_RATE_LIMIT` and `NEWSLETTER_RATE_LIMIT` from `wrangler.jsonc`, read in
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

The site runs as the Cloudflare Worker `efolusi-web`, built with OpenNext. Every page is
prerendered at build time and served from the Worker's static assets.

Production deploys only from a `v*` tag on `main`. `.github/workflows/deploy.yml` runs on
the tag push, or by hand on a tag, on the self-hosted `efolusi-web-deploy` runner. It
refuses a commit that is not on `main`, runs the tests, and runs `pnpm run deploy` with
the `CLOUDFLARE_API_TOKEN` secret and `CLOUDFLARE_ACCOUNT_ID` variable of the
`production` environment.

Every change lands through a pull request into the protected `main` branch.

## Notes

- Node.js is pinned to `26.13.1` in `.nvmrc`, `package.json`, and CI.
- `.env.local`, `.next`, `.open-next`, `.wrangler` and `node_modules` are intentionally ignored.

## License

MIT, see [LICENSE](LICENSE). The Efolusi name and the owl mark are not covered by the MIT grant; do not use them to brand derived sites.
