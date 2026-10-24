import { Suspense } from "react";
import { prisma } from "../../lib/prisma";

async function DoctorList() {
  const doctors = await prisma.doctor.findMany({
    select: {
      id: true,
      specialty: true,
      experienceYears: true,
      user: { select: { name: true } },
      hospital: { select: { name: true, city: true } },
    },
    orderBy: { user: { name: "asc" } },
  });

  return (
    <>
      <h2 className="mt-8 text-xl font-semibold">
        Available doctors ({doctors.length})
      </h2>

      {doctors.length === 0 ? (
        <p className="mt-4 text-gray-600">No doctors found.</p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{doctor.user.name}</h3>
              <p className="text-teal-700">{doctor.specialty}</p>
              <p className="mt-2 text-sm text-gray-600">
                {doctor.experienceYears} years of experience
              </p>
              <p className="text-sm text-gray-600">
                {doctor.hospital.name}, {doctor.hospital.city}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-teal-700">ArogyaCare</h1>
        <p className="mt-1 text-gray-600">
          Find a doctor and book your appointment.
        </p>

        <Suspense
          fallback={<p className="mt-8 text-gray-500">Loading doctors...</p>}
        >
          <DoctorList />
        </Suspense>
      </div>
    </main>
  );
}