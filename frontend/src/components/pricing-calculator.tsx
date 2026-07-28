"use client";

import Link from "next/link";
import { useState } from "react";
import { ConversionLink } from "@/components/conversion-link";
import { trackFunnelEvent } from "@/lib/meta-pixel";
import {
  WHEEL_ADD_ONS,
  WHEEL_PRICING_CONFIG,
  type AddOnId,
  type Construction,
  type DeliveryState,
  type PricingCurrency,
} from "@/lib/wheel-pricing-config";
import {
  addOnRrpIncGstAudPerSet,
  calculateWheelPricing,
  formatPrice,
  getDiameterOptions,
  getWidthOptions,
} from "@/lib/wheel-pricing";
import styles from "@/app/pricing/page.module.css";

const constructionOptions: Array<{
  value: Construction;
  label: string;
  detail: string;
}> = [
  { value: "monoblock", label: "Monoblock", detail: "1-piece forged" },
  { value: "2pc", label: "Two-piece", detail: "Forged centre + barrel" },
];

const stateOptions: Array<{ value: DeliveryState; label: string; surcharge: number }> = [
  {
    value: "VIC",
    label: "Victoria",
    surcharge: WHEEL_PRICING_CONFIG.shippingSurchargeAudPerSet.VIC,
  },
  {
    value: "NSW",
    label: "New South Wales",
    surcharge: WHEEL_PRICING_CONFIG.shippingSurchargeAudPerSet.NSW,
  },
  {
    value: "QLD",
    label: "Queensland",
    surcharge: WHEEL_PRICING_CONFIG.shippingSurchargeAudPerSet.QLD,
  },
  {
    value: "OTHER",
    label: "All other states",
    surcharge: WHEEL_PRICING_CONFIG.shippingSurchargeAudPerSet.OTHER,
  },
];

