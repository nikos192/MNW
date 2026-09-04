import type {
  MerchantProcessedProduct,
  MerchantProductAttributes,
  MerchantProductInput,
  SyncAction,
} from "./types.ts";

export const REFRESH_AFTER_DAYS = 25;

const ATTRIBUTE_FIELDS = [
  "title",
  "description",
  "link",
  "imageLink",
  "price",
  "availability",
  "condition",
  "brand",
  "identifierExists",
] as const satisfies readonly (keyof MerchantProductAttributes)[];

function equalValue(left: unknown, right: unknown) {
  return JSON.stringify(left) === JSON.stringify(right);
}

export function changedAttributeFields(
  desired: MerchantProductAttributes,
  current: Partial<MerchantProductAttributes> | undefined,
): string[] {
  return ATTRIBUTE_FIELDS.filter(
    (field) => !equalValue(desired[field], current?.[field]),
  ).map((field) => `productAttributes.${field}`);
}

export function reconcileProducts(
  desired: MerchantProductInput[],
  current: MerchantProcessedProduct[],
  now = new Date(),
): SyncAction[] {
  const currentByOfferId = new Map(
    current.map((product) => [product.offerId, product]),
  );
  const desiredIds = new Set(desired.map((product) => product.offerId));
  const actions: SyncAction[] = [];

  for (const product of desired) {
    const existing = currentByOfferId.get(product.offerId);
    if (!existing) {
      actions.push({ kind: "insert", desired: product });
      continue;
    }
    const fields = changedAttributeFields(
      product.productAttributes,
      existing.productAttributes,
    );
    if (fields.length > 0) {
      actions.push({
        kind: "patch",
        desired: product,
        current: existing,
        fields,
      });
      continue;
    }
    const lastUpdate = existing.productStatus?.lastUpdateDate;
    const ageMs = lastUpdate
      ? now.getTime() - new Date(lastUpdate).getTime()
      : Number.POSITIVE_INFINITY;
    if (!Number.isFinite(ageMs) || ageMs >= REFRESH_AFTER_DAYS * 86_400_000) {
      actions.push({ kind: "refresh", desired: product, current: existing });
    } else {
      actions.push({ kind: "unchanged", desired: product, current: existing });
    }
  }

  for (const product of current) {
    if (!desiredIds.has(product.offerId))
      actions.push({ kind: "delete", current: product });
  }
  return actions;
}
