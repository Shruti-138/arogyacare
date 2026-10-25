import { Suspense } from "react";
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
  Building2,
  CalendarCheck,
  ClipboardCheck,
  Dog,
  Droplet,
  Droplets,
  Ear,
  Eye,
  FlaskConical,
  Hand,
  HeartPulse,
  Pill,
  Ribbon,
  Scissors,
  Search,
  Stethoscope,
  Syringe,
  User,
  Utensils,
  Venus,
  Video,
  Wind,
} from "lucide-react";
import { getT } from "../lib/i18n";
import { specialtyNames } from "../lib/messages/home";
import {
  ConsultIllustration,
  HeroIllustration,
  LabIllustration,
} from "./components/Illustrations";

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

const ROLES = [
  {
    Icon: User,
    color: "bg-emerald-100 text-emerald-700",
    title: "role_patient_title",
    points: ["role_patient_1", "role_patient_2", "role_patient_3"],
  },
  {
    Icon: Stethoscope,
    color: "bg-sky-100 text-sky-700",
    title: "role_doctor_title",
    points: ["role_doctor_1", "role_doctor_2", "role_doctor_3"],
  },
  {
    Icon: Building2,
    color: "bg-teal-100 text-teal-700",
    title: "role_hospital_title",
    points: ["role_hospital_1", "role_hospital_2", "role_hospital_3"],
  },
] as const;

const STEPS = [
  { Icon: Search, key: "step_1" },
  { Icon: CalendarCheck, key: "step_2" },
  { Icon: ClipboardCheck, key: "step_3" },
] as const;

async function HomeContent() {
  const { locale, t } = await getT();

  return (
    <main>
      <section className="bg-gradient-to-b from-emerald-50 via-white to-sky-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
              <HeartPulse className="h-4 w-4" />
              {t("tagline")}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-snug text-slate-900 sm:text-4xl lg:text-5xl">
              {t("hero_title")}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {t("hero_sub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/doctors"
                className="rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 px-6 py-3 font-semibold text-white shadow-md hover:from-teal-700 hover:to-emerald-600"
              >
                {t("cta_find")}
              </Link>
              <Link
                href="/register"
                className="rounded-xl border border-teal-600 bg-white px-6 py-3 font-semibold text-teal-700 hover:bg-teal-50"
              >
                {t("cta_account")}
              </Link>
            </div>
          </div>
          <HeroIllustration />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {ROLES.map((role) => (
            <div
              key={role.title}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${role.color}`}
              >
                <role.Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-lg font-bold text-slate-900">
                {t(role.title)}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {role.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>{t(p)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-emerald-50/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {t("specialties_title")}
          </h2>
          <p className="mt-2 text-center text-slate-600">
            {t("specialties_sub")}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIALTIES.map(({ key, Icon, color }) => (
              <Link
                key={key}
                href={`/doctors?q=${encodeURIComponent(key)}`}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {specialtyNames[key][locale]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {t("features_title")}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
              <ConsultIllustration />
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <Video className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {t("consult_title")}
                </h3>
              </div>
              <p className="mt-2 text-slate-600">{t("consult_desc")}</p>
            </div>
            <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5">
              <LabIllustration />
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white">
                  <FlaskConical className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {t("lab_title")}
                </h3>
              </div>
              <p className="mt-2 text-slate-600">{t("lab_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          {t("how_title")}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ Icon, key }, i) => (
            <div
              key={key}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-emerald-500 text-white">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-bold text-emerald-600">{i + 1}</p>
                <p className="font-semibold text-slate-800">{t(key)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-teal-700 to-emerald-500 px-6 py-10 text-center text-white shadow-lg">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("cta_title")}</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/doctors"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-teal-800 hover:bg-emerald-50"
            >
              {t("cta_find")}
            </Link>
            <Link
              href="/register"
              className="rounded-xl border border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              {t("cta_account")}
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-6">
        <p className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500 sm:px-6">
          {t("footer_text")}
        </p>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-emerald-50/40" />}>
      <HomeContent />
    </Suspense>
  );
}