export function PricingCalculator() {
  const [construction, setConstruction] = useState<Construction>("monoblock");
  const [diameter, setDiameter] = useState(19);
  const [width, setWidth] = useState("8-13");
  const [state, setState] = useState<DeliveryState>("OTHER");
  const [currency, setCurrency] = useState<PricingCurrency>("AUD");
  const [addOns, setAddOns] = useState<AddOnId[]>([]);

  const diameters = getDiameterOptions(construction);
  const widths = getWidthOptions(construction, diameter);
  const breakdown = calculateWheelPricing({
    construction,
    diameter,
    width,
    addOns,
    state,
    currency,
  });

  function selectConstruction(nextConstruction: Construction) {
    const nextDiameterOptions = getDiameterOptions(nextConstruction);
    const nextDiameter = nextDiameterOptions.includes(diameter)
      ? diameter
      : nextDiameterOptions[0];
    const nextWidth = getWidthOptions(nextConstruction, nextDiameter)[0]?.widthKey ?? "";
    setConstruction(nextConstruction);
    setDiameter(nextDiameter);
    setWidth(nextWidth);
    trackFunnelEvent("PricingConfiguration", {
      field: "construction",
      value: nextConstruction,
    });
  }

  function selectDiameter(nextDiameter: number) {
    setDiameter(nextDiameter);
    setWidth(getWidthOptions(construction, nextDiameter)[0]?.widthKey ?? "");
    trackFunnelEvent("PricingConfiguration", {
      field: "diameter",
      value: nextDiameter,
    });
  }

  function toggleAddOn(id: AddOnId) {
    setAddOns((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    trackFunnelEvent("PricingConfiguration", {
      field: "add_on",
      value: id,
    });
  }

  if (!breakdown) return null;

  const currencySuffix = currency === "AUD" ? "AUD" : "USD";
  const wheelRrpDisplay =
    breakdown.wheelRrpIncGstAudPerSet * breakdown.currencyRateFromAud;
  const shippingRrpDisplay =
    breakdown.shippingRrpIncGstAudPerSet * breakdown.currencyRateFromAud;
  const shippingLabel = stateOptions.find((option) => option.value === state)?.label;
  const quoteParams = new URLSearchParams({
    title: `${construction === "monoblock" ? "Monoblock" : "2-piece"} forged wheel set`,
    startingPrice: `${formatPrice(breakdown.displayPerSet, currency)} ${currencySuffix} inc. GST and delivery`,
    diameter: `${diameter}"`,
    width: breakdown.row.widthLabel,
    notes: [
      `Delivery: ${shippingLabel}`,
      addOns.length > 0
        ? `Upgrades: ${breakdown.addOns.map((addOn) => addOn.name).join(", ")}`
        : "",
    ].filter(Boolean).join("\n"),
  });
  const quoteHref = `/contact?${quoteParams.toString()}`;

  return (
    <div className={styles.calculator}>
      <div className={styles.controls}>
        <div className={styles.controlSection}>
          <div className={styles.controlHeading}>
            <span className={styles.stepNumber}>01</span>
            <div>
              <p className={styles.controlLabel}>Construction</p>
              <p className={styles.controlHint}>Choose the forged architecture.</p>
            </div>
          </div>
          <div className={styles.segmented} role="group" aria-label="Construction type">
            {constructionOptions.map((option) => (
              <button
                aria-pressed={construction === option.value}
                className={styles.segmentButton}
                data-active={construction === option.value}
                key={option.value}
                onClick={() => selectConstruction(option.value)}
                type="button"
              >
                <strong>{option.label}</strong>
                <span>{option.detail}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.controlSection}>
          <div className={styles.controlHeading}>
            <span className={styles.stepNumber}>02</span>
            <div>
              <p className={styles.controlLabel}>Wheel specification</p>
              <p className={styles.controlHint}>Width bands update with diameter.</p>
            </div>
          </div>
          <div className={styles.selectGrid}>
            <label className={styles.field}>
              <span>Diameter</span>
              <select
                value={diameter}
                onChange={(event) => selectDiameter(Number(event.target.value))}
              >
                {diameters.map((option) => (
                  <option key={option} value={option}>{option}&quot;</option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span>Width range</span>
              <select value={width} onChange={(event) => setWidth(event.target.value)}>
                {widths.map((option) => (
                  <option key={option.widthKey} value={option.widthKey}>
                    {option.widthLabel}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className={styles.controlSection}>
          <div className={styles.controlHeading}>
            <span className={styles.stepNumber}>03</span>
            <div>
              <p className={styles.controlLabel}>Delivery</p>
              <p className={styles.controlHint}>
                Select the delivery state for an accurate delivered total.
              </p>
            </div>
          </div>
          <label className={styles.field}>
            <span>Delivery state</span>
            <select
              value={state}
              onChange={(event) => {
                const nextState = event.target.value as DeliveryState;
                setState(nextState);
                trackFunnelEvent("PricingConfiguration", {
                  field: "delivery_state",
                  value: nextState,
                });
              }}
            >
              {stateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          {state === "OTHER" ? (
            <p className={styles.defaultNote}>
              Conservative default selected. Choose VIC, NSW, or QLD if applicable.
            </p>
          ) : null}
        </div>

        <div className={styles.controlSection}>
          <div className={styles.controlHeading}>
            <span className={styles.stepNumber}>04</span>
            <div>
              <p className={styles.controlLabel}>Optional upgrades</p>
              <p className={styles.controlHint}>Each fixed-price upgrade covers the set of four.</p>
            </div>
          </div>
          <div className={styles.addOnGrid}>
            {WHEEL_ADD_ONS.map((addOn) => {
              const selected = addOns.includes(addOn.id);
              const addOnRrpAud = addOnRrpIncGstAudPerSet(addOn.id);
              return (
                <label className={styles.addOn} data-active={selected} key={addOn.id}>
                  <input
                    checked={selected}
                    onChange={() => toggleAddOn(addOn.id)}
                    type="checkbox"
                  />
                  <span className={styles.checkmark} aria-hidden="true" />
                  <span className={styles.addOnName}>{addOn.name}</span>
                  <span className={styles.addOnPrice}>
                    {addOnRrpAud === null
                      ? "Price on request"
                      : `+${formatPrice(
                        addOnRrpAud * breakdown.currencyRateFromAud,
                        currency,
                      )}`}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <aside className={styles.result} aria-live="polite">
        <div>
          <p className={styles.resultEyebrow}>Live RRP · GST included</p>
          <p className={styles.resultSpec}>
            {diameter}&quot; · {breakdown.row.widthLabel} · {shippingLabel}
          </p>
        </div>

        <div className={styles.heroPrice}>
          <span>Set of four</span>
          <strong>{formatPrice(breakdown.displayPerSet, currency)}</strong>
          <small>{currencySuffix} · includes delivery and GST</small>
        </div>

        <div className={styles.perWheel}>
          <span>Per wheel</span>
          <strong>{formatPrice(breakdown.displayPerWheel, currency)}</strong>
        </div>

        <details className={styles.breakdownDisclosure}>
          <summary>How this delivered price is calculated</summary>
          <div className={styles.breakdown}>
          <div>
            <span>Wheel set</span>
            <span>{formatPrice(wheelRrpDisplay, currency)}</span>
          </div>
          <div>
            <span>Delivered to {shippingLabel}</span>
            <span>{formatPrice(shippingRrpDisplay, currency)}</span>
          </div>
          {breakdown.addOns.map((addOn) => (
            <div key={addOn.id}>
              <span>{addOn.name}</span>
              {addOn.displayAmount === null ? (
                <Link href="/contact">Request price</Link>
              ) : (
                <span>+{formatPrice(addOn.displayAmount, currency)}</span>
              )}
            </div>
          ))}
          <div className={styles.gstRow}>
            <span>GST</span>
            <span>Included</span>
          </div>
          </div>
        </details>

        {breakdown.hasPriceOnRequestAddOn ? (
          <p className={styles.requestNote}>
            The displayed total excludes price-on-request upgrades.{" "}
            <Link href="/contact">Ask for a complete quote.</Link>
          </p>
        ) : null}

        <div className={styles.currencyControl}>
          <div>
            <span>Display currency</span>
            <small>AUD is the primary RRP</small>
          </div>
          <div className={styles.currencyButtons} role="group" aria-label="Display currency">
            {(["AUD", "USD"] as const).map((option) => (
              <button
                aria-pressed={currency === option}
                data-active={currency === option}
                key={option}
                onClick={() => setCurrency(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {currency === "USD" ? (
          <p className={styles.referenceNote}>
            USD is a reference conversion of the final AUD RRP at A$1 = US$
            {(1 / WHEEL_PRICING_CONFIG.fxRate).toFixed(4)}. Your quote and invoice remain in AUD.
          </p>
        ) : null}

        <ConversionLink
          className={`button-primary ${styles.quoteButton}`}
          eventName="PricingQuoteClick"
          eventSource={`${construction}_${diameter}_${state}`}
          href={quoteHref}
        >
          Request this specification
        </ConversionLink>
      </aside>
    </div>
  );
}
