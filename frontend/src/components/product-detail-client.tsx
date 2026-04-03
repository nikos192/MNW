"use client";

import Image from "next/image";
import { useState } from "react";
import type { CatalogProduct } from "@/lib/monza-data";
import styles from "./product-detail-client.module.css";

type ProductDetailClientProps = {
  product: CatalogProduct;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeFinish, setActiveFinish] = useState(product.finishes[0]?.name ?? "");
  const activeImage = product.images[activeImageIndex] ?? product.images[0];

  function getSwatchTone(swatch: string) {
    switch (swatch.toLowerCase()) {
      case "#0f0f0f":
        return styles.swatchBlack;
      case "#2a2a2a":
        return styles.swatchGraphite;
      case "#afafad":
        return styles.swatchSilver;
      default:
        return styles.swatchLight;
    }
  }

  return (
    <section className={styles.page}>
      <div className={`${styles.grid} container`}>
        <div className={styles.gallery}>
          <div className={styles.primaryMedia}>
            {activeImage ? (
              <Image
                alt={activeImage.alt}
                className={styles.primaryImage}
                src={activeImage.url}
                sizes="(max-width: 1024px) 100vw, 60vw"
                width={1800}
                height={1800}
              />
            ) : (
              <div className={styles.primaryPlaceholder} aria-hidden="true" />
            )}
          </div>

          {product.images.length > 0 ? (
            <div className={styles.thumbs} aria-label="Product gallery">
              {product.images.slice(0, 4).map((image, index) => (
                <button
                  key={`${image.url}-${index}`}
                  aria-label={`Show image ${index + 1}`}
                  className={`${styles.thumb} ${index === activeImageIndex ? styles.thumbActive : ""}`}
                  onClick={() => setActiveImageIndex(index)}
                  title={`Show image ${index + 1}`}
                  type="button"
                >
                  <Image
                    alt=""
                    className={styles.thumbImage}
                    src={image.url}
                    sizes="(max-width: 767px) 50vw, 120px"
                    width={480}
                    height={480}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className={styles.detailColumn}>
          <div className={styles.detailPanel}>
            <p className={`label ${styles.series}`}>{product.series}</p>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.price}>From {product.price} / set</p>
            <div className={styles.description}>
              <p>{product.description}</p>
            </div>

            {product.finishes.length ? (
              <div className={styles.finishGroup}>
                <p className={`label ${styles.finishLabel}`}>Finish</p>
                <div className={styles.swatches} role="radiogroup" aria-label="Finish selector">
                  {product.finishes.map((finish) => (
                    <label key={finish.name} className={styles.swatchItem}>
                      <input
                        aria-label={finish.name}
                        checked={activeFinish === finish.name}
                        className="visually-hidden"
                        name="finish"
                        onChange={() => setActiveFinish(finish.name)}
                        type="radio"
                        value={finish.name}
                      />
                      <span className={`${styles.swatch} ${getSwatchTone(finish.swatch)}`} />
                    </label>
                  ))}
                </div>
                <p
                  className={`${styles.finishName} ${activeFinish ? styles.finishNameVisible : ""}`}
                >
                  {activeFinish}
                </p>
              </div>
            ) : null}

            <div className={styles.specs}>
              {product.specs.map((spec) => (
                <div key={spec.label} className={styles.specRow}>
                  <span className={styles.specKey}>{spec.label}</span>
                  <span className={styles.specValue}>{spec.value}</span>
                </div>
              ))}
            </div>

            <a
              className={styles.quoteButton}
              href={`/contact?product=${encodeURIComponent(product.handle)}&title=${encodeURIComponent(product.title)}`}
            >
              Request a Quote
            </a>
            <p className={styles.leadTime}>
              Lead time {product.leadTime} &nbsp;·&nbsp; Made to order
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}