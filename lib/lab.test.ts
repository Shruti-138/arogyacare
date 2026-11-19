import { describe, expect, it } from "vitest";
import { parseResults } from "./lab";

describe("parseResults", () => {
  it("marks a value inside the range as normal", () => {
    const [row] = parseResults("Hemoglobin | 13.2 | g/dL | 12-16");
    expect(row).toEqual({
      name: "Hemoglobin",
      value: "13.2",
      unit: "g/dL",
      range: "12-16",
      flag: "normal",
    });
  });

  it("marks a value above the range as high", () => {
    const [row] = parseResults("WBC | 11800 | /uL | 4000-11000");
    expect(row.flag).toBe("high");
  });

  it("marks a value below the range as low", () => {
    const [row] = parseResults("Platelets | 120000 | /uL | 150000-450000");
    expect(row.flag).toBe("low");
  });

  it("treats the range limits themselves as normal", () => {
    const rows = parseResults("A | 12 | x | 12-16\nB | 16 | x | 12-16");
    expect(rows.map((r) => r.flag)).toEqual(["normal", "normal"]);
  });

  it("handles commas and an en dash in the range", () => {
    const [row] = parseResults("WBC | 11,800 | /uL | 4,000\u201311,000");
    expect(row.flag).toBe("high");
  });

  it("gives no flag when there is no numeric range", () => {
    const rows = parseResults("Notes | positive | | \nVitamin D | 18 | ng/mL | >30");
    expect(rows.map((r) => r.flag)).toEqual(["none", "none"]);
  });

  it("ignores empty lines and lines without a value", () => {
    const rows = parseResults("\n  \nJust a title\nHb | 13 | g/dL | 12-16\n\n");
    expect(rows).toHaveLength(1);
    expect(rows[0].name).toBe("Hb");
  });
});
