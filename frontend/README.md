# MonzaWheels Frontend

This app is the headless MonzaWheels storefront: a custom `Next.js` frontend built for a quote-first wheel business, deployed independently from Shopify theme code.

## Current direction

- `Next.js` owns the brand experience, landing pages, and custom build flow.
- `Shopify` stays in the stack as the product admin, content backend, and media source.
- `Stripe` is planned for deposits and post-approval payment collection rather than a generic cart-first checkout.

## Current routes

- `/`
- `/shop`
- `/shop/[handle]`
- `/fitment`
- `/tracking`
- `/about`
- `/contact`

Legacy routes `/build` and `/design-library` redirect into the current flow.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` when we begin wiring real services.

For quote requests sent through Resend, configure:

- `RESEND_KEY`
- `RESEND_FROM_EMAIL`
- `BUILD_INTAKE_EMAIL`

The quote form posts to `/api/quote`, which sends a formatted internal enquiry email to `BUILD_INTAKE_EMAIL`, sends a confirmation email back to the customer, and uses reply-to so each side can answer directly.

### Shipment tracking

The customer tracking page is available at `/tracking`. Browser requests go to
the same-origin `/api/tracking` route, which validates and rate-limits the
request before contacting the carrier from the server.

The included limiter is a basic, per-instance safeguard. For a strict shared
limit across multiple serverless instances, replace it with a durable store
such as Vercel KV or Upstash Redis.

Configure this server-only environment variable locally and in Vercel:

```bash
TRACKING_PROVIDER_URL=http://47.101.70.255:81/Home/QueryTrack
```

Do not prefix this variable with `NEXT_PUBLIC_`. The carrier endpoint must not
be exposed to the browser. After adding or changing the production variable,
redeploy the site so the server route receives it.

The carrier is an undocumented dependency. Provider request and response
handling is isolated in `src/lib/tracking-provider.ts`; update that adapter if
the carrier changes its payload without changing the page or public API shape.
