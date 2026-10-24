import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";
import { TZ, formatDayLabel, formatTime, timeOf } from "../../lib/slots";
import { completeAppointment } from "./actions";

function dateOf(d: Date) {
  return d.toLocaleDateString("en-CA", { timeZone: TZ });
}

async function DoctorDashboard() {
  const session = await getSession();
  if (!session) redirect("/login");

  if (session.role !== "DOCTOR") {
    return (
      <p className="mt-4 text-gray-600">
        The dashboard is only for doctor accounts.
      </p>
    );
  }

  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.userId },
    select: { id: true, specialty: true, user: { select: { name: true } } },
  });
  if (!doctor) {
    return <p className="mt-4 text-gray-600">Doctor profile not found.</p>;
  }

  const appointments = await prisma.appointment.findMany({
    where: { doctorId: doctor.id },
    select: {
      id: true,
      startsAt: true,
      status: true,
      patient: {
        select: {
          phone: true,
          user: { select: { name: true } },
        },
      },
    },
    orderBy: { startsAt: "asc" },
  });

  const todo = appointments.filter(
    (a) => a.status === "PENDING" || a.status === "CONFIRMED"
  );
  const done = appointments
    .filter((a) => a.status === "COMPLETED")
    .reverse();

  return (
    <>
      <p className="mt-1 text-gray-600">
        {doctor.user.name} · {doctor.specialty}
      </p>

      <h2 className="mt-8 text-xl font-semibold">
        Upcoming appointments ({todo.length})
      </h2>
      {todo.length === 0 ? (
        <p className="mt-3 text-gray-600">No upcoming appointments yet.</p>
      ) : (
        <div className="mt-3 space-y-3">
          {todo.map((a) => (
            <div
              key={a.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div>
                <p className="font-semibold">{a.patient.user.name}</p>
                <p className="text-sm text-gray-600">
                  {formatDayLabel(dateOf(a.startsAt))} at{" "}
                  {formatTime(timeOf(a.startsAt))}
                </p>
                {a.patient.phone && (
                  <p className="text-sm text-gray-600">
                    Phone: {a.patient.phone}
                  </p>
                )}
              </div>
              <form action={completeAppointment}>
                <input type="hidden" name="appointmentId" value={a.id} />
                <button
                  type="submit"
                  className="rounded-lg bg-teal-700 px-3 py-2 text-sm text-white hover:bg-teal-800"
                >
                  Mark completed
                </button>
              </form>
            </div>
          ))}
        </div>
      )}

      <h2 className="mt-10 text-xl font-semibold">
        Completed ({done.length})
      </h2>
      {done.length === 0 ? (
        <p className="mt-3 text-gray-600">No completed appointments yet.</p>
      ) : (
        <div className="mt-3 space-y-3">
          {done.map((a) => (
            <div
              key={a.id}
              className="rounded-xl border border-gray-200 bg-white p-5 text-gray-600"
            >
              <p className="font-semibold text-gray-900">
                {a.patient.user.name}
              </p>
              <p className="text-sm">
                {formatDayLabel(dateOf(a.startsAt))} at{" "}
                {formatTime(timeOf(a.startsAt))}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-teal-700">Doctor Dashboard</h1>
        <Suspense fallback={<p className="mt-6 text-gray-500">Loading...</p>}>
          <DoctorDashboard />
        </Suspense>
      </div>
    </main>
  );
}