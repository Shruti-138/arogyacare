"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { sendMail } from "../../lib/mail";
import { getSession } from "../../lib/session";
import { getLocale } from "../../lib/i18n";
import { TZ, formatTime, timeOf } from "../../lib/slots";
import { dayLabel } from "../../lib/dates";
import { bookMsgs } from "../../lib/messages/errors";
import { mails } from "../../lib/messages/mails";

export async function cancelAppointment(formData: FormData): Promise<void> {
  const locale = await getLocale();
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

  const date = appointment.startsAt.toLocaleDateString("en-CA", { timeZone: TZ });

  await sendMail({
    to: appointment.patient.user.email,
    subject: mails.c_subject[locale].replace(
      "{doctor}",
      appointment.doctor.user.name
    ),
    text: [
      bookMsgs.m_hello[locale].replace("{name}", appointment.patient.user.name),
      "",
      mails.c_body[locale],
      "",
      bookMsgs.m_doctor[locale] + ": " + appointment.doctor.user.name,
      bookMsgs.m_date[locale] + ": " + dayLabel(date, locale),
      bookMsgs.m_time[locale] +
        ": " +
        formatTime(timeOf(appointment.startsAt)) +
        " (IST)",
      "",
      mails.c_again[locale],
      "",
      "ArogyaCare - Care That Connects",
    ].join("\n"),
  });

  revalidatePath("/appointments");
}
