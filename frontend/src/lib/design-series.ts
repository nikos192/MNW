export const DESIGN_SERIES = [
  {
    name: "Velocità",
    description:
      "Performance-led designs with open geometry, lightweight proportions and a sense of movement.",
  },
  {
    name: "Forza",
    description:
      "Bold, muscular designs defined by broad spokes, deep concavity and commanding road presence.",
  },
  {
    name: "Eleganza",
    description:
      "Refined multi-spoke designs balancing contemporary detail with timeless European character.",
  },
  {
    name: "Avanguardia",
    description:
      "Progressive designs shaped by directional lines, layered surfaces and unconventional geometry.",
  },
  {
    name: "Aerodinamica",
    description:
      "Aero-focused designs combining near-solid surfaces, sculpted openings and unmistakable visual impact.",
  },
] as const;

export type DesignSeriesName = (typeof DESIGN_SERIES)[number]["name"];
export type ConstructionFilter =
  | "All"
  | "1-Piece Forged"
  | "2-Piece Forged";

/**
 * The single source of truth for design-series membership. Assignments are
 * explicit so catalogue order, construction and naming never imply a series.
 */
export const WHEEL_DESIGN_SERIES = {
  "MW-11": "Velocità",
  "MW-12": "Velocità",
  "MW-13": "Velocità",
  "MW-14": "Forza",
  "MW-15": "Eleganza",
  "MW-16": "Velocità",
  "MW-17": "Velocità",
  "MW-18": "Velocità",
  "MW-19": "Eleganza",
  "MW-21": "Velocità",
  "MW-22": "Avanguardia",
  "MW-23": "Eleganza",
  "MW-24": "Avanguardia",
  "MW-25": "Forza",
  "MW-26": "Forza",
  "MW-27": "Eleganza",
  "MW-28": "Aerodinamica",
  "MW-29": "Aerodinamica",
  "MW-110": "Forza",
  "MW-111": "Avanguardia",
  "MW-112": "Forza",
  "MW-113": "Velocità",
  "MW-114": "Avanguardia",
  "MW-115": "Avanguardia",
  "MW-116": "Velocità",
  "MW-117": "Eleganza",
  "MW-118": "Avanguardia",
  "MW-119": "Avanguardia",
  "MW-120": "Forza",
  "MW-121": "Avanguardia",
  "MW-122": "Avanguardia",
  "MW-123": "Velocità",
  "MW-124": "Avanguardia",
  "MW-125": "Forza",
  "MW-126": "Eleganza",
  "MW-127": "Aerodinamica",
  "MW-128": "Eleganza",
  "MW-129": "Aerodinamica",
  "MW-130": "Avanguardia",
  "MW-132": "Aerodinamica",
  "MW-133": "Aerodinamica",
  "MW-134": "Velocità",
  "MW-210": "Forza",
  "MW-211": "Eleganza",
  "MW-212": "Forza",
  "MW-213": "Avanguardia",
} as const satisfies Record<string, DesignSeriesName>;

export function designSeriesFor(handle: string): DesignSeriesName {
  const designSeries = WHEEL_DESIGN_SERIES[
    handle as keyof typeof WHEEL_DESIGN_SERIES
  ];
  if (!designSeries) {
    throw new Error(`Missing design-series assignment for ${handle}`);
  }
  return designSeries;
}

type FilterableWheel = {
  handle: string;
  title: string;
  series: string;
  designSeries: DesignSeriesName;
  shortDescription: string;
  description: string;
};

export function filterWheelCatalogue<T extends FilterableWheel>(
  products: T[],
  designSeries: DesignSeriesName | "All",
  construction: ConstructionFilter,
  query: string,
): T[] {
  const search = query.trim().toLocaleLowerCase();

  return products.filter((product) => {
    if (designSeries !== "All" && product.designSeries !== designSeries) {
      return false;
    }
    if (construction !== "All" && product.series !== construction) {
      return false;
    }
    if (!search) return true;

    return [
      product.handle,
      product.title,
      product.designSeries,
      product.series,
      product.shortDescription,
      product.description,
    ]
      .join(" ")
      .toLocaleLowerCase()
      .includes(search);
  });
}
