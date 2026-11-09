import { describe, it, expect } from "vitest";
import { totals } from "./pricing";
describe("totals", () => {
  it("free shipping at $300+", () => expect(totals(300, "").shipping).toBe(0));
  it("charges $15 under $300", () => expect(totals(200, "").total).toBe(215));
  it("VELTRON10 gives 10% off", () => expect(totals(400, "veltron10").discount).toBe(40));
});
