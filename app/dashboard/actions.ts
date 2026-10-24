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

export async function savePrescription(formData: FormData): Promise<void> {
  const id = String(formData.get("appointmentId") ?? "");
  const medicines = String(formData.get("medicines") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (medicines.length < 2 || medicines.length > 2000 || notes.length > 1000) {
    return;
  }

  const session = await getSession();
  if (!session || session.role !== "DOCTOR") return;

  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.userId },
    select: { id: true },
  });
  if (!doctor) return;

  const appointment = await prisma.appointment.findFirst({
    where: { id, doctorId: doctor.id },
    select: { id: true, status: true, patientId: true },
  });
  if (!appointment || appointment.status !== "COMPLETED") return;

  try {
    await prisma.prescription.create({
      data: {
        medicines,
        notes: notes || null,
        appointmentId: appointment.id,
        doctorId: doctor.id,
        patientId: appointment.patientId,
      },
    });
  } catch {
    return;
  }

  revalidatePath("/dashboard");
  revalidatePath("/prescriptions");
}