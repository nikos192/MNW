import Image from "next/image";
import Link from "next/link";
import { formatAud, priceRangeForSeries, type CatalogProduct } from "@/lib/monza-data";
import styles from "./product-card.module.css";

type ProductCardProps = {
  product: CatalogProduct;
  imageLoading?: "eager" | "lazy";
};

export function ProductCard({ product, imageLoading = "lazy" }: ProductCardProps) {
  const secondaryImage = product.images[1]?.url || product.images[0]?.url;
  const tierRange = priceRangeForSeries(product.series);
  const primaryPrice = tierRange
    ? `From AUD ${formatAud(tierRange.minPerSet)} / set`
    : product.price.replace(/^From\s*/i, "");

  return (
    <article className={styles.card} data-reveal>
      <Link className={styles.link} href={`/shop/${product.handle}`}>
        <div className={styles.media}>
          {product.images[0] ? (
            <>
              <Image
                alt={product.images[0].alt}
                className={`${styles.image} ${styles.primary}`}
                loading={imageLoading}
                src={product.images[0].url}
                sizes="(max-width: 1024px) 50vw, 33vw"
                width={1200}
                height={1200}
              />
              {secondaryImage ? (
                <Image
                  alt={product.images[1]?.alt || `${product.title} alternate view`}
                  className={`${styles.image} ${styles.secondary}`}
                  loading={imageLoading}
                  src={secondaryImage}
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  width={1200}
                  height={1200}
                />
              ) : null}
            </>
          ) : (
            <div className={styles.placeholder} aria-hidden="true" />
          )}
        </div>

        <div className={styles.meta}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.price}>{primaryPrice}</p>
        </div>
      </Link>
    </article>
  );
}
