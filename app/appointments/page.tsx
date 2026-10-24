import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";
import { TZ, formatDayLabel, formatTime, timeOf } from "../../lib/slots";
import { cancelAppointment } from "./actions";

function dateOf(d: Date) {
  return d.toLocaleDateString("en-CA", { timeZone: TZ });
}

async function MyAppointments() {
  const session = await getSession();
  if (!session) redirect("/login");

  if (session.role !== "PATIENT") {
    return (
      <p className="mt-4 text-gray-600">
        Only patient accounts have a My Appointments page.
      </p>
    );
  }

  const patient = await prisma.patient.findUnique({
    where: { userId: session.userId },
    select: { id: true },
  });
  if (!patient) {
    return <p className="mt-4 text-gray-600">Patient profile not found.</p>;
  }

  const appointments = await prisma.appointment.findMany({
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
  });

  const now = Date.now();
  const upcoming = appointments.filter((a) => a.startsAt.getTime() > now);
  const past = appointments.filter((a) => a.startsAt.getTime() <= now).reverse();

  return (
    <>
      <h2 className="mt-8 text-xl font-semibold">
        Upcoming ({upcoming.length})
      </h2>
      {upcoming.length === 0 ? (
        <p className="mt-3 text-gray-600">
          You have no upcoming appointments.{" "}
          <Link href="/doctors" className="text-teal-700 underline">
            Find a doctor
          </Link>
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          {upcoming.map((a) => (
            <div
              key={a.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div>
                <p className="font-semibold">{a.doctor.user.name}</p>
                <p className="text-sm text-teal-700">{a.doctor.specialty}</p>
                <p className="text-sm text-gray-600">
                  {formatDayLabel(dateOf(a.startsAt))} at{" "}
                  {formatTime(timeOf(a.startsAt))}
                </p>
                <p className="text-sm text-gray-600">{a.doctor.hospital.name}</p>
              </div>
              <form action={cancelAppointment}>
                <input type="hidden" name="appointmentId" value={a.id} />
                <button
                  type="submit"
                  className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                >
                  Cancel
                </button>
              </form>
            </div>
          ))}
        </div>
      )}

      {past.length > 0 && (
        <>
          <h2 className="mt-10 text-xl font-semibold">Past ({past.length})</h2>
          <div className="mt-3 space-y-3">
            {past.map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-gray-200 bg-white p-5 text-gray-600"
              >
                <p className="font-semibold text-gray-900">
                  {a.doctor.user.name}
                </p>
                <p className="text-sm">{a.doctor.specialty}</p>
                <p className="text-sm">
                  {formatDayLabel(dateOf(a.startsAt))} at{" "}
                  {formatTime(timeOf(a.startsAt))}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default function AppointmentsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-teal-700">My Appointments</h1>
        <Suspense fallback={<p className="mt-6 text-gray-500">Loading...</p>}>
          <MyAppointments />
        </Suspense>
      </div>
    </main>
  );
}