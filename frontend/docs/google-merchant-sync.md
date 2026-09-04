# Google Merchant product sync

The storefront catalogue in `src/lib/monza-data.ts` is the canonical product list. Merchant prices come from the same `priceRangeForSeries()` calculation used on product landing pages. Each offer represents a set of four wheels at the displayed starting price, including GST and standard Australian shipping.

## Safety and behaviour

- Default CLI behaviour is dry-run; it never writes without `--apply` **and** `MERCHANT_SYNC_ALLOW_WRITE=true`.
- The API endpoint requires a bearer secret and never accepts credentials in a request.
- Only offers owned by data source `10722188293`, labelled `AU` / `en`, and prefixed `monza-` are reconciled or deleted.
- New offers are inserted, changed attributes are patched, removed catalogue offers are deleted, and unchanged offers older than 25 days are reinserted. This keeps every offer fresher than Google's 30-day requirement.
- Logs are JSON and redact credential-shaped fields. API error messages contain status and a bounded Google error message, never an access token.

## Google Cloud setup

1. Create or select a Google Cloud project owned by Monza Wheels.
2. In **APIs & Services → Library**, enable **Merchant API**.
3. In **IAM & Admin → Service Accounts**, create a dedicated service account such as `merchant-product-sync`.
4. Do not grant broad Google Cloud project roles; Merchant account access is configured separately.
5. For Vercel, create one JSON key for that service account, copy its complete JSON into the encrypted `GOOGLE_SERVICE_ACCOUNT_JSON` environment variable, then securely delete the downloaded file. For local development, Application Default Credentials are also supported via `gcloud auth application-default login`, or `GOOGLE_APPLICATION_CREDENTIALS` may point to an untracked key file.
6. Rotate and revoke service-account keys under **IAM & Admin → Service Accounts → Keys** if one is exposed or no longer used.

## Merchant Center setup

1. Register Google Cloud project `monza-wheels-merchant-sync` with Merchant account **5848720352**. Using an account administrator's access token, call `POST https://merchantapi.googleapis.com/accounts/v1/accounts/5848720352/developerRegistration:registerGcp` with `{ "developerEmail": "YOUR_HUMAN_DEVELOPER_EMAIL" }`. Use a monitored human contact; if it is not already a Merchant Center user, accept Google's invitation. Wait at least five minutes before retrying the API.
2. Give that human contact the `API_DEVELOPER` role plus appropriate `STANDARD` or `ADMIN` access. Google recommends at least one backup developer contact.
3. Confirm Merchant Center account **5848720352** has an API-type primary product data source with ID **10722188293**. File-type sources cannot accept ProductInput writes.
4. In Merchant Center **Settings → People and access**, add the service account's `client_email` as a user. Grant the minimum account permissions that allow product/data-source management (Google's setup guide currently describes Admin access for this workflow).
5. Confirm the website domain `https://www.monzawheels.com.au` is verified and claimed, Australian shipping settings are valid, and AUD tax/shipping disclosures match the landing pages.
6. After the first approved write, inspect **Products → Needs attention**. These products are made to order and mapped as `IN_STOCK` to mean currently orderable; change that mapping if Merchant policy review requires a different availability state.

### Policy prerequisite before the first write

Google's current landing-page policy expects an active buy/add-to-basket control (or a comparable way to order) and requires customers to be able to complete a purchase at the submitted price. Monza's current product flow submits a build for review and does not expose a conventional online checkout. Confirm eligibility with Merchant Center support or add a compliant purchase path before enabling production sync; otherwise the offers may be disapproved even though the API payload is valid. `PREORDER` is not an appropriate workaround for an already-released made-to-order wheel, and `BACKORDER` requires a specific availability date on the landing page.

## Deployment secrets and schedule

In the Vercel project settings, add these encrypted variables to **Production** only:

- `GOOGLE_SERVICE_ACCOUNT_JSON`: complete JSON credential, stored as one secret value
- `CRON_SECRET`: a long random value used automatically by Vercel Cron as `Authorization: Bearer ...`
- `MERCHANT_SYNC_SECRET`: a separate long random value for protected manual calls
- `NEXT_PUBLIC_SITE_URL=https://www.monzawheels.com.au`

`vercel.json` calls `/api/merchant-sync` daily at 02:17 UTC (12:17 Brisbane AEST). Vercel deployment must remain paused until the reviewed dry run is approved, because the production schedule performs writes.

## Commands

```bash
# Map and validate the full catalogue without credentials or network reads.
npm run merchant:sync -- --dry-run --offline

# Authoritative dry run: reads Merchant Center and prints the exact diff, but sends no writes.
npm run merchant:sync -- --dry-run

# Intentional local write, only after approval.
MERCHANT_SYNC_ALLOW_WRITE=true npm run merchant:sync -- --apply

# Protected production manual trigger, only after approval/deployment.
curl -X POST -H "Authorization: Bearer $MERCHANT_SYNC_SECRET" \
  https://www.monzawheels.com.au/api/merchant-sync
```

Run the authenticated dry run before the first deployment. An offline dry run can validate mapping and prices, but cannot know which remote offers need patching or deletion.

## References

- [Authorize Merchant API access](https://developers.google.com/merchant/api/guides/authorization/access-your-account)
- [Register a Merchant API developer](https://developers.google.com/merchant/api/guides/quickstart/direct-api-calls#step_1_register_as_a_developer)
- [Add and manage product inputs](https://developers.google.com/merchant/api/guides/products/add-manage)
- [Patch frequently changing products](https://developers.google.com/merchant/api/guides/products/frequent-updates)
- [ProductInputs REST reference](https://developers.google.com/merchant/api/reference/rest/products_v1/accounts.productInputs)
- [Processed Products REST reference](https://developers.google.com/merchant/api/reference/rest/products_v1/accounts.products)
- [Vercel cron jobs](https://vercel.com/docs/cron-jobs)
- [Google landing-page requirements](https://support.google.com/merchants/answer/4752265)
