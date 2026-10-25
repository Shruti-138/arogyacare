import Link from "next/link";
import { ArrowRight, Building2, Check, Stethoscope, User } from "lucide-react";
import { getT } from "../../lib/i18n";

const AUDIENCES = [
  {
    Icon: User,
    tone: "bg-emerald-100 text-emerald-700",
    bar: "from-emerald-500 to-teal-500",
    title: "role_patient_title",
    sub: "aud_patient_sub",
    points: ["role_patient_1", "role_patient_2", "role_patient_3"],
    href: "/doctors",
    cta: "cta_find",
  },
  {
    Icon: Stethoscope,
    tone: "bg-sky-100 text-sky-700",
    bar: "from-sky-500 to-cyan-500",
    title: "role_doctor_title",
    sub: "aud_doctor_sub",
    points: ["role_doctor_1", "role_doctor_2", "role_doctor_3"],
    href: "/login",
    cta: "aud_cta_doctor",
  },
  {
    Icon: Building2,
    tone: "bg-teal-100 text-teal-700",
    bar: "from-teal-500 to-emerald-500",
    title: "role_hospital_title",
    sub: "aud_hospital_sub",
    points: ["role_hospital_1", "role_hospital_2", "role_hospital_3"],
    href: "/login",
    cta: "aud_cta_hospital",
  },
] as const;

const FLOW = ["flow_1", "flow_2", "flow_3", "flow_4"] as const;

export default async function Network() {
  const { t } = await getT();

  return (
    <section id="about" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
            {t("net_badge")}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-teal-900 sm:text-4xl">
            {t("net_title")}
          </h2>
          <p className="mt-3 text-lg text-slate-600">{t("net_sub")}</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {AUDIENCES.map((a) => (
            <div
              key={a.title}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-100"
            >
              <div className={`h-2 bg-gradient-to-r ${a.bar}`} />
              <div className="flex flex-1 flex-col p-6">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${a.tone}`}
                >
                  <a.Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {t(a.title)}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{t(a.sub)}</p>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {a.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{t(p)}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={a.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900"
                >
                  {t(a.cta)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-gradient-to-r from-teal-700 to-emerald-600 px-6 py-8 text-white shadow-lg">
          <h3 className="text-center text-xl font-bold">{t("flow_title")}</h3>
          <ol className="mt-6 grid gap-5 md:grid-cols-4">
            {FLOW.map((k, i) => (
              <li key={k} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-teal-800">
                  {i + 1}
                </span>
                <span className="pt-1 text-sm font-medium leading-snug text-emerald-50">
                  {t(k)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
