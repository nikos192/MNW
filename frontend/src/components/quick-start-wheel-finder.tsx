"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import {
  CENTRE_CAPS_INCLUDED_VALUE_AUD,
  finishOptions,
  formatAud,
  getVehicleFitment,
  priceForDiameter,
  priceRangeForSeries,
  vehicleData,
  type CatalogProduct,
} from "@/lib/monza-data";
import styles from "./quick-start-wheel-finder.module.css";

const steps = ["Car", "Build", "Wheel", "Finish", "Send"];

const lineOptions = [
  {
    value: "1-Piece Forged",
    label: "One Piece",
    copy: "Single-piece forged monoblock construction.",
  },
  {
    value: "2-Piece Forged",
    label: "Two Piece",
    copy: "Two-piece forged construction with separate rim hardware.",
  },
];

type WizardData = {
  make: string;
  model: string;
  year: string;
  brakes: string;
  suspension: string;
  line: string;
  productHandle: string;
  diameter: string;
  width: string;
  finish: string;
  notes: string;
  name: string;
  email: string;
  phone: string;
};

type SubmitState = {
  status: "idle" | "sending" | "success" | "error";
  message: string;
};

type QuickStartWheelFinderProps = {
  products: CatalogProduct[];
};

const initialData: WizardData = {
  make: "",
  model: "",
  year: "",
  brakes: "",
  suspension: "",
  line: "",
  productHandle: "",
  diameter: "Monza to confirm",
  width: "Monza to confirm",
  finish: "Monza to confirm",
  notes: "",
  name: "",
  email: "",
  phone: "",
};

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function optionWithFallback(options: string[], fallback: string) {
  return [fallback, ...options.filter((option) => option !== fallback)];
}

