import Link from "next/link";
import { Check, Heart, Play, Search } from "lucide-react";
import { getT } from "../../lib/i18n";

export default async function Hero() {
  const { t } = await getT();

  const checks = ["trust_1_title", "trust_3_title", "f3_title"] as const;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#d9f3ee] via-[#eaf8f6] to-white">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#d5f1ec] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#0d8f82] sm:text-sm">
          <Heart className="h-4 w-4 fill-[#0d8f82]" />
          {t("badge")}
        </span>

        <h1 className="mt-7 text-5xl font-extrabold leading-[1.1] sm:text-6xl lg:text-7xl">
          <span className="block text-[#0a1f44]">{t("hero_a")}</span>
          <span className="block bg-gradient-to-r from-[#12b3a0] to-[#0d7f8f] bg-clip-text text-transparent">
            {t("hero_b")}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500 sm:text-xl">
          {t("hero2_sub")}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/doctors"
            className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-teal-600/25 hover:opacity-95"
          >
            <Search className="h-5 w-5" />
            {t("cta_find")}
          </Link>
          <Link
            href="/#how-it-works"
            className="flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#0a3a5a] shadow-lg shadow-slate-300/40 ring-1 ring-slate-100 hover:bg-slate-50"
          >
            <Play className="h-4 w-4 fill-[#0d8f82] text-[#0d8f82]" />
            {t("hiw_badge")}
          </Link>
        </div>

        <ul className="mt-9 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {checks.map((k) => (
            <li
              key={k}
              className="flex items-center gap-2 text-sm font-medium text-[#0a1f44] sm:text-base"
            >
              <Check className="h-5 w-5 text-[#0d8f82]" />
              {t(k)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
