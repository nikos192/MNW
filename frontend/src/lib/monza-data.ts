export type CatalogImage = {
  url: string;
  alt: string;
};

export type WheelFinish = {
  name: string;
  swatch: string;
};

export type WheelSpec = {
  label: string;
  value: string;
};

export type CatalogProduct = {
  id: string;
  handle: string;
  title: string;
  series: string;
  shortDescription: string;
  description: string;
  price: string;
  leadTime: string;
  images: CatalogImage[];
  finishes: WheelFinish[];
  specs: WheelSpec[];
  diameterOptions: string[];
  widthOptions: string[];
  pcdOptions: string[];
  offsetRange: string;
};

export type DeliveredSet = {
  chassis: string;
  fitment: string;
  finish: string;
  note: string;
  image: string;
};

export type ProcessStep = {
  title: string;
  copy: string;
};

export type FinishProgram = {
  title: string;
  overline: string;
  copy: string;
};

export type DealerRegion = {
  region: string;
  city: string;
  note: string;
  contact: string;
};

export type CollectionSummary = {
  slug: "monoblock" | "multi-piece";
  label: string;
  title: string;
  description: string;
  handles: string[];
};

export const vehicleData: Record<string, Record<string, number[]>> = {
  BMW: {
    "G80 M3": [2021, 2022, 2023, 2024],
    "G82 M4": [2021, 2022, 2023, 2024],
    "G87 M2": [2023, 2024],
    "G20 3 Series": [2019, 2020, 2021, 2022, 2023, 2024],
  },
  Porsche: {
    "992 Carrera": [2020, 2021, 2022, 2023, 2024],
    "718 Cayman": [2020, 2021, 2022, 2023, 2024],
    Macan: [2020, 2021, 2022, 2023, 2024],
  },
  Audi: {
    "RS3 8Y": [2022, 2023, 2024],
    "RS5 B9": [2020, 2021, 2022, 2023, 2024],
    "R8 V10": [2020, 2021, 2022, 2023],
  },
  Mercedes: {
    "AMG GT": [2021, 2022, 2023, 2024],
    "C63 S": [2021, 2022, 2023, 2024],
    "A45 S": [2021, 2022, 2023, 2024],
  },
  Volkswagen: {
    "Golf R": [2022, 2023, 2024],
    "Golf GTI": [2022, 2023, 2024],
    Arteon: [2022, 2023, 2024],
  },
};

export const defaultMediaImage = "/media/hero-wheel-poster.jpg";

