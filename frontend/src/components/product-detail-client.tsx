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
  const [activeDiameter, setActiveDiameter] = useState(product.diameterOptions[0] ?? "");
  const [activeWidth, setActiveWidth] = useState(product.widthOptions[0] ?? "");
  const [activePcd, setActivePcd] = useState(product.pcdOptions[0] ?? "");

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

  function buildQuoteUrl() {
    const params = new URLSearchParams({
      product: product.handle,
      title: product.title,
    });
    if (activeDiameter) params.set("diameter", activeDiameter);
    if (activeWidth) params.set("width", activeWidth);
    if (activePcd) params.set("pcd", activePcd);
    if (activeFinish) params.set("finish", activeFinish);
    return `/contact?${params.toString()}`;
  }

  const configSummary = [activeDiameter, activeWidth, activePcd, activeFinish]
    .filter(Boolean)
    .join(" · ");

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
                priority
              />
            ) : (
              <div className={styles.primaryPlaceholder} aria-hidden="true" />
            )}
          </div>

          {product.images.length > 0 ? (
            <div className={styles.thumbs} role="group" aria-label="Product gallery">
              {product.images.slice(0, 4).map((image, index) => (
                <button
                  key={`${image.url}-${index}`}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={index === activeImageIndex ? "true" : "false"}
                  className={`${styles.thumb} ${index === activeImageIndex ? styles.thumbActive : ""}`}
                  onClick={() => setActiveImageIndex(index)}
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
            <div className={styles.detailHead}>
              <p className={`label ${styles.series}`}>{product.series}</p>
              <h1 className={styles.title}>{product.title}</h1>
              <p className={styles.price}>From {product.price} / set</p>
            </div>

            <div className={styles.description}>
              <p>{product.description}</p>
            </div>

            {/* ── Diameter ── */}
            {product.diameterOptions.length > 0 && (
              <div className={styles.optionGroup}>
                <div className={styles.optionHeader}>
                  <p className={`label ${styles.optionLabel}`}>Diameter</p>
                  {activeDiameter && (
                    <span className={styles.optionSelected}>{activeDiameter}</span>
                  )}
                </div>
                <div className={styles.pills} role="radiogroup" aria-label="Diameter">
                  {product.diameterOptions.map((opt) => (
                    <label key={opt} className={styles.pillItem}>
                      <input
                        aria-label={opt}
                        checked={activeDiameter === opt}
                        className="visually-hidden"
                        name="diameter"
                        onChange={() => setActiveDiameter(opt)}
                        type="radio"
                        value={opt}
                      />
                      <span className={`${styles.pill} ${activeDiameter === opt ? styles.pillActive : ""}`}>
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ── Width ── */}
            {product.widthOptions.length > 0 && (
              <div className={styles.optionGroup}>
                <div className={styles.optionHeader}>
                  <p className={`label ${styles.optionLabel}`}>Width</p>
                  {activeWidth && (
                    <span className={styles.optionSelected}>{activeWidth}</span>
                  )}
                </div>
                <div className={styles.pills} role="radiogroup" aria-label="Width">
                  {product.widthOptions.map((opt) => (
                    <label key={opt} className={styles.pillItem}>
                      <input
                        aria-label={opt}
                        checked={activeWidth === opt}
                        className="visually-hidden"
                        name="width"
                        onChange={() => setActiveWidth(opt)}
                        type="radio"
                        value={opt}
                      />
                      <span className={`${styles.pill} ${activeWidth === opt ? styles.pillActive : ""}`}>
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ── PCD ── */}
            {product.pcdOptions.length > 0 && (
              <div className={styles.optionGroup}>
                <div className={styles.optionHeader}>
                  <p className={`label ${styles.optionLabel}`}>PCD</p>
                  {activePcd && (
                    <span className={styles.optionSelected}>{activePcd}</span>
                  )}
                </div>
                <div className={styles.pills} role="radiogroup" aria-label="PCD">
                  {product.pcdOptions.map((opt) => (
                    <label key={opt} className={styles.pillItem}>
                      <input
                        aria-label={opt}
                        checked={activePcd === opt}
                        className="visually-hidden"
                        name="pcd"
                        onChange={() => setActivePcd(opt)}
                        type="radio"
                        value={opt}
                      />
                      <span className={`${styles.pill} ${activePcd === opt ? styles.pillActive : ""}`}>
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ── Finish ── */}
            {product.finishes.length > 0 && (
              <div className={styles.optionGroup}>
                <div className={styles.optionHeader}>
                  <p className={`label ${styles.optionLabel}`}>Finish</p>
                  {activeFinish && (
                    <span className={styles.optionSelected}>{activeFinish}</span>
                  )}
                </div>
                <div className={styles.swatches} role="radiogroup" aria-label="Finish">
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
                      <span
                        className={`${styles.swatch} ${getSwatchTone(finish.swatch)}`}
                        title={finish.name}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ── Config summary ── */}
            {configSummary && (
              <div className={styles.configSummary}>
                <p className={styles.configLabel}>Your configuration</p>
                <p className={styles.configValue}>{configSummary}</p>
                {product.offsetRange && (
                  <p className={styles.configNote}>
                    Offset resolved per chassis after the brief.
                  </p>
                )}
              </div>
            )}

            {/* ── Specs ── */}
            <div className={styles.specs}>
              {product.specs.map((spec) => (
                <div key={spec.label} className={styles.specRow}>
                  <span className={styles.specKey}>{spec.label}</span>
                  <span className={styles.specValue}>{spec.value}</span>
                </div>
              ))}
            </div>

            <div className={styles.cta}>
              <a className={styles.quoteButton} href={buildQuoteUrl()}>
                Request a Quote
              </a>
              <p className={styles.leadTime}>
                Lead time {product.leadTime} &nbsp;·&nbsp; Made to order
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
