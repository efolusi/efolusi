# Efolusi

The open-source marketing site for [Efolusi](https://efolusi.com), a general-purpose software studio. It presents the Efolusi product portfolio, company positioning, careers section, FAQ, contact form, and newsletter signup, styled entirely with the [Meridian design system](https://github.com/efolusi/meridian).

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
BREVO_LIST_ID=
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

The newsletter form posts to `app/api/newsletter/route.js` and creates or updates a contact in Brevo.

Required variable:

- `BREVO_API_KEY`

Optional variable:

- `BREVO_LIST_ID`, adds subscribers to a specific Brevo list when provided

## Project Structure

```text
app/
  api/
    _lib/guard.js         Shared endpoint protections (origin check, rate limit)
    contact/route.js      Contact form endpoint (Brevo transactional email)
    newsletter/route.js   Newsletter signup endpoint (Brevo contacts)
  privacy/page.js         Privacy policy
  terms/page.js           Terms of use
  sitemap.js, robots.js   SEO metadata routes
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

## Content Updates

Most visible site copy, product entries, stats, team entries, testimonials, roles, and FAQ items live in `app/page.js` near the top of the file. Update those arrays first before changing the rendered JSX.

Site metadata lives in `app/layout.js`.

## Deployment

The app deploys to Cloudflare Workers through the OpenNext Cloudflare adapter.

1. Authenticate wrangler once with `npx wrangler login`.
2. Set the secrets on the Worker:

   ```bash
   npx wrangler secret put BREVO_API_KEY
   npx wrangler secret put EMAIL_TO
   npx wrangler secret put EMAIL_FROM
   npx wrangler secret put BREVO_LIST_ID
   ```

3. Deploy:

   ```bash
   npm run deploy
   ```

4. Verify the contact and newsletter forms in production with real credentials.

Continuous deployment can also be set up with Workers Builds by connecting this repository in the Cloudflare dashboard; the build command is `npx opennextjs-cloudflare build` and the deploy command is `npx opennextjs-cloudflare deploy`.

## Notes

- `node` version must be `>=20`.
- `.env.local`, `.dev.vars`, `.next`, `.open-next`, `.wrangler`, and `node_modules` are intentionally ignored.
- Social links in the footer currently use placeholder `#` URLs and should be updated before launch.

## License

MIT, see [LICENSE](LICENSE). The Efolusi name and the owl mark are not covered by the MIT grant; do not use them to brand derived sites.
