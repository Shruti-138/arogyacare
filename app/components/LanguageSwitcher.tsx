import { LOCALES, type Locale } from "../../lib/i18n";
import LanguageMenu from "./LanguageMenu";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  return (
    <LanguageMenu
      locale={locale}
      options={LOCALES.map((l) => ({ code: l.code, label: l.label }))}
    />
  );
}