function selectedDiameterValue(diameter: string) {
  const parsed = Number.parseInt(diameter.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function seriesPriceLabel(series: string) {
  const range = priceRangeForSeries(series);
  return range
    ? `Series from AUD ${formatAud(range.minPerSet)} / set incl. caps, ex-GST`
    : "Quoted after fitment review";
}

function priceBasisForSelection(product: CatalogProduct | null, diameter: string) {
  if (!product) return "Price not calculated";

  const diameterValue = selectedDiameterValue(diameter);
  const perWheel = diameterValue !== null ? priceForDiameter(product.series, diameterValue) : null;

  if (perWheel !== null) {
    return `AUD ${formatAud(perWheel * 4 + CENTRE_CAPS_INCLUDED_VALUE_AUD)} / set incl. caps, ex-GST (${diameter})`;
  }

  return seriesPriceLabel(product.series);
}

export function QuickStartWheelFinder({ products }: QuickStartWheelFinderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(initialData);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle", message: "" });

  const models = data.make && data.make !== "Other" ? Object.keys(vehicleData[data.make] ?? {}) : [];
  const years =
    data.make && data.model && data.make !== "Other" && data.model !== "Other"
      ? (vehicleData[data.make]?.[data.model] ?? [])
      : [];
  const fitment = getVehicleFitment(data.make, data.model);
  const lineProducts = useMemo(
    () => (data.line ? products.filter((product) => product.series === data.line) : []),
    [data.line, products],
  );
  const selectedProduct = products.find((product) => product.handle === data.productHandle) ?? null;

  const diameterOptions = selectedProduct
    ? optionWithFallback(selectedProduct.diameterOptions, "Monza to confirm")
    : ["Monza to confirm"];
  const widthOptions = selectedProduct
    ? optionWithFallback(selectedProduct.widthOptions, "Monza to confirm")
    : ["Monza to confirm"];

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  function patch(next: Partial<WizardData>) {
    setData((current) => ({ ...current, ...next }));
    setSubmitState({ status: "idle", message: "" });
  }

  function hasWheelBrief() {
    return Boolean(data.make && data.line && data.productHandle);
  }

  function maxReachableStep() {
    if (!data.make) return 0;
    if (!data.line) return 1;
    if (!data.productHandle) return 2;
    return steps.length - 1;
  }

  function canVisitStep(targetStep: number) {
    return targetStep <= maxReachableStep();
  }

  function canContinue() {
    if (step === 0) return Boolean(data.make);
    if (step === 1) return Boolean(data.line);
    if (step === 2) return Boolean(data.productHandle);
    if (step === 4) return Boolean(hasWheelBrief() && data.name.trim() && validEmail(data.email.trim()));
    return true;
  }

  function nextStep() {
    if (!canContinue()) {
      setSubmitState({
        status: "error",
        message:
          step === 4
            ? "Name, selected wheel, and a valid email are required."
            : "Pick the required option to continue.",
      });
      return;
    }
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function resetAndClose() {
    setIsOpen(false);
    setStep(0);
    setSubmitState({ status: "idle", message: "" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canContinue()) {
      setSubmitState({ status: "error", message: "Name, selected wheel, and a valid email are required." });
      return;
    }

    setSubmitState({ status: "sending", message: "" });

    const payload = {
      quoteContext: {
        productTitle: selectedProduct?.title ?? "",
        productHandle: selectedProduct?.handle ?? "",
        startingPrice: selectedProduct ? priceBasisForSelection(selectedProduct, data.diameter) : "",
      },
      customer: {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
      },
      vehicle: {
        make: data.make,
        model: data.model,
        year: data.year,
        brakes: data.brakes,
        suspension: data.suspension,
      },
      wheel: {
        diameter: data.diameter,
        width: data.width,
        finish: data.finish,
        pcd: fitment?.pcd ?? "Monza to confirm",
        centrebore: fitment?.centreBore ?? "Monza to confirm",
      },
      notes: [
        "Submitted through Quick Start: Find Your Wheel.",
        `Construction: ${data.line}`,
        data.notes || "No extra notes supplied.",
        "Requested next step: Confirm fitment, quote, finish availability, lead time, and purchase path.",
      ].join("\n"),
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || "Unable to send the wheel brief.");
      }

      setSubmitState({
        status: "success",
        message: "Brief sent. MonzaWheels will review your fitment and reply by email.",
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "Unable to send the wheel brief.",
      });
    }
  }

  return (
    <>
      <button className={`${styles.launchButton} button-primary`} type="button" onClick={() => setIsOpen(true)}>
        Start Application
      </button>

      {isOpen && typeof document !== "undefined" ? createPortal((
        <div className={styles.overlay} role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) resetAndClose();
        }}>
          <section
            aria-labelledby="quick-start-title"
            aria-modal="true"
            className={styles.dialog}
            role="dialog"
          >
            <header className={styles.header}>
              <div>
                <p className={styles.kicker}>Quick start</p>
                <h2 id="quick-start-title" className={styles.title}>Find your wheel</h2>
              </div>
              <button
                aria-label="Close quick start"
                className={styles.closeButton}
                type="button"
                onClick={resetAndClose}
              >
                <X size={20} strokeWidth={1.7} />
              </button>
            </header>

            <div className={styles.progress} aria-label="Quick start progress">
              {steps.map((label, index) => (
                <button
                  aria-label={`Go to ${label} step`}
                  aria-current={index === step ? "step" : undefined}
                  className={`${styles.progressStep} ${index <= step ? styles.progressStepActive : ""}`}
                  disabled={!canVisitStep(index)}
                  key={label}
                  type="button"
                  onClick={() => {
                    if (canVisitStep(index)) setStep(index);
                  }}
                >
                  <span>{index + 1}</span>
                  {label}
                </button>
              ))}
            </div>

            <form className={styles.body} onSubmit={handleSubmit}>
              {step === 0 ? (
                <div className={styles.stepPanel}>
                  <div className={styles.stepHeader}>
                    <p className={styles.stepLabel}>Car</p>
                    <h3>Start with the chassis.</h3>
                  </div>
                  <div className={styles.fieldGrid}>
                    <label className={styles.field}>
                      <span>Make</span>
                      <select
                        required
                        value={data.make}
                        onChange={(event) => patch({ make: event.target.value, model: "", year: "" })}
                      >
                        <option value="">Select make</option>
                        {Object.keys(vehicleData).map((make) => (
                          <option key={make} value={make}>{make}</option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </label>

                    {data.make && data.make !== "Other" ? (
                      <label className={styles.field}>
                        <span>Model</span>
                        <select
                          value={data.model}
                          onChange={(event) => patch({ model: event.target.value, year: "" })}
                        >
                          <option value="">Select model</option>
                          {models.map((model) => (
                            <option key={model} value={model}>{model}</option>
                          ))}
                          <option value="Other">Other model</option>
                        </select>
                      </label>
                    ) : (
                      <label className={styles.field}>
                        <span>Model</span>
                        <input
                          placeholder="e.g. M4 G82"
                          value={data.model}
                          onChange={(event) => patch({ model: event.target.value })}
                        />
                      </label>
                    )}

                    {years.length ? (
                      <label className={styles.field}>
                        <span>Year</span>
                        <select value={data.year} onChange={(event) => patch({ year: event.target.value })}>
                          <option value="">Select year</option>
                          {years.map((year) => (
                            <option key={year} value={String(year)}>{year}</option>
                          ))}
                        </select>
                      </label>
                    ) : (
                      <label className={styles.field}>
                        <span>Year</span>
                        <input
                          inputMode="numeric"
                          placeholder="e.g. 2024"
                          value={data.year}
                          onChange={(event) => patch({ year: event.target.value })}
                        />
                      </label>
                    )}

                    <label className={styles.field}>
                      <span>Brakes</span>
                      <input
                        placeholder="Factory / carbon ceramic / BBK"
                        value={data.brakes}
                        onChange={(event) => patch({ brakes: event.target.value })}
                      />
                    </label>
                  </div>

                  {fitment ? (
                    <div className={styles.fitmentPanel}>
                      <span>PCD {fitment.pcd}</span>
                      <span>Centre bore {fitment.centreBore}</span>
                      <span>Database diameter range {fitment.minDiameter}&quot;-{fitment.maxDiameter}&quot;</span>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {step === 1 ? (
                <div className={styles.stepPanel}>
                  <div className={styles.stepHeader}>
                    <p className={styles.stepLabel}>Build</p>
                    <h3>Choose the construction.</h3>
                  </div>

                  <div className={styles.segmented}>
                    {lineOptions.map((line) => (
                      <button
                        className={`${styles.segmentButton} ${data.line === line.value ? styles.segmentButtonActive : ""}`}
                        key={line.value}
                        type="button"
                        onClick={() =>
                          patch({
                            line: line.value,
                            productHandle: "",
                            diameter: "Monza to confirm",
                            width: "Monza to confirm",
                          })
                        }
                      >
                        <span>{line.label}</span>
                        <small>{line.copy}</small>
                      </button>
                    ))}
                  </div>

                  <label className={styles.field}>
                    <span>Suspension / ride height</span>
                    <input
                      placeholder="Factory / lowered / coilovers"
                      value={data.suspension}
                      onChange={(event) => patch({ suspension: event.target.value })}
                    />
                  </label>
                </div>
              ) : null}

              {step === 2 ? (
                <div className={styles.stepPanel}>
                  <div className={styles.stepHeader}>
                    <p className={styles.stepLabel}>Wheel</p>
                    <h3>Choose the rim face.</h3>
                  </div>
                  <div className={styles.productGrid}>
                    {lineProducts.length ? lineProducts.map((product) => (
                      <button
                        className={`${styles.productButton} ${
                          data.productHandle === product.handle ? styles.productButtonActive : ""
                        }`}
                        key={product.handle}
                        type="button"
                        onClick={() =>
                          patch({
                            productHandle: product.handle,
                            diameter: "Monza to confirm",
                            width: "Monza to confirm",
                          })
                        }
                      >
                        <span className={styles.productMedia}>
                          {product.images[0] ? (
                            <Image
                              alt={product.images[0].alt}
                              fill
                              sizes="(max-width: 767px) 42vw, 180px"
                              src={product.images[0].url}
                            />
                          ) : null}
                        </span>
                        <span className={styles.productName}>{product.title}</span>
                        <small>{seriesPriceLabel(product.series)}</small>
                      </button>
                    )) : (
                      <p className={styles.emptyState}>No catalogue wheels found for this line.</p>
                    )}
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className={styles.stepPanel}>
                  <div className={styles.stepHeader}>
                    <p className={styles.stepLabel}>Finish</p>
                    <h3>Lock the size brief.</h3>
                  </div>

                  <div className={styles.fieldGrid}>
                    <label className={styles.field}>
                      <span>Diameter</span>
                      <select value={data.diameter} onChange={(event) => patch({ diameter: event.target.value })}>
                        {diameterOptions.map((diameter) => (
                          <option key={diameter} value={diameter}>{diameter}</option>
                        ))}
                      </select>
                    </label>

                    <label className={styles.field}>
                      <span>Width</span>
                      <select value={data.width} onChange={(event) => patch({ width: event.target.value })}>
                        {widthOptions.map((width) => (
                          <option key={width} value={width}>{width}</option>
                        ))}
                      </select>
                    </label>

                    <label className={styles.fieldWide}>
                      <span>Finish</span>
                      <select value={data.finish} onChange={(event) => patch({ finish: event.target.value })}>
                        <option value="Monza to confirm">Monza to confirm</option>
                        {finishOptions.map((finish) => (
                          <option key={finish.name} value={finish.name}>{finish.name}</option>
                        ))}
                      </select>
                    </label>

                    <label className={styles.fieldWide}>
                      <span>Notes</span>
                      <textarea
                        placeholder="Anything important: stance target, tyre plan, inspiration, deadline."
                        rows={4}
                        value={data.notes}
                        onChange={(event) => patch({ notes: event.target.value })}
                      />
                    </label>
                  </div>
                </div>
              ) : null}

              {step === 4 ? (
                <div className={styles.stepPanel}>
                  <div className={styles.stepHeader}>
                    <p className={styles.stepLabel}>Send</p>
                    <h3>Ready for fitment review.</h3>
                  </div>

                  <div className={styles.summary}>
                    <p>{[data.year, data.make, data.model].filter(Boolean).join(" ") || "Vehicle not supplied"}</p>
                    <p>{selectedProduct?.title || "Wheel design pending"}</p>
                    <p>{priceBasisForSelection(selectedProduct, data.diameter)}</p>
                    <p>{[data.diameter, data.width, data.finish].filter(Boolean).join(" / ")}</p>
                  </div>

                  <div className={styles.fieldGrid}>
                    <label className={styles.field}>
                      <span>Name</span>
                      <input
                        autoComplete="name"
                        required
                        value={data.name}
                        onChange={(event) => patch({ name: event.target.value })}
                      />
                    </label>
                    <label className={styles.field}>
                      <span>Email</span>
                      <input
                        autoComplete="email"
                        required
                        type="email"
                        value={data.email}
                        onChange={(event) => patch({ email: event.target.value })}
                      />
                    </label>
                    <label className={styles.fieldWide}>
                      <span>Phone</span>
                      <input
                        autoComplete="tel"
                        placeholder="+61"
                        type="tel"
                        value={data.phone}
                        onChange={(event) => patch({ phone: event.target.value })}
                      />
                    </label>
                  </div>
                </div>
              ) : null}

              {submitState.status === "success" ? (
                <div className={styles.successPanel} role="status">
                  <Check size={20} strokeWidth={1.8} />
                  <p>{submitState.message}</p>
                </div>
              ) : null}

              {submitState.status === "error" ? (
                <p className={styles.errorText} role="alert">{submitState.message}</p>
              ) : null}

              <footer className={styles.footer}>
                <button className={styles.secondaryButton} type="button" onClick={previousStep} disabled={step === 0}>
                  <ArrowLeft size={16} strokeWidth={1.7} />
                  Back
                </button>

                {step < steps.length - 1 ? (
                  <button className={styles.primaryButton} type="button" onClick={nextStep}>
                    Continue
                    <ArrowRight size={16} strokeWidth={1.7} />
                  </button>
                ) : (
                  <button
                    className={styles.primaryButton}
                    disabled={!canContinue() || submitState.status === "sending" || submitState.status === "success"}
                    type="submit"
                  >
                    {submitState.status === "sending" ? "Sending..." : "Send brief"}
                    <ArrowRight size={16} strokeWidth={1.7} />
                  </button>
                )}
              </footer>
            </form>
          </section>
        </div>
      ), document.body) : null}
    </>
  );
}
