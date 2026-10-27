import { Suspense } from "react";
import { redirect } from "next/navigation";
import { CalendarDays, Phone } from "lucide-react";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";
import { getLocale } from "../../lib/i18n";
import { TZ, formatTime, timeOf } from "../../lib/slots";
import { dayLabel } from "../../lib/dates";
import { pages5 } from "../../lib/messages/pages5";
import { specialtyNames } from "../../lib/messages/home";
import PageHeader from "../components/PageHeader";
import { completeAppointment, savePrescription } from "./actions";

function dateOf(d: Date) {
  return d.toLocaleDateString("en-CA", { timeZone: TZ });
}

function Initials({ name }: { name: string }) {
  const initials = name
    .replace("Dr. ", "")
    .split(" ")
    .map((w) => w.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#12b3a0] to-[#0a6a9a] text-lg font-extrabold text-white">
      {initials}
    </span>
  );
}

async function DoctorDashboard() {
  const locale = await getLocale();
  const tr = (k: keyof typeof pages5) => pages5[k][locale];

  const session = await getSession();
  if (!session) redirect("/login");

  const doctor =
    session.role === "DOCTOR"
      ? await prisma.doctor.findUnique({
          where: { userId: session.userId },
          select: {
            id: true,
            specialty: true,
            user: { select: { name: true } },
          },
        })
      : null;

  const appointments = doctor
    ? await prisma.appointment.findMany({
        where: { doctorId: doctor.id },
        select: {
          id: true,
          startsAt: true,
          status: true,
          patient: {
            select: { phone: true, user: { select: { name: true } } },
          },
          prescription: { select: { medicines: true, notes: true } },
        },
        orderBy: { startsAt: "asc" },
      })
    : [];

  const todo = appointments.filter(
    (a) => a.status === "PENDING" || a.status === "CONFIRMED"
  );
  const done = appointments.filter((a) => a.status === "COMPLETED").reverse();

  const spec = doctor
    ? (specialtyNames[doctor.specialty]?.[locale] ?? doctor.specialty)
    : "";

  return (
    <>
      <PageHeader
        title={tr("dash_title")}
        sub={doctor ? `${doctor.user.name} · ${spec}` : undefined}
      />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {session.role !== "DOCTOR" ? (
          <p className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            {tr("only_doctors")}
          </p>
        ) : !doctor ? (
          <p className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            {tr("no_doc_profile")}
          </p>
        ) : (
          <>
            <h2 className="text-2xl font-extrabold text-[#0a1f44]">
              {tr("up_appts")} ({todo.length})
            </h2>
            {todo.length === 0 ? (
              <p className="mt-4 rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
                {tr("no_up")}
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {todo.map((a) => (
                  <div
                    key={a.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100"
                  >
                    <div className="flex items-center gap-4">
                      <Initials name={a.patient.user.name} />
                      <div>
                        <p className="text-lg font-extrabold text-[#0a1f44]">
                          {a.patient.user.name}
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-sm font-medium text-[#0a1f44]">
                          <CalendarDays className="h-4 w-4 text-[#0d8f82]" />
                          {dayLabel(dateOf(a.startsAt), locale)},{" "}
                          {formatTime(timeOf(a.startsAt))}
                        </p>
                        {a.patient.phone && (
                          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                            <Phone className="h-4 w-4 text-[#0d8f82]" />
                            {a.patient.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <form action={completeAppointment}>
                      <input type="hidden" name="appointmentId" value={a.id} />
                      <button
                        type="submit"
                        className="rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-95"
                      >
                        {tr("mark_done")}
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            )}

            <h2 className="mt-12 text-2xl font-extrabold text-[#0a1f44]">
              {tr("completed")} ({done.length})
            </h2>
            {done.length === 0 ? (
              <p className="mt-4 rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
                {tr("no_done")}
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {done.map((a) => (
                  <div
                    key={a.id}
                    className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100"
                  >
                    <div className="flex items-center gap-4">
                      <Initials name={a.patient.user.name} />
                      <div>
                        <p className="text-lg font-extrabold text-[#0a1f44]">
                          {a.patient.user.name}
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                          <CalendarDays className="h-4 w-4 text-[#0d8f82]" />
                          {dayLabel(dateOf(a.startsAt), locale)},{" "}
                          {formatTime(timeOf(a.startsAt))}
                        </p>
                      </div>
                    </div>

                    {a.prescription ? (
                      <div className="mt-5 rounded-2xl bg-[#f3fbf9] p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#0d8f82]">
                          {tr("rx_label")}
                        </p>
                        <p className="mt-2 whitespace-pre-line text-base text-[#0a1f44]">
                          {a.prescription.medicines}
                        </p>
                        {a.prescription.notes && (
                          <p className="mt-3 whitespace-pre-line text-sm text-slate-600">
                            {tr("notes_lbl")}: {a.prescription.notes}
                          </p>
                        )}
                      </div>
                    ) : (
                      <form action={savePrescription} className="mt-5 space-y-3">
                        <input type="hidden" name="appointmentId" value={a.id} />
                        <textarea
                          name="medicines"
                          required
                          minLength={2}
                          maxLength={2000}
                          rows={3}
                          placeholder={tr("rx_meds_ph")}
                          className="w-full rounded-2xl border border-slate-200 bg-[#f3fbf9] px-4 py-3 text-sm text-[#0a1f44] outline-none focus:border-[#0fa596] focus:ring-4 focus:ring-[#0fa596]/15"
                        />
                        <input
                          name="notes"
                          maxLength={1000}
                          placeholder={tr("rx_notes_ph")}
                          className="w-full rounded-2xl border border-slate-200 bg-[#f3fbf9] px-4 py-3 text-sm text-[#0a1f44] outline-none focus:border-[#0fa596] focus:ring-4 focus:ring-[#0fa596]/15"
                        />
                        <button
                          type="submit"
                          className="rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-95"
                        >
                          {tr("save_rx")}
                        </button>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={<p className="px-6 py-10 text-slate-500">Loading...</p>}>
        <DoctorDashboard />
      </Suspense>
    </main>
  );
}
