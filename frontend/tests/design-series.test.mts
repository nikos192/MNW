import assert from "node:assert/strict";
import test from "node:test";
import {
  DESIGN_SERIES,
  WHEEL_DESIGN_SERIES,
  designSeriesFor,
  filterWheelCatalogue,
  type DesignSeriesName,
} from "../src/lib/design-series.ts";

const expectedHandles = [
  "MW-11",
  "MW-12",
  "MW-13",
  "MW-14",
  "MW-15",
  "MW-16",
  "MW-17",
  "MW-18",
  "MW-19",
  "MW-21",
  "MW-22",
  "MW-23",
  "MW-24",
  "MW-25",
  "MW-26",
  "MW-27",
  "MW-28",
  "MW-29",
  "MW-110",
  "MW-111",
  "MW-112",
  "MW-113",
  "MW-114",
  "MW-115",
  "MW-116",
  "MW-117",
  "MW-118",
  "MW-119",
  "MW-120",
  "MW-121",
  "MW-122",
  "MW-123",
  "MW-124",
  "MW-125",
  "MW-126",
  "MW-127",
  "MW-128",
  "MW-129",
  "MW-130",
  "MW-131",
  "MW-132",
  "MW-133",
  "MW-134",
  "MW-210",
  "MW-211",
  "MW-212",
  "MW-213",
];

test("every catalogue wheel has exactly one design-series assignment", () => {
  assert.deepEqual(Object.keys(WHEEL_DESIGN_SERIES).sort(), expectedHandles.sort());
  assert.equal(Object.values(WHEEL_DESIGN_SERIES).length, 47);
});

test("all five series contain at least one wheel", () => {
  const counts = new Map<DesignSeriesName, number>(
    DESIGN_SERIES.map((series) => [series.name, 0]),
  );

  for (const series of Object.values(WHEEL_DESIGN_SERIES)) {
    counts.set(series, (counts.get(series) ?? 0) + 1);
  }

  assert.deepEqual(
    [...counts.entries()],
    [
      ["Velocità", 12],
      ["Forza", 9],
      ["Eleganza", 8],
      ["Avanguardia", 12],
      ["Aerodinamica", 6],
    ],
  );
});

test("missing assignments fail loudly", () => {
  assert.throws(() => designSeriesFor("MW-999"), /Missing design-series assignment/);
});

test("series, construction and search filters compose", () => {
  const products = [
    {
      handle: "MW-12",
      title: 'MW-12 "Roggia"',
      series: "1-Piece Forged",
      designSeries: "Velocità" as const,
      shortDescription: "Directional split-spoke",
      description: "Open performance geometry",
    },
    {
      handle: "MW-21",
      title: 'MW-21 "Ascari"',
      series: "2-Piece Forged",
      designSeries: "Velocità" as const,
      shortDescription: "Open two-piece wheel",
      description: "Performance-led construction",
    },
    {
      handle: "MW-28",
      title: 'MW-28 "Biondetti"',
      series: "2-Piece Forged",
      designSeries: "Aerodinamica" as const,
      shortDescription: "Near-solid aero disc",
      description: "Sculpted openings",
    },
  ];

  assert.deepEqual(
    filterWheelCatalogue(products, "Velocità", "2-Piece Forged", "ascari").map(
      (product) => product.handle,
    ),
    ["MW-21"],
  );
  assert.deepEqual(
    filterWheelCatalogue(products, "All", "All", "aero").map(
      (product) => product.handle,
    ),
    ["MW-28"],
  );
});
