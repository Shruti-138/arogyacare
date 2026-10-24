export const TZ = "Asia/Kolkata";
const OFFSET = "+05:30";

type Availability = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotMinutes: number;
};

export function toDate(date: string, time: string) {
  return new Date(`${date}T${time}:00${OFFSET}`);
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-CA", { timeZone: TZ });
}

export function nextDays(count: number) {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) =>
    formatDate(new Date(now + i * 24 * 60 * 60 * 1000))
  );
}

function dayOfWeek(date: string) {
  return new Date(`${date}T12:00:00${OFFSET}`).getUTCDay();
}

export function generateSlots(availabilities: Availability[], date: string) {
  const dow = dayOfWeek(date);
  const slots: string[] = [];

  for (const a of availabilities.filter((x) => x.dayOfWeek === dow)) {
    const [sh, sm] = a.startTime.split(":").map(Number);
    const [eh, em] = a.endTime.split(":").map(Number);
    for (let m = sh * 60 + sm; m + a.slotMinutes <= eh * 60 + em; m += a.slotMinutes) {
      const hh = String(Math.floor(m / 60)).padStart(2, "0");
      const mm = String(m % 60).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  return slots.sort();
}

export function timeOf(d: Date) {
  return d.toLocaleTimeString("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatDayLabel(date: string) {
  return new Date(`${date}T12:00:00${OFFSET}`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: TZ,
  });
}