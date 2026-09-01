import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConversionLink } from "@/components/conversion-link";
import { getVehicleFitment } from "@/lib/monza-data";
import { getVehicleSeoPage, VEHICLE_SEO_PAGES } from "@/lib/vehicle-seo-pages";
import { breadcrumbJsonLd, jsonLd } from "@/lib/seo";
import styles from "./page.module.css";

type VehiclePageProps = { params: Promise<{ vehicle: string }> };

export function generateStaticParams() {
  return VEHICLE_SEO_PAGES.map((page) => ({ vehicle: page.slug }));
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { vehicle } = await params;
  const page = getVehicleSeoPage(vehicle);
  if (!page) return { title: "Vehicle fitment not found" };

  return {
    title: `Custom Forged Wheels for ${page.displayName}`,
    description: `Custom monoblock and two-piece forged wheels for the ${page.displayName}, with offset, centre bore and brake clearance resolved to the exact Australian vehicle.`,
    alternates: { canonical: `/forged-wheels/${page.slug}` },
  };
}

export default async function VehicleForgedWheelsPage({ params }: VehiclePageProps) {
  const { vehicle } = await params;
  const page = getVehicleSeoPage(vehicle);
  if (!page) notFound();

  const fitment = getVehicleFitment(page.make, page.model);
  if (!fitment) notFound();

  const quoteParams = new URLSearchParams({
    design: "custom",
    make: page.make,
    model: page.model,
    notes: `${page.displayName} custom forged wheel enquiry`,
  });

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Vehicle fitment", path: "/fitment" }, { name: page.displayName, path: `/forged-wheels/${page.slug}` }]))} />
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <p className="label">{page.displayName} fitment</p>
          <h1>Custom forged wheels for the {page.displayName}.</h1>
          <p>{page.audienceCopy}</p>
          <div className={styles.actions}>
            <ConversionLink
              className="button-primary"
              eventSource={`vehicle_page_${page.slug}`}
              href={`/contact?${quoteParams.toString()}`}
            >
              Request a {page.displayName} quote
            </ConversionLink>
            <Link className="button-outline" href="/pricing">Build a delivered price</Link>
          </div>
        </div>
      </section>

      <section className={styles.fitment}>
        <div className={`${styles.fitmentGrid} container`}>
          <div>
            <p className="label">Known chassis foundation</p>
            <h2>Fitment starts with the car.</h2>
            <p>
              These chassis details are used as the starting point. Final offset, width,
              spoke clearance and tyre relationship are confirmed against your exact
              brakes, suspension and intended stance.
            </p>
          </div>
          <dl>
            <div><dt>PCD</dt><dd>{fitment.pcd}</dd></div>
            <div><dt>Centre bore</dt><dd>{fitment.centreBore}</dd></div>
            <div><dt>Diameter range</dt><dd>{fitment.minDiameter}&quot;–{fitment.maxDiameter}&quot;</dd></div>
            <div><dt>Construction</dt><dd>Monoblock or two-piece forged</dd></div>
          </dl>
        </div>
      </section>

      {page.provenBuild && <section className={styles.buildProof}><div className={`${styles.buildProofInner} container`}><div><p className="label">A Monza build on this platform</p><h2>{page.provenBuild.wheel}</h2><p>This featured build is visual reference, not a universal fitment specification. Your wheel geometry is still confirmed against your exact car.</p></div><Link className="button-outline" href={page.provenBuild.href}>{page.provenBuild.label}</Link></div></section>}

      <section className={styles.decisions}>
        <div className="container">
          <div className={styles.sectionHeading}>
            <p className="label">Resolved before machining</p>
            <h2>Not just a bolt pattern.</h2>
          </div>
          <div className={styles.cards}>
            <article><span>01</span><h3>Brake clearance</h3><p>Spoke profile and barrel clearance are reviewed around the fitted brake package.</p></article>
            <article><span>02</span><h3>Stance and geometry</h3><p>Width, offset and concavity are resolved around suspension, body clearance and intended use.</p></article>
            <article><span>03</span><h3>Design approval</h3><p>You approve the final drawing or render before full payment and machining.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`${styles.ctaInner} container`}>
          <div>
            <p className="label">Your car. Your direction.</p>
            <h2>Send a wheel reference or start from a MonzaWheels design.</h2>
          </div>
          <ConversionLink
            className="button-primary"
            eventSource={`vehicle_page_bottom_${page.slug}`}
            href={`/contact?${quoteParams.toString()}`}
          >
            Start the fitment brief
          </ConversionLink>
        </div>
      </section>
    </main>
  );
}
