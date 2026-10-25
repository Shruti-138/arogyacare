import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../../../lib/session";
import DoctorForm from "./DoctorForm";

async function AddDoctorContent() {
  const session = await getSession();
  if (!session) redirect("/login");

  if (session.role !== "ADMIN") {
    return (
      <p className="mt-4 text-gray-600">
        Only hospital admin accounts can add doctors.
      </p>
    );
  }

  return <DoctorForm />;
}

export default function NewDoctorPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-2xl">
        <Link href="/admin" className="text-sm text-teal-700 underline">
          ← Admin dashboard
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-teal-700">Add a doctor</h1>
        <Suspense fallback={<p className="mt-6 text-gray-500">Loading...</p>}>
          <AddDoctorContent />
        </Suspense>
      </div>
    </main>
  );
}
