import { describe, expect, it } from "vitest";
import { formatTime, generateSlots } from "./slots";

const monday = [
  { dayOfWeek: 1, startTime: "10:00", endTime: "17:00", slotMinutes: 30 },
];

describe("generateSlots", () => {
  it("creates 14 half-hour slots on a working day", () => {
    const slots = generateSlots(monday, "2026-10-26");
    expect(slots).toHaveLength(14);
    expect(slots[0]).toBe("10:00");
    expect(slots[slots.length - 1]).toBe("16:30");
  });

  it("returns no slots on a day off", () => {
    expect(generateSlots(monday, "2026-10-25")).toEqual([]);
  });

  it("respects the slot length", () => {
    const hourly = [{ ...monday[0], slotMinutes: 60 }];
    const slots = generateSlots(hourly, "2026-10-26");
    expect(slots).toHaveLength(7);
    expect(slots[slots.length - 1]).toBe("16:00");
  });
});

describe("formatTime", () => {
  it("formats afternoon times", () => {
    expect(formatTime("13:30")).toBe("1:30 PM");
  });

  it("formats midnight and noon", () => {
    expect(formatTime("00:05")).toBe("12:05 AM");
    expect(formatTime("12:00")).toBe("12:00 PM");
  });

  it("formats morning times", () => {
    expect(formatTime("09:00")).toBe("9:00 AM");
  });
});