export const fallbackProducts: CatalogProduct[] = [
  {
    id: "mnw-01",
    handle: "mnw-01",
    title: "MonzaWheels-01",
    series: "Series 01",
    shortDescription:
      "A measured face with enough edge definition to carry luxury and performance builds without visual noise.",
    description:
      "MonzaWheels-01 is the calmest entry in the range. It suits sedans and coupes that need a deliberate surface, exact brake clearance, and a finish program that stays restrained rather than loud.",
    price: "$4,500",
    leadTime: "8–12 weeks",
    images: [
      { url: defaultMediaImage, alt: "MonzaWheels-01 forged wheel" },
      { url: defaultMediaImage, alt: "MonzaWheels-01 alternate angle" },
      { url: defaultMediaImage, alt: "MonzaWheels-01 profile" },
      { url: defaultMediaImage, alt: "MonzaWheels-01 detail" },
    ],
    finishes: [
      { name: "Brushed clear", swatch: "#AFAFAD" },
      { name: "Satin graphite", swatch: "#2A2A2A" },
      { name: "Gloss black", swatch: "#0F0F0F" },
    ],
    specs: [
      { label: "Construction", value: "Forged monoblock" },
      { label: "Material", value: "6061-T6 aluminium billet" },
      { label: "Diameter", value: "19, 20, 21" },
      { label: "Width", value: "9.0 to 12.0" },
      { label: "PCD", value: "5x112, 5x114.3, 5x120, centre lock by brief" },
      { label: "Offset", value: "Resolved per chassis" },
    ],
    diameterOptions: ["19\"", "20\"", "21\""],
    widthOptions: ["9.0\"", "9.5\"", "10.0\"", "10.5\"", "11.0\"", "11.5\"", "12.0\""],
    pcdOptions: ["5x112", "5x114.3", "5x120"],
    offsetRange: "Resolved per chassis",
  },
  {
    id: "mnw-02",
    handle: "mnw-02",
    title: "MonzaWheels-02",
    series: "Series 01",
    shortDescription:
      "Sharper spoke architecture for builds that need obvious brake presence and more motorsport tension in the face.",
    description:
      "MonzaWheels-02 pushes the spoke architecture harder. It works best around aggressive brake packages, staggered fitment, and projects where the wheel needs more tension without tipping into visual clutter.",
    price: "$4,900",
    leadTime: "8–12 weeks",
    images: [
      { url: defaultMediaImage, alt: "MonzaWheels-02 forged wheel" },
      { url: defaultMediaImage, alt: "MonzaWheels-02 alternate angle" },
      { url: defaultMediaImage, alt: "MonzaWheels-02 profile" },
      { url: defaultMediaImage, alt: "MonzaWheels-02 detail" },
    ],
    finishes: [
      { name: "Gloss black", swatch: "#0F0F0F" },
      { name: "Machine face", swatch: "#F5F5F3" },
      { name: "Satin graphite", swatch: "#2A2A2A" },
    ],
    specs: [
      { label: "Construction", value: "Forged monoblock" },
      { label: "Material", value: "6061-T6 aluminium billet" },
      { label: "Diameter", value: "19, 20, 21" },
      { label: "Width", value: "9.5 to 12.5" },
      { label: "PCD", value: "5x112, 5x114.3, 5x120" },
      { label: "Offset", value: "Brake package dependent" },
    ],
    diameterOptions: ["19\"", "20\"", "21\""],
    widthOptions: ["9.5\"", "10.0\"", "10.5\"", "11.0\"", "11.5\"", "12.0\"", "12.5\""],
    pcdOptions: ["5x112", "5x114.3", "5x120"],
    offsetRange: "Brake package dependent",
  },
  {
    id: "mnw-03",
    handle: "mnw-03",
    title: "MonzaWheels-03",
    series: "Series 01",
    shortDescription:
      "A stronger concave language suited to hero builds where the wheel is part of the car's visual signature.",
    description:
      "MonzaWheels-03 is the deeper, more dramatic base. It is best when the brief wants stronger rear architecture, more negative space, and a finish program that becomes part of the car's identity.",
    price: "$5,200",
    leadTime: "8–12 weeks",
    images: [
      { url: defaultMediaImage, alt: "MonzaWheels-03 forged wheel" },
      { url: defaultMediaImage, alt: "MonzaWheels-03 alternate angle" },
      { url: defaultMediaImage, alt: "MonzaWheels-03 profile" },
      { url: defaultMediaImage, alt: "MonzaWheels-03 detail" },
    ],
    finishes: [
      { name: "Brushed clear", swatch: "#AFAFAD" },
      { name: "Machine face", swatch: "#F5F5F3" },
      { name: "Gloss black", swatch: "#0F0F0F" },
    ],
    specs: [
      { label: "Construction", value: "Forged monoblock" },
      { label: "Material", value: "6061-T6 aluminium billet" },
      { label: "Diameter", value: "20, 21, 22" },
      { label: "Width", value: "9.5 to 13.0" },
      { label: "PCD", value: "5x112, 5x114.3, 5x120" },
      { label: "Offset", value: "Statement staggered fitment" },
    ],
    diameterOptions: ["20\"", "21\"", "22\""],
    widthOptions: ["9.5\"", "10.0\"", "10.5\"", "11.0\"", "11.5\"", "12.0\"", "12.5\"", "13.0\""],
    pcdOptions: ["5x112", "5x114.3", "5x120"],
    offsetRange: "Statement staggered fitment",
  },
];

