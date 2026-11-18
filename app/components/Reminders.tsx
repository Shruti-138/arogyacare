import Link from "next/link";
import { Bell, Video } from "lucide-react";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";
import { getLocale } from "../../lib/i18n";
import { TZ, formatTime, timeOf } from "../../lib/slots";
import { pages7 } from "../../lib/messages/pages7";
import { reminders } from "../../lib/messages/reminders";

function dateOf(d: Date) {
  return d.toLocaleDateString("en-CA", { timeZone: TZ });
}

export default async function Reminders() {
  const session = await getSession();
  if (!session || session.role !== "PATIENT") return null;

  const patient = await prisma.patient.findUnique({
    where: { userId: session.userId },
    select: { id: true },
  });
  if (!patient) return null;

  const now = new Date();
  const soon = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const items = await prisma.appointment.findMany({
    where: {
      patientId: patient.id,
      status: { in: ["PENDING", "CONFIRMED"] },
      startsAt: { gt: now, lte: soon },
    },
    select: {
      id: true,
      startsAt: true,
      mode: true,
      doctor: { select: { user: { select: { name: true } } } },
    },
    orderBy: { startsAt: "asc" },
    take: 3,
  });
  if (items.length === 0) return null;

  const locale = await getLocale();
  const today = dateOf(now);

  return (
    <div className="border-b border-teal-200 bg-gradient-to-r from-[#d5f1ec] to-[#dbeafe]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <span className="flex items-center gap-2 text-sm font-bold text-[#0a3a7a]">
          <Bell className="h-4 w-4" />
          {reminders.rem_title[locale]}
        </span>

        <ul className="flex flex-1 flex-wrap gap-x-6 gap-y-1">
          {items.map((a) => {
            const when =
              dateOf(a.startsAt) === today
                ? reminders.when_today[locale]
                : reminders.when_tomorrow[locale];
            const text = reminders.rem_text[locale]
              .replace("{doctor}", a.doctor.user.name)
              .replace("{when}", when)
              .replace("{time}", formatTime(timeOf(a.startsAt)));
            return (
              <li
                key={a.id}
                className="flex items-center gap-2 text-sm font-medium text-[#0a1f44]"
              >
                {a.mode === "ONLINE" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-xs font-bold text-sky-800">
                    <Video className="h-3 w-3" />
                    {pages7.online_badge[locale]}
                  </span>
                )}
                {text}
              </li>
            );
          })}
        </ul>

        <Link
          href="/appointments"
          className="text-sm font-semibold text-[#0d8f82] underline hover:text-[#0a3a7a]"
        >
          {reminders.rem_view[locale]}
        </Link>
      </div>
    </div>
  );
}
