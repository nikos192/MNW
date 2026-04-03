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

## Next steps

1. Add a real quote submission endpoint and admin handling for build briefs.
2. Expand Shopify metafields and delivered-set content so more of the product detail surface is CMS-driven.
3. Add Stripe for deposit collection after spec approval.

See [docs/headless-architecture.md](./docs/headless-architecture.md) for the production direction.
