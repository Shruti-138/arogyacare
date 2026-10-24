import Link from "next/link";

const roles = [
  {
    title: "For Patients",
    points: [
      "Find doctors by specialty",
      "Check availability and book instantly",
      "View your prescriptions",
    ],
  },
  {
    title: "For Doctors",
    points: [
      "Manage your schedule",
      "View upcoming appointments",
      "Add prescriptions for patients",
    ],
  },
  {
    title: "For Hospitals",
    points: [
      "Manage doctors and schedules",
      "Monitor daily operations",
      "View analytics and reports",
    ],
  },
];

export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-900">
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          Care That Connects
        </p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
          Healthcare made easier for patients and smarter for providers
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          ArogyaCare is a smart hospital appointment and patient management
          platform. Book appointments online, skip the queues, and keep your
          health records in one place.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/doctors"
            className="rounded-lg bg-teal-700 px-6 py-3 font-medium text-white hover:bg-teal-800"
          >
            Find a Doctor
          </Link>
          <Link
            href="/register"
            className="rounded-lg border border-teal-700 px-6 py-3 font-medium text-teal-700 hover:bg-teal-50"
          >
            Create an Account
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {roles.map((role) => (
            <div
              key={role.title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-teal-700">
                {role.title}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {role.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}