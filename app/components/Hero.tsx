import Link from "next/link";
import { Check, Heart, Search } from "lucide-react";
import { getT } from "../../lib/i18n";
import PhoneMock from "./PhoneMock";

export default async function Hero() {
  const { t } = await getT();

  const checks = ["trust_1_title", "trust_3_title", "f3_title"] as const;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e3f6f2] via-[#f1fbf9] to-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#d5f1ec] px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0d8f82] sm:text-sm">
            <Heart className="h-4 w-4" />
            {t("badge")}
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.12] text-[#0a1f44] sm:text-6xl">
            {t("hero_a")}{" "}
            <span className="bg-gradient-to-r from-[#0fa596] to-[#0a5aa0] bg-clip-text text-transparent">
              {t("hero_b")}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500 sm:text-xl">
            {t("hero2_sub")}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/doctors"
              className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a3a7a] px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-teal-600/25 hover:opacity-95"
            >
              <Search className="h-5 w-5" />
              {t("cta_find")}
            </Link>
            <Link
              href="/#how-it-works"
              className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#0a3a7a] shadow-md ring-1 ring-slate-100 hover:bg-slate-50"
            >
              {t("hiw_badge")}
            </Link>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
            {checks.map((k) => (
              <li
                key={k}
                className="flex items-center gap-2 text-base font-medium text-[#0a1f44]"
              >
                <Check className="h-5 w-5 text-[#0d8f82]" />
                {t(k)}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute -right-6 top-6 h-72 w-72 rounded-full bg-[#bfe9e2]/60 blur-3xl" />
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}
