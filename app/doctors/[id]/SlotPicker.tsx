"use client";

import { useState } from "react";
import { Building2, Video } from "lucide-react";
import BookSlot from "./BookSlot";

type Slot = { time: string; label: string };

export default function SlotPicker({
  doctorId,
  date,
  slots,
  canBook,
  labels,
}: {
  doctorId: string;
  date: string;
  slots: Slot[];
  canBook: boolean;
  labels: { inPerson: string; video: string; hint: string };
}) {
  const [mode, setMode] = useState<"IN_PERSON" | "ONLINE">("IN_PERSON");

  const pill = (active: boolean) =>
    active
      ? "flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
      : "flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#0a1f44] shadow-sm ring-1 ring-slate-200 hover:ring-[#0fa596]";

  return (
    <div className="mt-4">
      {canBook && (
        <>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setMode("IN_PERSON")}
              className={pill(mode === "IN_PERSON")}
            >
              <Building2 className="h-4 w-4" />
              {labels.inPerson}
            </button>
            <button
              type="button"
              onClick={() => setMode("ONLINE")}
              className={pill(mode === "ONLINE")}
            >
              <Video className="h-4 w-4" />
              {labels.video}
            </button>
          </div>
          {mode === "ONLINE" && (
            <p className="mt-2 text-sm text-slate-500">{labels.hint}</p>
          )}
        </>
      )}

      <div className="mt-5 flex flex-wrap items-start gap-3">
        {slots.map((s) =>
          canBook ? (
            <BookSlot
              key={s.time}
              doctorId={doctorId}
              date={date}
              time={s.time}
              label={s.label}
              mode={mode}
            />
          ) : (
            <span
              key={s.time}
              className="rounded-full bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-500"
            >
              {s.label}
            </span>
          )
        )}
      </div>
    </div>
  );
}
