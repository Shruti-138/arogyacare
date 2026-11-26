import { notFound, redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/session";
import PrintButton from "./PrintButton";

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect("/login");

  const appt = await prisma.appointment.findUnique({
    where: { id },
    include: {
      patient: { include: { user: true } },
      doctor: { include: { user: true, hospital: true } },
    },
  });
  if (!appt) notFound();

  const allowed =
    session.role === "ADMIN" ||
    appt.patient.user.id === session.userId ||
    appt.doctor.user.id === session.userId;
  if (!allowed) notFound();

  const when = new Date(appt.startsAt);
  const date = when.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
  const time = when.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const h = appt.doctor.hospital;
  const rows: [string, string][] = [
    ["Booking ID", appt.id],
    ["Date", date],
    ["Time", time],
    ["Patient", appt.patient.user.name],
    ["Patient email", appt.patient.user.email],
    ["Doctor", appt.doctor.user.name],
    ["Specialty", appt.doctor.specialty],
    ["Hospital", h.name],
    ["City", h.city ?? "-"],
    ["Address", h.address ?? "-"],
    ["Hospital phone", h.phone ?? "-"],
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100 print:shadow-none print:ring-0">
        <h1 className="text-3xl font-extrabold text-[#0a1f44]">ArogyaCare</h1>
        <p className="text-sm font-semibold text-[#0d8f82]">
          Appointment Receipt
        </p>
        <dl className="mt-6 divide-y divide-slate-100">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-3">
              <dt className="text-sm text-slate-500">{k}</dt>
              <dd className="text-right text-sm font-semibold text-[#0a1f44] break-all">
                {v}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs text-slate-400">
          Generated on {new Date().toLocaleDateString("en-IN")}. Please arrive
          10 minutes early.
        </p>
        <div className="mt-6">
          <PrintButton />
        </div>
      </div>
    </main>
  );
}
