type ShopifyResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

const shopDomain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontToken = process.env.SHOPIFY_STOREFRONT_API_TOKEN;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2025-10";

export function hasShopifyStorefrontConfig() {
  return Boolean(shopDomain && storefrontToken);
}

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  if (!hasShopifyStorefrontConfig()) {
    return null;
  }

  const response = await fetch(
    `https://${shopDomain}/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontToken as string,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error(`Shopify Storefront API request failed: ${response.status}`);
  }

  const json = (await response.json()) as ShopifyResponse<T>;

  if (json.errors?.length) {
    throw new Error(
      `Shopify Storefront API error: ${json.errors.map((error) => error.message).join(", ")}`,
    );
  }

  return json.data ?? null;
}
