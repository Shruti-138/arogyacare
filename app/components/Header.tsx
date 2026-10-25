import Link from "next/link";
import { CalendarCheck, LogOut } from "lucide-react";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";
import { getT } from "../../lib/i18n";
import { signOut } from "../actions";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import NavLink from "./NavLink";

export default async function Header() {
  const { locale, t } = await getT();
  const session = await getSession();

  const user = session
    ? await prisma.user.findUnique({
        where: { id: session.userId },
        select: { name: true, role: true },
      })
    : null;

  const links = [{ href: "/doctors", label: t("nav_doctors") }];
  if (!user) {
    links.push(
      { href: "/#how-it-works", label: t("hiw_badge") },
      { href: "/#features", label: t("feat_badge") },
      { href: "/#faq", label: t("faq_badge") },
      { href: "/#contact", label: t("contact_badge") }
    );
  }
  if (user?.role === "PATIENT") {
    links.push(
      { href: "/appointments", label: t("nav_appointments") },
      { href: "/prescriptions", label: t("nav_prescriptions") }
    );
  }
  if (user?.role === "DOCTOR") {
    links.push({ href: "/dashboard", label: t("nav_dashboard") });
  }
  if (user?.role === "ADMIN") {
    links.push({ href: "/admin", label: t("nav_admin") });
  }

  const showBook = !user || user.role === "PATIENT";
  const initial = user
    ? user.name.replace("Dr. ", "").charAt(0).toUpperCase()
    : "";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo tagline={t("tagline")} />

        <nav className="hidden items-center gap-8 xl:flex">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          {user ? (
            <>
              <span className="hidden items-center gap-2 2xl:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e3f6f2] text-sm font-bold text-[#0d8f82]">
                  {initial}
                </span>
                <span className="text-sm font-medium text-[#0a1f44]">
                  {user.name}
                </span>
              </span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#0a1f44] hover:text-[#0d8f82]"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("sign_out")}</span>
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="hidden text-sm font-semibold text-[#0a1f44] hover:text-[#0d8f82] sm:inline"
            >
              {t("sign_in")}
            </Link>
          )}
          {showBook && (
            <Link
              href="/doctors"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a5aa0] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 hover:opacity-95"
            >
              <CalendarCheck className="h-4 w-4" />
              <span className="hidden sm:inline">{t("book_appointment")}</span>
            </Link>
          )}
        </div>
      </div>

      <nav className="flex items-center gap-6 overflow-x-auto border-t border-slate-100 px-4 py-2.5 sm:px-6 xl:hidden">
        {links.map((l) => (
          <NavLink key={l.href} href={l.href}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
