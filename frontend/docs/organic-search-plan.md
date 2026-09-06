# Monza Wheels organic search implementation

Last reviewed: 6 September 2026

## Scope and guardrails

This implementation targets Australian searches for forged wheels while preserving the existing Monza visual system. Product prices, fitment rules, production logic and shipping logic were not changed. No URLs were submitted to Google, no advertising account was changed and no deployment was performed.

## Baseline findings

- The homepage title and copy mentioned forged wheels, but its primary heading was the campaign line “Built to be seen.” rather than the page's search topic.
- Collection pages used broad labels (“Monoblock” and “Multi-Piece”) for both titles and headings, and did not publish canonical URLs or page-specific social metadata.
- Pricing and fitment-tool pages had relevant content but generic headings/titles and no explicit canonicals.
- Several indexable supporting pages did not declare their own canonical URL.
- Collection pages repeated the same custom-design call to action twice.
- Collection thumbnails used the product name rather than the more descriptive image alt text already held in the catalogue.
- The custom-design hero and catalogue fallback referenced a missing image. They now use an existing catalogue image, removing a visible broken-image state.
- Product pages were crawlable and had Product and Breadcrumb structured data. Their aggregate price range used unrounded source decimals, while customers see prices to two decimal places. The Product name also omitted “Forged Wheel”.
- The Product schema said `PreOrder`, but the visible offer is made to order after design approval rather than a future product launch. The unsupported availability claim was removed instead of replacing it with an equally ambiguous inventory claim.
- The legacy `/early-access` page competes with the current custom-wheel page, and the empty `/gallery` is thin while `/favourites` contains the real build photography. Both are now `noindex,follow` and remain outside the sitemap.
- Sitewide Organization and WebSite schema, product canonicals, product breadcrumbs, robots rules and a dynamically generated sitemap already existed.
- The Content Security Policy blocked the installed Google tag. The policy now permits only the required Google tag and measurement endpoints alongside the existing Meta endpoints.

## Keyword and landing-page map

| Page                       | Primary intent                 | Implemented title                                        | Primary heading                    |
| -------------------------- | ------------------------------ | -------------------------------------------------------- | ---------------------------------- |
| `/`                        | forged wheels Australia        | Forged Wheels Australia \| Custom Wheels \| Monza Wheels | Forged Wheels Australia            |
| `/custom-forged-wheels`    | custom forged wheels Australia | Custom Forged Wheels Australia \| Monza Wheels           | Custom forged wheels Australia.    |
| `/collections/monoblock`   | monoblock forged wheels        | Monoblock Forged Wheels \| Monza Wheels                  | Monoblock forged wheels.           |
| `/collections/multi-piece` | two-piece forged wheels        | Two-Piece Forged Wheels \| Monza Wheels                  | Two-piece forged wheels.           |
| `/pricing`                 | forged wheel prices Australia  | Forged Wheel Prices Australia \| Monza Wheels            | Forged wheel prices for Australia. |
| `/fitment-tool`            | wheel fitment calculator       | Wheel Fitment Calculator \| MonzaWheels                  | Wheel fitment calculator.          |
| `/shop/[handle]`           | model name + forged wheel      | `[Model] Forged Wheel \| MonzaWheels`                    | Product model name                 |

The catalogue page continues to support broader design discovery. Individual product pages link through a visible breadcrumb to their correct construction collection, and product configuration links to finish, pricing and quote paths.

## Structured data and technical controls

- Sitewide Organization and WebSite JSON-LD is server rendered.
- Product pages publish Product, AggregateOffer and BreadcrumbList JSON-LD. Prices now serialize to the same two-decimal precision used on the page.
- Collection, pricing, custom-wheel, fitment-tool, product and vehicle pages publish BreadcrumbList data.
- The custom-wheel FAQ publishes FAQPage data generated from the same questions and answers that visitors can see.
- Every indexable page has a self-referencing canonical. Parameterised contact and fitment URLs therefore consolidate to their clean page URLs.
- `robots.txt` allows public pages, blocks API routes and references the XML sitemap.
- The sitemap contains canonical public landing pages, every catalogue product and every supported vehicle landing page. Redirect-only, legacy and thin pages are excluded.

