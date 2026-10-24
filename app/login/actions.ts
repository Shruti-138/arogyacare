"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { createSession } from "../../lib/session";

export type LoginState = { error?: string } | null;

export async function loginUser(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  const passwordOk = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!user || !passwordOk) {
    return { error: "Invalid email or password." };
  }

  await createSession({ userId: user.id, role: user.role });
  redirect("/doctors");
}