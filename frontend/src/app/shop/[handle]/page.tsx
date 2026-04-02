import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/product-detail-client";
import { getCatalogProduct } from "@/lib/catalog";

type ProductPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getCatalogProduct(handle);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.title,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getCatalogProduct(handle);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}