import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";
import { TZ } from "../../lib/slots";

async function MyPrescriptions() {
  const session = await getSession();
  if (!session) redirect("/login");

  if (session.role !== "PATIENT") {
    return (
      <p className="mt-4 text-gray-600">
        Only patient accounts have a Prescriptions page.
      </p>
    );
  }

  const patient = await prisma.patient.findUnique({
    where: { userId: session.userId },
    select: { id: true },
  });
  if (!patient) {
    return <p className="mt-4 text-gray-600">Patient profile not found.</p>;
  }

  const prescriptions = await prisma.prescription.findMany({
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
  });

  if (prescriptions.length === 0) {
    return (
      <p className="mt-4 text-gray-600">
        You have no prescriptions yet. They appear here after a doctor completes
        your visit.
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {prescriptions.map((p) => (
        <div
          key={p.id}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <p className="font-semibold">{p.doctor.user.name}</p>
          <p className="text-sm text-teal-700">{p.doctor.specialty}</p>
          <p className="text-sm text-gray-600">
            {p.createdAt.toLocaleDateString("en-IN", {
              timeZone: TZ,
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="mt-3 whitespace-pre-line text-gray-900">{p.medicines}</p>
          {p.notes && (
            <p className="mt-2 whitespace-pre-line text-sm text-gray-600">
              Notes: {p.notes}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function PrescriptionsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-teal-700">My Prescriptions</h1>
        <Suspense fallback={<p className="mt-6 text-gray-500">Loading...</p>}>
          <MyPrescriptions />
        </Suspense>
      </div>
    </main>
  );
}