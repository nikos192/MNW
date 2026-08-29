import assert from "node:assert/strict";
import test from "node:test";
import {
  addOnRetailIncGstAud,
  expressAirShippingIncGstAud,
  wheelSetRetailIncGstAud,
} from "../src/lib/pricing-formulas.ts";
import { totalLeadTimeDays } from "../src/lib/order-timelines.ts";

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

test("express air shipping is the GST-inclusive advertised upgrade", () => {
  assert.ok(Math.abs(expressAirShippingIncGstAud() - 800) < 0.001);
});

test("published total lead times add production and shipping transit", () => {
  assert.equal(totalLeadTimeDays("one-piece", "standard"), 60);
  assert.equal(totalLeadTimeDays("two-piece", "standard"), 70);
  assert.equal(totalLeadTimeDays("one-piece", "express"), 34);
  assert.equal(totalLeadTimeDays("two-piece", "express"), 44);
});
