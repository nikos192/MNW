import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Thank you for your enquiry",
  description: "Your wheel quote request has been received by Monza Wheels.",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          <section aria-labelledby="thank-you-title">
            <span className={styles.check} aria-hidden="true"><Check size={28} strokeWidth={1.5} /></span>
            <p className="label">Enquiry received</p>
            <h1 id="thank-you-title" className={styles.title}>Your next set<br />starts here.</h1>
            <p className={styles.copy}>
              Thanks for choosing Monza Wheels. We’ve received your quote request
              and will be in touch to talk through your wheels, fitment and finish.
            </p>
            <div className={styles.actions}>
              <Link className="button-primary" href="/collections/monoblock">Explore the wheels <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link className={styles.home} href="/">Back to home</Link>
            </div>
          </section>
          <aside className={styles.next} aria-labelledby="next-title">
            <p className="label">What happens next</p>
            <h2 id="next-title">Made around you.</h2>
            <ol className={styles.steps}>
              <li><span>01</span><div><h3>Check your inbox</h3><p>A confirmation email is on its way. Check your junk folder if it hasn’t arrived.</p></div></li>
              <li><span>02</span><div><h3>We review your request</h3><p>Our team will look over your vehicle details and wheel requirements.</p></div></li>
              <li><span>03</span><div><h3>Let’s get the details right</h3><p>We’ll be in touch about your quote and any details we need to confirm.</p></div></li>
            </ol>
          </aside>
        </div>
      </div>
    </main>
  );
}
