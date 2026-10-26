import Link from "next/link";
import { Check } from "lucide-react";
import { getT } from "../../lib/i18n";

const CARDS = [
  {
    label: "role_patient_title",
    title: "aud_patient_sub",
    points: ["role_patient_1", "role_patient_2", "role_patient_3"],
    href: "/doctors",
    cta: "cta_find",
    primary: true,
  },
  {
    label: "role_doctor_title",
    title: "aud_doctor_sub",
    points: ["role_doctor_1", "role_doctor_2", "role_doctor_3"],
    href: "/login",
    cta: "aud_cta_doctor",
    primary: false,
  },
  {
    label: "role_hospital_title",
    title: "aud_hospital_sub",
    points: ["role_hospital_1", "role_hospital_2", "role_hospital_3"],
    href: "/login",
    cta: "aud_cta_hospital",
    primary: false,
  },
] as const;

const FLOW = ["flow_1", "flow_2", "flow_3", "flow_4"] as const;

export default async function Network() {
  const { t } = await getT();

  return (
    <section
      id="about"
      className="scroll-mt-24 bg-gradient-to-b from-[#021a43] via-[#04306a] to-[#05397a]"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-300 sm:text-sm">
            {t("net_badge")}
          </span>
          <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            {t("net_title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-blue-100/90">
            {t("net_sub")}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {CARDS.map((c) => (
            <div
              key={c.label}
              className="flex flex-col rounded-3xl bg-white p-8 shadow-2xl shadow-black/20"
            >
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#0d8f82]">
                {t(c.label)}
              </p>
              <h3 className="mt-3 text-2xl font-extrabold leading-snug text-[#0a1f44]">
                {t(c.title)}
              </h3>
              <ul className="mt-6 flex-1 space-y-3">
                {c.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-base text-[#0a1f44]"
                  >
                    <Check className="mt-1 h-5 w-5 shrink-0 text-[#0d8f82]" />
                    <span>{t(p)}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={c.href}
                className={
                  c.primary
                    ? "mt-8 inline-flex w-fit rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a4a8a] px-6 py-3 font-semibold text-white shadow-lg shadow-teal-600/25 hover:opacity-95"
                    : "mt-8 inline-flex w-fit rounded-full border border-slate-200 px-6 py-3 font-semibold text-[#0a3a7a] hover:bg-slate-50"
                }
              >
                {t(c.cta)}
              </Link>
            </div>
          ))}
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {FLOW.map((k, i) => (
            <li
              key={k}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#14c8a8] text-base font-bold text-[#021a43]">
                {i + 1}
              </span>
              <span className="text-lg font-semibold leading-snug text-white">
                {t(k)}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
