import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Activity,
  Apple,
  Baby,
  Bean,
  Bone,
  Brain,
  Dog,
  Droplet,
  Droplets,
  Ear,
  Eye,
  Hand,
  HeartPulse,
  Pill,
  Ribbon,
  Scissors,
  Stethoscope,
  Syringe,
  Utensils,
  Venus,
  Wind,
} from "lucide-react";
import { getT } from "../../lib/i18n";
import { specialtyNames } from "../../lib/messages/home";

const SPECIALTIES: { key: string; Icon: LucideIcon; color: string }[] = [
  { key: "Cardiology", Icon: HeartPulse, color: "bg-rose-50 text-rose-600" },
  { key: "Consultant Physician", Icon: Stethoscope, color: "bg-violet-50 text-violet-600" },
  { key: "Dermatology", Icon: Hand, color: "bg-pink-50 text-pink-600" },
  { key: "Diabetologists", Icon: Syringe, color: "bg-sky-50 text-sky-600" },
  { key: "ENT", Icon: Ear, color: "bg-amber-50 text-amber-600" },
  { key: "Gastroenterologist", Icon: Utensils, color: "bg-emerald-50 text-emerald-600" },
  { key: "General Medicine", Icon: Pill, color: "bg-blue-50 text-blue-600" },
  { key: "General Surgery", Icon: Scissors, color: "bg-indigo-50 text-indigo-600" },
  { key: "Gynaecology", Icon: Venus, color: "bg-fuchsia-50 text-fuchsia-600" },
  { key: "Hematology", Icon: Droplet, color: "bg-red-50 text-red-600" },
  { key: "Internal Medicine", Icon: Activity, color: "bg-cyan-50 text-cyan-600" },
  { key: "Nephrology", Icon: Bean, color: "bg-orange-50 text-orange-600" },
  { key: "Neurology", Icon: Brain, color: "bg-purple-50 text-purple-600" },
  { key: "Neuropsychiatrists", Icon: Brain, color: "bg-teal-50 text-teal-600" },
  { key: "Nutritionist", Icon: Apple, color: "bg-lime-50 text-lime-600" },
  { key: "Oncology", Icon: Ribbon, color: "bg-rose-50 text-rose-500" },
  { key: "Ophthalmology", Icon: Eye, color: "bg-green-50 text-green-600" },
  { key: "Orthopaedics", Icon: Bone, color: "bg-blue-50 text-blue-500" },
  { key: "Pediatrics", Icon: Baby, color: "bg-teal-50 text-teal-600" },
  { key: "Pulmonologists", Icon: Wind, color: "bg-slate-100 text-slate-600" },
  { key: "Veterinary Doctor", Icon: Dog, color: "bg-orange-50 text-orange-500" },
  { key: "Rheumatologists", Icon: Accessibility, color: "bg-emerald-50 text-emerald-700" },
  { key: "Urology", Icon: Droplets, color: "bg-violet-50 text-violet-500" },
];

export default async function Specialties() {
  const { locale, t } = await getT();

  return (
    <section id="services" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold text-[#0a1f44] sm:text-5xl">
            {t("specialties_title")}
          </h2>
          <p className="mt-4 text-lg text-slate-500">{t("specialties_sub")}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPECIALTIES.map(({ key, Icon, color }) => (
            <Link
              key={key}
              href={`/doctors?q=${encodeURIComponent(key)}`}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-[#0fa596]/40"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${color}`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <span className="font-semibold text-[#0a1f44]">
                {specialtyNames[key][locale]}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
