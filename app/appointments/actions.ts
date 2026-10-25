"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { sendMail } from "../../lib/mail";
import { getSession } from "../../lib/session";
import { TZ, formatTime, timeOf } from "../../lib/slots";

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
    select: {
      id: true,
      startsAt: true,
      status: true,
      doctor: { select: { user: { select: { name: true } } } },
      patient: { select: { user: { select: { name: true, email: true } } } },
    },
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

  const day = appointment.startsAt.toLocaleDateString("en-IN", {
    timeZone: TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  await sendMail({
    to: appointment.patient.user.email,
    subject: `Appointment cancelled with ${appointment.doctor.user.name}`,
    text: [
      `Hello ${appointment.patient.user.name},`,
      "",
      "Your appointment has been cancelled.",
      "",
      `Doctor: ${appointment.doctor.user.name}`,
      `Date:   ${day}`,
      `Time:   ${formatTime(timeOf(appointment.startsAt))} (IST)`,
      "",
      "You can book a new appointment any time.",
      "",
      "ArogyaCare - Care That Connects",
    ].join("\n"),
  });

  revalidatePath("/appointments");
}