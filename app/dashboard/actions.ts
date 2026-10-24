"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";

export async function completeAppointment(formData: FormData): Promise<void> {
  const id = String(formData.get("appointmentId") ?? "");

  const session = await getSession();
  if (!session || session.role !== "DOCTOR") return;

  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.userId },
    select: { id: true },
  });
  if (!doctor) return;

  const appointment = await prisma.appointment.findFirst({
    where: { id, doctorId: doctor.id },
    select: { id: true, status: true },
  });
  if (!appointment) return;
  if (appointment.status !== "PENDING" && appointment.status !== "CONFIRMED") {
    return;
  }

  await prisma.appointment.update({
    where: { id: appointment.id },
    data: { status: "COMPLETED" },
  });

  revalidatePath("/dashboard");
}