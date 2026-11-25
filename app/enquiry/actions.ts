"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";

export async function sendEnquiry(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim().slice(0, 100);
  const email = String(formData.get("email") ?? "").trim().slice(0, 150);
  const phone = String(formData.get("phone") ?? "").trim().slice(0, 30);
  const message = String(formData.get("message") ?? "").trim().slice(0, 2000);
  const doctorId = String(formData.get("doctorId") ?? "");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || message.length < 5) {
    redirect(`/enquiry?error=1${doctorId ? `&doctor=${encodeURIComponent(doctorId)}` : ""}`);
  }

  const doctor = doctorId
    ? await prisma.doctor.findUnique({
        where: { id: doctorId },
        select: { id: true, hospitalId: true },
      })
    : null;

  await prisma.enquiry.create({
    data: {
      name,
      email,
      phone: phone || null,
      message,
      doctorId: doctor?.id ?? null,
      hospitalId: doctor?.hospitalId ?? null,
    },
  });

  redirect("/enquiry?sent=1");
}
