import { createHmac } from "crypto";

const MINUTES_BEFORE = 15;
const MINUTES_AFTER = 90;

export function meetingUrl(appointmentId: string) {
  const secret = process.env.SESSION_SECRET ?? "dev-only-secret";
  const code = createHmac("sha256", secret)
    .update(appointmentId)
    .digest("hex")
    .slice(0, 20);
  return `https://meet.jit.si/ArogyaCare-${code}`;
}

export function canJoinNow(startsAt: Date, now: number = Date.now()) {
  const start = startsAt.getTime();
  return (
    now >= start - MINUTES_BEFORE * 60_000 &&
    now <= start + MINUTES_AFTER * 60_000
  );
}
