import Link from "next/link";
import { redirect } from "next/navigation";
import { FileText } from "lucide-react";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";

export default async function ReceiptsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const where =
    session.role === "ADMIN"
      ? {}
      : session.role === "DOCTOR"
        ? { doctor: { user: { id: session.userId } } }
        : { patient: { user: { id: session.userId } } };

  const appts = await prisma.appointment.findMany({
    where,
    include: {
      patient: { include: { user: true } },
      doctor: { include: { user: true, hospital: true } },
    },
    orderBy: { startsAt: "desc" },
    take: 50,
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold text-[#0a1f44]">
          My receipts
        </h1>
        <p className="mt-1 text-slate-500">
          Open any appointment receipt and save it as a PDF.
        </p>

        {appts.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            No appointments yet.
          </p>
        ) : (
          <ul className="mt-6 space-y-3">
            {appts.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
              >
                <div>
                  <p className="font-bold text-[#0a1f44]">
                    {a.doctor.user.name} - {a.doctor.hospital.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {session.role !== "PATIENT"
                      ? `Patient: ${a.patient.user.name} | `
                      : ""}
                    {new Date(a.startsAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Kolkata",
                    })}
                  </p>
                </div>
                <Link
                  href={`/receipt/${a.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                >
                  <FileText className="h-4 w-4" />
                  Download receipt
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
