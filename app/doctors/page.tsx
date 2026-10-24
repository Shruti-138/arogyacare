import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "../../lib/prisma";

type SearchParams = Promise<{ q?: string; specialty?: string }>;

async function DoctorsContent({ searchParams }: { searchParams: SearchParams }) {
  const { q, specialty } = await searchParams;
  const query = (q ?? "").trim();

  const specialtyRows = await prisma.doctor.findMany({
    select: { specialty: true },
    distinct: ["specialty"],
    orderBy: { specialty: "asc" },
  });

  const doctors = await prisma.doctor.findMany({
    where: {
      ...(specialty ? { specialty } : {}),
      ...(query
        ? {
            OR: [
              { user: { name: { contains: query, mode: "insensitive" } } },
              { specialty: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
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
      <form
        action="/doctors"
        method="get"
        className="mt-6 flex flex-wrap gap-3"
      >
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search doctors or specialties..."
          className="min-w-60 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2"
        />
        <select
          name="specialty"
          defaultValue={specialty ?? ""}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2"
        >
          <option value="">All specialties</option>
          {specialtyRows.map((row) => (
            <option key={row.specialty} value={row.specialty}>
              {row.specialty}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-teal-700 px-5 py-2 font-medium text-white hover:bg-teal-800"
        >
          Find Doctor
        </button>
        {(query || specialty) && (
          <Link
            href="/doctors"
            className="self-center text-sm text-teal-700 underline"
          >
            Clear
          </Link>
        )}
      </form>

      <h2 className="mt-8 text-xl font-semibold">
        Available doctors ({doctors.length})
      </h2>

      {doctors.length === 0 ? (
        <p className="mt-4 text-gray-600">
          No doctors match your search. Try a different name or specialty.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold"><Link href={`/doctors/${doctor.id}`} className="hover:underline">{doctor.user.name}</Link></h3>
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

export default function DoctorsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
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
          <DoctorsContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
