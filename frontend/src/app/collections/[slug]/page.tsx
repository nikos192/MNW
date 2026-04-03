import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collectionSummaries, defaultMediaImage } from "@/lib/mnw-data";
import { getCatalogData } from "@/lib/catalog";
import styles from "../../page-shell.module.css";

type CollectionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function resolveCollection(slug: string) {
  return collectionSummaries.find((collection) => collection.slug === slug);
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = resolveCollection(slug);

  if (!collection) {
    return {
      title: "Collection",
    };
  }

  return {
    title: collection.title,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = resolveCollection(slug);

  if (!collection) {
    notFound();
  }

  const { products } = await getCatalogData();
  const matchedProducts = products.filter((product) => collection.handles.includes(product.handle));
  const collectionProducts =
    matchedProducts.length > 0
      ? matchedProducts
      : products.slice(0, collection.slug === "monoblock" ? 2 : 1);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <p className="label">{collection.label}</p>
          <h1 className={styles.heroTitle}>{collection.title}</h1>
          <p className={styles.heroCopy}>
            {collection.description} Final diameter, width, offset, and finish
            are still resolved around the exact vehicle.
          </p>
          <div className={styles.heroActions}>
            <Link className="button-outline" href="/contact">
              Request a Quote
            </Link>
            <Link className="button-outline" href="/fitment">
              View Fitment Guide
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="label">Available Designs</p>
            <h2 className={styles.sectionTitle}>Current faces in this line.</h2>
          </div>

          <div className={styles.collectionGrid}>
            {collectionProducts.map((product) => (
              <article key={product.id} className={styles.collectionCard} data-reveal>
                <Link className={styles.collectionMedia} href={`/shop/${product.handle}`}>
                  <Image
                    alt={product.title}
                    className={styles.collectionImage}
                    height={1200}
                    sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                    src={product.images[0]?.url || defaultMediaImage}
                    width={1600}
                  />
                </Link>

                <div className={styles.collectionBody}>
                  <p className={styles.cardOverline}>{product.series}</p>
                  <h2 className={styles.collectionTitle}>{product.title}</h2>
                  <p className={styles.collectionCopy}>{product.shortDescription}</p>
                  <div className={styles.collectionMeta}>
                    <span className={styles.cardMeta}>{product.price}</span>
                    <span className={styles.cardMeta}>{product.leadTime}</span>
                  </div>
                  <Link className={styles.inlineLink} href={`/shop/${product.handle}`}>
                    Open product →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}