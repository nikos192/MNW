import assert from "node:assert/strict";
import test from "node:test";
import {
  addOnRetailIncGstAud,
  expressAirShippingIncGstAud,
  wheelSetSalePriceIncGstAud,
  wheelSetRetailIncGstAud,
} from "../src/lib/pricing-formulas.ts";

const workedExamples = [
  { manufacturingCostAud: 1_363, expectedExact: 2_735.59 },
  { manufacturingCostAud: 2_840, expectedExact: 4_847.70 },
  { manufacturingCostAud: 2_386, expectedExact: 4_198.48 },
  { manufacturingCostAud: 4_430, expectedExact: 7_121.40 },
];

test("wheel-set retail applies shipping, then markup, then GST", () => {
  for (const example of workedExamples) {
    assert.ok(
      Math.abs(wheelSetRetailIncGstAud(example.manufacturingCostAud) - example.expectedExact) < 0.001,
    );
  }
});

test("ordinary add-ons receive markup and GST without wheel-set shipping", () => {
  assert.ok(Math.abs(addOnRetailIncGstAud(100) - 143) < 0.001);
});

test("express air shipping is cost plus GST without markup", () => {
  assert.ok(Math.abs(expressAirShippingIncGstAud() - 880) < 0.001);
});

test("the wheel sale discounts the wheel-set retail price by 10%", () => {
  assert.ok(Math.abs(wheelSetSalePriceIncGstAud(2_840) - 4_362.93) < 0.001);
});
