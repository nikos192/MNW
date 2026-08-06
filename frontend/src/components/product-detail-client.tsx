"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ConversionLink } from "@/components/conversion-link";
import type { CatalogProduct, VehicleFitment } from "@/lib/monza-data";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { expressAirShippingIncGstAud } from "@/lib/pricing-formulas";
import {
  CUSTOM_FINISH_PRICE_AUD_PER_WHEEL,
  customFinishOptions,
  formatAud,
  getVehicleFitment,
  vehicleData,
} from "@/lib/monza-data";
import {
  constructionFromSeries,
  getWidthOptions,
  priceForDiameter,
  priceRangeForSeries,
} from "@/lib/wheel-pricing";
import styles from "./product-detail-client.module.css";

type ProductDetailClientProps = {
  product: CatalogProduct;
};

function diameterToInt(value: string): number {
  return parseInt(value, 10);
}

function diameterOptionsForFitment(
  diameterOptions: string[],
  fitment: VehicleFitment | null,
) {
  if (!fitment) return diameterOptions;
  return diameterOptions.filter((opt) => {
    const num = diameterToInt(opt);
    return num >= fitment.minDiameter && num <= fitment.maxDiameter;
  });
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const hasTrackedView = useRef(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeFinish, setActiveFinish] = useState(product.finishes[0]?.name ?? "");
  // Diameter / width are tracked per axle so customers can build staggered sets.
  // When isStaggered is false, only the front picker is shown and we mirror its
  // value into the rear state on each pick.
  const [isStaggered, setIsStaggered] = useState(false);
  const [activeDiameterFront, setActiveDiameterFront] = useState(product.diameterOptions[0] ?? "");
  const [activeDiameterRear, setActiveDiameterRear] = useState(product.diameterOptions[0] ?? "");
  const [activeWidthFront, setActiveWidthFront] = useState(product.widthOptions[0] ?? "");
  const [activeWidthRear, setActiveWidthRear] = useState(product.widthOptions[0] ?? "");
  // PCD, CB, and offset are optional — start unselected so customer can skip
  const [activePcd, setActivePcd] = useState("");
  const [activeOffset, setActiveOffset] = useState("");
  const [activeCentrebore, setActiveCentrebore] = useState("");

  // Centre cap colour — Black/White logos plus a custom text fallback.
  const [capColour, setCapColour] = useState<"Black" | "White" | "Custom">("Black");
  const [capColourCustom, setCapColourCustom] = useState("");

  useEffect(() => {
    if (hasTrackedView.current) return;

    trackMetaEvent("ViewContent", {
      content_ids: [product.handle],
      content_name: product.title,
      content_type: "product",
    });
    hasTrackedView.current = true;
  }, [product.handle, product.title]);

  function validWidthsForDiameter(value: string): string[] {
    const construction = constructionFromSeries(product.series);
    const parsedDiameter = Number.parseInt(value, 10);
    if (!construction || !Number.isFinite(parsedDiameter)) return product.widthOptions;
    const bands = getWidthOptions(construction, parsedDiameter);
    return product.widthOptions.filter((option) => {
      const parsedWidth = Number.parseFloat(option);
      return bands.some(
        (band) => parsedWidth >= band.minWidth && parsedWidth <= band.maxWidth,
      );
    });
  }

  function pickDiameter(value: string, axle: "front" | "rear") {
    const validWidths = validWidthsForDiameter(value);
    if (isStaggered) {
      if (axle === "front") {
        setActiveDiameterFront(value);
        if (!validWidths.includes(activeWidthFront)) setActiveWidthFront(validWidths[0] ?? "");
      } else {
        setActiveDiameterRear(value);
        if (!validWidths.includes(activeWidthRear)) setActiveWidthRear(validWidths[0] ?? "");
      }
    } else {
      setActiveDiameterFront(value);
      setActiveDiameterRear(value);
      const nextWidth = validWidths.includes(activeWidthFront)
        ? activeWidthFront
        : validWidths[0] ?? "";
      setActiveWidthFront(nextWidth);
      setActiveWidthRear(nextWidth);
    }
  }

  function pickWidth(value: string, axle: "front" | "rear") {
    if (isStaggered) {
      if (axle === "front") setActiveWidthFront(value);
      else setActiveWidthRear(value);
    } else {
      setActiveWidthFront(value);
      setActiveWidthRear(value);
    }
  }

  function toggleStaggered(next: boolean) {
    setIsStaggered(next);
    if (!next) {
      // Collapsing back to square — sync the rear to the front so the single
      // picker shows the right value.
      setActiveDiameterRear(activeDiameterFront);
      setActiveWidthRear(activeWidthFront);
    }
  }

  // Car selection
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");

  const [includeCustomFinish, setIncludeCustomFinish] = useState(false);
  const [includeExpressShipping, setIncludeExpressShipping] = useState(false);

  const carModels = carMake && carMake !== "Other" ? Object.keys(vehicleData[carMake] ?? {}) : [];
  const carYears =
    carMake && carModel && carMake !== "Other" && carModel !== "Other"
      ? (vehicleData[carMake]?.[carModel] ?? [])
      : [];

  const fitment = getVehicleFitment(carMake, carModel);
  const collectionHref = product.series === "1-Piece Forged"
    ? "/collections/monoblock"
    : "/collections/multi-piece";
  const collectionLabel = product.series === "1-Piece Forged" ? "Monoblock" : "Multi-Piece";

  const filteredDiameterOptions = useMemo(
    () => diameterOptionsForFitment(product.diameterOptions, fitment),
    [fitment, product.diameterOptions],
  );

  function handleMakeChange(make: string) {
    setCarMake(make);
    setCarModel("");
    setCarYear("");
  }

  function handleModelChange(model: string) {
    setCarModel(model);
    setCarYear("");
    const nextDiameterOptions = diameterOptionsForFitment(
      product.diameterOptions,
      getVehicleFitment(carMake, model),
    );
    const fallbackDiameter = nextDiameterOptions[0];
    if (!fallbackDiameter) return;
    setActiveDiameterFront((current) =>
      nextDiameterOptions.includes(current) ? current : fallbackDiameter,
    );
    setActiveDiameterRear((current) =>
      nextDiameterOptions.includes(current) ? current : fallbackDiameter,
    );
    const fallbackWidths = validWidthsForDiameter(fallbackDiameter);
    setActiveWidthFront((current) =>
      fallbackWidths.includes(current) ? current : fallbackWidths[0] ?? "",
    );
    setActiveWidthRear((current) =>
      fallbackWidths.includes(current) ? current : fallbackWidths[0] ?? "",
    );
  }

  const activeImage = product.images[activeImageIndex] ?? product.images[0];
  const frontWidthOptions = validWidthsForDiameter(activeDiameterFront);
  const rearWidthOptions = validWidthsForDiameter(activeDiameterRear);
  const tierRange = priceRangeForSeries(product.series);
  const chassisRange = fitment
    ? priceRangeForSeries(product.series, fitment.minDiameter, fitment.maxDiameter)
    : null;
  const activeRange = chassisRange ?? tierRange;
  const formatRange = (range: { minPerSet: number; maxPerSet: number; minPerWheel: number; maxPerWheel: number }) => {
    if (range.minPerSet === range.maxPerSet) {
      return {
        set: `AUD ${formatAud(range.minPerSet)} / set inc. GST & free standard shipping`,
        wheel: `AUD ${formatAud(range.minPerWheel)} per wheel`,
      };
    }
    return {
      set: `AUD ${formatAud(range.minPerSet)} – ${formatAud(range.maxPerSet)} / set inc. GST & free standard shipping`,
      wheel: `AUD ${formatAud(range.minPerWheel)} – ${formatAud(range.maxPerWheel)} per wheel`,
    };
  };
  const formattedActiveRange = activeRange ? formatRange(activeRange) : null;
  const headlinePrice = formattedActiveRange
    ? chassisRange
      ? formattedActiveRange.set
      : `From ${formattedActiveRange.set}`
    : product.price.replace(/^From\s*/i, "");
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

  // When fitment is known, prefer the auto-matched values for the quote payload.
  const resolvedPcd = fitment?.pcd ?? activePcd;
  const resolvedCentrebore = fitment?.centreBore ?? activeCentrebore;

  // Compact display strings — staggered builds collapse to "front / rear",
  // square builds show a single value.
  const displayDiameter = isStaggered
    ? `${activeDiameterFront} F / ${activeDiameterRear} R`
    : activeDiameterFront;
  const displayWidth = isStaggered
    ? `${activeWidthFront} F / ${activeWidthRear} R`
    : activeWidthFront;
  const formattedCapColour =
    capColour === "Custom"
      ? capColourCustom.trim()
        ? `Custom: ${capColourCustom.trim()}`
        : "Custom (to confirm)"
      : capColour;

  function buildQuoteUrl() {
    const estimateExtras = [
      "centre caps incl.",
      isStaggered ? "staggered" : null,
      includeCustomFinish && isOnePiece ? "custom finish" : null,
      includeExpressShipping ? "express air shipping" : "free standard shipping",
    ].filter(Boolean);
    const quotedPrice = estimatedTotal !== null
      ? `Est. AUD ${formatAud(estimatedTotal)} / set (${estimateExtras.join(", ")})`
      : formattedActiveRange
        ? `${formattedActiveRange.set} (${formattedActiveRange.wheel})`
        : product.price;
    const params = new URLSearchParams({
      product: product.handle,
      title: product.title,
      startingPrice: quotedPrice,
    });
    if (carMake) params.set("make", carMake);
    if (carModel) params.set("model", carModel);
    if (carYear) params.set("year", carYear);
    if (displayDiameter) params.set("diameter", displayDiameter);
    if (displayWidth) params.set("width", displayWidth);
    if (resolvedPcd) params.set("pcd", resolvedPcd);
    if (activeOffset) params.set("offset", activeOffset);
    if (resolvedCentrebore) params.set("centrebore", resolvedCentrebore);
    if (activeFinish) params.set("finish", activeFinish);
    if (formattedCapColour) params.set("capColour", formattedCapColour);
    return `/contact?${params.toString()}`;
  }

  const carLabel = [carMake, carModel, carYear].filter(Boolean).join(" ");

  const configParts = [
    carLabel,
    displayDiameter,
    displayWidth && `W${displayWidth}`,
    resolvedPcd,
    activeOffset && `ET${activeOffset}`,
    resolvedCentrebore && `CB ${resolvedCentrebore}`,
    activeFinish,
    formattedCapColour && `Cap ${formattedCapColour}`,
  ].filter(Boolean);

  const configSummary = configParts.join(" · ");

  // Live estimate based on the customer's current selections.
  // Centre caps are bundled into every wheel set; only custom finish is an extra.
  const isOnePiece = product.series === "1-Piece Forged";
  const frontDiameterNum = activeDiameterFront ? parseInt(activeDiameterFront, 10) : NaN;
  const rearDiameterNum = activeDiameterRear ? parseInt(activeDiameterRear, 10) : NaN;
  const frontPerWheelPrice = Number.isFinite(frontDiameterNum)
    ? priceForDiameter(product.series, frontDiameterNum, activeWidthFront)
    : null;
  const rearPerWheelPrice = Number.isFinite(rearDiameterNum)
    ? priceForDiameter(product.series, rearDiameterNum, activeWidthRear)
    : null;
  // Square fitment uses the front price × 4. Staggered = 2 × front + 2 × rear.
  const wheelOnlySubtotal = (() => {
    if (!isStaggered) return frontPerWheelPrice !== null ? frontPerWheelPrice * 4 : null;
    if (frontPerWheelPrice === null || rearPerWheelPrice === null) return null;
    return frontPerWheelPrice * 2 + rearPerWheelPrice * 2;
  })();
  const customFinishSubtotal = includeCustomFinish && isOnePiece ? CUSTOM_FINISH_PRICE_AUD_PER_WHEEL * 4 : 0;
  const expressShippingSubtotal = includeExpressShipping
    ? expressAirShippingIncGstAud()
    : 0;
  const estimatedTotal = wheelOnlySubtotal !== null
    ? wheelOnlySubtotal + customFinishSubtotal + expressShippingSubtotal
    : null;

  return (
    <main className={styles.page}>
      <nav className="breadcrumbs container" aria-label="Breadcrumb">
        <Link className="breadcrumb-link" href="/">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link className="breadcrumb-link" href="/shop">
          Wheels
        </Link>
        <span aria-hidden="true">/</span>
        <Link className="breadcrumb-link" href={collectionHref}>
          {collectionLabel}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="breadcrumb-current" aria-current="page">
          {product.title}
        </span>
      </nav>

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
                  aria-label={`Show ${image.alt || `${product.title} view ${index + 1}`}`}
                  className={`${styles.thumb} ${index === activeImageIndex ? styles.thumbActive : ""}`}
                  onClick={() => setActiveImageIndex(index)}
                  type="button"
                >
                  <Image
                    alt={image.alt || `${product.title} view ${index + 1}`}
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
              <p className={styles.price}>{headlinePrice}</p>
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
              {fitment ? (
                <div className={styles.autoFitment}>
                  <div className={styles.autoFitmentItem}>
                    <span className={styles.autoFitmentLabel}>PCD</span>
                    <span className={styles.autoFitmentValue}>{fitment.pcd}</span>
                  </div>
                  <div className={styles.autoFitmentItem}>
                    <span className={styles.autoFitmentLabel}>Centre bore</span>
                    <span className={styles.autoFitmentValue}>{fitment.centreBore}</span>
                  </div>
                  <p className={styles.autoFitmentNote}>
                    Matched to your {carLabel || `${carMake} ${carModel}`.trim()}. Offset is confirmed per build after chassis review.
                  </p>
                </div>
              ) : (
                <p className={styles.offsetNote}>
                  PCD, offset, and centre bore will be matched to your vehicle — no need to specify unless you have a preference.
                </p>
              )}
            </div>

            {/* ── Staggered toggle ── */}
            <div className={styles.optionGroup}>
              <label className={styles.staggeredToggle}>
                <input
                  type="checkbox"
                  checked={isStaggered}
                  onChange={(event) => toggleStaggered(event.target.checked)}
                />
                <span className={styles.staggeredToggleText}>
                  <span className={styles.staggeredToggleLabel}>Staggered fitment</span>
                  <span className={styles.staggeredToggleHint}>
                    Different sizes front and rear (e.g. 19F / 20R)
                  </span>
                </span>
              </label>
            </div>

            {/* ── Diameter ── */}
            {filteredDiameterOptions.length > 0 && (
              <div className={styles.optionGroup}>
                <div className={styles.optionHeader}>
                  <p className={`label ${styles.optionLabel}`}>Diameter</p>
                  {displayDiameter && <span className={styles.optionSelected}>{displayDiameter}</span>}
                </div>
                {isStaggered ? (
                  <div className={styles.axleStack}>
                    <div className={styles.axleRow}>
                      <span className={styles.axleLabel}>Front</span>
                      <div className={styles.pills} role="radiogroup" aria-label="Front diameter">
                        {filteredDiameterOptions.map((opt) => (
                          <label key={`d-front-${opt}`} className={styles.pillItem}>
                            <input
                              aria-label={`Front ${opt}`}
                              checked={activeDiameterFront === opt}
                              className="visually-hidden"
                              name="diameter-front"
                              onChange={() => pickDiameter(opt, "front")}
                              type="radio"
                              value={opt}
                            />
                            <span className={`${styles.pill} ${activeDiameterFront === opt ? styles.pillActive : ""}`}>
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className={styles.axleRow}>
                      <span className={styles.axleLabel}>Rear</span>
                      <div className={styles.pills} role="radiogroup" aria-label="Rear diameter">
                        {filteredDiameterOptions.map((opt) => (
                          <label key={`d-rear-${opt}`} className={styles.pillItem}>
                            <input
                              aria-label={`Rear ${opt}`}
                              checked={activeDiameterRear === opt}
                              className="visually-hidden"
                              name="diameter-rear"
                              onChange={() => pickDiameter(opt, "rear")}
                              type="radio"
                              value={opt}
                            />
                            <span className={`${styles.pill} ${activeDiameterRear === opt ? styles.pillActive : ""}`}>
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.pills} role="radiogroup" aria-label="Diameter">
                    {filteredDiameterOptions.map((opt) => (
                      <label key={opt} className={styles.pillItem}>
                        <input
                          aria-label={opt}
                          checked={activeDiameterFront === opt}
                          className="visually-hidden"
                          name="diameter"
                          onChange={() => pickDiameter(opt, "front")}
                          type="radio"
                          value={opt}
                        />
                        <span className={`${styles.pill} ${activeDiameterFront === opt ? styles.pillActive : ""}`}>
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Width ── */}
            {product.widthOptions.length > 0 && (
              <div className={styles.optionGroup}>
                <div className={styles.optionHeader}>
                  <p className={`label ${styles.optionLabel}`}>Width</p>
                  {displayWidth && <span className={styles.optionSelected}>{displayWidth}</span>}
                </div>
                {isStaggered ? (
                  <div className={styles.axleStack}>
                    <div className={styles.axleRow}>
                      <span className={styles.axleLabel}>Front</span>
                      <div className={styles.pills} role="radiogroup" aria-label="Front width">
                        {frontWidthOptions.map((opt) => (
                          <label key={`w-front-${opt}`} className={styles.pillItem}>
                            <input
                              aria-label={`Front ${opt}`}
                              checked={activeWidthFront === opt}
                              className="visually-hidden"
                              name="width-front"
                              onChange={() => pickWidth(opt, "front")}
                              type="radio"
                              value={opt}
                            />
                            <span className={`${styles.pill} ${activeWidthFront === opt ? styles.pillActive : ""}`}>
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className={styles.axleRow}>
                      <span className={styles.axleLabel}>Rear</span>
                      <div className={styles.pills} role="radiogroup" aria-label="Rear width">
                        {rearWidthOptions.map((opt) => (
                          <label key={`w-rear-${opt}`} className={styles.pillItem}>
                            <input
                              aria-label={`Rear ${opt}`}
                              checked={activeWidthRear === opt}
                              className="visually-hidden"
                              name="width-rear"
                              onChange={() => pickWidth(opt, "rear")}
                              type="radio"
                              value={opt}
                            />
                            <span className={`${styles.pill} ${activeWidthRear === opt ? styles.pillActive : ""}`}>
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.pills} role="radiogroup" aria-label="Width">
                    {frontWidthOptions.map((opt) => (
                      <label key={opt} className={styles.pillItem}>
                        <input
                          aria-label={opt}
                          checked={activeWidthFront === opt}
                          className="visually-hidden"
                          name="width"
                          onChange={() => pickWidth(opt, "front")}
                          type="radio"
                          value={opt}
                        />
                        <span className={`${styles.pill} ${activeWidthFront === opt ? styles.pillActive : ""}`}>
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
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
              </div>
            )}

            {/* ── Centre cap colour ── */}
            <div className={styles.optionGroup}>
              <div className={styles.optionHeader}>
                <p className={`label ${styles.optionLabel}`}>Centre cap colour</p>
                <span className={styles.optionSelected}>{formattedCapColour}</span>
              </div>
              <div className={styles.capColours} role="radiogroup" aria-label="Centre cap colour">
                {(["Black", "White", "Custom"] as const).map((option) => (
                  <label key={option} className={styles.capColourItem}>
                    <input
                      aria-label={option}
                      checked={capColour === option}
                      className="visually-hidden"
                      name="capColour"
                      onChange={() => setCapColour(option)}
                      type="radio"
                      value={option}
                    />
                    <span
                      className={`${styles.capColourCard} ${capColour === option ? styles.capColourCardActive : ""}`}
                    >
                      <span className={styles.capColourImageWrap}>
                        {option === "Custom" ? (
                          <span className={styles.capColourCustomMark} aria-hidden="true">
                            ?
                          </span>
                        ) : (
                          <Image
                            alt={`${option} centre cap logo`}
                            className={styles.capColourImage}
                            src={
                              option === "Black"
                                ? "/brand/Logo%20Black.jpg"
                                : "/brand/Logo%20White.png"
                            }
                            sizes="48px"
                            width={96}
                            height={96}
                          />
                        )}
                      </span>
                      <span className={styles.capColourLabel}>{option}</span>
                    </span>
                  </label>
                ))}
              </div>
              {capColour === "Custom" ? (
                <input
                  className={styles.capColourCustomInput}
                  type="text"
                  placeholder="Describe the colour you want (e.g. cherry red, brushed gold)"
                  value={capColourCustom}
                  onChange={(event) => setCapColourCustom(event.target.value)}
                  aria-label="Custom centre cap colour"
                />
              ) : null}
            </div>

            <details className={styles.advancedDetails}>
              <summary className={styles.advancedSummary}>
                Advanced fitment details
                <span>Optional if you want MonzaWheels to resolve the chassis numbers.</span>
              </summary>
              <div className={styles.advancedPanel}>
                {/* ── PCD (optional) — hidden when fitment is auto-matched ── */}
                {!fitment && product.pcdOptions.length > 0 && (
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

                {/* ── Centre bore (optional) — hidden when fitment is auto-matched ── */}
                {!fitment && product.centreboreOptions.length > 0 && (
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
              </div>
            </details>

            {/* ── Estimated quote ── */}
            <details className={styles.estimatePanel}>
              <summary className={styles.estimateSummary}>
                <span>Estimate</span>
                <strong>{estimatedTotal !== null ? `AUD ${formatAud(estimatedTotal)}` : headlinePrice}</strong>
              </summary>
              <div className={styles.estimateHeader}>
                <p className={styles.estimateLabel}>Estimated quote</p>
                <p className={styles.estimateSub}>
                  Live estimate based on your selections — final quote confirmed after chassis review.
                </p>
              </div>

              {configSummary ? (
                <p className={styles.estimateConfig}>{configSummary}</p>
              ) : null}

              <div className={styles.estimateRows}>
                <div className={styles.estimateRow}>
                  <span className={styles.estimateRowLabel}>
                    {wheelOnlySubtotal !== null
                      ? isStaggered
                        ? `2 × ${activeDiameterFront} front + 2 × ${activeDiameterRear} rear ${product.series}`
                        : `4 × ${activeDiameterFront} ${product.series}`
                      : `${product.series} set of 4`}
                  </span>
                  <span className={styles.estimateRowValue}>
                    {wheelOnlySubtotal !== null
                      ? `AUD ${formatAud(wheelOnlySubtotal)}`
                      : "Pick a diameter"}
                  </span>
                </div>
                {frontPerWheelPrice !== null && (!isStaggered || rearPerWheelPrice !== null) ? (
                  <p className={styles.estimateRowDetail}>
                    {isStaggered && rearPerWheelPrice !== null && rearPerWheelPrice !== frontPerWheelPrice
                      ? `AUD ${formatAud(frontPerWheelPrice)} front · AUD ${formatAud(rearPerWheelPrice)} rear per wheel`
                      : `AUD ${formatAud(frontPerWheelPrice)} per wheel`}
                  </p>
                ) : null}

                <div className={styles.estimateRow}>
                  <span className={styles.estimateRowLabel}>
                    Centre caps (RA / RF / AF)
                  </span>
                  <span className={styles.estimateIncluded}>Included</span>
                </div>

                <div className={styles.estimateRow}>
                  <span className={styles.estimateRowLabel}>Standard shipping</span>
                  <span className={styles.estimateIncluded}>Free</span>
                </div>

                <label className={styles.estimateAddon}>
                  <input
                    type="checkbox"
                    checked={includeExpressShipping}
                    onChange={(event) => setIncludeExpressShipping(event.target.checked)}
                  />
                  <span className={styles.estimateAddonText}>
                    <span className={styles.estimateAddonLabel}>Express Air Shipping</span>
                    <span className={styles.estimateAddonNote}>
                      Optional air-freight upgrade over free standard shipping.
                    </span>
                  </span>
                  <span className={styles.estimateRowValue}>
                    +AUD {formatAud(expressAirShippingIncGstAud())}
                  </span>
                </label>

                {isOnePiece ? (
                  <label className={styles.estimateAddon}>
                    <input
                      type="checkbox"
                      checked={includeCustomFinish}
                      onChange={(event) => setIncludeCustomFinish(event.target.checked)}
                    />
                    <span className={styles.estimateAddonText}>
                      <span className={styles.estimateAddonLabel}>Custom off-catalogue finish</span>
                      <span className={styles.estimateAddonNote}>
                        Covers {customFinishOptions.map((option) => option.name).join(", ").toLowerCase()}.{" "}
                        <Link href="/finishes" className={styles.estimateAddonLink}>See examples</Link>
                      </span>
                    </span>
                    <span className={styles.estimateRowValue}>
                      +AUD {formatAud(CUSTOM_FINISH_PRICE_AUD_PER_WHEEL * 4)}
                    </span>
                  </label>
                ) : null}
              </div>

              <div className={styles.estimateTotalRow}>
                <span className={styles.estimateTotalLabel}>Estimated total</span>
                <span className={styles.estimateTotalValue}>
                  {estimatedTotal !== null ? `AUD ${formatAud(estimatedTotal)}` : "—"}
                </span>
              </div>

              <p className={styles.estimateFinePrint}>
                Indicative only. Includes GST and free standard shipping. Express Air
                Shipping is optional. Final pricing is confirmed after we review the build brief.
              </p>
            </details>

            {/* ── Specs ── */}
            <details className={styles.specsDisclosure}>
              <summary className={styles.specsSummary}>Full specification table</summary>
              <div className={styles.specs}>
                {product.specs.map((spec) => {
                  let value = spec.value;
                  if (fitment) {
                    if (spec.label === "Diameter range") {
                      value = `${fitment.minDiameter}" to ${fitment.maxDiameter}" for ${carLabel || `${carMake} ${carModel}`.trim()}`;
                    } else if (spec.label === "PCD") {
                      value = `${fitment.pcd} (matched to your chassis)`;
                    }
                  }
                  return (
                    <div key={spec.label} className={styles.specRow}>
                      <span className={styles.specKey}>{spec.label}</span>
                      <span className={styles.specValue}>{value}</span>
                    </div>
                  );
                })}
              </div>
            </details>

            <div className={styles.cta}>
              <ConversionLink
                className={styles.quoteButton}
                eventName="ProductQuoteClick"
                eventSource={product.handle}
                href={buildQuoteUrl()}
              >
                Send this build for review
              </ConversionLink>
              <p className={styles.leadTime}>
                Lead time {product.leadTime} &nbsp;·&nbsp; Made to order
              </p>
            </div>

          </div>
        </div>
      </div>

      <section className={`${styles.productProof} container`} aria-label="Product program details">
        <div className={styles.productStory}>
          <p className="label">Built around your car</p>
          <h2>A starting design, not a locked specification.</h2>
          <p>{product.description}</p>
          <Link href="/custom-forged-wheels">Or send us a completely different design</Link>
        </div>
        <dl className={styles.proofGrid}>
          <div><dt>Design approval</dt><dd>Final drawing or render approved before machining</dd></div>
          <div><dt>Production</dt><dd>{product.leadTime}</dd></div>
          <div><dt>Testing</dt><dd>JWL certified with enhanced fatigue and impact testing</dd></div>
          <div><dt>Warranty</dt><dd>Five-year structural and finish coverage</dd></div>
          <div><dt>Payment</dt><dd>Full payment is completed before production begins</dd></div>
          <div><dt>Fitment</dt><dd>Offset, centre bore and brake clearance confirmed to chassis</dd></div>
        </dl>
      </section>
    </main>
  );
}