export const deliveredSets: DeliveredSet[] = [
  {
    chassis: "BMW G80 M3",
    fitment: "19x9.5 / 20x10.5",
    finish: "Brushed clear with machined cap",
    note: "Reference build for a restrained staggered street setup.",
    image: defaultMediaImage,
  },
  {
    chassis: "Porsche 992 Carrera",
    fitment: "20x9 / 21x11.5",
    finish: "Satin graphite with hidden hardware",
    note: "Illustrates how the same face tightens up when the rear architecture gets more aggressive.",
    image: defaultMediaImage,
  },
  {
    chassis: "Audi RS3 8Y",
    fitment: "19x9 square",
    finish: "Gloss black with machine lip",
    note: "Proof point for a compact chassis with brake-clearance priorities.",
    image: defaultMediaImage,
  },
];

export const fitmentPrinciples = [
  {
    title: "Chassis first",
    copy: "Width, offset, bore, and brake clearance are resolved around the exact vehicle before the wheel moves into production.",
  },
  {
    title: "No shelf offsets",
    copy: "The catalogue is a design direction, not a locked inventory system. Final geometry is approved as part of the brief.",
  },
  {
    title: "Made to order",
    copy: "Each set moves into machining, finishing, and final approval only after the vehicle and finish direction are signed off.",
  },
];

export const aboutStatements = [
  {
    title: "Designed in Australia",
    copy: "MonzaWheels is built around a simple idea: the wheel should feel native to the chassis rather than adapted after the fact.",
  },
  {
    title: "Forged, not generic",
    copy: "Every program starts from a forged blank and ends with a fitment, face, and finish combination approved for the exact build.",
  },
  {
    title: "Quote-first process",
    copy: "This is a configure-to-order product. The right outcome comes from the brief, not from forcing a generic cart flow onto a custom part.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Brief",
    copy: "Vehicle, brake package, ride height, and finish direction are locked before geometry is approved.",
  },
  {
    title: "Engineering",
    copy: "Offsets, bores, spoke clearance, and load path are resolved around the exact chassis rather than a generic shelf fitment.",
  },
  {
    title: "Machining",
    copy: "Each face starts from a forged 6061-T6 billet and moves through machining only after the brief is signed off.",
  },
  {
    title: "Finish",
    copy: "Surface treatment and final detailing are chosen as part of the same program, not added as an afterthought.",
  },
];

export const finishPrograms: FinishProgram[] = [
  {
    title: "Brushed Clear",
    overline: "Finish Program 01",
    copy: "A cool silver read that keeps spoke geometry crisp without pulling attention away from the chassis.",
  },
  {
    title: "Satin Graphite",
    overline: "Finish Program 02",
    copy: "The most restrained surface in the range. It works when the wheel needs to sit inside the car rather than on top of it.",
  },
  {
    title: "Gloss Black",
    overline: "Finish Program 03",
    copy: "High contrast and deliberate. Best used where negative space and brake presence are part of the visual brief.",
  },
];

export const dealerRegions: DealerRegion[] = [
  {
    region: "Australia",
    city: "Brisbane",
    note: "Direct quoting, chassis reviews, and finish consultations from the MonzaWheels workshop.",
    contact: "hello@monzawheels.com.au",
  },
  {
    region: "Europe",
    city: "Partner network forming",
    note: "Send the vehicle brief and we will route the project to the closest fitment partner as the network expands.",
    contact: "hello@monzawheels.com.au",
  },
  {
    region: "Asia Pacific",
    city: "By appointment",
    note: "Remote quoting and logistics support for projects outside Brisbane while the dealer footprint grows.",
    contact: "hello@monzawheels.com.au",
  },
];

export const collectionSummaries: CollectionSummary[] = [
  {
    slug: "monoblock",
    label: "Forged Series",
    title: "Monoblock",
    description: "Single-piece forged faces for cleaner chassis, tighter proportions, and the most direct visual read.",
    handles: ["mnw-01", "mnw-02"],
  },
  {
    slug: "multi-piece",
    label: "Forged Series",
    title: "Multi-Piece",
    description: "More layered architecture, deeper hardware presence, and a stronger statement for hero builds.",
    handles: ["mnw-03"],
  },
];
