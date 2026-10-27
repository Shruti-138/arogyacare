import { Suspense } from "react";
import Link from "next/link";
import { getLocale } from "../../lib/i18n";
import { pages3 } from "../../lib/messages/pages3";
import AuthShell from "../components/AuthShell";
import LoginForm from "./LoginForm";

async function LoginContent() {
  const locale = await getLocale();
  const tr = (k: keyof typeof pages3) => pages3[k][locale];

  return (
    <AuthShell title={tr("login_title")} sub={tr("login_sub")}>
      <LoginForm
        labels={{
          email: tr("email"),
          password: tr("password"),
          submit: tr("signin_btn"),
          submitting: tr("signing_in"),
          missing: tr("err_missing"),
          invalid: tr("err_invalid"),
        }}
      />
      <p className="mt-8 text-sm text-slate-500">
        {tr("new_here")}{" "}
        <Link
          href="/register"
          className="font-semibold text-[#0d8f82] underline hover:text-[#0a3a7a]"
        >
          {tr("create_link")}
        </Link>
      </p>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#eaf7f5]" />}>
      <LoginContent />
    </Suspense>
  );
}
