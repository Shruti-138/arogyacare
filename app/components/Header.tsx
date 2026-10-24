import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";
import { signOut } from "../actions";

export default async function Header() {
  const session = await getSession();

  const user = session
    ? await prisma.user.findUnique({
        where: { id: session.userId },
        select: { name: true, role: true },
      })
    : null;

  return (
    <header className="border-b border-gray-200 bg-white text-gray-900">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <Link href="/doctors" className="text-lg font-bold text-teal-700">
          ArogyaCare
        </Link>

        {user ? (
          <div className="flex items-center gap-4 text-sm">
            {user.role === "PATIENT" && (
              <Link href="/appointments" className="text-teal-700 hover:underline">
                My appointments
              </Link>
            )}
            {user.role === "DOCTOR" && (<Link href="/dashboard" className="text-teal-700 hover:underline">Dashboard</Link>)}{user.role === "PATIENT" && (<Link href="/prescriptions" className="text-teal-700 hover:underline">Prescriptions</Link>)}{user.role === "ADMIN" && (<Link href="/admin" className="text-teal-700 hover:underline">Admin</Link>)}<span className="text-gray-700">Hello, {user.name}</span>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-lg border border-gray-300 px-3 py-1 hover:bg-gray-100"
              >
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-sm">
            <Link href="/login" className="text-teal-700 hover:underline">
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-teal-700 px-3 py-1 text-white hover:bg-teal-800"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}


