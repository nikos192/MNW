"use client";

import { useId, useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import {
  DESIGN_SERIES,
  filterWheelCatalogue,
  type ConstructionFilter,
  type DesignSeriesName,
} from "@/lib/design-series";
import type { CatalogProduct } from "@/lib/monza-data";
import styles from "./page.module.css";

type SeriesFilter = DesignSeriesName | "All";

const constructionOptions: Array<{
  value: ConstructionFilter;
  label: string;
}> = [
  { value: "All", label: "All constructions" },
  { value: "1-Piece Forged", label: "Monoblock" },
  { value: "2-Piece Forged", label: "Two-Piece" },
];

const allSeries = {
  name: "All Wheels",
  description:
    "Five distinct design languages, engineered around the same made-to-order forged wheel program.",
} as const;

export function ShopFilter({ products }: { products: CatalogProduct[] }) {
  const searchId = useId();
  const [activeSeries, setActiveSeries] = useState<SeriesFilter>("All");
  const [activeConstruction, setActiveConstruction] =
    useState<ConstructionFilter>("All");
  const [query, setQuery] = useState("");

  const visibleProducts = useMemo(
    () =>
      filterWheelCatalogue(
        products,
        activeSeries,
        activeConstruction,
        query,
      ),
    [activeConstruction, activeSeries, products, query],
  );
  const selectedSeries =
    activeSeries === "All"
      ? allSeries
      : DESIGN_SERIES.find((series) => series.name === activeSeries) ??
        allSeries;

  return (
    <div className={styles.filterShell}>
      <nav className={styles.seriesNav} aria-label="Wheel design series">
        <button
          aria-pressed={activeSeries === "All"}
          className={`${styles.seriesButton} ${activeSeries === "All" ? styles.seriesButtonActive : ""}`}
          onClick={() => setActiveSeries("All")}
          type="button"
        >
          <span>00</span>
          All Wheels
        </button>
        {DESIGN_SERIES.map((series, index) => (
          <button
            aria-pressed={activeSeries === series.name}
            className={`${styles.seriesButton} ${activeSeries === series.name ? styles.seriesButtonActive : ""}`}
            key={series.name}
            onClick={() => setActiveSeries(series.name)}
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {series.name}
          </button>
        ))}
      </nav>

      <div className={styles.catalogueControls}>
        <div
          className={styles.constructionFilters}
          aria-label="Wheel construction"
          role="group"
        >
          {constructionOptions.map((option) => (
            <button
              aria-pressed={activeConstruction === option.value}
              className={`${styles.constructionButton} ${activeConstruction === option.value ? styles.constructionButtonActive : ""}`}
              key={option.value}
              onClick={() => setActiveConstruction(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className={styles.searchField}>
          <label htmlFor={searchId}>Search wheels</label>
          <input
            id={searchId}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name or MW number"
            type="search"
            value={query}
          />
        </div>
      </div>

      <section className={styles.seriesIntroduction} aria-live="polite">
        <div>
          <p className="label">Series</p>
          <h2>{selectedSeries.name}</h2>
        </div>
        <div className={styles.seriesSummary}>
          <p>{selectedSeries.description}</p>
          <span>
            {visibleProducts.length}{" "}
            {visibleProducts.length === 1 ? "available design" : "available designs"}
          </span>
        </div>
      </section>

      {visibleProducts.length > 0 ? (
        <div className={styles.grid}>
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              imageLoading={index < 3 ? "eager" : "lazy"}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState} role="status">
          <p className="label">No matching designs</p>
          <h3>Try another series, construction or search.</h3>
          <button
            onClick={() => {
              setActiveSeries("All");
              setActiveConstruction("All");
              setQuery("");
            }}
            type="button"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
