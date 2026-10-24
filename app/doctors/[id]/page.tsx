import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/session";
import {
  formatDayLabel,
  formatTime,
  generateSlots,
  nextDays,
  timeOf,
  toDate,
} from "../../../lib/slots";
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
  const booked = sp.booked && /^\d{2}:\d{2}$/.test(sp.booked) ? sp.booked : null;

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

  return (
    <>
      <Link href="/doctors" className="text-sm text-teal-700 underline">
        ← All doctors
      </Link>

      {booked && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800">
          Your appointment is booked for {formatDayLabel(date)} at{" "}
          {formatTime(booked)}.
        </div>
      )}

      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">{doctor.user.name}</h1>
        <p className="text-teal-700">{doctor.specialty}</p>
        <p className="mt-2 text-sm text-gray-600">
          {doctor.experienceYears} years of experience
        </p>
        <p className="text-sm text-gray-600">
          {doctor.hospital.name}, {doctor.hospital.city}
        </p>
      </div>

      <h2 className="mt-8 text-lg font-semibold">Choose a day</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {days.map((d) => (
          <Link
            key={d}
            href={`/doctors/${doctor.id}?date=${d}`}
            className={
              d === date
                ? "rounded-lg bg-teal-700 px-3 py-2 text-sm text-white"
                : "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-100"
            }
          >
            {formatDayLabel(d)}
          </Link>
        ))}
      </div>

      <h2 className="mt-8 text-lg font-semibold">
        Available slots on {formatDayLabel(date)}
      </h2>

      {!session && (
        <p className="mt-2 text-sm text-gray-600">
          <Link href="/login" className="text-teal-700 underline">
            Sign in
          </Link>{" "}
          as a patient to book a slot.
        </p>
      )}
      {session && !isPatient && (
        <p className="mt-2 text-sm text-gray-600">
          Only patient accounts can book appointments.
        </p>
      )}

      {slots.length === 0 ? (
        <p className="mt-3 text-gray-600">
          No slots available on this day. Please choose another day.
        </p>
      ) : (
        <div className="mt-3 flex flex-wrap items-start gap-2">
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
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500"
              >
                {formatTime(t)}
              </span>
            )
          )}
        </div>
      )}
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
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-4xl">
        <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
          <DoctorDetail params={params} searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}