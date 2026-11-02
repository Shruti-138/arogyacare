export type LabFlag = "normal" | "high" | "low" | "none";

export type LabRow = {
  name: string;
  value: string;
  unit: string;
  range: string;
  flag: LabFlag;
};

function computeFlag(value: string, range: string): LabFlag {
  const v = parseFloat(value.replace(/,/g, ""));
  const m = range
    .replace(/,/g, "")
    .match(/^(-?\d+(?:\.\d+)?)\s*[-–]\s*(-?\d+(?:\.\d+)?)$/);
  if (!m || Number.isNaN(v)) return "none";
  const lo = parseFloat(m[1]);
  const hi = parseFloat(m[2]);
  if (v < lo) return "low";
  if (v > hi) return "high";
  return "normal";
}

export function parseResults(text: string): LabRow[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = "", value = "", unit = "", range = ""] = line
        .split("|")
        .map((p) => p.trim());
      return { name, value, unit, range, flag: computeFlag(value, range) };
    })
    .filter((r) => r.name && r.value);
}
