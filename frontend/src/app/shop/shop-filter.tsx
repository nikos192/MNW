"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { CatalogProduct } from "@/lib/monza-data";
import styles from "./page.module.css";

type PieceFilter = "1-Piece Forged" | "2-Piece Forged";

const filterOptions: Array<{
  value: PieceFilter;
  label: string;
}> = [
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
  const [activeFilter, setActiveFilter] = useState<PieceFilter>("1-Piece Forged");
  const groupedProducts = filterOptions.map((option) => ({
    ...option,
    products: products.filter((product) => product.series === option.value),
  }));

  return (
    <div className={styles.filterShell}>
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

      {groupedProducts.map((group) => (
        <div
          key={group.value}
          aria-hidden={activeFilter !== group.value}
          className={`${styles.gridPanel} ${activeFilter === group.value ? "" : styles.gridPanelHidden}`}
        >
          <div className={styles.grid}>
            {group.products.map((product) => (
              <ProductCard key={product.id} imageLoading="eager" product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
