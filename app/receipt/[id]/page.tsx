import { notFound, redirect } from "next/navigation";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock,
  HeartPulse,
  MapPin,
  Phone,
  Stethoscope,
  User,
} from "lucide-react";
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
  const receiptNo = "AC-" + appt.id.slice(-8).toUpperCase();
  const issued = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
  const h = appt.doctor.hospital;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 print:bg-white print:p-0">
      <style>{`@media print{*{-webkit-print-color-adjust:exact;print-color-adjust:exact}header,nav,footer{display:none!important}}`}</style>

      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 print:rounded-none print:shadow-none print:ring-0">
        {/* Banner */}
        <div className="relative bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-8 py-7 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                <HeartPulse className="h-7 w-7" />
              </span>
              <div>
                <p className="text-2xl font-extrabold leading-none">
                  ArogyaCare
                </p>
                <p className="mt-1 text-xs font-semibold tracking-wide text-white/80">
                  CARE THAT CONNECTS
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold tracking-widest text-white/80">
                APPOINTMENT RECEIPT
              </p>
              <p className="text-xl font-extrabold">{receiptNo}</p>
              <p className="text-xs text-white/80">Issued {issued}</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-8">
          {/* Status */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200">
              <CheckCircle2 className="h-4 w-4" />
              Booking confirmed
            </span>
            <p className="text-xs text-slate-400">
              Booking ID: <span className="break-all">{appt.id}</span>
            </p>
          </div>

          {/* Date and time highlight */}
          <div className="mt-6 grid gap-4 rounded-2xl bg-[#eaf7f5] p-5 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-8 w-8 text-[#0d8f82]" />
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Date
                </p>
                <p className="font-extrabold text-[#0a1f44]">{date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-[#0d8f82]" />
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Time
                </p>
                <p className="font-extrabold text-[#0a1f44]">{time}</p>
              </div>
            </div>
          </div>

          {/* Patient and doctor */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl p-5 ring-1 ring-slate-200">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#0d8f82]">
                <User className="h-4 w-4" /> Patient
              </p>
              <p className="mt-2 text-lg font-extrabold text-[#0a1f44]">
                {appt.patient.user.name}
              </p>
              <p className="break-all text-sm text-slate-500">
                {appt.patient.user.email}
              </p>
            </div>
            <div className="rounded-2xl p-5 ring-1 ring-slate-200">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#0d8f82]">
                <Stethoscope className="h-4 w-4" /> Doctor
              </p>
              <p className="mt-2 text-lg font-extrabold text-[#0a1f44]">
                {appt.doctor.user.name}
              </p>
              <p className="text-sm text-slate-500">{appt.doctor.specialty}</p>
            </div>
          </div>

          {/* Hospital */}
          <div className="mt-4 rounded-2xl p-5 ring-1 ring-slate-200">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#0d8f82]">
              <Building2 className="h-4 w-4" /> Hospital
            </p>
            <p className="mt-2 text-lg font-extrabold text-[#0a1f44]">
              {h.name}
            </p>
            <div className="mt-1 space-y-1 text-sm text-slate-500">
              {(h.address || h.city) && (
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#0d8f82]" />
                  {[h.address, h.city].filter(Boolean).join(", ")}
                </p>
              )}
              {h.phone && (
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#0d8f82]" />
                  {h.phone}
                </p>
              )}
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-5">
            <p className="text-sm font-bold text-[#0a1f44]">
              Before you visit
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-500">
              <li>Arrive 10 minutes early and show this receipt at the desk.</li>
              <li>Carry a photo ID and any earlier reports or prescriptions.</li>
              <li>To cancel or change the time, use My appointments.</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
            <p className="text-xs text-slate-400">
              This is a computer-generated receipt and needs no signature.
            </p>
            <PrintButton />
          </div>
        </div>

        <div className="bg-[#0a1f44] px-8 py-3 text-center text-xs font-semibold tracking-wide text-white/80">
          ArogyaCare - Care That Connects
        </div>
      </div>
    </main>
  );
}
