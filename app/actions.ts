"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteSession } from "../lib/session";
import { LANG_COOKIE } from "../lib/i18n";

export async function signOut() {
  await deleteSession();
  redirect("/login");
}

export async function setLanguage(formData: FormData): Promise<void> {
  const lang = String(formData.get("lang") ?? "");
  if (lang !== "en" && lang !== "hi" && lang !== "pa") return;

  const store = await cookies();
  store.set(LANG_COOKIE, lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  revalidatePath("/", "layout");
}
