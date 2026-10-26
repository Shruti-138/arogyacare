import { Bell, FlaskConical, Video } from "lucide-react";
import { getT } from "../../lib/i18n";

const SOON = [
  { Icon: Video, title: "consult_title", desc: "consult_desc" },
  { Icon: FlaskConical, title: "lab_title", desc: "lab_desc" },
  { Icon: Bell, title: "soon_3_title", desc: "soon_3_desc" },
] as const;

export default async function ComingSoon() {
  const { t } = await getT();

  return (
    <section className="bg-[#eaf7f5]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-[#d5f1ec] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0d8f82] sm:text-sm">
            {t("soon_badge")}
          </span>
          <h2 className="mt-6 text-4xl font-extrabold text-[#0a1f44] sm:text-5xl">
            {t("soon_title")}
          </h2>
          <p className="mt-4 text-lg text-slate-500">{t("soon_sub")}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SOON.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-3xl bg-white p-8 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:ring-[#0fa596]/40"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0fa596] to-[#0a4a8a] text-white shadow-md">
                <Icon className="h-8 w-8" />
              </span>
              <span className="mt-6 inline-block rounded-full bg-[#e3eefa] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0a3a7a]">
                {t("soon_badge")}
              </span>
              <h3 className="mt-3 text-2xl font-extrabold text-[#0a1f44]">
                {t(title)}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-500">
                {t(desc)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
