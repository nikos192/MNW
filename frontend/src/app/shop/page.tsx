import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { getCatalogData } from "@/lib/catalog";
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
          <div className={styles.collectionLinks}>
            <Link className={styles.collectionLink} href="/collections/multi-piece">
              Explore 2-Piece Wheels
            </Link>
            <Link className={styles.collectionLink} href="/collections/monoblock">
              Explore 1-Piece Wheels
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
