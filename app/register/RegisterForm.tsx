"use client";

import { useActionState } from "react";
import { registerPatient, type RegisterState } from "./actions";

export default function RegisterForm({
  labels,
}: {
  labels: {
    name: string;
    email: string;
    phone: string;
    password: string;
    submit: string;
    submitting: string;
    errName: string;
    errEmail: string;
    errPassword: string;
    errExists: string;
  };
}) {
  const [state, formAction, pending] = useActionState<RegisterState, FormData>(
    registerPatient,
    null
  );

  const input =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-[#f3fbf9] px-4 py-3.5 text-base text-[#0a1f44] outline-none transition focus:border-[#0fa596] focus:ring-4 focus:ring-[#0fa596]/15";
  const label = "text-sm font-semibold text-[#0a1f44]";

  const message =
    state?.error === "name"
      ? labels.errName
      : state?.error === "email"
        ? labels.errEmail
        : state?.error === "password"
          ? labels.errPassword
          : state?.error === "exists"
            ? labels.errExists
            : null;

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label htmlFor="name" className={label}>
          {labels.name}
        </label>
        <input id="name" name="name" type="text" required className={input} />
      </div>

      <div>
        <label htmlFor="email" className={label}>
          {labels.email}
        </label>
        <input id="email" name="email" type="email" required className={input} />
      </div>

      <div>
        <label htmlFor="phone" className={label}>
          {labels.phone}
        </label>
        <input id="phone" name="phone" type="tel" className={input} />
      </div>

      <div>
        <label htmlFor="password" className={label}>
          {labels.password}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          className={input}
        />
      </div>

      {message && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {message}
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
