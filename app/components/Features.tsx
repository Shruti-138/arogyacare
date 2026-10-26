import {
  CalendarCheck,
  FileText,
  LayoutDashboard,
  Lock,
  Mail,
  Search,
} from "lucide-react";
import { getT } from "../../lib/i18n";

const FEATURES = [
  { Icon: Search, title: "f1_title", desc: "f1_desc" },
  { Icon: CalendarCheck, title: "f2_title", desc: "f2_desc" },
  { Icon: FileText, title: "f3_title", desc: "f3_desc" },
  { Icon: LayoutDashboard, title: "f4_title", desc: "f4_desc" },
  { Icon: Mail, title: "f5_title", desc: "f5_desc" },
  { Icon: Lock, title: "f6_title", desc: "f6_desc" },
] as const;

export default async function Features() {
  const { t } = await getT();

  return (
    <section id="features" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-[#d5f1ec] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0d8f82] sm:text-sm">
            {t("feat_badge")}
          </span>
          <h2 className="mt-6 text-4xl font-extrabold text-[#0a1f44] sm:text-5xl">
            {t("feat_title")}
          </h2>
          <p className="mt-4 text-lg text-slate-500">{t("feat_sub")}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-3xl bg-gradient-to-br from-white to-[#f3fbf9] p-8 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:ring-[#0fa596]/40"
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
      </div>
    </section>
  );
}
