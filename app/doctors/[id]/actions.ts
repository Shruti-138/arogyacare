"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { sendMail } from "../../../lib/mail";
import { getSession } from "../../../lib/session";
import { formatDayLabel, formatTime, generateSlots, toDate } from "../../../lib/slots";

export type BookState = { error?: string } | null;

export async function bookAppointment(
  _prev: BookState,
  formData: FormData
): Promise<BookState> {
  const doctorId = String(formData.get("doctorId") ?? "");
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "");

  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "PATIENT") {
    return { error: "Only patients can book appointments." };
  }

  const patient = await prisma.patient.findUnique({
    where: { userId: session.userId },
    select: { id: true, user: { select: { name: true, email: true } } },
  });
  if (!patient) return { error: "Patient profile not found." };

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return { error: "Invalid time slot." };
  }

  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: {
      user: { select: { name: true } },
      hospital: { select: { name: true } },
      availabilities: {
        select: {
          dayOfWeek: true,
          startTime: true,
          endTime: true,
          slotMinutes: true,
        },
      },
    },
  });
  if (!doctor) return { error: "Doctor not found." };

  if (!generateSlots(doctor.availabilities, date).includes(time)) {
    return { error: "This time is not in the doctor's schedule." };
  }

  const startsAt = toDate(date, time);
  if (startsAt.getTime() <= Date.now()) {
    return { error: "This time has already passed." };
  }

  try {
    await prisma.appointment.create({
      data: {
        doctorId,
        patientId: patient.id,
        startsAt,
        status: "CONFIRMED",
      },
    });
  } catch {
    return { error: "Sorry, this slot was just booked. Please pick another." };
  }

  await sendMail({
    to: patient.user.email,
    subject: `Appointment confirmed with ${doctor.user.name}`,
    text: [
      `Hello ${patient.user.name},`,
      "",
      "Your appointment is confirmed.",
      "",
      `Doctor:   ${doctor.user.name}`,
      `Hospital: ${doctor.hospital.name}`,
      `Date:     ${formatDayLabel(date)}`,
      `Time:     ${formatTime(time)} (IST)`,
      "",
      "To cancel, sign in and open My appointments.",
      "",
      "ArogyaCare - Care That Connects",
    ].join("\n"),
  });

  redirect(`/doctors/${doctorId}?date=${date}&booked=${time}`);
}