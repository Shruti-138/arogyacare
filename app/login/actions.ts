"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { createSession } from "../../lib/session";

export type LoginState = { error?: "missing" | "invalid" } | null;

export async function loginUser(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "missing" };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  const passwordOk = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!user || !passwordOk) {
    return { error: "invalid" };
  }

  await createSession({ userId: user.id, role: user.role });
  redirect("/doctors");
}
