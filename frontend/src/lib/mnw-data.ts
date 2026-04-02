export type DesignBase = {
  name: string;
  profile: string;
  note: string;
  description: string;
  fitmentFocus: string;
  finishDirection: string;
};

export type DeliveredSet = {
  chassis: string;
  fitment: string;
  finish: string;
  note: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  copy: string;
};

export const designBases: DesignBase[] = [
  {
    name: "MNW-01",
    profile: "Monoblock / precision spoke",
    note: "For sedans and coupes that need a calm surface with exact brake clearance.",
    description:
      "A measured face with enough edge definition to carry luxury and performance builds without visual noise.",
    fitmentFocus: "BMW G-series and modern Porsche street fitments",
    finishDirection: "Brushed clear, satin graphite, or machine-face programs",
  },
  {
    name: "MNW-02",
    profile: "Split spoke / motorsport edge",
    note: "Built around aggressive brake packages, staggered fitment, and lighter visual mass.",
    description:
      "Sharper spoke architecture for builds that need obvious brake presence and more motorsport tension in the face.",
    fitmentFocus: "Track-focused sedans, RS models, AMG and M cars",
    finishDirection: "Gloss black, dark metallics, and contrast hardware",
  },
  {
    name: "MNW-03",
    profile: "Deep concave / custom finish brief",
    note: "Best used when the face is only the beginning and the finish program carries the identity.",
    description:
      "A stronger concave language suited to hero builds where the wheel is part of the car's visual signature.",
    fitmentFocus: "Rear-drive staggered setups and statement street builds",
    finishDirection: "Two-tone brushed, custom paint, or hidden-hardware finishes",
  },
  {
    name: "MNW-04",
    profile: "Technical mesh / brake-forward",
    note: "A denser face designed for chassis that need both depth and confidence around large calipers.",
    description:
      "Tighter spoke frequency without tipping into clutter, ideal for a more engineered and technical read.",
    fitmentFocus: "Porsche, Audi RS, and larger brake clearances",
    finishDirection: "Satin metallics, machine detail, subtle contrast caps",
  },
  {
    name: "MNW-05",
    profile: "Five spoke / strong negative space",
    note: "A simpler face where proportion, offset, and finish do most of the work.",
    description:
      "Minimal on paper but extremely dependent on exact width, concavity, and stance to feel correct.",
    fitmentFocus: "Coupe and GT platforms that suit cleaner spoke architecture",
    finishDirection: "Machine-face, brushed smoke, or painted solid colors",
  },
  {
    name: "MNW-06",
    profile: "Complex spoke / show build base",
    note: "Used when the brief wants movement, reflection, and more visual detail up close.",
    description:
      "A stronger styling-led direction that still needs proper fitment discipline to avoid feeling generic.",
    fitmentFocus: "Show-oriented builds, larger diameters, and custom finish briefs",
    finishDirection: "Custom paint, polished sections, or special finish programs",
  },
];

export const deliveredSets: DeliveredSet[] = [
  {
    chassis: "BMW G80 M3",
    fitment: "19x9.5 / 20x10.5",
    finish: "Brushed clear with machined cap",
    note: "Reference build for a restrained staggered street setup.",
  },
  {
    chassis: "Porsche 992 Carrera",
    fitment: "20x9 / 21x11.5",
    finish: "Satin graphite with hidden hardware",
    note: "Illustrates how the same face tightens up when the rear architecture gets more aggressive.",
  },
  {
    chassis: "Audi RS3 8Y",
    fitment: "19x9 square",
    finish: "Gloss black with machine lip",
    note: "Proof point for a compact chassis with brake-clearance priorities.",
  },
  {
    chassis: "Mercedes-AMG GT",
    fitment: "20x10 / 21x12",
    finish: "Tinted brushed bronze",
    note: "A finish-led build where the wheel reads differently in motion and sunlight.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Choose a face",
    copy:
      "Start from a design base, previous build, or a new direction built with us from reference images and sketches.",
  },
  {
    step: "02",
    title: "Resolve the chassis",
    copy:
      "We lock brake clearance, ride height, widths, offsets, centre bore, and hardware around the exact car.",
  },
  {
    step: "03",
    title: "Approve and build",
    copy:
      "Once the spec and finish are signed off, the set moves into machining, finishing, validation, and final photography.",
  },
];
