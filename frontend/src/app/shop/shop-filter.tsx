"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { CatalogProduct } from "@/lib/monza-data";
import styles from "./page.module.css";

type PieceFilter = "All" | "1-Piece Forged" | "2-Piece Forged";

const filterOptions: Array<{ value: PieceFilter; label: string; detail: string }> = [
  { value: "All", label: "All wheels", detail: "Complete collection" },
  { value: "1-Piece Forged", label: "1-Piece", detail: "Forged monoblock" },
  { value: "2-Piece Forged", label: "2-Piece", detail: "Forged centre + barrel" },
];

export function ShopFilter({ products }: { products: CatalogProduct[] }) {
  const [activeFilter, setActiveFilter] = useState<PieceFilter>("All");
  const visibleProducts = activeFilter === "All"
    ? products
    : products.filter((product) => product.series === activeFilter);

  return (
    <div className={styles.filterShell}>
      <div className={styles.filterHeader}>
        <div className={styles.filterBar} aria-label="Wheel construction" role="group">
          {filterOptions.map((option) => (
            <button
              aria-pressed={activeFilter === option.value}
              className={`${styles.filterButton} ${activeFilter === option.value ? styles.filterButtonActive : ""}`}
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              type="button"
            >
              <span>{option.label}</span>
              <small>{option.detail}</small>
            </button>
          ))}
        </div>
        <p className={styles.resultCount} aria-live="polite">
          {visibleProducts.length} {visibleProducts.length === 1 ? "design" : "designs"}
        </p>
      </div>

      <div className={styles.grid}>
        {visibleProducts.map((product, index) => (
          <ProductCard key={product.id} imageLoading={index < 3 ? "eager" : "lazy"} product={product} />
        ))}
      </div>
    </div>
  );
}
