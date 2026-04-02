# MNW Headless Architecture

## Goal

Build a premium custom-wheel frontend that feels like a design studio and intake system, not a generic catalog. The site should emphasize:

- custom builds over shelf inventory
- delivered sets as the strongest proof and media source
- quote-first flow before production payment

## Stack

### Frontend

- `Next.js` App Router
- custom CSS and brand-led components
- deployed on Vercel or another Next-compatible host

### Commerce / content backend

- `Shopify` for:
  - product admin
  - collections
  - media storage
  - metafields / metaobjects
  - basic content management

### Payments

- `Stripe` for:
  - deposits after spec approval
  - final balance collection
  - optional payment links or Checkout for low-friction payment capture

## Why this split works for MNW

- The frontend can be far more distinctive than a standard theme.
- Shopify still handles product and content admin so you do not rebuild merchant tooling from scratch.
- Stripe gives more flexible payment timing than a normal cart-first storefront.
- The business is custom-build heavy, so the site should qualify leads and capture project detail before payment.

## Website structure

### Current public pages

- `/`
  - brand story
  - featured wheel range
  - fitment entry
  - delivered-set gallery
- `/shop`
  - all wheel references and product cards
- `/shop/[handle]`
  - single wheel page
  - finish direction
  - fitment/spec summary
  - quote CTA
- `/fitment`
  - vehicle and chassis guidance
- `/about`
  - philosophy, quality, process
- `/contact`
  - lower-friction direct inquiry path

Legacy routes:

- `/build` redirects to `/contact`
- `/design-library` redirects to `/shop`

## Shopify data model

### Products

Use products as design bases or delivered-set anchors rather than pretending every listing is a stocked SKU.

Suggested product metafields:

- `mnw.design_family`
- `mnw.construction`
- `mnw.material`
- `mnw.finish_options`
- `mnw.available_diameters`
- `mnw.available_widths`
- `mnw.quality_summary`
- `mnw.starting_price_note`
- `mnw.lead_time_note`
- `mnw.delivered_set_ids`

### Metaobjects

Use metaobjects for repeatable, richer content:

- `delivered_set`
  - chassis
  - generation
  - wheel design
  - front fitment
  - rear fitment
  - finish
  - tire spec
  - notes
  - media gallery
- `finish_program`
  - finish name
  - finish type
  - description
  - media
- `quality_proof`
  - report title
  - summary
  - source reference

## Quote / build flow

### Stage 1

User submits build brief:

- vehicle make / model / year
- brake package
- ride height / suspension notes
- target diameter
- target look
- finish direction
- reference uploads

### Stage 2

Internal review:

- confirm feasible fitment
- confirm face recommendation
- prepare quoted build

### Stage 3

Payment:

- send Stripe Checkout or payment link for deposit
- collect remaining balance after final approval or before shipping, depending on process

## Integration order

### Phase 1

- launch custom frontend shell
- ship core routes and product storytelling
- use quote CTA routes into contact flow

### Phase 2

- connect Shopify Storefront API
- render products, media, and delivered sets dynamically
- expand CMS-backed content sections and metafields

### Phase 3

- add real build-brief submission endpoint
- add admin workflow for quotes
- connect Stripe deposit flow

## Recommendation

Do not rebuild everything at once. The best sequence is:

1. make the frontend exceptional
2. connect Shopify as headless content and product admin
3. add quote tooling
4. add Stripe only when the approval/payment workflow is clear
