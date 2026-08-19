"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ConversionLink } from "@/components/conversion-link";
import type { WheelFinish } from "@/lib/monza-data";
import styles from "./finish-library.module.css";

type Filter = "All" | "Brushed" | "Gloss" | "Satin" | "Polished" | "Frozen" | "Stone";

const filters: Filter[] = [
  "All",
  "Brushed",
  "Gloss",
  "Satin",
  "Polished",
  "Frozen",
  "Stone",
];

function categoryFor(name: string): Exclude<Filter, "All"> {
  const value = name.toLowerCase();
  if (value.startsWith("brushed")) return "Brushed";
  if (value.startsWith("gloss")) return "Gloss";
  if (value.startsWith("satin")) return "Satin";
  if (value.startsWith("polished")) return "Polished";
  if (value.startsWith("frozen")) return "Frozen";
  return "Stone";
}

function colourFor(name: string) {
  const value = name.toLowerCase();
  if (value.includes("dark clear")) return "Dark clear";
  if (value.includes("white gold")) return "White gold";
  if (value.includes("champagne")) return "Champagne";
  if (value.includes("bronze")) return "Bronze";
  if (value.includes("copper")) return "Copper";
  if (value.includes("gold")) return "Gold";
  if (value.includes("charcoal")) return "Charcoal";
  if (value.includes("silver")) return "Silver";
  if (value.includes("black")) return "Black";
  return "Clear";
}

function finishDetails(name: string) {
  const value = name.toLowerCase();

  if (value.includes("polished")) {
    return {
      character: "High-reflection metal with the sharpest highlight and strongest visual contrast.",
      care: "Clean frequently with pH-neutral wheel cleaner and a soft cloth. Avoid abrasive metal polish unless specifically approved.",
      pairing: "Particularly effective against black, white, grey and saturated paint colours.",
      price: "Polished treatment · additional-cost finish",
    };
  }
  if (value.includes("brushed")) {
    return {
      character: "Visible directional grain that reveals the spoke geometry without a mirror finish.",
      care: "Use pH-neutral wheel cleaner and wipe with the grain. Avoid abrasive compounds and aggressive brushes.",
      pairing: "A versatile technical finish for dark, neutral and metallic vehicle colours.",
      price: "Brushed treatment · additional-cost finish",
    };
  }
  if (value.includes("frozen") || value.includes("satin")) {
    return {
      character: "Low-sheen surface with controlled highlights and a more understated technical appearance.",
      care: "Use pH-neutral products only. Do not polish or wax, as this can create uneven glossy areas.",
      pairing: "Works especially well with gloss paint, exposed brakes and high-contrast body colours.",
      price: "Core finish selection · confirmed in final quote",
    };
  }
  if (value.includes("stone") || value.includes("textured")) {
    return {
      character: "Fine texture that softens reflections and gives the wheel a more material, purposeful appearance.",
      care: "Rinse loose brake dust first, then clean with a soft detailing brush and pH-neutral solution.",
      pairing: "Strong with SUVs, performance builds and neutral, green, bronze or black paint.",
      price: "Core finish selection · confirmed in final quote",
    };
  }
  return {
    character: "Gloss surface with clear highlights, saturated colour and easy visual contrast.",
    care: "Wash regularly with pH-neutral wheel cleaner and a soft mitt. Avoid acidic cleaners and automatic car-wash chemicals.",
    pairing: "A clean all-round choice; lighter colours create contrast while dark colours produce a more integrated look.",
    price: "Core finish selection · confirmed in final quote",
  };
}

