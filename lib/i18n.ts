import { cookies } from "next/headers";
import { common } from "./messages/common";
import { home } from "./messages/home";
import { landing } from "./messages/landing";
import { sections } from "./messages/sections";
import { sections2 } from "./messages/sections2";
import { sections3 } from "./messages/sections3";

export const LOCALES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

export const LANG_COOKIE = "arogya_lang";

const messages = {
  ...common,
  ...home,
  ...landing,
  ...sections,
  ...sections2,
  ...sections3,
};

export type MessageKey = keyof typeof messages;

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LANG_COOKIE)?.value;
  return value === "hi" || value === "pa" ? value : "en";
}

export function translate(locale: Locale, key: MessageKey): string {
  return messages[key][locale];
}

export async function getT() {
  const locale = await getLocale();
  return { locale, t: (key: MessageKey) => translate(locale, key) };
}
