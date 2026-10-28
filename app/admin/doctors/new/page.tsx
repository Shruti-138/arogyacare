import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getSession } from "../../../../lib/session";
import { getLocale } from "../../../../lib/i18n";
import { pages6 } from "../../../../lib/messages/pages6";
import { specialtyNames } from "../../../../lib/messages/home";
import PageHeader from "../../../components/PageHeader";
import DoctorForm from "./DoctorForm";

async function Content() {
  const locale = await getLocale();
  const tr = (k: keyof typeof pages6) => pages6[k][locale];

  const session = await getSession();
  if (!session) redirect("/login");

  if (session.role !== "ADMIN") {
    return (
      <p className="mt-8 rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
        {tr("only_admin_page")}
      </p>
    );
  }

  const days = [
    { value: 1, label: tr("d_mon") },
    { value: 2, label: tr("d_tue") },
    { value: 3, label: tr("d_wed") },
    { value: 4, label: tr("d_thu") },
    { value: 5, label: tr("d_fri") },
    { value: 6, label: tr("d_sat") },
    { value: 0, label: tr("d_sun") },
  ];

  const specialties = Object.keys(specialtyNames).map((key) => ({
    value: key,
    label: specialtyNames[key][locale],
  }));

  const slotOptions = [15, 20, 30, 45, 60].map((n) => ({
    value: String(n),
    label: tr("mins").replace("{n}", String(n)),
  }));

  const errors: Record<string, string> = {
    not_admin: tr("e_not_admin"),
    no_hospital: tr("e_no_hospital"),
    name: tr("e_name"),
    email: tr("e_email"),
    password: tr("e_password"),
    specialty: tr("e_specialty"),
    years: tr("e_years"),
    bio: tr("e_bio"),
    days: tr("e_days"),
    hours: tr("e_hours"),
    order: tr("e_order"),
    slot: tr("e_slot"),
    exists: tr("e_exists"),
    failed: tr("e_failed"),
  };

  return (
    <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 sm:p-10">
      <DoctorForm
        labels={{
          name: tr("f_name"),
          email: tr("f_email"),
          password: tr("f_password"),
          specialty: tr("f_specialty"),
          choose: tr("f_choose"),
          years: tr("f_years"),
          bio: tr("f_bio"),
          days: tr("f_days"),
          start: tr("f_start"),
          end: tr("f_end"),
          slot: tr("f_slot"),
          submit: tr("add_btn"),
          submitting: tr("adding"),
        }}
        days={days}
        specialties={specialties}
        slotOptions={slotOptions}
        errors={errors}
      />
    </div>
  );
}

async function BackLink() {
  const locale = await getLocale();
  return (
    <Link
      href="/admin"
      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d8f82] hover:text-[#0a3a7a]"
    >
      <ArrowLeft className="h-4 w-4" />
      {pages6.back_admin[locale]}
    </Link>
  );
}

async function Heading() {
  const locale = await getLocale();
  return (
    <PageHeader title={pages6.add_title[locale]} sub={pages6.add_sub[locale]} />
  );
}

export default function NewDoctorPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={<div className="h-40 bg-[#eaf7f5]" />}>
        <Heading />
      </Suspense>
      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Suspense fallback={null}>
          <BackLink />
        </Suspense>
        <Suspense fallback={<p className="mt-6 text-slate-500">Loading...</p>}>
          <Content />
        </Suspense>
      </section>
    </main>
  );
}
