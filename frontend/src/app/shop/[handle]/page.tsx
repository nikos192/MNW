import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/product-detail-client";
import { getCatalogProduct } from "@/lib/catalog";
import { DEFAULT_OG_IMAGE, jsonLd, productJsonLd } from "@/lib/seo";

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
    title: `${product.title} Forged Wheel`,
    description: `${product.shortDescription} View specs, finishes, lead time, and quote-ready fitment guidance for ${product.title}.`,
    alternates: {
      canonical: `/shop/${product.handle}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      url: `/shop/${product.handle}`,
      title: `${product.title} | ${product.series}`,
      description: product.shortDescription,
      images: product.images[0]
        ? [
            {
              url: product.images[0].url,
              alt: product.images[0].alt,
            },
          ]
        : [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | ${product.series}`,
      description: product.shortDescription,
      images: [product.images[0]?.url ?? DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getCatalogProduct(handle);

  if (!product) {
    notFound();
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productJsonLd(product))} />
      <ProductDetailClient product={product} />
    </>
  );
}