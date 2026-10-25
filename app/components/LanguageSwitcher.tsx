import { ChevronDown, Globe } from "lucide-react";
import { setLanguage } from "../actions";
import { LOCALES, type Locale } from "../../lib/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <details className="relative">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-full bg-[#e3f6f2] px-4 py-2 text-sm font-semibold text-[#0a1f44] [&::-webkit-details-marker]:hidden">
        <Globe className="h-4 w-4 text-[#0d8f82]" aria-hidden="true" />
        {current.label}
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </summary>
      <form
        action={setLanguage}
        className="absolute right-0 z-50 mt-2 w-40 rounded-xl bg-white p-1 shadow-xl ring-1 ring-slate-100"
      >
        {LOCALES.map((l) => (
          <button
            key={l.code}
            type="submit"
            name="lang"
            value={l.code}
            className={
              l.code === locale
                ? "block w-full rounded-lg bg-[#e3f6f2] px-3 py-2 text-left text-sm font-semibold text-[#0d8f82]"
                : "block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[#0a1f44] hover:bg-slate-50"
            }
          >
            {l.label}
          </button>
        ))}
      </form>
    </details>
  );
}
