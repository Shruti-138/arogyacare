import { Suspense } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { prisma } from "../../lib/prisma";
import { getLocale } from "../../lib/i18n";
import { pages } from "../../lib/messages/pages";
import { specialtyNames } from "../../lib/messages/home";
import DoctorCard from "../components/DoctorCard";

type SearchParams = Promise<{ q?: string; specialty?: string }>;

async function DoctorsContent({ searchParams }: { searchParams: SearchParams }) {
  const locale = await getLocale();
  const tr = (k: keyof typeof pages) => pages[k][locale];
  const spec = (s: string) => specialtyNames[s]?.[locale] ?? s;

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
      <section className="bg-gradient-to-br from-[#d9f3ee] via-[#eaf8f6] to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-extrabold text-[#0a1f44] sm:text-5xl">
            {tr("doctors_title")}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-500">
            {tr("doctors_sub")}
          </p>

          <form
            action="/doctors"
            method="get"
            className="mt-8 flex flex-wrap items-center gap-3 rounded-3xl bg-white p-3 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100"
          >
            <div className="flex min-w-[15rem] flex-1 items-center gap-3 px-3">
              <Search className="h-5 w-5 text-[#0d8f82]" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder={tr("search_ph")}
                className="w-full bg-transparent py-3 text-base text-[#0a1f44] outline-none placeholder:text-slate-400"
              />
            </div>
            <select
              name="specialty"
              defaultValue={specialty ?? ""}
              className="rounded-2xl bg-[#eaf7f5] px-4 py-3 text-base font-medium text-[#0a1f44] outline-none"
            >
              <option value="">{tr("all_spec")}</option>
              {specialtyRows.map((row) => (
                <option key={row.specialty} value={row.specialty}>
                  {spec(row.specialty)}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-7 py-3 font-semibold text-white shadow-md hover:opacity-95"
            >
              {tr("search_btn")}
            </button>
            {(query || specialty) && (
              <Link
                href="/doctors"
                className="px-3 text-sm font-semibold text-[#0d8f82] underline"
              >
                {tr("clear")}
              </Link>
            )}
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-extrabold text-[#0a1f44]">
          {tr("available")} ({doctors.length})
        </h2>

        {doctors.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            {tr("none")}
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((d) => (
              <DoctorCard
                key={d.id}
                id={d.id}
                name={d.user.name}
                specialty={spec(d.specialty)}
                years={d.experienceYears}
                yearsText={tr("years")}
                hospital={`${d.hospital.name}, ${d.hospital.city ?? ""}`}
                cta={tr("view_book")}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default function DoctorsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense
        fallback={<p className="px-6 py-10 text-slate-500">Loading...</p>}
      >
        <DoctorsContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
