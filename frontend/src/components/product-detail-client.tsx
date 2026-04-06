"use client";

import Image from "next/image";
import { useState } from "react";
import type { CatalogProduct } from "@/lib/monza-data";
import { vehicleData } from "@/lib/monza-data";
import styles from "./product-detail-client.module.css";

type ProductDetailClientProps = {
  product: CatalogProduct;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeFinish, setActiveFinish] = useState(product.finishes[0]?.name ?? "");
  const [activeDiameter, setActiveDiameter] = useState(product.diameterOptions[0] ?? "");
  const [activeWidth, setActiveWidth] = useState(product.widthOptions[0] ?? "");
  // PCD, CB, and offset are optional — start unselected so customer can skip
  const [activePcd, setActivePcd] = useState("");
  const [activeOffset, setActiveOffset] = useState("");
  const [activeCentrebore, setActiveCentrebore] = useState("");

  // Car selection
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");

  const carModels = carMake && carMake !== "Other" ? Object.keys(vehicleData[carMake] ?? {}) : [];
  const carYears =
    carMake && carModel && carMake !== "Other" && carModel !== "Other"
      ? (vehicleData[carMake]?.[carModel] ?? [])
      : [];

  function handleMakeChange(make: string) {
    setCarMake(make);
    setCarModel("");
    setCarYear("");
  }

  function handleModelChange(model: string) {
    setCarModel(model);
    setCarYear("");
  }

  const activeImage = product.images[activeImageIndex] ?? product.images[0];
  const activeFinishData = product.finishes.find((finish) => finish.name === activeFinish) ?? product.finishes[0];

  function getSwatchTone(swatch: string) {
    switch (swatch.toLowerCase()) {
      case "#0f0f0f":
        return styles.swatchBlack;
      case "#2a2a2a":
        return styles.swatchGraphite;
      case "#afafad":
        return styles.swatchSilver;
      case "#b08b57":
        return styles.swatchGold;
      default:
        return styles.swatchLight;
    }
  }

  function buildQuoteUrl() {
    const params = new URLSearchParams({
      product: product.handle,
      title: product.title,
      startingPrice: product.price,
    });
    if (carMake) params.set("make", carMake);
    if (carModel) params.set("model", carModel);
    if (carYear) params.set("year", carYear);
    if (activeDiameter) params.set("diameter", activeDiameter);
    if (activeWidth) params.set("width", activeWidth);
    if (activePcd) params.set("pcd", activePcd);
    if (activeOffset) params.set("offset", activeOffset);
    if (activeCentrebore) params.set("centrebore", activeCentrebore);
    if (activeFinish) params.set("finish", activeFinish);
    return `/contact?${params.toString()}`;
  }

  const carLabel = [carMake, carModel, carYear].filter(Boolean).join(" ");

  const configParts = [
    carLabel,
    activeDiameter,
    activeWidth && `W${activeWidth}`,
    activePcd,
    activeOffset && `ET${activeOffset}`,
    activeCentrebore && `CB ${activeCentrebore}`,
    activeFinish,
  ].filter(Boolean);

  const configSummary = configParts.join(" · ");

  return (
    <section className={styles.page}>
      <div className={`${styles.grid} container`}>

        {/* ── Gallery ── */}
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

          {product.images.length > 1 ? (
            <div className={styles.thumbs} role="group" aria-label="Product gallery">
              {product.images.slice(0, 8).map((image, index) => (
                <button
                  key={`${image.url}-${index}`}
                  aria-label={`Show image ${index + 1}`}
                  className={`${styles.thumb} ${index === activeImageIndex ? styles.thumbActive : ""}`}
                  onClick={() => setActiveImageIndex(index)}
                  type="button"
                >
                  <Image
                    alt=""
                    className={styles.thumbImage}
                    src={image.url}
                    sizes="80px"
                    width={320}
                    height={320}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* ── Detail ── */}
        <div className={styles.detailColumn}>
          <div className={styles.detailPanel}>

            <div className={styles.detailHead}>
              <p className={`label ${styles.series}`}>{product.series}</p>
              <h1 className={styles.title}>{product.title}</h1>
              <p className={styles.price}>{product.price}</p>
            </div>

            <div className={styles.description}>
              <p>{product.description}</p>
            </div>

            {/* ── Your Vehicle ── */}
            <div className={styles.optionGroup}>
              <div className={styles.optionHeader}>
                <p className={`label ${styles.optionLabel}`}>Your Vehicle</p>
                {carLabel && <span className={styles.optionSelected}>{carLabel}</span>}
              </div>
              <div className={styles.vehicleSelects}>
                <select
                  aria-label="Vehicle make"
                  className={styles.vehicleSelect}
                  value={carMake}
                  onChange={(e) => handleMakeChange(e.target.value)}
                >
                  <option value="">Select make</option>
                  {Object.keys(vehicleData).map((make) => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                  <option value="Other">Other (add in notes)</option>
                </select>

                {carMake && carMake !== "Other" && (
                  <select
                    aria-label="Vehicle model"
                    className={styles.vehicleSelect}
                    value={carModel}
                    onChange={(e) => handleModelChange(e.target.value)}
                  >
                    <option value="">Select model</option>
                    {carModels.map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                    <option value="Other">Other model</option>
                  </select>
                )}

                {carModel && carModel !== "Other" && carYears.length > 0 && (
                  <select
                    aria-label="Vehicle year"
                    className={styles.vehicleSelect}
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                  >
                    <option value="">Select year</option>
                    {carYears.map((year) => (
                      <option key={year} value={String(year)}>{year}</option>
                    ))}
                  </select>
                )}
              </div>
              <p className={styles.offsetNote}>
                PCD, offset, and centre bore will be matched to your vehicle — no need to specify unless you have a preference.
              </p>
            </div>

            {/* ── Diameter ── */}
            {product.diameterOptions.length > 0 && (
              <div className={styles.optionGroup}>
                <div className={styles.optionHeader}>
                  <p className={`label ${styles.optionLabel}`}>Diameter</p>
                  {activeDiameter && <span className={styles.optionSelected}>{activeDiameter}</span>}
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
                  {activeWidth && <span className={styles.optionSelected}>{activeWidth}</span>}
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

            {/* ── Finish ── */}
            {product.finishes.length > 0 && (
              <div className={styles.optionGroup}>
                <div className={styles.optionHeader}>
                  <p className={`label ${styles.optionLabel}`}>Finish</p>
                  {activeFinish && <span className={styles.optionSelected}>{activeFinish}</span>}
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
                      <span className={`${styles.finishOption} ${activeFinish === finish.name ? styles.finishOptionActive : ""}`}>
                        <span className={styles.finishImageWrap}>
                          <Image
                            alt={finish.name}
                            className={styles.finishImage}
                            src={finish.image}
                            sizes="(max-width: 767px) 50vw, 180px"
                            width={320}
                            height={320}
                          />
                        </span>
                        <span className={styles.finishMeta}>
                          <span
                            className={`${styles.swatch} ${getSwatchTone(finish.swatch)}`}
                            title={finish.name}
                          />
                          <span className={styles.finishName}>{finish.name}</span>
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
                {activeFinishData ? (
                  <p className={styles.finishNote}>
                    Selected finish preview: {activeFinishData.name}
                  </p>
                ) : null}
              </div>
            )}

            {/* ── PCD (optional) ── */}
            {product.pcdOptions.length > 0 && (
              <div className={styles.optionGroup}>
                <div className={styles.optionHeader}>
                  <p className={`label ${styles.optionLabel}`}>PCD <span className={styles.optionalTag}>optional</span></p>
                  {activePcd && <span className={styles.optionSelected}>{activePcd}</span>}
                </div>
                <div className={styles.pills} role="radiogroup" aria-label="PCD">
                  {product.pcdOptions.map((opt) => (
                    <label key={opt} className={styles.pillItem}>
                      <input
                        aria-label={opt}
                        checked={activePcd === opt}
                        className="visually-hidden"
                        name="pcd"
                        onChange={() => setActivePcd(activePcd === opt ? "" : opt)}
                        type="radio"
                        value={opt}
                      />
                      <span className={`${styles.pill} ${activePcd === opt ? styles.pillActive : ""}`}>
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
                <p className={styles.offsetNote}>
                  {carLabel ? `We'll match PCD to your ${carLabel}.` : "Leave blank — we match PCD to your vehicle after the quote."}
                </p>
              </div>
            )}

            {/* ── Offset (optional) ── */}
            <div className={styles.optionGroup}>
              <div className={styles.optionHeader}>
                <p className={`label ${styles.optionLabel}`}>Offset (ET) <span className={styles.optionalTag}>optional</span></p>
                {product.offsetRange && (
                  <span className={styles.optionHint}>{product.offsetRange}</span>
                )}
              </div>
              <div className={styles.offsetWrap}>
                <span className={styles.offsetPrefix}>ET</span>
                <input
                  aria-label="Offset (ET value)"
                  className={styles.offsetInput}
                  inputMode="decimal"
                  name="offset"
                  onChange={(e) => setActiveOffset(e.target.value)}
                  placeholder="e.g. 35 or F 20 / R 35"
                  type="text"
                  value={activeOffset}
                />
              </div>
              <p className={styles.offsetNote}>
                {carLabel ? `Offset confirmed to your ${carLabel} after chassis review.` : "Leave blank — offset is confirmed per chassis after the quote."}
              </p>
            </div>

            {/* ── Centre bore (optional) ── */}
            {product.centreboreOptions.length > 0 && (
              <div className={styles.optionGroup}>
                <div className={styles.optionHeader}>
                  <p className={`label ${styles.optionLabel}`}>Centre Bore <span className={styles.optionalTag}>optional</span></p>
                  {activeCentrebore && <span className={styles.optionSelected}>{activeCentrebore}</span>}
                </div>
                <div className={styles.pills} role="radiogroup" aria-label="Centre bore">
                  {product.centreboreOptions.map((opt) => (
                    <label key={opt} className={styles.pillItem}>
                      <input
                        aria-label={opt}
                        checked={activeCentrebore === opt}
                        className="visually-hidden"
                        name="centrebore"
                        onChange={() => setActiveCentrebore(activeCentrebore === opt ? "" : opt)}
                        type="radio"
                        value={opt}
                      />
                      <span className={`${styles.pill} ${activeCentrebore === opt ? styles.pillActive : ""}`}>
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
                <p className={styles.offsetNote}>
                  {carLabel ? `We'll match centre bore to your ${carLabel}. Hub rings supplied where required.` : "Leave blank — matched to your vehicle. Hub rings supplied where required."}
                </p>
              </div>
            )}

            {/* ── Config summary ── */}
            {configSummary && (
              <div className={styles.configSummary}>
                <p className={styles.configLabel}>Your configuration</p>
                <p className={styles.configValue}>{configSummary}</p>
                <p className={styles.configNote}>
                  Final pricing and fitment are confirmed after chassis review.
                </p>
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
