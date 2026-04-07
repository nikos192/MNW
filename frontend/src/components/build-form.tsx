"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import { BRAND_NAME } from "@/lib/brand";
import { vehicleData } from "@/lib/monza-data";
import styles from "./build-form.module.css";

type InitialValues = {
  make?: string;
  model?: string;
  year?: string;
  diameter?: string;
  width?: string;
  pcd?: string;
  offset?: string;
  centrebore?: string;
  finish?: string;
};

type QuoteContext = {
  productHandle?: string;
  productTitle?: string;
  startingPrice?: string;
};

type BuildFormProps = {
  initialNotes?: string;
  initialValues?: InitialValues;
  quoteContext?: QuoteContext;
};

type FormField = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
  optional?: boolean;
};

const contactFields: FormField[] = [
  { id: "name", label: "Your name", type: "text", placeholder: "Alex Morgan", required: true, autoComplete: "name" },
  { id: "email", label: "Your email", type: "email", placeholder: "alex@example.com", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone number", type: "tel", placeholder: "+61 4xx xxx xxx", autoComplete: "tel" },
];

const vehicleDetailFields: FormField[] = [
  { id: "brakes", label: "Brake package", type: "text", placeholder: "Carbon ceramics / factory steel / big brake kit" },
  { id: "suspension", label: "Suspension / ride height", type: "text", placeholder: "Factory, lowered, or coilovers" },
];

const wheelFields: FormField[] = [
  { id: "diameter", label: "Preferred diameter", type: "text", placeholder: "19 / 20 / open to guidance" },
  { id: "width", label: "Preferred width", type: "text", placeholder: "9.5 / 10.5 or staggered" },
  { id: "pcd", label: "PCD", type: "text", placeholder: "5x112 / 5x114.3 — leave blank to match vehicle", optional: true },
  { id: "offset", label: "Offset (ET)", type: "text", placeholder: "ET35 or F ET20 / R ET35 — leave blank to match vehicle", optional: true },
  { id: "centrebore", label: "Centre bore", type: "text", placeholder: "66.6mm / 72.6mm — leave blank to match vehicle", optional: true },
  { id: "finish", label: "Finish direction", type: "text", placeholder: "Brushed clear / satin graphite / bronze" },
  { id: "references", label: "Reference links", type: "text", placeholder: "Instagram, Pinterest, or car photos" },
];

type SubmitState = {
  status: "idle" | "success" | "error";
  message: string;
};

function TickerInput({
  placeholder,
  disabled,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [hasValue, setHasValue] = useState(!!props.defaultValue);
  const [focused, setFocused] = useState(false);
  const [offset, setOffset] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const showPlaceholder = !hasValue && !focused && !!placeholder;

  useEffect(() => {
    if (!showPlaceholder) return;
    function measure() {
      if (!spanRef.current || !overlayRef.current) return;
      const spanW = spanRef.current.scrollWidth;
      const containerW = overlayRef.current.clientWidth;
      const px = Math.max(0, spanW - containerW + 4);
      setOffset(px);
      spanRef.current.style.setProperty("--ticker-offset", `${px}px`);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [showPlaceholder]);

  return (
    <div className={styles.tickerWrap}>
      <input
        {...props}
        disabled={disabled}
        placeholder=""
        onChange={(e) => {
          setHasValue(!!e.target.value);
          if (props.onChange) props.onChange(e);
        }}
        onFocus={(e) => {
          setFocused(true);
          if (props.onFocus) props.onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          if (props.onBlur) props.onBlur(e);
        }}
      />
      {showPlaceholder && (
        <div ref={overlayRef} className={styles.tickerOverlay} aria-hidden="true">
          <span
            ref={spanRef}
            className={offset > 0 ? styles.tickerText : styles.tickerTextStatic}
          >
            {placeholder}
          </span>
        </div>
      )}
    </div>
  );
}

export function BuildForm({ initialNotes = "", initialValues = {}, quoteContext }: BuildFormProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  // Cascading car selection — initialise from URL params if present
  const initialMake = initialValues.make && vehicleData[initialValues.make] ? initialValues.make : (initialValues.make ? "Other" : "");
  const [carMake, setCarMake] = useState(initialMake);
  const [carModel, setCarModel] = useState(initialValues.model ?? "");
  const [carYear, setCarYear] = useState(initialValues.year ?? "");

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

  function getDefaultValue(id: string): string {
    switch (id) {
      case "diameter": return initialValues.diameter ?? "";
      case "width": return initialValues.width ?? "";
      case "pcd": return initialValues.pcd ?? "";
      case "offset": return initialValues.offset ?? "";
      case "centrebore": return initialValues.centrebore ?? "";
      case "finish": return initialValues.finish ?? "";
      default: return "";
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const valueFor = (fieldId: string) => String(formData.get(fieldId) ?? "").trim();

    setIsSubmitting(true);
    setSubmitState({ status: "idle", message: "" });

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteContext,
          customer: {
            name: valueFor("name"),
            email: valueFor("email"),
            phone: valueFor("phone"),
          },
          vehicle: {
            make: carMake === "Other" ? (carModel || "Other") : carMake,
            model: carMake === "Other" ? "" : carModel,
            year: carYear,
            brakes: valueFor("brakes"),
            suspension: valueFor("suspension"),
          },
          wheel: {
            diameter: valueFor("diameter"),
            width: valueFor("width"),
            pcd: valueFor("pcd"),
            offset: valueFor("offset"),
            centrebore: valueFor("centrebore"),
            finish: valueFor("finish"),
            references: valueFor("references"),
          },
          notes: notes.trim(),
        }),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || "Unable to send quote request right now.");
      }

      form.reset();
      setNotes(initialNotes);
      setCarMake("");
      setCarModel("");
      setCarYear("");
      setSubmitState({
        status: "success",
        message: `Quote request sent. ${BRAND_NAME} will get back to you shortly. A confirmation email is on its way now, so please check your junk mail if you do not see it in your inbox.`,
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "Unable to send quote request right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      {/* ── Contact details ── */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Contact</p>
        <div className={styles.grid}>
          {contactFields.map((field) => (
            <label key={field.id} className={styles.field}>
              <span>{field.label}</span>
              <input
                autoComplete={field.autoComplete}
                disabled={isSubmitting}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
              />
            </label>
          ))}
        </div>
      </div>

      {/* ── Vehicle ── */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Your Vehicle</p>
        <div className={styles.grid}>
          <label className={styles.field}>
            <span>Make</span>
            <select
              className={styles.select}
              disabled={isSubmitting}
              value={carMake}
              onChange={(e) => handleMakeChange(e.target.value)}
              aria-label="Vehicle make"
            >
              <option value="">Select make</option>
              {Object.keys(vehicleData).map((make) => (
                <option key={make} value={make}>{make}</option>
              ))}
              <option value="Other">Other (add in notes)</option>
            </select>
          </label>

          {carMake && carMake !== "Other" ? (
            <label className={styles.field}>
              <span>Model</span>
              <select
                className={styles.select}
                disabled={isSubmitting}
                value={carModel}
                onChange={(e) => handleModelChange(e.target.value)}
                aria-label="Vehicle model"
              >
                <option value="">Select model</option>
                {carModels.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
                <option value="Other">Other model</option>
              </select>
            </label>
          ) : (
            <label className={styles.field}>
              <span>Model</span>
              <input
                disabled={isSubmitting}
                name="model_other"
                type="text"
                placeholder="Enter model"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
              />
            </label>
          )}

          {carModel && carModel !== "Other" && carYears.length > 0 ? (
            <label className={styles.field}>
              <span>Year</span>
              <select
                className={styles.select}
                disabled={isSubmitting}
                value={carYear}
                onChange={(e) => setCarYear(e.target.value)}
                aria-label="Vehicle year"
              >
                <option value="">Select year</option>
                {carYears.map((year) => (
                  <option key={year} value={String(year)}>{year}</option>
                ))}
              </select>
            </label>
          ) : (
            <label className={styles.field}>
              <span>Year</span>
              <input
                disabled={isSubmitting}
                name="year_other"
                type="text"
                placeholder="e.g. 2023"
                value={carYear}
                onChange={(e) => setCarYear(e.target.value)}
              />
            </label>
          )}

          {vehicleDetailFields.map((field) => (
            <label key={field.id} className={styles.field}>
              <span>{field.label}</span>
              <TickerInput
                disabled={isSubmitting}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
              />
            </label>
          ))}
        </div>
      </div>

      {/* ── Wheel brief ── */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Wheel Brief</p>
        <div className={styles.grid}>
          {wheelFields.map((field) => (
            <label key={field.id} className={styles.field}>
              <span>
                {field.label}
                {field.optional && <span className={styles.optionalTag}> — optional</span>}
              </span>
              <TickerInput
                disabled={isSubmitting}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                defaultValue={getDefaultValue(field.id)}
              />
            </label>
          ))}
          <label className={styles.fieldWide}>
            <span>Project notes</span>
            <textarea
              disabled={isSubmitting}
              name="notes"
              rows={6}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Tell us about the look you want, wheel style preferences, and anything important about the car."
            />
          </label>
        </div>
      </div>

      <button className={styles.button} disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending Quote Request..." : "Request a Quote"}
      </button>

      {submitState.status !== "idle" ? (
        <p
          className={`${styles.status} ${
            submitState.status === "success" ? styles.statusSuccess : styles.statusError
          }`}
          role="status"
        >
          <span className={styles.statusLabel}>
            {submitState.status === "success" ? "Quote request sent" : "Quote request failed"}
          </span>
          {submitState.message}
        </p>
      ) : null}

      <p className={styles.help}>
        {`Quote requests are sent directly to ${BRAND_NAME}, and replies go back to the email address you provide above.`}
      </p>
    </form>
  );
}
