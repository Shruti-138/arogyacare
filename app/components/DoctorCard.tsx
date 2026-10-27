import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

export default function DoctorCard({
  id,
  name,
  specialty,
  years,
  yearsText,
  hospital,
  cta,
}: {
  id: string;
  name: string;
  specialty: string;
  years: number;
  yearsText: string;
  hospital: string;
  cta: string;
}) {
  const initials = name
    .replace("Dr. ", "")
    .split(" ")
    .map((w) => w.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:ring-[#0fa596]/40">
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#12b3a0] to-[#0a6a9a] text-xl font-extrabold text-white shadow-md">
          {initials}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-xl font-extrabold text-[#0a1f44]">
            {name}
          </h3>
          <span className="mt-1 inline-block rounded-full bg-[#d5f1ec] px-3 py-1 text-xs font-bold text-[#0d8f82]">
            {specialty}
          </span>
        </div>
      </div>

      <p className="mt-5 text-sm font-medium text-[#0a1f44]">
        {years} {yearsText}
      </p>
      <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
        <Building2 className="h-4 w-4 shrink-0 text-[#0d8f82]" />
        {hospital}
      </p>

      <Link
        href={`/doctors/${id}`}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 hover:opacity-95"
      >
        {cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
