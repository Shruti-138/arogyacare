import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Building2, CalendarDays } from "lucide-react";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";
import { getLocale, type Locale } from "../../lib/i18n";
import { TZ, formatTime, timeOf } from "../../lib/slots";
import { dayLabel } from "../../lib/dates";
import { pages4 } from "../../lib/messages/pages4";
import { specialtyNames } from "../../lib/messages/home";
import PageHeader from "../components/PageHeader";
import { cancelAppointment } from "./actions";

function dateOf(d: Date) {
  return d.toLocaleDateString("en-CA", { timeZone: TZ });
}

const STATUS = {
  PENDING: { key: "st_pending", style: "bg-yellow-100 text-yellow-800" },
  CONFIRMED: { key: "st_confirmed", style: "bg-blue-100 text-blue-800" },
  COMPLETED: { key: "st_completed", style: "bg-emerald-100 text-emerald-800" },
  CANCELLED: { key: "st_cancelled", style: "bg-slate-100 text-slate-600" },
} as const;

type Item = {
  id: string;
  startsAt: Date;
  status: keyof typeof STATUS;
  doctor: {
    specialty: string;
    user: { name: string };
    hospital: { name: string };
  };
};

function Row({
  a,
  locale,
  cancelable,
}: {
  a: Item;
  locale: Locale;
  cancelable: boolean;
}) {
  const initials = a.doctor.user.name
    .replace("Dr. ", "")
    .split(" ")
    .map((w) => w.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const st = STATUS[a.status];
  const spec = specialtyNames[a.doctor.specialty]?.[locale] ?? a.doctor.specialty;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#12b3a0] to-[#0a6a9a] text-lg font-extrabold text-white">
          {initials}
        </span>
        <div>
          <p className="text-lg font-extrabold text-[#0a1f44]">
            {a.doctor.user.name}
          </p>
          <span className="inline-block rounded-full bg-[#d5f1ec] px-3 py-0.5 text-xs font-bold text-[#0d8f82]">
            {spec}
          </span>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-[#0a1f44]">
            <CalendarDays className="h-4 w-4 text-[#0d8f82]" />
            {dayLabel(dateOf(a.startsAt), locale)},{" "}
            {formatTime(timeOf(a.startsAt))}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <Building2 className="h-4 w-4 text-[#0d8f82]" />
            {a.doctor.hospital.name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${st.style}`}
        >
          {pages4[st.key][locale]}
        </span>
        {cancelable && (
          <form action={cancelAppointment}>
            <input type="hidden" name="appointmentId" value={a.id} />
            <button
              type="submit"
              className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
            >
              {pages4.cancel[locale]}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

async function Content() {
  const locale = await getLocale();
  const tr = (k: keyof typeof pages4) => pages4[k][locale];

  const session = await getSession();
  if (!session) redirect("/login");

  const patient =
    session.role === "PATIENT"
      ? await prisma.patient.findUnique({
          where: { userId: session.userId },
          select: { id: true },
        })
      : null;

  const appointments = patient
    ? await prisma.appointment.findMany({
        where: { patientId: patient.id },
        select: {
          id: true,
          startsAt: true,
          status: true,
          doctor: {
            select: {
              specialty: true,
              user: { select: { name: true } },
              hospital: { select: { name: true } },
            },
          },
        },
        orderBy: { startsAt: "asc" },
      })
    : [];

  const now = Date.now();
  const upcoming = appointments.filter((a) => a.startsAt.getTime() > now);
  const past = appointments.filter((a) => a.startsAt.getTime() <= now).reverse();

  return (
    <>
      <PageHeader title={tr("appts_title")} sub={tr("appts_sub")} />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {session.role !== "PATIENT" ? (
          <p className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            {tr("only_patients")}
          </p>
        ) : !patient ? (
          <p className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            {tr("no_profile")}
          </p>
        ) : (
          <>
            <h2 className="text-2xl font-extrabold text-[#0a1f44]">
              {tr("upcoming")} ({upcoming.length})
            </h2>
            {upcoming.length === 0 ? (
              <p className="mt-4 rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
                {tr("no_upcoming")}{" "}
                <Link
                  href="/doctors"
                  className="font-semibold text-[#0d8f82] underline"
                >
                  {tr("find_doc")}
                </Link>
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {upcoming.map((a) => (
                  <Row key={a.id} a={a} locale={locale} cancelable />
                ))}
              </div>
            )}

            {past.length > 0 && (
              <>
                <h2 className="mt-12 text-2xl font-extrabold text-[#0a1f44]">
                  {tr("past")} ({past.length})
                </h2>
                <div className="mt-4 space-y-4">
                  {past.map((a) => (
                    <Row key={a.id} a={a} locale={locale} cancelable={false} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default function AppointmentsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={<p className="px-6 py-10 text-slate-500">Loading...</p>}>
        <Content />
      </Suspense>
    </main>
  );
}
