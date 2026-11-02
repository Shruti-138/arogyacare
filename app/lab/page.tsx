import { Suspense } from "react";
import { redirect } from "next/navigation";
import { FlaskConical } from "lucide-react";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";
import { getLocale } from "../../lib/i18n";
import { TZ, formatTime, timeOf } from "../../lib/slots";
import { dayLabel } from "../../lib/dates";
import { pages8 } from "../../lib/messages/pages8";
import PageHeader from "../components/PageHeader";
import LabForm from "./LabForm";

function dateOf(d: Date) {
  return d.toLocaleDateString("en-CA", { timeZone: TZ });
}

async function Content() {
  const locale = await getLocale();
  const tr = (k: keyof typeof pages8) => pages8[k][locale];

  const session = await getSession();
  if (!session) redirect("/login");

  const doctor =
    session.role === "DOCTOR"
      ? await prisma.doctor.findUnique({
          where: { userId: session.userId },
          select: { id: true },
        })
      : null;

  const visits = doctor
    ? await prisma.appointment.findMany({
        where: { doctorId: doctor.id, status: "COMPLETED" },
        select: {
          id: true,
          startsAt: true,
          patient: { select: { user: { select: { name: true } } } },
          labReports: {
            select: { id: true, testName: true },
            orderBy: { createdAt: "desc" },
          },
        },
        orderBy: { startsAt: "desc" },
        take: 30,
      })
    : [];

  const labels = {
    testName: tr("lab_test_name"),
    testPh: tr("lab_test_ph"),
    results: tr("lab_results"),
    hint: tr("lab_results_hint"),
    resultsPh: tr("lab_results_ph"),
    notesPh: tr("lab_notes_ph"),
    save: tr("lab_save"),
    saving: tr("lab_saving"),
    saved: tr("lab_saved"),
  };
  const errors: Record<string, string> = {
    forbidden: tr("lab_e_forbidden"),
    test: tr("lab_e_test"),
    results: tr("lab_e_results"),
    notes: tr("lab_e_notes"),
    failed: tr("lab_e_failed"),
  };

  return (
    <>
      <PageHeader title={tr("lab_title")} sub={tr("lab_doc_sub")} />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {session.role !== "DOCTOR" ? (
          <p className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            {tr("lab_only_doctors")}
          </p>
        ) : visits.length === 0 ? (
          <p className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            {tr("lab_doc_none")}
          </p>
        ) : (
          <div className="space-y-5">
            {visits.map((v) => (
              <div
                key={v.id}
                className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d5f1ec] text-[#0d8f82]">
                      <FlaskConical className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-lg font-extrabold text-[#0a1f44]">
                        {v.patient.user.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {dayLabel(dateOf(v.startsAt), locale)},{" "}
                        {formatTime(timeOf(v.startsAt))}
                      </p>
                    </div>
                  </div>
                  {v.labReports.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                        {tr("lab_added")}
                      </span>
                      {v.labReports.map((r) => (
                        <span
                          key={r.id}
                          className="rounded-full bg-[#d5f1ec] px-3 py-1 text-xs font-bold text-[#0d8f82]"
                        >
                          {r.testName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <details className="mt-5 rounded-2xl bg-[#f3fbf9] p-5">
                  <summary className="cursor-pointer list-none text-sm font-bold text-[#0d8f82] [&::-webkit-details-marker]:hidden">
                    + {tr("lab_add")}
                  </summary>
                  <LabForm appointmentId={v.id} labels={labels} errors={errors} />
                </details>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default function LabPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={<p className="px-6 py-10 text-slate-500">Loading...</p>}>
        <Content />
      </Suspense>
    </main>
  );
}