Google treats titles, visible headings and link text as title-link inputs, so the implementation deliberately aligns them without repeating keywords. Google also recommends concise, distinct titles and consistent canonical internal links. See [Google's title-link guidance](https://developers.google.com/search/docs/appearance/title-link) and [canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## Content and business-data conflicts

- The site consistently states approximately 20 days production for one-piece wheels and 30 days for two-piece wheels. Standard shipping is included and approximately 40 days; optional express is AUD $800 and approximately two weeks. Shipping is additional to production. No delivery guarantee was introduced.
- Prices are GST-inclusive per set with standard shipping included. No product price was changed.
- The catalogue is made to order and quote-led. There is no online checkout or purchase-success state, so a `purchase` analytics event cannot truthfully be emitted.
- No public street address, opening hours or telephone number is present. LocalBusiness schema was not added because those details cannot be substantiated. No phone-link event can be tested until a public `tel:` link exists.
- The Google Merchant integration is currently disabled at the account/credential level. Its API availability value should be reviewed before it is re-enabled because the site describes made-to-order production rather than stocked inventory.

## Measurement audit

- One shared Google tag loads GA4 `G-TVES56XZQZ` and Google Ads `AW-18429977658` sitewide. No duplicate Google loader was found.
- A successful quote submission emits GA4/Google `Lead`, Google Ads' configured lead conversion and the funnel event `QuoteFormStep`. Meta browser and server Lead events share an event ID for deduplication.
- Quote-button clicks carry source context, but they are micro-conversions and should not replace the successful lead as the primary bidding goal.
- Contact forms should be tested in GA4 DebugView and Google Ads diagnostics after deployment. Mark the successful lead event as the primary conversion; keep step/view events secondary.

## Recommended Google Search campaign (not applied)

Start with one Australia-only Search campaign and exact/phrase match while conversion volume is limited. Google notes that phrase match includes exact-match reach and expands beyond it; its own keyword-list guidance says exact match offers the most initial control. See [keyword match types](https://support.google.com/google-ads/answer/14996023) and [effective keyword lists](https://support.google.com/google-ads/answer/10039665).

### Ad groups

| Ad group         | Exact and phrase keywords                                                                          | Landing page               |
| ---------------- | -------------------------------------------------------------------------------------------------- | -------------------------- |
| Forged wheels AU | `[forged wheels]`, `[forged wheels australia]`, `"forged wheels australia"`, `"forged car wheels"` | `/`                        |
| Custom forged    | `[custom forged wheels]`, `[custom forged wheels australia]`, `"custom forged wheels"`             | `/custom-forged-wheels`    |
| Monoblock        | `[monoblock forged wheels]`, `"one piece forged wheels"`, `"monoblock wheels australia"`           | `/collections/monoblock`   |
| Two-piece        | `[two piece forged wheels]`, `"2 piece forged wheels"`, `"multi piece forged wheels"`              | `/collections/multi-piece` |
| Price intent     | `[forged wheel prices]`, `"forged wheels price australia"`, `"forged wheels cost"`                 | `/pricing`                 |

Suggested account/campaign negatives: free, cheap, replica, used, second hand, repair, restoration, paint, powder coating, tyres, bicycle, bike, motorcycle, truck, forklift, steering wheel, gaming wheel, alloy wheel cleaner, jobs and wholesale (unless dealer acquisition is wanted). Review the search-terms report weekly rather than assuming this list is complete. Google describes negative lists as a reusable way to block irrelevant queries; see [negative keyword lists](https://support.google.com/google-ads/answer/2453983).

Use successful quote submissions as the primary conversion. Start with tightly controlled geo targeting (people in Australia, not merely interested in Australia), separate brand traffic, and do not introduce broad match until lead tracking is validated and there is enough qualified conversion data to evaluate it.

## External steps after an approved deployment

1. In Search Console, inspect the homepage and the five priority landing pages, verify rendered titles/canonicals, and request indexing only after the production release is approved.
2. Submit or re-submit `https://www.monzawheels.com.au/sitemap.xml`, then monitor the sitemap-specific Page Indexing report. Google documents the URL Inspection and sitemap workflows in [Search Console's top tasks](https://support.google.com/webmasters/answer/10351509).
3. Validate Product, Breadcrumb and FAQ JSON-LD with Rich Results Test and monitor Enhancement reports. Rich-result display is never guaranteed.
4. In GA4 DebugView, complete a real test enquiry and confirm one successful `Lead`; in Google Ads, confirm the corresponding conversion receives the event once.
5. Review Merchant Center availability only if the disabled integration is intentionally restored.

## 30/60/90-day plan

### First 30 days

- Deploy only after visual approval, submit the sitemap and request indexing for the six mapped landing pages.
- Record Search Console clicks, impressions, position and CTR by page/query as the baseline.
- Validate one enquiry end to end and exclude internal/test traffic from reporting.
- Add real customer/build details to favourites as evidence becomes available, without inventing specifications.

### Days 31–60

- Use Search Console query data to refine titles and supporting copy where impressions are growing but CTR is weak.
- Expand only high-confidence vehicle pages where actual fitment knowledge exists; avoid templated doorway pages.
- Add editorial links from new build stories to the relevant wheel model and construction collection.
- Review Core Web Vitals field data; prioritise hero media or oversized catalogue assets only where the report identifies a real issue.

### Days 61–90

- Compare qualified enquiries by organic landing page, not rankings alone.
- Consolidate or improve pages with overlapping queries and no independent value.
- Publish substantiated owner/build stories and technical fitment guides based on real projects.
- If paid Search is approved, start the exact/phrase campaign above, review search terms weekly and expand only from qualified lead evidence.
