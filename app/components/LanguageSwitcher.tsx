import { Globe } from "lucide-react";
import { setLanguage } from "../actions";
import { LOCALES, type Locale } from "../../lib/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  return (
    <form
      action={setLanguage}
      className="flex items-center gap-1 rounded-lg border border-teal-100 bg-white p-1"
    >
      <Globe className="ml-1 h-4 w-4 text-teal-700" aria-hidden="true" />
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="submit"
          name="lang"
          value={l.code}
          className={
            l.code === locale
              ? "rounded-md bg-teal-700 px-2 py-1 text-xs font-semibold text-white"
              : "rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-teal-50"
          }
        >
          {l.label}
        </button>
      ))}
    </form>
  );
}
