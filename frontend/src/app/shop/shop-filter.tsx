"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { CatalogProduct } from "@/lib/monza-data";
import styles from "./page.module.css";

type PieceFilter = "All" | "1-Piece Forged" | "2-Piece Forged";

const filterOptions: Array<{
  value: PieceFilter;
  label: string;
}> = [
  {
    value: "All",
    label: "All wheels",
  },
  {
    value: "1-Piece Forged",
    label: "Monoblock",
  },
  {
    value: "2-Piece Forged",
    label: "Multi-piece",
  },
];

type ShopFilterProps = {
  products: CatalogProduct[];
};

export function ShopFilter({ products }: ShopFilterProps) {
  const [activeFilter, setActiveFilter] = useState<PieceFilter>("All");
  const visibleProducts =
    activeFilter === "All"
      ? products
      : products.filter((product) => product.series === activeFilter);

  return (
    <div className={styles.filterShell}>
      <div className={styles.filterHeader}>
        <div className={styles.filterBar} aria-label="Wheel construction filter" role="group">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              aria-pressed={activeFilter === option.value}
              className={`${styles.filterButton} ${activeFilter === option.value ? styles.filterButtonActive : ""}`}
              onClick={() => setActiveFilter(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className={styles.resultCount} aria-live="polite">
          {visibleProducts.length} {visibleProducts.length === 1 ? "design" : "designs"}
        </p>
      </div>

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
        <div className={styles.filterMeta}>
          <p className={styles.filterCopy}>
            New designs are in development. We can already create a one-off wheel
            around your chassis—<Link href="/contact">start a custom design</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
