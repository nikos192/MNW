import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collectionSummaries, defaultMediaImage } from "@/lib/monza-data";
import { getCatalogData } from "@/lib/catalog";
import { breadcrumbJsonLd, jsonLd } from "@/lib/seo";
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
  const collectionProducts = products.filter((product) =>
    collection.handles.includes(product.handle),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Wheels", path: "/shop" },
            { name: collection.title, path: `/collections/${collection.slug}` },
          ]),
        )}
      />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`${styles.heroInner} container`}>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link className="breadcrumb-link" href="/">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link className="breadcrumb-link" href="/shop">
                Wheels
              </Link>
              <span aria-hidden="true">/</span>
              <span className="breadcrumb-current" aria-current="page">
                {collection.title}
              </span>
            </nav>
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
              <h2 className={styles.sectionTitle}>
                {collectionProducts.length > 0
                  ? "Current faces in this line."
                  : "First designs are in development."}
              </h2>
              {collectionProducts.length === 0 && (
                <p className={styles.heroCopy}>
                  The {collection.title.toLowerCase()} program is quoted directly around your
                  chassis while the published design library grows.{" "}
                  <Link className={styles.inlineLink} href="/contact">
                    Request a quote →
                  </Link>
                </p>
              )}
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
                      <span className={styles.cardMeta}>Starting at {product.price}</span>
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

        <section className={styles.ctaSection}>
          <div className={`${styles.ctaPanel} container`}>
            <div>
              <p className="label">Custom design program</p>
              <h2 className={styles.sectionTitle}>Can&apos;t find what you&apos;re looking for?</h2>
              <p className={styles.note}>
                Bring us a sketch, reference or idea and we can develop a one-off
                forged wheel around your vehicle and fitment.
              </p>
            </div>
            <Link className="button-outline" href="/contact?design=custom">
              Start a custom enquiry
            </Link>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={`${styles.ctaPanel} container`}>
            <div>
              <p className="label">Custom design program</p>
              <h2 className={styles.sectionTitle}>Can&apos;t find what you&apos;re looking for?</h2>
              <p className={styles.note}>
                Bring us a sketch, reference or idea and we can develop a one-off
                forged design around your chassis, fitment and finish direction.
              </p>
            </div>
            <Link className="button-outline" href="/contact?design=custom">
              Start a custom enquiry
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
