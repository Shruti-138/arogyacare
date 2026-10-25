import { Suspense } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Activity,
  Apple,
  ArrowRight,
  Baby,
  Bean,
  Bone,
  Brain,
  Building2,
  CalendarCheck,
  CalendarDays,
  ClipboardCheck,
  Dog,
  Droplet,
  Droplets,
  Ear,
  Eye,
  FileText,
  FlaskConical,
  Hand,
  Heart,
  HeartPulse,
  Lock,
  Pill,
  Ribbon,
  Scissors,
  Search,
  ShieldCheck,
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

const QUICK = [
  { Icon: Stethoscope, color: "bg-emerald-100 text-emerald-700", href: "/doctors", title: "q1_title", desc: "q1_desc" },
  { Icon: CalendarDays, color: "bg-sky-100 text-sky-600", href: "/doctors", title: "q2_title", desc: "q2_desc" },
  { Icon: FileText, color: "bg-violet-100 text-violet-600", href: "/prescriptions", title: "q3_title", desc: "q3_desc" },
  { Icon: User, color: "bg-rose-100 text-rose-500", href: "/appointments", title: "q4_title", desc: "q4_desc" },
] as const;

const TRUST = [
  { Icon: ShieldCheck, title: "trust_1_title", desc: "trust_1_desc" },
  { Icon: Lock, title: "trust_2_title", desc: "trust_2_desc" },
  { Icon: CalendarCheck, title: "trust_3_title", desc: "trust_3_desc" },
] as const;

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
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-50">
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 md:py-24">
          <div className="max-w-xl md:max-w-[46%]">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
              <Heart className="h-3.5 w-3.5" />
              {t("badge")}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-teal-900 sm:text-5xl">
              {t("hero2_title")}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {t("hero2_sub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/doctors"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 px-6 py-3 font-semibold text-white shadow-md hover:from-teal-700 hover:to-emerald-600"
              >
                <Search className="h-4 w-4" />
                {t("cta_find")}
              </Link>
              <Link
                href="/#services"
                className="flex items-center gap-2 rounded-lg border border-emerald-500 bg-white px-6 py-3 font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                {t("cta_explore")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative h-72 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-1/2">
          <div className="absolute inset-0 flex items-end justify-center bg-emerald-100/50 px-6">
            <HeroIllustration />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-doctor.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-emerald-50 via-emerald-50/30 to-transparent md:block" />

          <div className="absolute right-3 top-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg md:right-10 md:top-14">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CalendarDays className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-slate-700">
              {t("float_1")}
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <div className="absolute bottom-4 right-3 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg md:bottom-16 md:right-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <User className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-slate-700">
              {t("float_2")}
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-4 pt-6 sm:px-6 md:-mt-10 md:pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group flex flex-col rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full ${c.color}`}
              >
                <c.Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-bold text-slate-900">{t(c.title)}</h3>
              <p className="mt-1 flex-1 text-sm text-slate-500">{t(c.desc)}</p>
              <ArrowRight className="mt-3 h-4 w-4 self-end text-emerald-600 transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 bg-emerald-50/60">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <h2 className="text-center text-xl font-bold text-teal-900 sm:text-2xl">
            {t("trust_title")}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-emerald-100">
            {TRUST.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-center gap-3 md:justify-center md:px-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t(title)}</p>
                  <p className="text-xs text-slate-500">{t(desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
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

      <section id="services" className="scroll-mt-24 bg-gradient-to-b from-white to-emerald-50/60">
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
