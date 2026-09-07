"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useRef } from "react";
import { BRAND_NAME } from "@/lib/brand";
import styles from "./build-form.module.css";
import { trackFunnelEvent, trackMetaEvent } from "@/lib/meta-pixel";
import { trackGoogleAdsLeadConversion } from "@/lib/google-ads";
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
  quoteType?: "wheel" | "custom" | "contact";
  shippingOption?: ShippingOption;
};

type BuildFormProps = {
  initialNotes?: string;
  initialValues?: InitialValues;
  quoteContext?: QuoteContext;
};

const wheelFields = [
  { id: "diameter", label: "Preferred size", placeholder: "e.g. 20 inch" },
  {
    id: "width",
    label: "Preferred width",
    placeholder: "e.g. 9.5 front / 10.5 rear",
  },
  { id: "finish", label: "Finish", placeholder: "e.g. Brushed silver" },
  { id: "capColour", label: "Centre cap colour", placeholder: "e.g. Black" },
] as const;

type SubmitState = {
  status: "idle" | "success" | "error";
  message: string;
};

export function BuildForm({
  initialNotes = "",
  initialValues = {},
  quoteContext,
}: BuildFormProps) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isContact = quoteContext?.quoteType === "contact";
  const isCustom = !isContact && quoteContext?.quoteType !== "wheel";
  const [files, setFiles] = useState<File[]>([]);
  const hasTrackedStart = useRef(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  const initialVehicle = [
    initialValues.year,
    initialValues.make,
    initialValues.model,
  ]
    .filter(Boolean)
    .join(" ");
  const [vehicle, setVehicle] = useState(initialVehicle);

  function trackStart() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackFunnelEvent("QuoteFormStart", {
      content_name:
        quoteContext?.productTitle ??
        (isContact ? "Contact enquiry" : "Wheel quote"),
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formValues = new FormData(form);
    const valueFor = (fieldId: string) =>
      String(formValues.get(fieldId) ?? "").trim();

    if (!valueFor("name") || (isContact ? !notes.trim() : !vehicle.trim())) {
      setSubmitState({
        status: "error",
        message: isContact
          ? "Please enter your name and message."
          : "Please enter your name and vehicle.",
      });
      return;
    }

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
        vehicle: isContact
          ? undefined
          : {
              description: vehicle.trim(),
              ...(vehicle.trim() === initialVehicle
                ? {
                    make: initialValues.make,
                    model: initialValues.model,
                    year: initialValues.year,
                  }
                : {}),
            },
        wheel: isContact
          ? undefined
          : {
              diameter: valueFor("diameter"),
              width: valueFor("width"),
              pcd: initialValues.pcd ?? "",
              offset: initialValues.offset ?? "",
              centrebore: initialValues.centrebore ?? "",
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

      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          result?.error || "Unable to send your enquiry right now.",
        );
      }

      const quoteType =
        quoteContext?.quoteType ??
        (quoteContext?.productHandle ? "wheel" : "custom");
      const leadParameters = {
        content_category: isContact
          ? "Contact enquiry"
          : quoteType === "wheel"
            ? "Forged wheel quote"
            : "Custom forged wheel quote",
        content_ids: quoteContext?.productHandle
          ? [quoteContext.productHandle]
          : [isContact ? "contact" : "custom-forged-wheel"],
        content_name:
          quoteContext?.productTitle ??
          (isContact ? "Contact enquiry" : "Wheel quote"),
        content_type: "product",
        lead_type: isContact
          ? "contact_enquiry"
          : quoteType === "wheel"
            ? "wheel_quote"
            : "custom_quote",
      };
      trackMetaEvent("Lead", leadParameters, { eventID: eventId });
      trackGoogleAdsLeadConversion();
      trackFunnelEvent(
        "QuoteFormStep",
        {
          ...leadParameters,
          step: "submitted",
          step_name: "Enquiry sent",
        },
        { eventID: eventId },
      );
      form.reset();
      setNotes(initialNotes);
      setVehicle(initialVehicle);
      setFiles([]);
      setSubmitState({
        status: "success",
        message: `Your enquiry has been sent. ${BRAND_NAME} will get back to you shortly. A confirmation email is on its way now, so please check your junk mail if you do not see it in your inbox.`,
      });
      if (!isContact) router.push("/thank-you");
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your enquiry right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className={styles.form}
      onFocusCapture={trackStart}
      onSubmit={handleSubmit}
    >
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

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Name</span>
          <input
            autoComplete="name"
            disabled={isSubmitting}
            name="name"
            required
            maxLength={200}
          />
        </label>
        <label className={styles.field}>
          <span>Email</span>
          <input
            autoComplete="email"
            disabled={isSubmitting}
            name="email"
            type="email"
            required
            maxLength={254}
          />
        </label>
      </div>

      {!isContact && (
        <label className={styles.field}>
          <span>Your vehicle</span>
          <input
            disabled={isSubmitting}
            name="vehicle"
            required
            maxLength={200}
            placeholder="e.g. 2023 BMW M3"
            value={vehicle}
            onChange={(event) => setVehicle(event.target.value)}
          />
        </label>
      )}

      <label className={styles.fieldWide}>
        <span>
          {isContact ? "Message" : "Notes"}{" "}
          {!isContact && <span className={styles.optionalTag}>(optional)</span>}
        </span>
        <textarea
          disabled={isSubmitting}
          name="notes"
          rows={3}
          required={isContact}
          maxLength={5000}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder={
            isContact
              ? "How can we help?"
              : isCustom
                ? "Tell us about the wheel you have in mind."
                : "Anything you’d like us to know?"
          }
        />
      </label>

      {isCustom && (
        <details className={styles.details}>
          <summary>
            Add a photo or reference <span>(optional)</span>
          </summary>
          <div className={styles.detailContent}>
            <label className={styles.field}>
              <span>Reference link</span>
              <input
                disabled={isSubmitting}
                name="references"
                type="url"
                maxLength={500}
                placeholder="https://"
              />
            </label>
            <div className={styles.uploadBox}>
              <label className={styles.uploadLabel}>
                <span>Photos, sketches or renders</span>
                <input
                  accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                  disabled={isSubmitting}
                  multiple
                  type="file"
                  onChange={(event) => {
                    const nextFiles = Array.from(event.target.files ?? []);
                    if (
                      nextFiles.length > 3 ||
                      nextFiles.reduce((total, file) => total + file.size, 0) >
                        4 * 1024 * 1024
                    ) {
                      setSubmitState({
                        status: "error",
                        message:
                          "Choose up to 3 reference files, 4MB or smaller in total.",
                      });
                      event.target.value = "";
                      setFiles([]);
                      return;
                    }
                    setFiles(nextFiles);
                    setSubmitState({ status: "idle", message: "" });
                  }}
                />
              </label>
              <p>JPG, PNG, WebP or PDF · up to 3 files · 4MB total</p>
              {files.length > 0 && (
                <ul className={styles.fileList}>
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </details>
      )}

      {!isContact && (
        <details className={styles.details}>
          <summary>
            Add wheel details <span>(optional)</span>
          </summary>
          <div className={`${styles.grid} ${styles.detailContent}`}>
            {wheelFields.map((field) => (
              <label key={field.id} className={styles.field}>
                <span>{field.label}</span>
                <input
                  disabled={isSubmitting}
                  name={field.id}
                  placeholder={field.placeholder}
                  maxLength={100}
                  defaultValue={initialValues[field.id] ?? ""}
                />
              </label>
            ))}
          </div>
        </details>
      )}

      <button className={styles.button} disabled={isSubmitting} type="submit">
        {isSubmitting
          ? "Sending…"
          : isContact
            ? "Send message"
            : "Request quote"}
      </button>

      {submitState.status !== "idle" ? (
        <p
          className={`${styles.status} ${
            submitState.status === "success"
              ? styles.statusSuccess
              : styles.statusError
          }`}
          role="status"
        >
          <span className={styles.statusLabel}>
            {submitState.status === "success"
              ? "Enquiry sent"
              : "Unable to send"}
          </span>
          {submitState.message}
        </p>
      ) : null}
    </form>
  );
}
