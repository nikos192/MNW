import { getCatalogData } from "@/lib/catalog";
import { ShopFilter } from "./shop-filter";
import styles from "./page.module.css";

export const metadata = {
  title: "Shop",
  description:
    "Browse the MonzaWheels forged wheel range. Final fitment and finish are quoted around the exact vehicle.",
};

export default async function ShopPage() {
  const { products } = await getCatalogData();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <p className="label">Collection</p>
          <h1 className={styles.title}>
            Choose the base. We spec the wheel around the car.
          </h1>
          <p className={styles.copy}>
            Every entry here is a forged design direction. Final diameter,
            width, offset, finish, and brake clearance are confirmed after the
            brief.
          </p>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className="container">
          <ShopFilter products={products} />
        </div>
      </section>
    </main>
  );
}
