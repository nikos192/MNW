import Link from "next/link";
import { fitmentPrinciples, vehicleData } from "@/lib/mnw-data";
import styles from "./page.module.css";

type FitmentPageProps = {
  searchParams: Promise<{
    make?: string;
    model?: string;
    year?: string;
  }>;
};

export const metadata = {
  title: "Fitment",
  description:
    "See the vehicle platforms and fitment process MNW uses to quote forged wheel sets around each chassis.",
};

export default async function FitmentPage({ searchParams }: FitmentPageProps) {
  const params = await searchParams;
  const selection = [params.make, params.model, params.year]
    .filter(Boolean)
    .join(" / ");

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <p className="label">Fitment</p>
          <h1 className={styles.title}>Every set starts from the exact chassis.</h1>
          <p className={styles.copy}>
            Fitment is resolved around the vehicle, the brake package, the ride
            height, and the finish brief. The catalogue is only the starting
            point.
          </p>
          {selection ? (
            <p className={styles.selection}>Selected brief: {selection}</p>
          ) : null}
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.principles} container`}>
          {fitmentPrinciples.map((item) => (
            <article key={item.title} className={styles.card} data-reveal>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionIntro} data-reveal>
            <p className="label">Vehicle guide</p>
            <h2 className={styles.sectionHeading}>
              Platforms we quote most often.
            </h2>
          </div>

          <div className={styles.makeGrid}>
            {Object.entries(vehicleData).map(([make, models]) => (
              <article key={make} className={styles.makeCard} data-reveal>
                <h3>{make}</h3>
                <ul>
                  {Object.keys(models).map((model) => (
                    <li key={model}>{model}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={`${styles.ctaPanel} container`}>
          <div>
            <p className="label">Next step</p>
            <h2 className={styles.sectionHeading}>
              Need the exact numbers for your car?
            </h2>
          </div>
          <Link className="button-outline" href="/contact">
            Request a quote
          </Link>
        </div>
      </section>
    </main>
  );
}