export function FinishLibrary({ finishes }: { finishes: WheelFinish[] }) {
  const [filter, setFilter] = useState<Filter>("Brushed");
  const [selectedName, setSelectedName] = useState(finishes[0]?.name ?? "");
  const [comparison, setComparison] = useState<string[]>([]);

  const visible = useMemo(
    () => finishes.filter((finish) => filter === "All" || categoryFor(finish.name) === filter),
    [filter, finishes],
  );
  const selected = finishes.find((finish) => finish.name === selectedName) ?? finishes[0];
  const selectedDetails = selected ? finishDetails(selected.name) : null;
  const comparedFinishes = comparison
    .map((name) => finishes.find((finish) => finish.name === name))
    .filter((finish): finish is WheelFinish => Boolean(finish));

  function toggleComparison(name: string) {
    setComparison((current) => {
      if (current.includes(name)) return current.filter((item) => item !== name);
      if (current.length === 2) return [current[1], name];
      return [...current, name];
    });
  }

  if (!selected || !selectedDetails) return null;

  const quoteHref = `/contact?${new URLSearchParams({
    finish: selected.name,
    notes: `Preferred finish: ${selected.name}`,
  }).toString()}`;

  return (
    <div className={styles.library}>
      <div className={styles.filters} role="group" aria-label="Filter finishes">
        {filters.map((option) => (
          <button
            aria-pressed={filter === option}
            data-active={filter === option}
            key={option}
            onClick={() => setFilter(option)}
            type="button"
          >
            <span>{option}</span>
            <small>{option === "All" ? finishes.length : finishes.filter((finish) => categoryFor(finish.name) === option).length}</small>
          </button>
        ))}
      </div>

      <div className={styles.resultsBar} aria-live="polite">
        <p><strong>{visible.length}</strong> {filter === "All" ? "finish directions" : `${filter.toLowerCase()} finishes`}</p>
        <span>Select a sample to inspect it in detail</span>
      </div>

      <div className={styles.workspace}>
        <div className={styles.grid} aria-label={`${filter} finishes`}>
          {visible.map((finish) => {
            const isSelected = finish.name === selected.name;
            const isCompared = comparison.includes(finish.name);
            return (
              <article className={styles.card} data-selected={isSelected} key={finish.name}>
                <button
                  aria-label={`Preview ${finish.name}`}
                  className={styles.previewButton}
                  onClick={() => setSelectedName(finish.name)}
                  type="button"
                >
                  <span className={styles.imageWrap}>
                    <Image
                      alt={`${finish.name} forged wheel finish`}
                      fill
                      sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 240px"
                      src={finish.image}
                    />
                  </span>
                  <span className={styles.cardMeta}>
                    <strong>{finish.name}</strong>
                    <small>{categoryFor(finish.name)} · {colourFor(finish.name)}</small>
                  </span>
                </button>
                <button
                  aria-pressed={isCompared}
                  className={styles.compareButton}
                  data-active={isCompared}
                  onClick={() => toggleComparison(finish.name)}
                  type="button"
                >
                  {isCompared ? "Added to compare" : "Compare"}
                </button>
              </article>
            );
          })}
        </div>

        <aside className={styles.detail}>
          <div className={styles.detailImage}>
            <Image
              alt={`${selected.name} large finish preview`}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 34vw"
              src={selected.image}
            />
          </div>
          <div className={styles.detailBody}>
            <p className={styles.detailLabel}>Selected finish</p>
            <h2>{selected.name}</h2>
            <dl>
              <div><dt>Visual character</dt><dd>{selectedDetails.character}</dd></div>
              <div><dt>Pairs well with</dt><dd>{selectedDetails.pairing}</dd></div>
              <div><dt>Care</dt><dd>{selectedDetails.care}</dd></div>
              <div><dt>Pricing</dt><dd>{selectedDetails.price}</dd></div>
            </dl>
            <ConversionLink
              className="button-primary"
              eventName="FinishQuoteClick"
              eventSource={selected.name}
              href={quoteHref}
            >
              Request {selected.name}
            </ConversionLink>
          </div>
        </aside>
      </div>

      {comparedFinishes.length ? (
        <section className={styles.comparison} aria-live="polite">
          <div className={styles.comparisonHeader}>
            <div>
              <p className={styles.detailLabel}>Side by side</p>
              <h2>Compare finishes</h2>
            </div>
            <button onClick={() => setComparison([])} type="button">Clear comparison</button>
          </div>
          <div className={styles.comparisonGrid}>
            {comparedFinishes.map((finish) => {
              const details = finishDetails(finish.name);
              return (
                <article key={finish.name}>
                  <div className={styles.comparisonImage}>
                    <Image alt={`${finish.name} comparison`} fill sizes="(max-width: 700px) 100vw, 50vw" src={finish.image} />
                  </div>
                  <h3>{finish.name}</h3>
                  <p>{details.character}</p>
                  <button onClick={() => setSelectedName(finish.name)} type="button">View details</button>
                </article>
              );
            })}
            {comparedFinishes.length === 1 ? (
              <div className={styles.emptyCompare}>Choose one more finish from the library to compare it here.</div>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
