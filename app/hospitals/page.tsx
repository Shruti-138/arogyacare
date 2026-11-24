import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  MapPin,
  Phone,
  Stethoscope,
} from "lucide-react";
import { prisma } from "../../lib/prisma";
import { getLocale } from "../../lib/i18n";
import { pages9 } from "../../lib/messages/pages9";
import { specialtyNames } from "../../lib/messages/home";
import PageHeader from "../components/PageHeader";

async function Content() {
  const locale = await getLocale();
  const tr = (k: keyof typeof pages9) => pages9[k][locale];

  const hospitals = await prisma.hospital.findMany({
    select: {
      id: true,
      name: true,
      city: true,
      address: true,
      phone: true,
      doctors: { select: { specialty: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <PageHeader title={tr("hosp_page_title")} sub={tr("hosp_page_sub")} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {hospitals.length === 0 ? (
          <p className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            {tr("hosp_none")}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hospitals.map((h) => {
              const specs = Array.from(new Set(h.doctors.map((d) => d.specialty)));
              return (
                <div
                  key={h.id}
                  className="flex flex-col rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:ring-[#0fa596]/40"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#12b3a0] to-[#0a6a9a] text-white">
                      <Building2 className="h-7 w-7" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-xl font-extrabold text-[#0a1f44]">
                        {h.name}
                      </h3>
                      {h.city && (
                        <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-500">
                          <MapPin className="h-4 w-4 text-[#0d8f82]" />
                          {h.city}
                        </p>
                      )}
                    </div>
                  </div>

                  {h.address && (
                    <p className="mt-4 text-sm text-slate-500">{h.address}</p>
                  )}
                  {h.phone && (
                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                      <Phone className="h-4 w-4 text-[#0d8f82]" />
                      {h.phone}
                    </p>
                  )}

                  <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#0a1f44]">
                    <Stethoscope className="h-4 w-4 text-[#0d8f82]" />
                    {tr("hosp_doctors").replace("{n}", String(h.doctors.length))}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {specs.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-[#d5f1ec] px-3 py-1 text-xs font-bold text-[#0d8f82]"
                      >
                        {specialtyNames[s]?.[locale] ?? s}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/doctors?hospital=${h.id}`}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-5 py-3 text-sm font-semibold text-white shadow-md hover:opacity-95"
                  >
                    {tr("hosp_view")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default function HospitalsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={<p className="px-6 py-10 text-slate-500">Loading...</p>}>
        <Content />
      </Suspense>
    </main>
  );
}
