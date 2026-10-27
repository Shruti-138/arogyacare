import { Suspense } from "react";
import { redirect } from "next/navigation";
import { FileText } from "lucide-react";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";
import { getLocale } from "../../lib/i18n";
import { TZ } from "../../lib/slots";
import { pages4 } from "../../lib/messages/pages4";
import { specialtyNames } from "../../lib/messages/home";
import PageHeader from "../components/PageHeader";

async function Content() {
  const locale = await getLocale();
  const tr = (k: keyof typeof pages4) => pages4[k][locale];

  const session = await getSession();
  if (!session) redirect("/login");

  const patient =
    session.role === "PATIENT"
      ? await prisma.patient.findUnique({
          where: { userId: session.userId },
          select: { id: true },
        })
      : null;

  const prescriptions = patient
    ? await prisma.prescription.findMany({
        where: { patientId: patient.id },
        select: {
          id: true,
          medicines: true,
          notes: true,
          createdAt: true,
          doctor: {
            select: { specialty: true, user: { select: { name: true } } },
          },
        },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <>
      <PageHeader title={tr("rx_title")} sub={tr("rx_sub")} />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {session.role !== "PATIENT" ? (
          <p className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            {tr("only_patients")}
          </p>
        ) : prescriptions.length === 0 ? (
          <p className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            {tr("rx_none")}
          </p>
        ) : (
          <div className="space-y-5">
            {prescriptions.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d5f1ec] text-[#0d8f82]">
                      <FileText className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-lg font-extrabold text-[#0a1f44]">
                        {p.doctor.user.name}
                      </p>
                      <span className="inline-block rounded-full bg-[#d5f1ec] px-3 py-0.5 text-xs font-bold text-[#0d8f82]">
                        {specialtyNames[p.doctor.specialty]?.[locale] ??
                          p.doctor.specialty}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    {p.createdAt.toLocaleDateString(`${locale}-IN`, {
                      timeZone: TZ,
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="mt-5 rounded-2xl bg-[#f3fbf9] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#0d8f82]">
                    {tr("medicines")}
                  </p>
                  <p className="mt-2 whitespace-pre-line text-base text-[#0a1f44]">
                    {p.medicines}
                  </p>
                  {p.notes && (
                    <>
                      <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-[#0d8f82]">
                        {tr("notes")}
                      </p>
                      <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
                        {p.notes}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default function PrescriptionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={<p className="px-6 py-10 text-slate-500">Loading...</p>}>
        <Content />
      </Suspense>
    </main>
  );
}
