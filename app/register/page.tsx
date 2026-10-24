import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-teal-700">ArogyaCare</h1>
        <p className="mt-1 text-gray-600">Create your patient account.</p>
        <RegisterForm />
      </div>
    </main>
  );
}