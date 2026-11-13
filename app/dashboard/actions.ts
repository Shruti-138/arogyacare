"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";

// Validation limits for prescriptions (not exported: "use server" files may only export async functions)
const MEDICINES_MIN = 2;
const MEDICINES_MAX = 2000;
const NOTES_MAX = 1000;

// Returns the logged-in doctor's id, or null if the user isn't a doctor
async function getCurrentDoctorId(): Promise<string | null> {
  const session = await getSession();
  if (!session || session.role !== "DOCTOR") return null;

  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.userId },
    select: { id: true },
  });
  return doctor?.id ?? null;
}

// Marks a pending or confirmed appointment as completed
export async function completeAppointment(formData: FormData): Promise<void> {
  const id = String(formData.get("appointmentId") ?? "");

  const doctorId = await getCurrentDoctorId();
  if (!doctorId) return;

  const appointment = await prisma.appointment.findFirst({
    where: { id, doctorId },
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

// Saves a prescription for a completed appointment
export async function savePrescription(formData: FormData): Promise<void> {
  const id = String(formData.get("appointmentId") ?? "");
  const medicines = String(formData.get("medicines") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (
    medicines.length < MEDICINES_MIN ||
    medicines.length > MEDICINES_MAX ||
    notes.length > NOTES_MAX
  ) {
    return;
  }

  const doctorId = await getCurrentDoctorId();
  if (!doctorId) return;

  const appointment = await prisma.appointment.findFirst({
    where: { id, doctorId },
    select: { id: true, status: true, patientId: true },
  });
  if (!appointment || appointment.status !== "COMPLETED") return;

  try {
    await prisma.prescription.create({
      data: {
        medicines,
        notes: notes || null,
        appointmentId: appointment.id,
        doctorId,
        patientId: appointment.patientId,
      },
    });
  } catch {
    return;
  }

  revalidatePath("/dashboard");
  revalidatePath("/prescriptions");
}