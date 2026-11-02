import { Suspense } from "react";
import { redirect } from "next/navigation";
import { FlaskConical } from "lucide-react";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";
import { getLocale } from "../../lib/i18n";
import { TZ } from "../../lib/slots";
import { parseResults } from "../../lib/lab";
import { pages8 } from "../../lib/messages/pages8";
import { specialtyNames } from "../../lib/messages/home";
import PageHeader from "../components/PageHeader";

const FLAG = {
  normal: { key: "lab_normal", style: "bg-emerald-100 text-emerald-800" },
  high: { key: "lab_high", style: "bg-red-100 text-red-700" },
  low: { key: "lab_low", style: "bg-amber-100 text-amber-800" },
} as const;

async function Content() {
  const locale = await getLocale();
  const tr = (k: keyof typeof pages8) => pages8[k][locale];

  const session = await getSession();
  if (!session) redirect("/login");

  const patient =
    session.role === "PATIENT"
      ? await prisma.patient.findUnique({
          where: { userId: session.userId },
          select: { id: true },
        })
      : null;

  const reports = patient
    ? await prisma.labReport.findMany({
        where: { patientId: patient.id },
        select: {
          id: true,
          testName: true,
          results: true,
          notes: true,
          createdAt: true,
          doctor: {
            select: { specialty: true, user: { select: { name: true } } },
          },
        },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const th = "px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-500";

  return (
    <>
      <PageHeader title={tr("lab_title")} sub={tr("lab_sub")} />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {session.role !== "PATIENT" ? (
          <p className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            {tr("lab_only_patients")}
          </p>
        ) : reports.length === 0 ? (
          <p className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            {tr("lab_none")}
          </p>
        ) : (
          <div className="space-y-6">
            {reports.map((r) => {
              const rows = parseResults(r.results);
              return (
                <div
                  key={r.id}
                  className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d5f1ec] text-[#0d8f82]">
                        <FlaskConical className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-lg font-extrabold text-[#0a1f44]">
                          {r.testName}
                        </p>
                        <p className="text-sm text-slate-500">
                          {r.doctor.user.name} ·{" "}
                          {specialtyNames[r.doctor.specialty]?.[locale] ??
                            r.doctor.specialty}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-500">
                      {r.createdAt.toLocaleDateString(`${locale}-IN`, {
                        timeZone: TZ,
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="mt-5 overflow-x-auto rounded-2xl ring-1 ring-slate-100">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#f3fbf9]">
                        <tr>
                          <th className={th}>{tr("lab_col_test")}</th>
                          <th className={th}>{tr("lab_col_result")}</th>
                          <th className={th}>{tr("lab_col_unit")}</th>
                          <th className={th}>{tr("lab_col_range")}</th>
                          <th className={th}>{tr("lab_col_status")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, i) => (
                          <tr key={i} className="border-t border-slate-100">
                            <td className="px-4 py-3 font-semibold text-[#0a1f44]">
                              {row.name}
                            </td>
                            <td className="px-4 py-3 text-[#0a1f44]">
                              {row.value}
                            </td>
                            <td className="px-4 py-3 text-slate-500">
                              {row.unit}
                            </td>
                            <td className="px-4 py-3 text-slate-500">
                              {row.range}
                            </td>
                            <td className="px-4 py-3">
                              {row.flag === "none" ? (
                                <span className="text-slate-400">—</span>
                              ) : (
                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-bold ${FLAG[row.flag].style}`}
                                >
                                  {tr(FLAG[row.flag].key)}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {r.notes && (
                    <p className="mt-4 rounded-2xl bg-[#f3fbf9] p-4 text-sm text-slate-600">
                      <span className="font-bold text-[#0d8f82]">
                        {tr("lab_notes")}:
                      </span>{" "}
                      {r.notes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default function LabReportsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={<p className="px-6 py-10 text-slate-500">Loading...</p>}>
        <Content />
      </Suspense>
    </main>
  );
}
