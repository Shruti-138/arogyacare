"use client";

import { useActionState } from "react";
import { addLabReport, type LabState } from "./actions";

export default function LabForm({
  appointmentId,
  labels,
  errors,
}: {
  appointmentId: string;
  labels: Record<string, string>;
  errors: Record<string, string>;
}) {
  const [state, formAction, pending] = useActionState<LabState, FormData>(
    addLabReport,
    null
  );

  const input =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0a1f44] outline-none transition focus:border-[#0fa596] focus:ring-4 focus:ring-[#0fa596]/15";
  const label = "text-sm font-semibold text-[#0a1f44]";

  return (
    <form action={formAction} className="mt-4 space-y-4">
      <input type="hidden" name="appointmentId" value={appointmentId} />

      <div>
        <label className={label}>{labels.testName}</label>
        <input
          name="testName"
          required
          minLength={2}
          maxLength={120}
          placeholder={labels.testPh}
          className={input}
        />
      </div>

      <div>
        <label className={label}>{labels.results}</label>
        <p className="mt-1 text-xs text-slate-500">{labels.hint}</p>
        <textarea
          name="results"
          required
          rows={5}
          maxLength={4000}
          placeholder={labels.resultsPh}
          className={`${input} font-mono`}
        />
      </div>

      <div>
        <input
          name="notes"
          maxLength={1000}
          placeholder={labels.notesPh}
          className={input}
        />
      </div>

      {state?.error && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errors[state.error]}
        </p>
      )}
      {state?.ok && (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {labels.saved}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-6 py-3 text-sm font-semibold text-white shadow-md hover:opacity-95 disabled:opacity-60"
      >
        {pending ? labels.saving : labels.save}
      </button>
    </form>
  );
}
