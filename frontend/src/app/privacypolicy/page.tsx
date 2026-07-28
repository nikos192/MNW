import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_EMAIL, BRAND_LEGAL_NAME } from "@/lib/brand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MonzaWheels collects, uses, stores and protects personal information when you browse our website or request a custom wheel quote.",
  alternates: { canonical: "/privacypolicy" },
};

const sections = [
  { id: "information-we-collect", label: "Information we collect" },
  { id: "how-we-collect", label: "How we collect it" },
  { id: "how-we-use", label: "How we use it" },
  { id: "cookies-and-tracking", label: "Cookies and tracking" },
  { id: "sharing-information", label: "Sharing information" },
  { id: "overseas-processing", label: "Overseas processing" },
  { id: "storage-and-security", label: "Storage and security" },
  { id: "access-and-correction", label: "Access and correction" },
  { id: "privacy-complaints", label: "Privacy complaints" },
  { id: "contact-us", label: "Contact us" },
];

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <p className="label">Privacy</p>
          <h1 className={styles.heroTitle}>Privacy Policy</h1>
          <p className={styles.heroCopy}>
            This policy explains how {BRAND_LEGAL_NAME} handles personal information when
            you browse our website, contact us, or request a custom wheel quote.
          </p>
          <p className={styles.updated}>Last updated 28 July 2026</p>
        </div>
      </header>

      <div className={`${styles.policyLayout} container`}>
        <aside className={styles.contents} aria-label="Privacy policy contents">
          <p className={styles.contentsTitle}>On this page</p>
          <nav>
            <ol className={styles.contentsList}>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className={styles.policy}>
          <section className={styles.introduction}>
            <p>
              We respect your privacy and aim to manage personal information openly and
              responsibly. Where the Privacy Act 1988 (Cth) and Australian Privacy
              Principles apply to us, we will handle personal information in accordance
              with those requirements.
            </p>
            <p>
              This policy applies to information handled through monzawheels.com.au and
              related communications with us. It does not apply to third-party websites
              that we link to.
            </p>
          </section>

          <section className={styles.policySection} id="information-we-collect">
            <p className={styles.sectionNumber}>01</p>
            <h2>Information we collect</h2>
            <p>The information we collect depends on how you interact with us and may include:</p>
            <ul>
              <li>your name, email address and phone number;</li>
              <li>
                vehicle and fitment details, including make, model, year, brake and
                suspension information;
              </li>
              <li>
                wheel preferences, design references, inspiration links, uploaded or
                emailed images, finishes and notes included in a quote request;
              </li>
              <li>our correspondence with you and information about your enquiry or order;</li>
              <li>
                technical information such as IP address, device and browser type, pages
                visited, referring page, timestamps and advertising identifiers; and
              </li>
              <li>
                any other information you choose to provide. Please do not send sensitive
                information that is not necessary for your enquiry.
              </li>
            </ul>
          </section>

          <section className={styles.policySection} id="how-we-collect">
            <p className={styles.sectionNumber}>02</p>
            <h2>How we collect information</h2>
            <p>
              We usually collect information directly from you when you submit a form,
              request a quote, join an early-access list, email us, message us through
              social media, or otherwise communicate with us.
            </p>
            <p>
              Some technical information is collected automatically when you use the
              website through hosting logs, cookies and similar technologies.
            </p>
          </section>

          <section className={styles.policySection} id="how-we-use">
            <p className={styles.sectionNumber}>03</p>
            <h2>How we use information</h2>
            <p>We may use personal information to:</p>
            <ul>
              <li>respond to enquiries and prepare custom design or fitment quotes;</li>
              <li>communicate about a quote, order, product or service;</li>
              <li>provide requested updates and manage our customer relationships;</li>
              <li>operate, secure, troubleshoot and improve the website;</li>
              <li>measure advertising performance and understand website use;</li>
              <li>prevent spam, fraud, misuse and security incidents; and</li>
              <li>meet our legal, accounting and record-keeping obligations.</li>
            </ul>
            <p>
              If we send direct marketing, you can opt out at any time by using the
              unsubscribe option provided or contacting us. We do not sell personal
              information.
            </p>
          </section>

          <section className={styles.policySection} id="cookies-and-tracking">
            <p className={styles.sectionNumber}>04</p>
            <h2>Cookies and advertising tracking</h2>
            <p>
              Our website uses the Meta Pixel. It sends a <strong>PageView</strong> event
              when a page loads, <strong>ViewContent</strong> on wheel product pages,{" "}
              <strong>Lead</strong> and <strong>Contact</strong> after a quote form is
              successfully submitted, and <strong>CompleteRegistration</strong> after an
              early-access registration. Meta may use cookies or similar identifiers to
              measure advertising, attribute conversions and personalise advertising in
              accordance with its own privacy terms.
            </p>
            <p>
              You can control cookies through your browser and manage advertising
              preferences through your Meta account. Blocking tracking technologies may
              reduce advertising measurement but should not prevent you from submitting a
              quote.
            </p>
            <a
              className={styles.textLink}
              href="https://www.facebook.com/privacy/policy/"
              rel="noreferrer noopener"
              target="_blank"
            >
              Read Meta&apos;s Privacy Policy
            </a>
          </section>

          <section className={styles.policySection} id="sharing-information">
            <p className={styles.sectionNumber}>05</p>
            <h2>When we share information</h2>
            <p>
              We may share personal information only as reasonably required with service
              providers that support our business, including:
            </p>
            <ul>
              <li>Resend, which delivers form and quote emails;</li>
              <li>Vercel, which hosts and secures the website;</li>
              <li>Meta, for advertising measurement and analytics;</li>
              <li>suppliers or delivery partners where needed to fulfil an order; and</li>
              <li>
                professional advisers, regulators, law enforcement or other parties where
                required or permitted by law.
              </li>
            </ul>
            <p>
              Shopify supports our online catalogue infrastructure. Quote form contents are
              not submitted to Shopify through this website.
            </p>
          </section>

          <section className={styles.policySection} id="overseas-processing">
            <p className={styles.sectionNumber}>06</p>
            <h2>Overseas processing</h2>
            <p>
              Some of our technology providers operate globally. As a result, personal
              information may be processed or stored outside Australia, including in the
              United States and other locations where those providers or their
              subcontractors operate. The countries involved may change with provider
              infrastructure.
            </p>
            <p>
              Where required, we take reasonable steps to ensure overseas handling is
              consistent with applicable Australian privacy requirements.
            </p>
          </section>

          <section className={styles.policySection} id="storage-and-security">
            <p className={styles.sectionNumber}>07</p>
            <h2>Storage, retention and security</h2>
            <p>
              Information may be held in our email, business records and systems operated
              by our service providers. We use reasonable administrative and technical
              safeguards designed to protect it from misuse, interference, loss and
              unauthorised access, modification or disclosure.
            </p>
            <p>
              We keep personal information only for as long as reasonably needed for the
              purposes described in this policy, including customer service, warranty,
              legal and record-keeping needs. No internet transmission or storage system
              can be guaranteed to be completely secure.
            </p>
          </section>

          <section className={styles.policySection} id="access-and-correction">
            <p className={styles.sectionNumber}>08</p>
            <h2>Access and correction</h2>
            <p>
              You may ask to access personal information we hold about you or request that
              inaccurate information be corrected. Email us with enough detail to identify
              the information. We may need to verify your identity before responding and
              will explain if applicable law allows us to refuse all or part of a request.
            </p>
          </section>

          <section className={styles.policySection} id="privacy-complaints">
            <p className={styles.sectionNumber}>09</p>
            <h2>Privacy complaints</h2>
            <p>
              If you have a privacy concern, please contact us first with details of the
              issue. We will acknowledge and investigate the complaint and aim to respond
              within a reasonable period.
            </p>
            <p>
              If you are not satisfied with our response, you may be able to complain to
              the Office of the Australian Information Commissioner.
            </p>
            <a
              className={styles.textLink}
              href="https://www.oaic.gov.au/privacy/privacy-complaints/lodge-a-privacy-complaint-with-us"
              rel="noreferrer noopener"
              target="_blank"
            >
              Privacy complaints at the OAIC
            </a>
          </section>

          <section className={styles.policySection} id="contact-us">
            <p className={styles.sectionNumber}>10</p>
            <h2>Contact us</h2>
            <p>
              For privacy questions, access or correction requests, complaints, or a copy
              of this policy in another accessible form, contact:
            </p>
            <address className={styles.contactCard}>
              <strong>{BRAND_LEGAL_NAME}</strong>
              <span>Brisbane, Queensland, Australia</span>
              <a href={`mailto:${BRAND_EMAIL}`}>{BRAND_EMAIL}</a>
            </address>
            <p>
              We may update this policy as our practices or legal obligations change. The
              latest version will remain available on this page with its updated date.
            </p>
          </section>

          <div className={styles.backLink}>
            <Link href="/">Return to MonzaWheels</Link>
          </div>
        </article>
      </div>
    </main>
  );
}
