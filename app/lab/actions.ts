"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { sendMail } from "../../lib/mail";
import { getSession } from "../../lib/session";
import { parseResults } from "../../lib/lab";
import { bookMsgs } from "../../lib/messages/errors";
import { mails } from "../../lib/messages/mails";

export type LabState = {
  error?: "forbidden" | "test" | "results" | "notes" | "failed";
  ok?: boolean;
} | null;

export async function addLabReport(
  _prev: LabState,
  formData: FormData
): Promise<LabState> {
  const appointmentId = String(formData.get("appointmentId") ?? "");
  const testName = String(formData.get("testName") ?? "").trim();
  const results = String(formData.get("results") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  const session = await getSession();
  if (!session || session.role !== "DOCTOR") return { error: "forbidden" };

  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.userId },
    select: { id: true, user: { select: { name: true } } },
  });
  if (!doctor) return { error: "forbidden" };

  const appointment = await prisma.appointment.findFirst({
    where: { id: appointmentId, doctorId: doctor.id, status: "COMPLETED" },
    select: {
      id: true,
      patientId: true,
      patient: { select: { user: { select: { name: true, email: true } } } },
    },
  });
  if (!appointment) return { error: "forbidden" };

  if (testName.length < 2 || testName.length > 120) return { error: "test" };
  const rows = parseResults(results);
  if (rows.length === 0 || rows.length > 40 || results.length > 4000) {
    return { error: "results" };
  }
  if (notes.length > 1000) return { error: "notes" };

  try {
    await prisma.labReport.create({
      data: {
        testName,
        results,
        notes: notes || null,
        appointmentId: appointment.id,
        doctorId: doctor.id,
        patientId: appointment.patientId,
      },
    });
  } catch {
    return { error: "failed" };
  }

  const langs = ["en", "hi", "pa"] as const;
  const patientName = appointment.patient.user.name;
  const body = langs
    .map((lc) =>
      [
        bookMsgs.m_hello[lc].replace("{name}", patientName),
        "",
        mails.l_body[lc]
          .replace("{doctor}", doctor.user.name)
          .replace("{test}", testName),
        mails.l_open[lc],
      ].join("\n")
    )
    .join("\n\n----------\n\n");

  await sendMail({
    to: appointment.patient.user.email,
    subject:
      mails.l_subject.en.replace("{test}", testName) +
      " | " +
      mails.l_subject.hi.replace("{test}", testName),
    text: body + "\n\nArogyaCare - Care That Connects",
  });

  revalidatePath("/lab");
  revalidatePath("/lab-reports");
  return { ok: true };
}
