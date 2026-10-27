import { TZ } from "./slots";
import type { Locale } from "./i18n";

export function dayLabel(date: string, locale: Locale) {
  return new Date(`${date}T12:00:00+05:30`).toLocaleDateString(`${locale}-IN`, {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: TZ,
  });
}
