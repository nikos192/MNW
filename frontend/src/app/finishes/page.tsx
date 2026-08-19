import type { Metadata } from "next";
import { FinishLibrary } from "@/components/finish-library";
import { finishOptions } from "@/lib/monza-data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Forged Wheel Finishes",
  description:
    "Compare MonzaWheels forged wheel finishes visually, review surface character and care, then carry your preferred finish into a custom quote.",
  alternates: { canonical: "/finishes" },
};

export default function FinishesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <p className="label">Finish library</p>
          <h1>See the finish. Compare the character.</h1>
          <p>
            Explore every current surface program on the same wheel form. Filter by
            surface treatment, compare two directions, then send the preferred finish with
            your quote request.
          </p>
          <dl>
            <div><dt>{finishOptions.length}</dt><dd>Current finish directions</dd></div>
            <div><dt>2</dt><dd>Finishes compared side by side</dd></div>
            <div><dt>1</dt><dd>Final finish approved before production</dd></div>
          </dl>
        </div>
      </section>

      <section className={styles.librarySection}>
        <div className="container">
          <div className={styles.sectionIntro}>
            <p className="label">Choose a direction</p>
            <h2>One wheel. {finishOptions.length} different reads.</h2>
            <p>
              Screen colour is indicative. Final colour, sheen and any additional
              treatment cost are confirmed with the complete wheel specification.
            </p>
          </div>
          <FinishLibrary finishes={finishOptions} />
        </div>
      </section>

      <section className={styles.customSection}>
        <div className={`${styles.customGrid} container`}>
          <div>
            <p className="label">Beyond the library</p>
            <h2>Paint code, two-tone or a completely custom direction.</h2>
          </div>
          <div>
            <p>
              Bring a vehicle paint code, sample, reference image or surface
              combination. Custom paint, dual-tone treatment, chrome and special
              polishing are priced with the final specification.
            </p>
            <ol>
              <li><span>01</span>Choose a library finish or send a reference</li>
              <li><span>02</span>We confirm feasibility, treatment and pricing</li>
              <li><span>03</span>You approve the finish direction before production</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
