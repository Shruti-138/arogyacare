import { CalendarCheck, ClipboardCheck, Search, UserPlus } from "lucide-react";
import { getT } from "../../lib/i18n";

const STEPS = [
  { Icon: UserPlus, tone: "bg-emerald-100 text-emerald-700", title: "hiw_1_title", desc: "hiw_1_desc" },
  { Icon: Search, tone: "bg-sky-100 text-sky-700", title: "hiw_2_title", desc: "hiw_2_desc" },
  { Icon: CalendarCheck, tone: "bg-teal-100 text-teal-700", title: "hiw_3_title", desc: "hiw_3_desc" },
  { Icon: ClipboardCheck, tone: "bg-violet-100 text-violet-700", title: "hiw_4_title", desc: "hiw_4_desc" },
] as const;

export default async function HowItWorks() {
  const { t } = await getT();

  return (
    <section className="bg-gradient-to-b from-emerald-50/60 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-800">
            {t("hiw_badge")}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-teal-900 sm:text-4xl">
            {t("hiw_title")}
          </h2>
          <p className="mt-3 text-lg text-slate-600">{t("hiw_sub")}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ Icon, tone, title, desc }, i) => (
            <div
              key={title}
              className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
            >
              <span className="absolute right-4 top-3 text-4xl font-extrabold text-slate-100">
                {i + 1}
              </span>
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${tone}`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-bold text-slate-900">{t(title)}</h3>
              <p className="mt-1 text-sm text-slate-500">{t(desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
