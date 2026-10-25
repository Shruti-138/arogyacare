import Link from "next/link";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Pill,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";
import { getT } from "../../lib/i18n";
import { signOut } from "../actions";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

const linkClass =
  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-teal-50 hover:text-teal-700";

export default async function Header() {
  const { locale, t } = await getT();
  const session = await getSession();

  const user = session
    ? await prisma.user.findUnique({
        where: { id: session.userId },
        select: { name: true, role: true },
      })
    : null;

  const initial = user ? user.name.replace("Dr. ", "").charAt(0).toUpperCase() : "";

  return (
    <header className="sticky top-0 z-40 border-b border-teal-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
        <Logo tagline={t("tagline")} />

        <nav className="flex flex-wrap items-center gap-1">
          <Link href="/doctors" className={linkClass}>
            <Stethoscope className="h-4 w-4" />
            {t("nav_doctors")}
          </Link>
          {user?.role === "PATIENT" && (
            <>
              <Link href="/appointments" className={linkClass}>
                <CalendarDays className="h-4 w-4" />
                {t("nav_appointments")}
              </Link>
              <Link href="/prescriptions" className={linkClass}>
                <Pill className="h-4 w-4" />
                {t("nav_prescriptions")}
              </Link>
            </>
          )}
          {user?.role === "DOCTOR" && (
            <Link href="/dashboard" className={linkClass}>
              <LayoutDashboard className="h-4 w-4" />
              {t("nav_dashboard")}
            </Link>
          )}
          {user?.role === "ADMIN" && (
            <Link href="/admin" className={linkClass}>
              <ShieldCheck className="h-4 w-4" />
              {t("nav_admin")}
            </Link>
          )}
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <LanguageSwitcher locale={locale} />
          {user ? (
            <>
              <span className="hidden items-center gap-2 lg:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">
                  {initial}
                </span>
                <span className="text-sm font-medium text-slate-700">
                  {user.name}
                </span>
              </span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  <LogOut className="h-4 w-4" />
                  {t("sign_out")}
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-teal-700 hover:bg-teal-50"
              >
                {t("sign_in")}
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-teal-700 hover:to-emerald-600"
              >
                {t("register")}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
