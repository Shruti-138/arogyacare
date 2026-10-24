"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";

export async function cancelAppointment(formData: FormData): Promise<void> {
  const id = String(formData.get("appointmentId") ?? "");

  const session = await getSession();
  if (!session || session.role !== "PATIENT") return;

  const patient = await prisma.patient.findUnique({
    where: { userId: session.userId },
  });
  if (!patient) return;

  const appointment = await prisma.appointment.findFirst({
    where: { id, patientId: patient.id },
    select: { id: true, startsAt: true, status: true },
  });
  if (!appointment) return;
  if (appointment.startsAt.getTime() <= Date.now()) return;
  if (appointment.status !== "PENDING" && appointment.status !== "CONFIRMED") {
    return;
  }

  try {
    await prisma.appointment.delete({ where: { id: appointment.id } });
  } catch {
    return;
  }

  revalidatePath("/appointments");
}