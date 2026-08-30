import type { Metadata } from "next";
import { FavouritesSection } from "@/components/favourites-section";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Our Favourite Wheel Builds",
  description:
    "Explore standout McLaren, Mercedes-AMG and BMW builds featuring bespoke MonzaWheels forged wheel combinations.",
  alternates: { canonical: "/favourites" },
  openGraph: {
    type: "website",
    url: "/favourites",
    title: "Our Favourite Wheel Builds | MonzaWheels",
    description:
      "See how bespoke MonzaWheels forged wheel combinations transform the character of standout performance cars.",
    images: [{
      url: "/favourites/720s%201.png",
      width: 1072,
      height: 1074,
      alt: "White McLaren 720S on bespoke Monza forged wheels",
    }],
  },
};

export default function FavouritesPage() {
  return (
    <main className={styles.page}>
      <FavouritesSection />
    </main>
  );
}
