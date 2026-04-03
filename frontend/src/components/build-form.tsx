"use client";

import { FormEvent, useState } from "react";
import { BRAND_NAME } from "@/lib/brand";
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
};

const fields: FormField[] = [
  { id: "name", label: "Your name", type: "text", placeholder: "Alex Morgan", required: true, autoComplete: "name" },
  { id: "email", label: "Your email", type: "email", placeholder: "alex@example.com", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone number", type: "tel", placeholder: "+61 4xx xxx xxx", autoComplete: "tel" },
  { id: "make", label: "Vehicle make", type: "text", placeholder: "BMW" },
  { id: "model", label: "Vehicle model", type: "text", placeholder: "G80 M3" },
  { id: "year", label: "Vehicle year", type: "text", placeholder: "2024" },
  { id: "brakes", label: "Brake package", type: "text", placeholder: "Carbon ceramics / factory steel / big brake kit" },
  { id: "suspension", label: "Suspension / ride height", type: "text", placeholder: "Factory, lowered, or coilovers" },
  { id: "diameter", label: "Preferred diameter", type: "text", placeholder: "19 / 20 / open to guidance" },
  { id: "width", label: "Preferred width", type: "text", placeholder: "9.5 / 10.5 or staggered" },
  { id: "pcd", label: "PCD", type: "text", placeholder: "5x112 / 5x114.3 / centre lock" },
  { id: "offset", label: "Offset (ET)", type: "text", placeholder: "ET35 or F ET20 / R ET35" },
  { id: "centrebore", label: "Centre bore", type: "text", placeholder: "66.6mm / 72.6mm" },
  { id: "finish", label: "Finish direction", type: "text", placeholder: "Brushed clear / satin graphite / bronze" },
  { id: "references", label: "Reference links", type: "text", placeholder: "Instagram, Pinterest, or car photos" },
] as const;

type SubmitState = {
  status: "idle" | "success" | "error";
  message: string;
};

export function BuildForm({ initialNotes = "", initialValues = {}, quoteContext }: BuildFormProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  function getDefaultValue(id: string): string {
    switch (id) {
      case "make": return initialValues.make ?? "";
      case "model": return initialValues.model ?? "";
      case "year": return initialValues.year ?? "";
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
            make: valueFor("make"),
            model: valueFor("model"),
            year: valueFor("year"),
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
      setSubmitState({
        status: "success",
        message: `Quote request sent. ${BRAND_NAME} will get back to you shortly.`,
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
      <div className={styles.grid}>
        {fields.map((field) => (
          <label key={field.id} className={styles.field}>
            <span>{field.label}</span>
            <input
              autoComplete={field.autoComplete}
              disabled={isSubmitting}
              name={field.id}
              type={field.type}
              placeholder={field.placeholder}
              defaultValue={getDefaultValue(field.id)}
              required={field.required}
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
          {submitState.message}
        </p>
      ) : null}
      <p className={styles.help}>
        {`Quote requests are sent directly to ${BRAND_NAME}, and replies go back to the email address you provide above.`}
      </p>
    </form>
  );
}
