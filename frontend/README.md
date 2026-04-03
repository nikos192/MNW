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
