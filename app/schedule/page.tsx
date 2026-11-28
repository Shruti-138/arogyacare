import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, FileText, User } from "lucide-react";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";

export default async function SchedulePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "PATIENT") redirect("/");

  const IST = 5.5 * 60 * 60 * 1000;
  const ist = new Date(Date.now() + IST);
  const start = new Date(
    Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()) - IST,
  );
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

  const appts = await prisma.appointment.findMany({
    where: {
      startsAt: { gte: start, lt: end },
      ...(session.role === "DOCTOR"
        ? { doctor: { user: { id: session.userId } } }
        : {}),
    },
    include: {
      patient: { include: { user: true } },
      doctor: { include: { user: true } },
    },
    orderBy: { startsAt: "asc" },
  });

  const todayLabel = start.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="flex items-center gap-3 text-3xl font-extrabold text-[#0a1f44]">
          <CalendarDays className="h-8 w-8 text-[#0d8f82]" />
          Today&apos;s schedule
        </h1>
        <p className="mt-1 text-slate-500">
          {todayLabel} - {appts.length}{" "}
          {appts.length === 1 ? "appointment" : "appointments"}
        </p>

        {appts.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            No appointments today.
          </p>
        ) : (
          <ul className="mt-6 space-y-3">
            {appts.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
              >
                <span className="rounded-xl bg-[#eaf7f5] px-4 py-3 text-center text-lg font-extrabold text-[#0d8f82]">
                  {new Date(a.startsAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Kolkata",
                  })}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 font-bold text-[#0a1f44]">
                    <User className="h-4 w-4 text-[#0d8f82]" />
                    {a.patient.user.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {session.role === "ADMIN"
                      ? `${a.doctor.user.name} - `
                      : ""}
                    {a.patient.user.email}
                  </p>
                </div>
                <Link
                  href={`/receipt/${a.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0a6a9a] ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  <FileText className="h-4 w-4" />
                  Receipt
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
