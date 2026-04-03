"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { defaultMediaImage, type CatalogProduct, type DeliveredSet } from "@/lib/monza-data";
import styles from "./gallery-switcher.module.css";

type GallerySwitcherProps = {
  deliveredSets: DeliveredSet[];
  products: CatalogProduct[];
};

const placeholderTiles = Array.from({ length: 8 }, (_, index) => index);

export function GallerySwitcher({ deliveredSets, products }: GallerySwitcherProps) {
  const [activeTab, setActiveTab] = useState<"vehicle" | "wheel">("vehicle");
  const [, startTransition] = useTransition();

  const vehicleItems = deliveredSets.map((item) => ({
    eyebrow: item.chassis,
    title: item.finish,
    href: "/gallery",
    image: item.image,
  }));

  const wheelItems = products.map((product) => ({
    eyebrow: product.series,
    title: product.title,
    href: `/shop/${product.handle}`,
    image: product.images[0]?.url || defaultMediaImage,
  }));

  const hasVehicleImages = vehicleItems.some((item) => item.image !== defaultMediaImage);
  const hasWheelImages = wheelItems.some((item) => item.image !== defaultMediaImage);
  const activeItems = activeTab === "vehicle" ? vehicleItems : wheelItems;
  const showPlaceholders = activeTab === "vehicle" ? !hasVehicleImages : !hasWheelImages;

  return (
    <div className={styles.shell}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "vehicle" ? styles.tabActive : ""}`}
          onClick={() => {
            startTransition(() => {
              setActiveTab("vehicle");
            });
          }}
          type="button"
        >
          By Vehicle
        </button>
        <button
          className={`${styles.tab} ${activeTab === "wheel" ? styles.tabActive : ""}`}
          onClick={() => {
            startTransition(() => {
              setActiveTab("wheel");
            });
          }}
          type="button"
        >
          By Wheel
        </button>
      </div>

      <div key={activeTab} className={styles.grid}>
        {showPlaceholders
          ? placeholderTiles.map((item) => (
              <div key={item} className={styles.placeholderTile}>
                <span>Coming soon</span>
              </div>
            ))
          : activeItems.map((item) => (
              <Link key={`${activeTab}-${item.eyebrow}-${item.title}`} className={styles.tile} href={item.href}>
                <Image
                  alt={item.title}
                  className={styles.tileImage}
                  height={900}
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
                  src={item.image}
                  width={1400}
                />
                <div className={styles.overlay}>
                  <p className={styles.overlayEyebrow}>{item.eyebrow}</p>
                  <p className={styles.overlayTitle}>{item.title}</p>
                </div>
              </Link>
            ))}
      </div>

      <div className={styles.footerRow}>
        <Link className={styles.viewAllLink} href="/gallery">
          View full gallery →
        </Link>
      </div>
    </div>
  );
}