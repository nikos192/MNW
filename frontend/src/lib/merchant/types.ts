export type MerchantPrice = {
  amountMicros: string;
  currencyCode: "AUD";
};

export type MerchantProductAttributes = {
  title: string;
  description: string;
  link: string;
  imageLink: string;
  price: MerchantPrice;
  availability: "IN_STOCK";
  condition: "NEW";
  brand: "MonzaWheels";
  identifierExists: false;
};

export type MerchantProductInput = {
  name?: string;
  offerId: string;
  contentLanguage: "en";
  feedLabel: "AU";
  productAttributes: MerchantProductAttributes;
};

export type MerchantProcessedProduct = {
  name: string;
  base64EncodedName?: string;
  offerId: string;
  contentLanguage: string;
  feedLabel: string;
  dataSource: string;
  productAttributes?: Partial<MerchantProductAttributes>;
  productStatus?: {
    lastUpdateDate?: string;
    itemLevelIssues?: Array<{
      code?: string;
      description?: string;
      severity?: string;
    }>;
  };
};

export type SyncAction =
  | { kind: "insert"; desired: MerchantProductInput }
  | {
      kind: "patch";
      desired: MerchantProductInput;
      current: MerchantProcessedProduct;
      fields: string[];
    }
  | {
      kind: "refresh";
      desired: MerchantProductInput;
      current: MerchantProcessedProduct;
    }
  | { kind: "delete"; current: MerchantProcessedProduct }
  | {
      kind: "unchanged";
      desired: MerchantProductInput;
      current: MerchantProcessedProduct;
    };
