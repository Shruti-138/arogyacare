import { getT } from "../../lib/i18n";

const STEPS = [
  { n: "01", title: "hiw_1_title", desc: "hiw_1_desc" },
  { n: "02", title: "hiw_2_title", desc: "hiw_2_desc" },
  { n: "03", title: "hiw_3_title", desc: "hiw_3_desc" },
  { n: "04", title: "hiw_4_title", desc: "hiw_4_desc" },
] as const;

export default async function HowItWorks() {
  const { t } = await getT();

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-gradient-to-b from-[#eaf7f5] to-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-[#d5f1ec] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0d8f82] sm:text-sm">
            {t("hiw_badge")}
          </span>
          <h2 className="mt-6 text-4xl font-extrabold text-[#0a1f44] sm:text-5xl">
            {t("hiw_title")}
          </h2>
          <p className="mt-4 text-lg text-slate-500">{t("hiw_sub")}</p>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="relative">
              <span className="absolute -top-6 left-6 z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0a2a5c] text-lg font-extrabold text-white shadow-lg">
                {s.n}
              </span>
              <div className="h-full rounded-3xl bg-white px-6 pb-8 pt-12 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
                <h3 className="text-2xl font-extrabold leading-snug text-[#0a1f44]">
                  {t(s.title)}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-500">
                  {t(s.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
