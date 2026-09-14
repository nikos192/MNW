"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  PackageSearch,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  isValidTrackingNumber,
  normalizeTrackingNumber,
  TRACKING_NUMBER_MAX_LENGTH,
  type TrackingApiResponse,
  type TrackingResult,
  type TrackingStatusCode,
} from "@/lib/tracking-contract";
import {
  formatTrackingTimestamp,
  trackingErrorMessage,
} from "@/lib/tracking-display";
import styles from "./page.module.css";

type ViewState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "error"; message: string }
  | { phase: "success"; result: TrackingResult };

class TrackingClientError extends Error {
  constructor(readonly code: unknown) {
    super("Tracking request failed");
  }
}

function statusClass(code: TrackingStatusCode): string {
  switch (code) {
    case "delivered":
      return styles.statusDelivered;
    case "exception":
    case "returned":
      return styles.statusAttention;
    default:
      return styles.statusActive;
  }
}

export function TrackingClient() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [view, setView] = useState<ViewState>({ phase: "idle" });
  const requestController = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => () => {
      requestController.current?.abort();
    },
    [],
  );

  async function submitTracking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeTrackingNumber(trackingNumber);

    if (!isValidTrackingNumber(normalized)) {
      setView({
        phase: "error",
        message: trackingErrorMessage("INVALID_TRACKING_NUMBER"),
      });
      return;
    }

    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 12_000);
    setTrackingNumber(normalized);
    setView({ phase: "loading" });

    try {
      const response = await fetch("/api/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingNumber: normalized }),
        cache: "no-store",
        signal: controller.signal,
      });
      const payload = (await response.json()) as TrackingApiResponse;

      if (!response.ok || "error" in payload) {
        throw new TrackingClientError(
          "error" in payload ? payload.error.code : undefined,
        );
      }
      if (!("data" in payload)) throw new TrackingClientError(undefined);

      setView({ phase: "success", result: payload.data });
      window.requestAnimationFrame(() => resultRef.current?.focus());
    } catch (error) {
      if (error instanceof TrackingClientError) {
        setView({ phase: "error", message: trackingErrorMessage(error.code) });
      } else if (controller.signal.aborted) {
        setView({
          phase: "error",
          message: trackingErrorMessage("PROVIDER_TIMEOUT"),
        });
      } else {
        setView({ phase: "error", message: trackingErrorMessage(undefined) });
      }
    } finally {
      window.clearTimeout(timeout);
      if (requestController.current === controller) {
        requestController.current = null;
      }
    }
  }

  const isLoading = view.phase === "loading";
  const errorMessage = view.phase === "error" ? view.message : "";

  return (
    <div className={styles.tracker}>
      <section
        className={styles.lookupPanel}
        aria-labelledby="tracking-lookup-title"
      >
        <div className={styles.lookupIntro}>
          <div className={styles.lookupIcon} aria-hidden="true">
            <PackageSearch size={28} strokeWidth={1.5} />
          </div>
          <div>
            <p className={styles.panelLabel}>Shipment lookup</p>
            <h2 id="tracking-lookup-title" className={styles.lookupTitle}>
              Enter your tracking number.
            </h2>
            <p className={styles.lookupCopy}>
              Use the reference supplied in your MonzaWheels dispatch email.
            </p>
          </div>
        </div>

        <form className={styles.form} onSubmit={submitTracking} noValidate>
          <label className={styles.inputLabel} htmlFor="tracking-number">
            Tracking number
          </label>
          <div className={styles.inputRow}>
            <input
              id="tracking-number"
              className={styles.input}
              type="text"
              value={trackingNumber}
              onChange={(event) => {
                setTrackingNumber(event.target.value);
                if (view.phase === "error") setView({ phase: "idle" });
              }}
              placeholder="e.g. C0051300145757"
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck={false}
              minLength={6}
              maxLength={TRACKING_NUMBER_MAX_LENGTH}
              pattern="[A-Za-z0-9-]{6,40}"
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={
                errorMessage ? "tracking-help tracking-error" : "tracking-help"
              }
              disabled={isLoading}
            />
            <button
              className={styles.submitButton}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  Checking
                </>
              ) : (
                <>
                  Track shipment
                  <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
          <p id="tracking-help" className={styles.inputHelp}>
            Letters, numbers and hyphens only. One shipment per search.
          </p>
        </form>
      </section>

      <div
        className={styles.resultRegion}
        aria-live="polite"
        aria-busy={isLoading}
      >
        {view.phase === "idle" ? (
          <section
            className={styles.emptyState}
            aria-labelledby="tracking-empty-title"
          >
            <div>
              <p className={styles.panelLabel}>Live movement</p>
              <h2 id="tracking-empty-title" className={styles.emptyTitle}>
                One reference. Every available scan.
              </h2>
            </div>
            <div className={styles.emptyDetails}>
              <ShieldCheck size={24} strokeWidth={1.5} aria-hidden="true" />
              <p>
                Your lookup is securely relayed through MonzaWheels. The carrier
                service is never contacted directly by your browser.
              </p>
            </div>
          </section>
        ) : null}

        {isLoading ? (
          <section
            className={styles.loadingState}
            aria-label="Loading tracking information"
          >
            <span className={styles.loadingMark} aria-hidden="true" />
            <div>
              <p className={styles.panelLabel}>Contacting carrier</p>
              <p className={styles.loadingTitle}>Checking the latest scans…</p>
            </div>
          </section>
        ) : null}

        {view.phase === "error" ? (
          <section
            id="tracking-error"
            className={styles.errorState}
            role="alert"
            aria-labelledby="tracking-error-title"
          >
            <div className={styles.errorCode}>!</div>
            <div>
              <p className={styles.panelLabel}>Unable to show tracking</p>
              <h2 id="tracking-error-title" className={styles.errorTitle}>
                {view.message}
              </h2>
              <p className={styles.errorHelp}>
                If the number is correct and the issue continues,{" "}
                <Link href="/contact">contact MonzaWheels</Link> and we will
                check it for you.
              </p>
            </div>
          </section>
        ) : null}

        {view.phase === "success" ? (
          <div ref={resultRef} className={styles.result} tabIndex={-1}>
            <section
              className={styles.resultHead}
              aria-labelledby="tracking-result-title"
            >
              <div>
                <p className={styles.panelLabel}>Shipment record</p>
                <h2
                  id="tracking-result-title"
                  className={styles.trackingReference}
                >
                  {view.result.trackingNumber}
                </h2>
              </div>
              <span
                className={`${styles.statusBadge} ${statusClass(view.result.statusCode)}`}
              >
                <span aria-hidden="true" />
                {view.result.currentStatus}
              </span>
            </section>

            <dl className={styles.summaryGrid}>
              <div>
                <dt>
                  <Check size={16} strokeWidth={1.5} aria-hidden="true" />
                  Current status
                </dt>
                <dd>{view.result.currentStatus}</dd>
              </div>
              <div>
                <dt>
                  <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
                  Latest location
                </dt>
                <dd>{view.result.latestLocation || "Not supplied"}</dd>
              </div>
              <div>
                <dt>
                  <Clock3 size={16} strokeWidth={1.5} aria-hidden="true" />
                  Last updated
                </dt>
                <dd>{formatTrackingTimestamp(view.result.lastUpdated)}</dd>
              </div>
            </dl>

            <section
              className={styles.timelinePanel}
              aria-labelledby="tracking-timeline-title"
            >
              <div className={styles.timelineHeader}>
                <div>
                  <p className={styles.panelLabel}>Scan history</p>
                  <h3
                    id="tracking-timeline-title"
                    className={styles.timelineTitle}
                  >
                    Shipment timeline
                  </h3>
                </div>
                <p className={styles.carrierTime}>
                  Times shown in carrier local time
                </p>
              </div>

              {view.result.events.length ? (
                <ol className={styles.timeline}>
                  {view.result.events.map((item, index) => {
                    const isLatest = index === view.result.events.length - 1;
                    return (
                      <li
                        className={`${styles.timelineItem} ${isLatest ? styles.timelineItemLatest : ""}`}
                        key={`${item.occurredAt ?? "undated"}-${item.location ?? "unknown"}-${index}`}
                      >
                        <span
                          className={styles.timelineDot}
                          aria-hidden="true"
                        />
                        <div className={styles.timelineDate}>
                          <time dateTime={item.occurredAt ?? undefined}>
                            {formatTrackingTimestamp(item.occurredAt)}
                          </time>
                          {isLatest ? <span>Latest</span> : null}
                        </div>
                        <div className={styles.timelineEvent}>
                          <p>{item.description}</p>
                          {item.location ? (
                            <p className={styles.timelineLocation}>
                              <MapPin
                                size={14}
                                strokeWidth={1.5}
                                aria-hidden="true"
                              />
                              {item.location}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className={styles.noEvents}>
                  The shipment exists, but the carrier has not supplied scan
                  events yet.
                </p>
              )}
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
}
