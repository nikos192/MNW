"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { CatalogProduct } from "@/lib/monza-data";
import styles from "./page.module.css";

type PieceFilter = "1-Piece Forged" | "2-Piece Forged";

const filterOptions: Array<{
  value: PieceFilter;
  label: string;
  copy: string;
}> = [
  {
    value: "1-Piece Forged",
    label: "1-Piece",
    copy: "Monoblock forged wheels for the cleanest visual read and the widest fitment spread.",
  },
  {
    value: "2-Piece Forged",
    label: "2-Piece",
    copy: "Multi-piece forged wheels for deeper dish, stronger contrast, and hero-build fitment.",
  },
];

type ShopFilterProps = {
  products: CatalogProduct[];
};

export function ShopFilter({ products }: ShopFilterProps) {
  const [activeFilter, setActiveFilter] = useState<PieceFilter>("1-Piece Forged");
  const activeOption = filterOptions.find((option) => option.value === activeFilter) ?? filterOptions[0];
  const filteredProducts = products.filter((product) => product.series === activeFilter);

  return (
    <div className={styles.filterShell}>
      <div className={styles.filterBar} aria-label="Wheel construction filter" role="tablist">
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

      <div className={styles.filterMeta}>
        <p className={styles.filterLead}>{activeOption.label} Wheels</p>
        <p className={styles.filterCopy}>{activeOption.copy}</p>
        <p className={styles.filterCount}>
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? "wheel" : "wheels"}
        </p>
      </div>

      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
