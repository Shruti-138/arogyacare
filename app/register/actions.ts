"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { createSession } from "../../lib/session";

export type RegisterState = {
  error?: "name" | "email" | "password" | "exists";
} | null;

export async function registerPatient(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (name.length < 2) return { error: "name" };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "email" };
  if (password.length < 8) return { error: "password" };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "exists" };

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "PATIENT",
      patient: { create: { phone: phone || null } },
    },
  });

  await createSession({ userId: user.id, role: "PATIENT" });
  redirect("/doctors");
}
