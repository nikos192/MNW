# Convertability TODOs

This file is a handoff brief for a future AI agent to implement the remaining low-hanging improvements end to end. Do not invent business facts. Ask the owner for the inputs below before editing production-facing content.

## 4. Local Business / Auto Parts Store Schema

Information needed:

- Canonical business name and legal trading name.
- Public phone number, if one should be displayed.
- Public address, suburb, state, postcode, and country, if one should be displayed.
- Whether customers can visit by appointment, pickup only, or online-only.
- Business hours and timezone.
- Service area: Australia-wide, specific states, international, or all.
- Logo and preferred social profile URLs.
- Any ABN/ACN details that should appear publicly.

Implementation notes:

- Add a `LocalBusiness` or `AutoPartsStore` JSON-LD object in `src/lib/seo.ts`.
- Reuse the canonical URL helper and brand constants.
- Render it from `src/app/layout.tsx` only after the owner confirms the public address/phone details.
- Keep `Organization` schema unless replacing it is deliberate.

## 5. Legal And Support Pages

Information needed:

- Privacy policy text or permission to draft one for legal review.
- Terms and conditions for quote-first custom forged wheel orders.
- Refund/cancellation policy, especially custom order and deposit rules.
- Shipping/freight policy, including domestic and international handling.
- Warranty policy source of truth for structural and finish coverage.
- GST/tax wording and whether prices shown are ex-GST or inc-GST.

Implementation notes:

- Add pages for `/privacy`, `/terms`, `/shipping`, and `/returns` or combine as directed.
- Add footer links under Support or Legal.
- Avoid making legal promises that are not explicitly provided by the business.
- Include canonical metadata and sitemap entries.

## 6. FAQ Content And FAQ Schema

Information needed:

- Final answers for common questions:
  - Are prices ex-GST or inc-GST?
  - Is a deposit required?
  - Are custom forged wheel orders refundable?
  - How long does production take?
  - Do you ship internationally?
  - What fitment information is required?
  - What standards are the wheels tested to?
  - Can finishes be custom matched?
  - Are tyres, fitting, or freight included?
- Whether FAQ answers should be conservative, sales-forward, or technical.

Implementation notes:

- Add an FAQ section to `/contact`, `/pricing`, or a dedicated `/faq` page.
- Add `FAQPage` JSON-LD for visible FAQ content only.
- Keep answers short and quote-safe.
- Add the FAQ route to `sitemap.ts` if a dedicated page is created.

## 7. Buyer-Facing Order Process Page

Information needed:

- Confirm the actual buying flow from enquiry to delivery.
- Deposit percentage or amount, if any.
- Design/render approval steps, if any.
- Production lead times by product line.
- Final payment timing.
- Freight, pickup, fitting, and handover process.
- What happens if fitment or finish needs to change after approval.

Implementation notes:

- Create a page such as `/order-process` or `/how-it-works`.
- Link it from the header mobile menu, footer, product pages, and contact page.
- Use a simple step sequence: enquiry, chassis review, quote, deposit, production, finish approval, final payment, dispatch.
- Add `HowTo` schema only if the final process is specific and stable enough.

## 8. Phone / Instant Contact CTA

Information needed:

- Public phone number.
- Whether SMS, WhatsApp, Instagram DM, or phone calls are preferred.
- Hours when instant contact is monitored.
- Whether to show a named fitment specialist or generic sales contact.
- Whether click tracking should be added.

Implementation notes:

- Add `tel:` and/or WhatsApp links in the header utility bar, mobile menu, contact page, and quote CTAs.
- Add clear text such as "Speak to a fitment specialist" only if someone actually handles those enquiries.
- Update structured data with phone details if public.
- Keep email as fallback.

## 10. Vehicle-Specific SEO Landing Pages

Information needed:

- Priority vehicle list to start with, ideally 10-25 models.
- Whether all existing `vehicleData` entries are approved for public SEO pages.
- Any model-specific copy, fitment caveats, brake notes, or photo assets.
- Preferred URL pattern, for example `/fitment/bmw-m3-g80` or `/forged-wheels/bmw-m3-g80`.
- Whether generated pages should include pricing estimates.

Implementation notes:

- Use existing `vehicleData` and `vehicleFitment` from `src/lib/monza-data.ts`.
- Generate pages with `generateStaticParams`.
- Each page should include PCD, centre bore, diameter range, relevant wheel lines, and a prefilled quote CTA.
- Add canonical metadata, `BreadcrumbList` schema, and sitemap entries.
- Do not publish pages for uncertain fitments without owner approval.
