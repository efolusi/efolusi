# Efolusi

The open-source marketing site for [Efolusi](https://efolusi.com), a software studio from Indonesia. It covers the product portfolio, the $EFO ecosystem token, the company, careers, brand assets and the contact and newsletter forms, styled entirely with the [Meridian design system](https://github.com/efolusi/meridian).

Repository: <https://github.com/efolusi/efolusi>

## Tech Stack

- Next.js 15 App Router
- React 18
- @efolusi/meridian design system (components, tokens, self-hosted fonts)
- Brevo API for the contact form and newsletter subscriptions
- Native Node.js 22 (NVM), PM2 and Nginx deployment on the shared Efolusi VPS
- Shared Valkey rate limiting through `REDIS_URL`

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

## Environment Variables

Put local variables in `.env.local`. On the VPS, keep the environment-specific
`.env` in `/home/deploy/efolusi-dev/efolusi` or
`/home/deploy/efolusi-prod/efolusi`; it is not committed to this public
repository.

```bash
BREVO_API_KEY=
EMAIL_TO=
EMAIL_FROM=
REDIS_URL=redis://:<password>@127.0.0.1:6381/<dedicated-db-index>
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
ecosystem.config.cjs      Dev/prod PM2 process contract
infra/nginx/efolusi.conf  Dev/prod reverse-proxy hostnames and loopback ports
```

## Endpoint protections

Both API endpoints reject cross-origin POSTs, cap field lengths, and rate limit
per IP (5 requests per minute) through the environment's shared Valkey service.
The contact form also carries a honeypot field; submissions that fill it are
silently dropped.

Missing or failing `REDIS_URL` enforcement denies requests. Local development
may explicitly opt into an unbound limiter with
`ALLOW_UNBOUND_RATE_LIMIT_IN_DEVELOPMENT=true`; production always ignores that
bypass. Dev and production must use isolated Valkey databases/namespaces.

## Content Updates

Home page copy, product entries, leadership, roles and FAQ items live in the arrays at the top of `app/page.js`. Each other page keeps its own copy at the top of its `page.js`. Update those arrays before touching the rendered JSX.

Site metadata lives in `app/layout.js`.

## Deployment

The self-hosted GitHub Actions runner calls `/home/deploy/bin/efolusi-deploy` on
every `dev` or `main` push. The helper checks out the exact GitHub SHA under the
canonical directory, selects Node 22 through NVM, installs the frozen lockfile,
runs `pnpm build`, and restarts the environment-specific PM2 application.

| Branch | Directory | PM2 process | Loopback | Public host |
| --- | --- | --- | --- | --- |
| `dev` | `/home/deploy/efolusi-dev/efolusi` | `efolusi-dev-efolusi-web` | `127.0.0.1:13000` | `dev-efolusi.efolusi.com` |
| `main` | `/home/deploy/efolusi-prod/efolusi` | `efolusi-prod-efolusi-web` | `127.0.0.1:3000` | `efolusi.com` |

Nginx is the only public ingress. DNS must point the three configured hosts to
the shared VPS before cutover. The old Workers/OpenNext deployment source has
been removed; this source change does not delete provider-side historical
deployments.

## Notes

- `node` version must be `>=20`.
- `.env.local`, `.env`, `.next`, and `node_modules` are intentionally ignored.

## License

MIT, see [LICENSE](LICENSE). The Efolusi name and the owl mark are not covered by the MIT grant; do not use them to brand derived sites.
