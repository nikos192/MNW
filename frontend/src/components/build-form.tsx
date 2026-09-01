"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import { BRAND_NAME } from "@/lib/brand";
import { getVehicleFitment, vehicleData } from "@/lib/monza-data";
import styles from "./build-form.module.css";
import { trackFunnelEvent, trackMetaEvent } from "@/lib/meta-pixel";
import type { ShippingOption } from "@/lib/order-timelines";

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
  capColour?: string;
};

type QuoteContext = {
  productHandle?: string;
  productTitle?: string;
  startingPrice?: string;
  quoteType?: "wheel" | "custom";
  shippingOption?: ShippingOption;
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
  { id: "phone", label: "Phone number", type: "tel", placeholder: "+61 4xx xxx xxx", autoComplete: "tel", optional: true },
];

const vehicleDetailFields: FormField[] = [
  { id: "brakes", label: "Brake package", type: "text", placeholder: "Carbon ceramics / factory steel / big brake kit", optional: true },
  { id: "suspension", label: "Suspension / ride height", type: "text", placeholder: "Factory, lowered, or coilovers", optional: true },
];

const wheelFields: FormField[] = [
  { id: "diameter", label: "Preferred diameter", type: "text", placeholder: "19 / 20 / open to guidance", optional: true },
  { id: "width", label: "Preferred width", type: "text", placeholder: "9.5 / 10.5 or staggered", optional: true },
  { id: "pcd", label: "PCD", type: "text", placeholder: "5x112 / 5x114.3 — leave blank to match vehicle", optional: true },
  { id: "offset", label: "Offset (ET)", type: "text", placeholder: "ET35 or F ET20 / R ET35 — leave blank to match vehicle", optional: true },
  { id: "centrebore", label: "Centre bore", type: "text", placeholder: "66.6mm / 72.6mm — leave blank to match vehicle", optional: true },
  { id: "finish", label: "Finish direction", type: "text", placeholder: "Brushed clear / satin graphite / bronze", optional: true },
  { id: "capColour", label: "Centre cap colour", type: "text", placeholder: "Black, white, or custom colour", optional: true },
  { id: "references", label: "Design or inspiration links", type: "text", placeholder: "Instagram, Pinterest, Drive, Dropbox, or image link", optional: true },
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
  const [step, setStep] = useState<1 | 2>(1);
  const [files, setFiles] = useState<File[]>([]);
  const hasTrackedStart = useRef(false);
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

  const fitment = getVehicleFitment(carMake, carModel);
  // When a known chassis is picked, hide the PCD/centre bore inputs (we know the values).
  const visibleWheelFields = fitment
    ? wheelFields.filter((field) => field.id !== "pcd" && field.id !== "centrebore")
    : wheelFields;

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
      case "capColour": return initialValues.capColour ?? "";
      default: return "";
    }
  }

  function trackStart() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackFunnelEvent("QuoteFormStart", {
      content_name: quoteContext?.productTitle ?? "Custom design quote",
    });
  }

  function continueToDetails(form: HTMLFormElement) {
    const name = form.elements.namedItem("name") as HTMLInputElement | null;
    const email = form.elements.namedItem("email") as HTMLInputElement | null;
    if (!name?.reportValidity() || !email?.reportValidity() || !carMake) {
      if (!carMake) setSubmitState({ status: "error", message: "Select your vehicle make to continue." });
      return;
    }
    setSubmitState({ status: "idle", message: "" });
    setStep(2);
    requestAnimationFrame(() => form.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formValues = new FormData(form);
    const valueFor = (fieldId: string) => String(formValues.get(fieldId) ?? "").trim();

    setIsSubmitting(true);
    setSubmitState({ status: "idle", message: "" });

    try {
      const eventId = crypto.randomUUID();
      const payload = {
        quoteContext,
        tracking: { eventId },
        honeypot: valueFor("website_url"),
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
          pcd: fitment?.pcd ?? valueFor("pcd"),
          offset: valueFor("offset"),
          centrebore: fitment?.centreBore ?? valueFor("centrebore"),
          finish: valueFor("finish"),
          capColour: valueFor("capColour"),
          references: valueFor("references"),
        },
        shipping: quoteContext?.shippingOption ?? "standard",
        notes: notes.trim(),
      };
      const requestData = new FormData();
      requestData.set("payload", JSON.stringify(payload));
      files.forEach((file) => requestData.append("references", file));

      const response = await fetch("/api/quote", {
        method: "POST",
        body: requestData,
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || "Unable to send quote request right now.");
      }

      const quoteType = quoteContext?.quoteType ?? (quoteContext?.productHandle ? "wheel" : "custom");
      const leadParameters = {
        content_category: quoteType === "wheel" ? "Forged wheel quote" : "Custom forged wheel quote",
        content_ids: quoteContext?.productHandle ? [quoteContext.productHandle] : ["custom-forged-wheel"],
        content_name: quoteContext?.productTitle ?? "Custom design quote",
        content_type: "product",
        lead_type: quoteType === "wheel" ? "wheel_quote" : "custom_quote",
      };
      trackMetaEvent("Lead", leadParameters, { eventID: eventId });
      trackFunnelEvent("QuoteFormStep", {
        ...leadParameters,
        step: "submitted",
        step_name: "Enquiry sent",
      }, { eventID: eventId });
      form.reset();
      setNotes(initialNotes);
      setCarMake("");
      setCarModel("");
      setCarYear("");
      setFiles([]);
      setStep(1);
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
    <form className={styles.form} onFocusCapture={trackStart} onSubmit={handleSubmit}>
      {/* Honeypot: hidden from real users, irresistible to dumb bots. */}
      <div aria-hidden="true" className={styles.honeypot}>
        <label>
          Website
          <input
            autoComplete="off"
            name="website_url"
            tabIndex={-1}
            type="text"
          />
        </label>
      </div>

      <div className={styles.progress} aria-label={`Quote form step ${step} of 2`}>
        <div className={styles.progressTrack}><span style={{ width: `${step * 50}%` }} /></div>
        <p>Step {step} of 2 · {step === 1 ? "Your idea" : "Optional details"}</p>
      </div>

      <div className={step === 1 ? styles.step : styles.stepHidden}>
        <div className={styles.formIntro}>
          <p className={styles.formIntroTitle}>Only the essentials</p>
          <p>Name, email, vehicle make and a reference are enough to begin.</p>
        </div>
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Contact</p>
          <div className={styles.grid}>
            {contactFields.map((field) => (
              <label key={field.id} className={styles.field}>
                <span>{field.label}{field.optional && <span className={styles.optionalTag}> — optional</span>}</span>
                <input autoComplete={field.autoComplete} disabled={isSubmitting} name={field.id} type={field.type} placeholder={field.placeholder} required={field.required} />
              </label>
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Your vehicle</p>
          <div className={styles.grid}>
          <label className={styles.field}>
            <span>Make</span>
            <select
              className={styles.select}
              disabled={isSubmitting}
              required
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

          </div>
        </div>
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Design reference</p>
          <div className={styles.uploadBox}>
            <label className={styles.uploadLabel}>
              <span>Upload photos, sketches, renders or PDF</span>
              <input
                accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                disabled={isSubmitting}
                multiple
                onChange={(event) => {
                  const nextFiles = Array.from(event.target.files ?? []).slice(0, 3);
                  if (nextFiles.reduce((total, file) => total + file.size, 0) > 4 * 1024 * 1024) {
                    setSubmitState({ status: "error", message: "Reference uploads must be 4MB or smaller in total." });
                    event.target.value = "";
                    setFiles([]);
                    return;
                  }
                  setFiles(nextFiles);
                  setSubmitState({ status: "idle", message: "" });
                }}
                type="file"
              />
            </label>
            <p>JPG, PNG, WebP or PDF · up to 3 files · 4MB combined</p>
            {files.length ? <ul className={styles.fileList}>{files.map((file) => <li key={`${file.name}-${file.size}`}>{file.name}</li>)}</ul> : null}
          </div>
          <label className={styles.field}>
            <span>Or paste a design link <span className={styles.optionalTag}>— optional</span></span>
            <input disabled={isSubmitting} name="references" placeholder="Instagram, Pinterest, Drive or another link" type="url" />
          </label>
        </div>
        <button className={styles.button} disabled={isSubmitting} onClick={(event) => continueToDetails(event.currentTarget.form!)} type="button">
          Continue
        </button>
      </div>

      <div className={step === 2 ? styles.step : styles.stepHidden}>
      <div className={styles.section}>
        <div className={styles.detailHeading}>
          <div>
            <p className={styles.sectionLabel}>Optional fitment details</p>
            <p>Leave anything unknown blank. We confirm the final geometry.</p>
          </div>
          <button className={styles.backButton} onClick={() => setStep(1)} type="button">Back</button>
        </div>
        <div className={styles.grid}>
          {vehicleDetailFields.map((field) => (
            <label key={field.id} className={styles.field}>
              <span>{field.label}<span className={styles.optionalTag}> — optional</span></span>
              <TickerInput disabled={isSubmitting} name={field.id} type={field.type} placeholder={field.placeholder} />
            </label>
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Wheel Brief</p>
        <div className={styles.grid}>
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
                Auto-matched to your {[carMake, carModel].filter(Boolean).join(" ")}. Typical OEM diameter range: {fitment.minDiameter}″–{fitment.maxDiameter}″.
              </p>
            </div>
          ) : null}
          {visibleWheelFields.filter((field) => field.id !== "references").map((field) => (
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
            <span>Project notes <span className={styles.optionalTag}> — optional</span></span>
            <textarea
              disabled={isSubmitting}
              name="notes"
              rows={6}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Describe the wheel you want, what to retain from the reference, finish direction, and anything important about the car."
            />
          </label>
        </div>
      </div>

      <button className={styles.button} disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending Quote Request..." : "Request Custom Quote"}
      </button>
      </div>

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
        {`Your request goes directly to ${BRAND_NAME}. We confirm fitment, price and delivery choice, then provide a custom 3D render for your approval before production.`}
      </p>
    </form>
  );
}
