"use client";

import { useActionState } from "react";
import { bookAppointment, type BookState } from "./actions";

export default function BookSlot({
  doctorId,
  date,
  time,
  label,
}: {
  doctorId: string;
  date: string;
  time: string;
  label: string;
}) {
  const [state, formAction, pending] = useActionState<BookState, FormData>(
    bookAppointment,
    null
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="doctorId" value={doctorId} />
      <input type="hidden" name="date" value={date} />
      <input type="hidden" name="time" value={time} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full border border-[#0fa596] bg-white px-5 py-2.5 text-sm font-semibold text-[#0d8f82] shadow-sm transition hover:bg-gradient-to-r hover:from-[#0fa596] hover:to-[#0a6a9a] hover:text-white disabled:opacity-60"
      >
        {pending ? "..." : label}
      </button>
      {state?.error && (
        <p className="mt-1 max-w-44 text-xs text-red-700">{state.error}</p>
      )}
    </form>
  );
}
