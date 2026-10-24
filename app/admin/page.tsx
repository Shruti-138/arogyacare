import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";
import { TZ, formatDayLabel, formatTime, timeOf } from "../../lib/slots";

function dateOf(d: Date) {
  return d.toLocaleDateString("en-CA", { timeZone: TZ });
}

const statusStyle: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-gray-100 text-gray-700",
};

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="mt-1 text-3xl font-bold text-teal-700">{value}</p>
    </div>
  );
}

async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/login");

  if (session.role !== "ADMIN") {
    return (
      <p className="mt-4 text-gray-600">
        The admin dashboard is only for hospital admin accounts.
      </p>
    );
  }

  const admin = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      hospitalId: true,
      hospital: { select: { name: true, city: true } },
    },
  });
  if (!admin?.hospitalId || !admin.hospital) {
    return (
      <p className="mt-4 text-gray-600">
        Your account is not linked to a hospital.
      </p>
    );
  }

  const hospitalId = admin.hospitalId;
  const where = { doctor: { hospitalId } };
  const now = new Date();

  const [doctorCount, total, upcoming, completed, patientRows, doctors, recent] =
    await Promise.all([
      prisma.doctor.count({ where: { hospitalId } }),
      prisma.appointment.count({ where }),
      prisma.appointment.count({
        where: {
          ...where,
          startsAt: { gt: now },
          status: { in: ["PENDING", "CONFIRMED"] },
        },
      }),
      prisma.appointment.count({ where: { ...where, status: "COMPLETED" } }),
      prisma.appointment.findMany({
        where,
        distinct: ["patientId"],
        select: { patientId: true },
      }),
      prisma.doctor.findMany({
        where: { hospitalId },
        select: {
          id: true,
          specialty: true,
          user: { select: { name: true } },
          _count: { select: { appointments: true } },
        },
        orderBy: { user: { name: "asc" } },
      }),
      prisma.appointment.findMany({
        where,
        select: {
          id: true,
          startsAt: true,
          status: true,
          patient: { select: { user: { select: { name: true } } } },
          doctor: { select: { user: { select: { name: true } } } },
        },
        orderBy: { startsAt: "desc" },
        take: 20,
      }),
    ]);

  return (
    <>
      <p className="mt-1 text-gray-600">
        {admin.hospital.name}, {admin.hospital.city}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <StatCard label="Doctors" value={doctorCount} />
        <StatCard label="Patients served" value={patientRows.length} />
        <StatCard label="Total appointments" value={total} />
        <StatCard label="Upcoming" value={upcoming} />
        <StatCard label="Completed" value={completed} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Doctors</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Specialty</th>
              <th className="px-4 py-3 font-medium">Appointments</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d.id} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3">{d.user.name}</td>
                <td className="px-4 py-3 text-teal-700">{d.specialty}</td>
                <td className="px-4 py-3">{d._count.appointments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Recent appointments</h2>
      {recent.length === 0 ? (
        <p className="mt-3 text-gray-600">No appointments yet.</p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Patient</th>
                <th className="px-4 py-3 font-medium">Doctor</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((a) => (
                <tr key={a.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3">
                    {formatDayLabel(dateOf(a.startsAt))},{" "}
                    {formatTime(timeOf(a.startsAt))}
                  </td>
                  <td className="px-4 py-3">{a.patient.user.name}</td>
                  <td className="px-4 py-3">{a.doctor.user.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        statusStyle[a.status] ?? ""
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-teal-700">Admin Dashboard</h1>
        <Suspense fallback={<p className="mt-6 text-gray-500">Loading...</p>}>
          <AdminDashboard />
        </Suspense>
      </div>
    </main>
  );
}