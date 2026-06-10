# Efolusi

Efolusi is a general-purpose software studio site built with Next.js. It presents the Efolusi product portfolio, company positioning, careers section, FAQ, contact form, and newsletter signup.

## Tech Stack

- Next.js 15 App Router
- React 18
- Nodemailer for contact form delivery
- Brevo API for newsletter subscriptions
- Vercel-ready deployment

## Getting Started

Install dependencies:

```bash
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
npm run start
```

Starts the production server after a successful build.

## Environment Variables

Create a local `.env.local` file for development. This file is ignored by git.

```bash
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=
EMAIL_TO=
BREVO_API_KEY=
BREVO_LIST_ID=
```

### Contact Form

The contact form posts to `app/api/contact/route.js` and sends email through SMTP.

Required variables:

- `SMTP_HOST`
- `SMTP_USER`
- `SMTP_PASS`

Optional variables:

- `SMTP_PORT`, defaults to `587`
- `SMTP_SECURE`, set to `true` for secure SMTP
- `EMAIL_FROM`, defaults to `SMTP_USER`
- `EMAIL_TO`, defaults to `SMTP_USER`

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
    contact/route.js      Contact form endpoint
    newsletter/route.js   Newsletter signup endpoint
  globals.css             Global styles
  layout.js               Metadata and root layout
  page.js                 Main marketing site
public/
  efolusi/logo-owl.png    Site icon and brand asset
```

## Content Updates

Most visible site copy, product entries, stats, team entries, testimonials, roles, and FAQ items live in `app/page.js` near the top of the file. Update those arrays first before changing the rendered JSX.

Site metadata lives in `app/layout.js`.

## Deployment

The app is designed to deploy on Vercel.

1. Set the environment variables in the Vercel project settings.
2. Deploy from the connected git branch.
3. Verify the contact and newsletter forms in production with real credentials.

Before deploying manually, run:

```bash
npm run build
```

## Notes

- `node` version must be `>=20`.
- `.env.local`, `.next`, `node_modules`, and `.vercel` are intentionally ignored.
- Social links in the footer currently use placeholder `#` URLs and should be updated before launch.
