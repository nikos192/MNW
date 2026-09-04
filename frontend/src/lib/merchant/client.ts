import { GoogleAuth } from "google-auth-library";
import type { MerchantProcessedProduct, MerchantProductInput } from "./types";

const API_BASE = "https://merchantapi.googleapis.com/products/v1";
const SCOPE = "https://www.googleapis.com/auth/content";

type ClientConfig = { accountId: string; dataSourceId: string };

function credentialsFromEnvironment() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (!raw) return undefined;
  try {
    const value = JSON.parse(raw) as Record<string, unknown>;
    if (
      value.type !== "service_account" ||
      !value.client_email ||
      !value.private_key
    ) {
      throw new Error("expected a service-account JSON object");
    }
    return value;
  } catch (error) {
    throw new Error(
      `GOOGLE_SERVICE_ACCOUNT_JSON is invalid: ${error instanceof Error ? error.message : "unknown parse error"}`,
    );
  }
}

export class MerchantApiClient {
  private readonly auth: GoogleAuth;
  private readonly account: string;
  readonly dataSource: string;

  constructor(config: ClientConfig) {
    this.account = `accounts/${config.accountId}`;
    this.dataSource = `${this.account}/dataSources/${config.dataSourceId}`;
    this.auth = new GoogleAuth({
      credentials: credentialsFromEnvironment(),
      scopes: [SCOPE],
    });
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const client = await this.auth.getClient();
    const token = await client.getAccessToken();
    if (!token.token)
      throw new Error("Google authentication returned no access token");
    const response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
    });
    if (!response.ok) {
      const body = await response.text();
      let message = body.slice(0, 1_000);
      try {
        const parsed = JSON.parse(body) as {
          error?: { message?: string; status?: string };
        };
        message =
          [parsed.error?.status, parsed.error?.message]
            .filter(Boolean)
            .join(": ") || message;
      } catch {
        /* response was not JSON */
      }
      throw new Error(
        `Merchant API ${response.status} ${response.statusText}: ${message}`,
      );
    }
    if (response.status === 204) return undefined as T;
    return (await response.json()) as T;
  }

  async listProducts(): Promise<MerchantProcessedProduct[]> {
    const products: MerchantProcessedProduct[] = [];
    let pageToken: string | undefined;
    do {
      const query = new URLSearchParams({ pageSize: "1000" });
      if (pageToken) query.set("pageToken", pageToken);
      const result = await this.request<{
        products?: MerchantProcessedProduct[];
        nextPageToken?: string;
      }>(`/${this.account}/products?${query}`);
      products.push(...(result.products ?? []));
      pageToken = result.nextPageToken;
    } while (pageToken);
    return products;
  }

  async insert(product: MerchantProductInput) {
    const query = new URLSearchParams({ dataSource: this.dataSource });
    return this.request(`/${this.account}/productInputs:insert?${query}`, {
      method: "POST",
      body: JSON.stringify(product),
    });
  }

  async patch(product: MerchantProductInput, fields: string[]) {
    const name = productInputName(this.account, product);
    const attributes = Object.fromEntries(
      fields.map((path) => {
        const key = path.replace(
          "productAttributes.",
          "",
        ) as keyof typeof product.productAttributes;
        return [key, product.productAttributes[key]];
      }),
    );
    const query = new URLSearchParams({
      dataSource: this.dataSource,
      updateMask: fields.join(","),
    });
    return this.request(`/${name}?${query}`, {
      method: "PATCH",
      body: JSON.stringify({ name, productAttributes: attributes }),
    });
  }

  async delete(product: MerchantProcessedProduct) {
    const name = productInputName(this.account, {
      offerId: product.offerId,
      contentLanguage: "en",
      feedLabel: "AU",
    });
    const query = new URLSearchParams({ dataSource: this.dataSource });
    return this.request<void>(`/${name}?${query}`, { method: "DELETE" });
  }
}

export function productInputName(
  account: string,
  product: Pick<
    MerchantProductInput,
    "contentLanguage" | "feedLabel" | "offerId"
  >,
) {
  const id = `${product.contentLanguage}~${product.feedLabel}~${product.offerId}`;
  return `${account}/productInputs/${Buffer.from(id).toString("base64url")}`;
}
