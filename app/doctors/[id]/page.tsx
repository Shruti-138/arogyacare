import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, CheckCircle2 } from "lucide-react";
import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/session";
import { getLocale } from "../../../lib/i18n";
import {
  formatTime,
  generateSlots,
  nextDays,
  timeOf,
  toDate,
} from "../../../lib/slots";
import { dayLabel } from "../../../lib/dates";
import { pages } from "../../../lib/messages/pages";
import { pages2 } from "../../../lib/messages/pages2";
import { specialtyNames } from "../../../lib/messages/home";
import BookSlot from "./BookSlot";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ date?: string; booked?: string }>;

async function DoctorDetail({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const locale = await getLocale();
  const tr = (k: keyof typeof pages2) => pages2[k][locale];
  const { id } = await params;
  const sp = await searchParams;
  const session = await getSession();

  const doctor = await prisma.doctor.findUnique({
    where: { id },
    select: {
      id: true,
      specialty: true,
      experienceYears: true,
      user: { select: { name: true } },
      hospital: { select: { name: true, city: true } },
      availabilities: {
        select: {
          dayOfWeek: true,
          startTime: true,
          endTime: true,
          slotMinutes: true,
        },
      },
    },
  });

  if (!doctor) notFound();

  const days = nextDays(14);
  const date = sp.date && days.includes(sp.date) ? sp.date : days[0];
  const booked =
    sp.booked && /^\d{2}:\d{2}$/.test(sp.booked) ? sp.booked : null;

  const dayStart = toDate(date, "00:00");
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

  const appointments = await prisma.appointment.findMany({
    where: { doctorId: id, startsAt: { gte: dayStart, lt: dayEnd } },
    select: { startsAt: true },
  });

  const taken = new Set(appointments.map((a) => timeOf(a.startsAt)));
  const now = Date.now();
  const slots = generateSlots(doctor.availabilities, date).filter(
    (t) => toDate(date, t).getTime() > now && !taken.has(t)
  );

  const isPatient = session?.role === "PATIENT";
  const specName = specialtyNames[doctor.specialty]?.[locale] ?? doctor.specialty;
  const initials = doctor.user.name
    .replace("Dr. ", "")
    .split(" ")
    .map((w) => w.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const bookedMsg = booked
    ? tr("booked_msg")
        .replace("{day}", dayLabel(date, locale))
        .replace("{time}", formatTime(booked))
    : null;

  return (
    <>
      <section className="bg-gradient-to-br from-[#d9f3ee] via-[#eaf8f6] to-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d8f82] hover:text-[#0a3a7a]"
          >
            <ArrowLeft className="h-4 w-4" />
            {tr("back")}
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-6 rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
            <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-[#12b3a0] to-[#0a6a9a] text-3xl font-extrabold text-white shadow-md">
              {initials}
            </span>
            <div>
              <h1 className="text-3xl font-extrabold text-[#0a1f44]">
                {doctor.user.name}
              </h1>
              <span className="mt-2 inline-block rounded-full bg-[#d5f1ec] px-4 py-1 text-sm font-bold text-[#0d8f82]">
                {specName}
              </span>
              <p className="mt-3 text-sm font-medium text-[#0a1f44]">
                {doctor.experienceYears} {pages.years[locale]}
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                <Building2 className="h-4 w-4 text-[#0d8f82]" />
                {doctor.hospital.name}, {doctor.hospital.city}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {bookedMsg && (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
            <p className="font-semibold">{bookedMsg}</p>
          </div>
        )}

        <h2 className="text-2xl font-extrabold text-[#0a1f44]">
          {tr("choose_day")}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {days.map((d) => (
            <Link
              key={d}
              href={`/doctors/${doctor.id}?date=${d}`}
              className={
                d === date
                  ? "rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                  : "rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#0a1f44] shadow-sm ring-1 ring-slate-200 hover:ring-[#0fa596]"
              }
            >
              {dayLabel(d, locale)}
            </Link>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold text-[#0a1f44]">
          {tr("slots_on").replace("{day}", dayLabel(date, locale))}
        </h2>

        {!session && (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <p className="text-sm text-slate-500">{tr("signin_note")}</p>
            <Link
              href="/login"
              className="rounded-full bg-[#0a3a7a] px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90"
            >
              {locale === "hi" ? "साइन इन" : locale === "pa" ? "ਸਾਈਨ ਇਨ" : "Sign In"}
            </Link>
          </div>
        )}
        {session && !isPatient && (
          <p className="mt-3 text-sm text-slate-500">{tr("only_patients")}</p>
        )}
        {isPatient && slots.length > 0 && (
          <p className="mt-2 text-sm text-slate-500">{tr("tap_hint")}</p>
        )}

        {slots.length === 0 ? (
          <p className="mt-5 rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            {tr("no_slots")}
          </p>
        ) : (
          <div className="mt-5 flex flex-wrap items-start gap-3">
            {slots.map((t) =>
              isPatient ? (
                <BookSlot
                  key={t}
                  doctorId={doctor.id}
                  date={date}
                  time={t}
                  label={formatTime(t)}
                />
              ) : (
                <span
                  key={t}
                  className="rounded-full bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-500"
                >
                  {formatTime(t)}
                </span>
              )
            )}
          </div>
        )}
      </section>
    </>
  );
}

export default function DoctorPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={<p className="px-6 py-10 text-slate-500">Loading...</p>}>
        <DoctorDetail params={params} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
