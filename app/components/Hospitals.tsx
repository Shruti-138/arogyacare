import Link from "next/link";
import { BarChart3, CalendarCheck, ShieldAlert, UserPlus } from "lucide-react";
import { getT } from "../../lib/i18n";

const ITEMS = [
  { Icon: UserPlus, title: "h1_title", desc: "h1_desc" },
  { Icon: CalendarCheck, title: "h2_title", desc: "h2_desc" },
  { Icon: BarChart3, title: "h3_title", desc: "h3_desc" },
] as const;

export default async function Hospitals() {
  const { t } = await getT();

  return (
    <section id="hospitals" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-[#d5f1ec] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0d8f82] sm:text-sm">
            {t("hosp_badge")}
          </span>
          <h2 className="mt-6 text-4xl font-extrabold text-[#0a1f44] sm:text-5xl">
            {t("hosp_title")}
          </h2>
          <p className="mt-4 text-lg text-slate-500">{t("hosp_sub")}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ITEMS.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-3xl bg-gradient-to-br from-white to-[#f3fbf9] p-8 shadow-sm ring-1 ring-slate-100"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d5f1ec] text-[#0d8f82]">
                <Icon className="h-8 w-8" />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold text-[#0a1f44]">
                {t(title)}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-500">
                {t(desc)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/login"
            className="inline-flex rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a3a7a] px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-teal-600/25 hover:opacity-95"
          >
            {t("aud_cta_hospital")}
          </Link>
        </div>

        <div className="mx-auto mt-14 flex max-w-4xl items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <ShieldAlert className="mt-0.5 h-7 w-7 shrink-0 text-amber-600" />
          <p className="text-base leading-relaxed text-amber-900">
            <strong className="font-bold">{t("emergency_title")}</strong>{" "}
            {t("emergency_text")}
          </p>
        </div>
      </div>
    </section>
  );
}
