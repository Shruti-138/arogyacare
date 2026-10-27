import { Suspense } from "react";
import Link from "next/link";
import { getLocale } from "../../lib/i18n";
import { pages3 } from "../../lib/messages/pages3";
import AuthShell from "../components/AuthShell";
import RegisterForm from "./RegisterForm";

async function RegisterContent() {
  const locale = await getLocale();
  const tr = (k: keyof typeof pages3) => pages3[k][locale];

  return (
    <AuthShell title={tr("reg_title")} sub={tr("reg_sub")}>
      <RegisterForm
        labels={{
          name: tr("full_name"),
          email: tr("email"),
          phone: tr("phone_opt"),
          password: tr("pw_hint"),
          submit: tr("create_btn"),
          submitting: tr("creating"),
          errName: tr("err_name"),
          errEmail: tr("err_email"),
          errPassword: tr("err_pw"),
          errExists: tr("err_exists"),
        }}
      />
      <p className="mt-8 text-sm text-slate-500">
        {tr("have_account")}{" "}
        <Link
          href="/login"
          className="font-semibold text-[#0d8f82] underline hover:text-[#0a3a7a]"
        >
          {tr("signin_link")}
        </Link>
      </p>
    </AuthShell>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#eaf7f5]" />}>
      <RegisterContent />
    </Suspense>
  );
}
