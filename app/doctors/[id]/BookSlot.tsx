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
        className="rounded-lg border border-teal-700 px-3 py-2 text-sm text-teal-700 hover:bg-teal-700 hover:text-white disabled:opacity-60"
      >
        {pending ? "Booking..." : label}
      </button>
      {state?.error && (
        <p className="mt-1 max-w-48 text-xs text-red-700">{state.error}</p>
      )}
    </form>
  );
}