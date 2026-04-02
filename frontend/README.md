# MNW Frontend

This app is the start of the headless MNW storefront: a custom `Next.js` frontend built for a quote-first wheel business, with the existing Shopify theme left in the repo as a reference and fallback.

## Current direction

- `Next.js` owns the brand experience, landing pages, and custom build flow.
- `Shopify` stays in the stack as the product admin, content backend, and media source.
- `Stripe` is planned for deposits and post-approval payment collection rather than a generic cart-first checkout.

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

1. Add a proper build-brief flow and quote submission path.
2. Connect Shopify Storefront API for design-library content and delivered-set media.
3. Add Stripe for deposit collection after spec approval.
4. Split the landing page into reusable sections and routes.

See [docs/headless-architecture.md](./docs/headless-architecture.md) for the production direction.
