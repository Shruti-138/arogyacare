"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { getSession } from "../../../../lib/session";
import { specialtyNames } from "../../../../lib/messages/home";

export type AddDoctorState = {
  error?:
    | "not_admin"
    | "no_hospital"
    | "name"
    | "email"
    | "password"
    | "specialty"
    | "years"
    | "bio"
    | "days"
    | "hours"
    | "order"
    | "slot"
    | "exists"
    | "failed";
} | null;

export async function addDoctor(
  _prev: AddDoctorState,
  formData: FormData
): Promise<AddDoctorState> {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { error: "not_admin" };

  const admin = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { hospitalId: true },
  });
  if (!admin?.hospitalId) return { error: "no_hospital" };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const specialty = String(formData.get("specialty") ?? "").trim();
  const years = Number(formData.get("experienceYears") ?? 0);
  const bio = String(formData.get("bio") ?? "").trim();
  const startTime = String(formData.get("startTime") ?? "");
  const endTime = String(formData.get("endTime") ?? "");
  const slotMinutes = Number(formData.get("slotMinutes") ?? 30);
  const days = formData
    .getAll("days")
    .map((d) => Number(d))
    .filter((d) => Number.isInteger(d) && d >= 0 && d <= 6);

  if (name.length < 3) return { error: "name" };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "email" };
  if (password.length < 8) return { error: "password" };
  if (!Object.keys(specialtyNames).includes(specialty)) {
    return { error: "specialty" };
  }
  if (!Number.isInteger(years) || years < 0 || years > 60) {
    return { error: "years" };
  }
  if (bio.length > 500) return { error: "bio" };
  if (days.length === 0) return { error: "days" };
  if (!/^\d{2}:\d{2}$/.test(startTime) || !/^\d{2}:\d{2}$/.test(endTime)) {
    return { error: "hours" };
  }
  if (startTime >= endTime) return { error: "order" };
  if (![15, 20, 30, 45, 60].includes(slotMinutes)) return { error: "slot" };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "exists" };

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name: name.startsWith("Dr.") ? name : `Dr. ${name}`,
        email,
        passwordHash,
        role: "DOCTOR",
        hospitalId: admin.hospitalId,
        doctor: {
          create: {
            specialty,
            experienceYears: years,
            bio: bio || null,
            hospitalId: admin.hospitalId,
            availabilities: {
              create: days.map((dayOfWeek) => ({
                dayOfWeek,
                startTime,
                endTime,
                slotMinutes,
              })),
            },
          },
        },
      },
    });
  } catch {
    return { error: "failed" };
  }

  redirect("/admin");
}
