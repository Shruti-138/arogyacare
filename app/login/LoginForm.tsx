"use client";

import { useActionState } from "react";
import { loginUser, type LoginState } from "./actions";

export default function LoginForm({
  labels,
}: {
  labels: {
    email: string;
    password: string;
    submit: string;
    submitting: string;
    missing: string;
    invalid: string;
  };
}) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginUser,
    null
  );

  const input =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-[#f3fbf9] px-4 py-3.5 text-base text-[#0a1f44] outline-none transition focus:border-[#0fa596] focus:ring-4 focus:ring-[#0fa596]/15";

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="text-sm font-semibold text-[#0a1f44]">
          {labels.email}
        </label>
        <input id="email" name="email" type="email" required className={input} />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-semibold text-[#0a1f44]">
          {labels.password}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className={input}
        />
      </div>

      {state?.error && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error === "missing" ? labels.missing : labels.invalid}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-teal-600/25 hover:opacity-95 disabled:opacity-60"
      >
        {pending ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
