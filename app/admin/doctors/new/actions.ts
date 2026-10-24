"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { getSession } from "../../../../lib/session";

export type AddDoctorState = { error?: string } | null;

export async function addDoctor(
  _prev: AddDoctorState,
  formData: FormData
): Promise<AddDoctorState> {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { error: "Only hospital admins can add doctors." };
  }

  const admin = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { hospitalId: true },
  });
  if (!admin?.hospitalId) {
    return { error: "Your account is not linked to a hospital." };
  }

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

  if (name.length < 3) return { error: "Please enter the doctor's full name." };
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (specialty.length < 3) return { error: "Please enter a specialty." };
  if (!Number.isInteger(years) || years < 0 || years > 60) {
    return { error: "Experience must be between 0 and 60 years." };
  }
  if (bio.length > 500) return { error: "Bio must be under 500 characters." };
  if (days.length === 0) return { error: "Select at least one working day." };
  if (!/^\d{2}:\d{2}$/.test(startTime) || !/^\d{2}:\d{2}$/.test(endTime)) {
    return { error: "Please enter valid working hours." };
  }
  if (startTime >= endTime) {
    return { error: "End time must be after start time." };
  }
  if (![15, 20, 30, 45, 60].includes(slotMinutes)) {
    return { error: "Invalid slot length." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

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
    return { error: "Could not add the doctor. Please try again." };
  }

  redirect("/admin");
}
