export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b">
        <h1 className="text-2xl font-bold text-blue-900">ArogyaCare</h1>
        <div className="space-x-4">
          <a href="/login" className="text-blue-700 hover:underline">Login</a>
          <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Get Started</a>
        </div>
      </nav>
      <section className="text-center py-24 px-6">
        <h2 className="text-5xl font-bold text-blue-900 mb-4">Care That Connects</h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">A smart hospital appointment and patient management platform connecting patients, doctors, and hospitals — all in one place.</p>
        <a href="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">Book an Appointment</a>
      </section>
      <section className="grid md:grid-cols-3 gap-8 px-8 py-16 max-w-5xl mx-auto">
        <div className="p-6 border rounded-xl shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-blue-800">For Patients</h3>
          <p className="text-gray-600">Book appointments, track history, and manage your care easily.</p>
        </div>
        <div className="p-6 border rounded-xl shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-blue-800">For Doctors</h3>
          <p className="text-gray-600">Manage your schedule and patient appointments efficiently.</p>
        </div>
        <div className="p-6 border rounded-xl shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-blue-800">For Hospitals</h3>
          <p className="text-gray-600">Streamline patient flow and staff coordination across departments.</p>
        </div>
      </section>
    </main>
  );
}