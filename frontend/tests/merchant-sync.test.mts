import assert from "node:assert/strict";
import test from "node:test";
import {
  audToMicros,
  mapProductToMerchant,
} from "../src/lib/merchant/product-mapper.ts";
import { reconcileProducts } from "../src/lib/merchant/reconcile.ts";
import type { CatalogProduct } from "../src/lib/monza-data.ts";
import type {
  MerchantProcessedProduct,
  MerchantProductInput,
} from "../src/lib/merchant/types.ts";

const fixture = {
  id: "wheel-mw-11",
  handle: "MW-11",
  title: 'MW-11 "Serraglio"',
  description:
    "A forged 6061-T6 monoblock wheel made to the confirmed vehicle fitment.",
  images: [{ url: "/products/MW-11.png", alt: "MW-11 wheel" }],
} as CatalogProduct;

test("AUD prices are converted to integer micros without floating-point leakage", () => {
  assert.equal(audToMicros(1), "1000000");
  assert.equal(audToMicros(3250.75), "3250750000");
  assert.equal(audToMicros(2749.604), "2749600000");
  assert.throws(() => audToMicros(Number.NaN), /positive finite/);
  assert.throws(() => audToMicros(0), /positive finite/);
});

test("catalogue products map to a stable AU ProductInput", () => {
  const result = mapProductToMerchant(fixture, 3_245);
  assert.equal(result.offerId, "monza-mw-11");
  assert.equal(result.contentLanguage, "en");
  assert.equal(result.feedLabel, "AU");
  assert.equal(
    result.productAttributes.link,
    "https://www.monzawheels.com.au/shop/MW-11",
  );
  assert.equal(
    result.productAttributes.imageLink,
    "https://www.monzawheels.com.au/products/MW-11.png",
  );
  assert.deepEqual(result.productAttributes.price, {
    amountMicros: "3245000000",
    currencyCode: "AUD",
  });
  assert.equal(result.productAttributes.identifierExists, false);
});

test("malformed catalogue products fail before submission", () => {
  assert.throws(
    () => mapProductToMerchant({ ...fixture, images: [] }, 3_245),
    /primary image are required/,
  );
  assert.throws(() => mapProductToMerchant(fixture, -1), /positive finite/);
});

function currentFrom(
  desired: MerchantProductInput,
  overrides: Partial<MerchantProcessedProduct> = {},
): MerchantProcessedProduct {
  return {
    name: `accounts/1/products/en~AU~${desired.offerId}`,
    offerId: desired.offerId,
    contentLanguage: "en",
    feedLabel: "AU",
    dataSource: "accounts/1/dataSources/2",
    productAttributes: desired.productAttributes,
    productStatus: { lastUpdateDate: "2026-08-30T00:00:00Z" },
    ...overrides,
  };
}

test("reconciliation inserts, patches, deletes and preserves current products", () => {
  const unchanged = mapProductToMerchant(fixture, 3_245);
  const changed = mapProductToMerchant({ ...fixture, handle: "MW-12" }, 3_245);
  const inserted = mapProductToMerchant({ ...fixture, handle: "MW-13" }, 3_245);
  const removed = mapProductToMerchant({ ...fixture, handle: "MW-99" }, 3_245);
  const actions = reconcileProducts(
    [unchanged, changed, inserted],
    [
      currentFrom(unchanged),
      currentFrom(changed, {
        productAttributes: { ...changed.productAttributes, title: "Old title" },
      }),
      currentFrom(removed),
    ],
    new Date("2026-09-04T00:00:00Z"),
  );
  assert.deepEqual(
    actions.map((action) => action.kind),
    ["unchanged", "patch", "insert", "delete"],
  );
  const patch = actions.find((action) => action.kind === "patch");
  assert.deepEqual(patch?.fields, ["productAttributes.title"]);
});

test("unchanged products older than 25 days are reinserted for refresh", () => {
  const desired = mapProductToMerchant(fixture, 3_245);
  const actions = reconcileProducts(
    [desired],
    [
      currentFrom(desired, {
        productStatus: { lastUpdateDate: "2026-07-01T00:00:00Z" },
      }),
    ],
    new Date("2026-09-04T00:00:00Z"),
  );
  assert.equal(actions[0]?.kind, "refresh");
});
