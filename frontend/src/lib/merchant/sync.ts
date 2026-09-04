import { buildMerchantCatalogue } from "./catalogue";
import { MerchantApiClient } from "./client";
import { merchantLog } from "./logger";
import { MERCHANT_OFFER_PREFIX } from "./product-mapper";
import { reconcileProducts } from "./reconcile";
import type { SyncAction } from "./types";

export const MERCHANT_CONFIG = {
  accountId: "5848720352",
  dataSourceId: "10722188293",
  feedLabel: "AU",
  contentLanguage: "en",
} as const;

export type SyncOptions = { dryRun: boolean; offline?: boolean };

export async function syncMerchantProducts(options: SyncOptions) {
  const desired = buildMerchantCatalogue();
  const client = new MerchantApiClient(MERCHANT_CONFIG);
  const current = options.offline
    ? []
    : (await client.listProducts()).filter(
        (product) =>
          product.dataSource === client.dataSource &&
          product.contentLanguage === MERCHANT_CONFIG.contentLanguage &&
          product.feedLabel === MERCHANT_CONFIG.feedLabel &&
          product.offerId.startsWith(MERCHANT_OFFER_PREFIX),
      );
  const actions = reconcileProducts(desired, current);
  const summary = countActions(actions);

  merchantLog("info", "plan", {
    dryRun: options.dryRun,
    offline: Boolean(options.offline),
    catalogueProducts: desired.length,
    managedRemoteProducts: current.length,
    summary,
  });
  for (const action of actions) {
    merchantLog(
      "info",
      options.dryRun ? "would_change" : "change",
      actionDetails(action),
    );
  }

  if (options.dryRun) return { summary, actions };
  if (options.offline)
    throw new Error("Offline mode cannot write to Merchant Center");

  const pending = actions.filter((action) => action.kind !== "unchanged");
  for (let index = 0; index < pending.length; index += 4) {
    await Promise.all(
      pending.slice(index, index + 4).map(async (action) => {
        try {
          if (action.kind === "insert" || action.kind === "refresh")
            await client.insert(action.desired);
          if (action.kind === "patch")
            await client.patch(action.desired, action.fields);
          if (action.kind === "delete") await client.delete(action.current);
        } catch (error) {
          merchantLog("error", "action_failed", {
            ...actionDetails(action),
            error,
          });
          throw error;
        }
      }),
    );
  }
  merchantLog("info", "complete", { summary });
  return { summary, actions };
}

function actionDetails(action: SyncAction) {
  if (action.kind === "delete")
    return { action: action.kind, offerId: action.current.offerId };
  return {
    action: action.kind,
    offerId: action.desired.offerId,
    priceMicros: action.desired.productAttributes.price.amountMicros,
    ...(action.kind === "patch" ? { fields: action.fields } : {}),
  };
}

function countActions(actions: SyncAction[]) {
  return actions.reduce<Record<string, number>>(
    (counts, action) => {
      counts[action.kind] = (counts[action.kind] ?? 0) + 1;
      return counts;
    },
    { insert: 0, patch: 0, refresh: 0, delete: 0, unchanged: 0 },
  );
}
