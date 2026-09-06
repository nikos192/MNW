import styles from "./program-faq.module.css";

export const programFaqQuestions = [
  {
    question: "What do I need to send?",
    answer:
      "A vehicle make, contact details and one wheel reference are enough to begin. Upload a photo, sketch, render or PDF; unknown fitment details can stay blank.",
  },
  {
    question: "Do I approve the design before production?",
    answer:
      "Yes. We provide a custom 3D render with the confirmed wheel specification for your review. Production begins only after you approve it.",
  },
  {
    question: "When is payment due?",
    answer:
      "Full payment is completed at the start of the confirmed production order, after the design, fitment, price and expected timing have been reviewed with you.",
  },
  {
    question: "Can I request design changes?",
    answer:
      "The 3D render is provided for review before production, so feedback can be resolved before you approve machining. The number and scope of revisions depend on the brief and are confirmed with your quote rather than assumed as a fixed allowance.",
  },
  {
    question: "How long does production take?",
    answer:
      "Production is approximately 20 days for one-piece forged wheels and 30 days for two-piece forged wheels after approval. Shipping is additional: approximately 40 days standard or 2 weeks express.",
  },
  {
    question: "How is fitment confirmed?",
    answer:
      "PCD, centre bore, offset, width, brake clearance and intended stance are reviewed around the exact vehicle, brake package and suspension before the wheel geometry is approved.",
  },
  {
    question: "What is included in the displayed price?",
    answer:
      "The live AUD price includes four custom forged wheels, standard centre caps, standard shipping and GST. Express Shipping is an optional AUD $800 upgrade and is never added unless selected. Tyres and installation are not included unless separately quoted.",
  },
  {
    question: "What warranty is included?",
    answer:
      "Every set includes five-year structural and finish coverage for manufacturing defects, subject to the published warranty conditions and correct professional installation.",
  },
  {
    question: "Are the wheels tested?",
    answer:
      "The wheel program is JWL certified and uses enhanced bending-fatigue, radial-fatigue and impact testing. Detailed standards and cycle figures are published on the Engineering page.",
  },
];

export function ProgramFaq() {
  return (
    <div className={styles.faq}>
      {programFaqQuestions.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
