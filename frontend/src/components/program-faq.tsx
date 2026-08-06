import styles from "./program-faq.module.css";

const questions = [
  {
    question: "What do I need to send?",
    answer:
      "A vehicle make, contact details and one wheel reference are enough to begin. Upload a photo, sketch, render or PDF; unknown fitment details can stay blank.",
  },
  {
    question: "Do I approve the design before production?",
    answer:
      "Yes. The final drawing or render, wheel specification and delivered price are confirmed for your approval before machining begins.",
  },
  {
    question: "When is payment due?",
    answer:
      "Full payment is completed at the start of the confirmed production order, after the design, fitment, price and expected timing have been reviewed with you.",
  },
  {
    question: "How long does production take?",
    answer:
      "The current estimate is approximately 20 days for a monoblock set and 30 days for a two-piece set from order confirmation. Delivery time is additional and can vary by destination.",
  },
  {
    question: "How is fitment confirmed?",
    answer:
      "PCD, centre bore, offset, width, brake clearance and intended stance are reviewed around the exact vehicle, brake package and suspension before the wheel geometry is approved.",
  },
  {
    question: "What is included in the displayed price?",
    answer:
      "The live AUD price covers four custom forged wheels, standard centre caps, free standard shipping and GST. Express Air Shipping is an optional $880 upgrade. Tyres and installation are not included unless separately quoted.",
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
      {questions.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
