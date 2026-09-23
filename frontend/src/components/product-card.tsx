import Image from "next/image";
import Link from "next/link";
import { formatAud, type CatalogProduct } from "@/lib/monza-data";
import { priceRangeForSeries } from "@/lib/wheel-pricing";
import styles from "./product-card.module.css";

type ProductCardProps = {
  product: CatalogProduct;
  imageLoading?: "eager" | "lazy";
};

export function ProductCard({
  product,
  imageLoading = "lazy",
}: ProductCardProps) {
  const secondaryImage = product.images[1]?.url || product.images[0]?.url;
  const showsWholeWheel = product.handle === "MW-213";
  const imageFitClass = showsWholeWheel ? styles.wholeWheelFit : "";
  const tierRange = priceRangeForSeries(product.series);
  const primaryPrice = tierRange
    ? `From AUD ${formatAud(tierRange.minPerSet)} / set inc. GST`
    : product.price.replace(/^From\s*/i, "");

  return (
    <article className={styles.card} data-reveal>
      <Link className={styles.link} href={`/shop/${product.handle}`}>
        <div
          className={`${styles.media} ${showsWholeWheel ? styles.extendedCanvas : ""}`}
        >
          {product.images[0] ? (
            <>
              <Image
                alt={product.images[0].alt}
                className={`${styles.image} ${styles.primary} ${imageFitClass}`}
                loading={imageLoading}
                src={product.images[0].url}
                sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                width={1200}
                height={1200}
              />
              {secondaryImage ? (
                <Image
                  alt={
                    product.images[1]?.alt || `${product.title} alternate view`
                  }
                  className={`${styles.image} ${styles.secondary} ${imageFitClass}`}
                  loading={imageLoading}
                  src={secondaryImage}
                  sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
          <div className={styles.metaTopline}>
            <h3 className={styles.title}>{product.title}</h3>
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
          </div>
          <div className={styles.classification}>
            <p className={styles.designSeries}>{product.designSeries} Series</p>
            <p className={styles.construction}>
              {product.series === "2-Piece Forged"
                ? "Two-Piece Forged"
                : "Monoblock Forged"}
            </p>
          </div>
          <p className={styles.description}>{product.shortDescription}</p>
          <div className={styles.cardFooter}>
            <div className={styles.priceGroup}>
              <p className={styles.price}>{primaryPrice}</p>
            </div>
            <span className={styles.viewLabel}>View wheel</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
