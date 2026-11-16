"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { sendMail } from "../../../lib/mail";
import { getSession } from "../../../lib/session";
import { getLocale } from "../../../lib/i18n";
import { formatTime, generateSlots, toDate } from "../../../lib/slots";
import { dayLabel } from "../../../lib/dates";
import { bookMsgs } from "../../../lib/messages/errors";
import { pages7 } from "../../../lib/messages/pages7";

export type BookState = { error?: string } | null;

export async function bookAppointment(
  _prev: BookState,
  formData: FormData
): Promise<BookState> {
  const locale = await getLocale();
  const m = (k: keyof typeof bookMsgs) => bookMsgs[k][locale];

  const doctorId = String(formData.get("doctorId") ?? "");
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "");
  const mode = formData.get("mode") === "ONLINE" ? "ONLINE" : "IN_PERSON";

  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "PATIENT") {
    return { error: m("e_only_patients") };
  }

  const patient = await prisma.patient.findUnique({
    where: { userId: session.userId },
    select: { id: true, user: { select: { name: true, email: true } } },
  });
  if (!patient) return { error: m("e_no_patient") };

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return { error: m("e_bad_slot") };
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
  if (!doctor) return { error: m("e_no_doctor") };

  if (!generateSlots(doctor.availabilities, date).includes(time)) {
    return { error: m("e_not_schedule") };
  }

  const startsAt = toDate(date, time);
  if (startsAt.getTime() <= Date.now()) {
    return { error: m("e_passed") };
  }

  try {
    await prisma.appointment.create({
      data: {
        doctorId,
        patientId: patient.id,
        startsAt,
        status: "CONFIRMED",
        mode,
      },
    });
  } catch {
    return { error: m("e_taken") };
  }

  const typeLabel =
    mode === "ONLINE" ? pages7.video_call[locale] : pages7.in_person[locale];

  await sendMail({
    to: patient.user.email,
    subject: m("m_subject").replace("{doctor}", doctor.user.name),
    text: [
      m("m_hello").replace("{name}", patient.user.name),
      "",
      m("m_confirmed"),
      "",
      m("m_doctor") + ": " + doctor.user.name,
      m("m_hospital") + ": " + doctor.hospital.name,
      m("m_date") + ": " + dayLabel(date, locale),
      m("m_time") + ": " + formatTime(time) + " (IST)",
      m("m_type") + ": " + typeLabel,
      "",
      m("m_cancel_hint"),
      "",
      "ArogyaCare - Care That Connects",
    ].join("\n"),
  });

  redirect("/doctors/" + doctorId + "?date=" + date + "&booked=" + time);
}
