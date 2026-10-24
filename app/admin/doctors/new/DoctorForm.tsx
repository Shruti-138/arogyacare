"use client";

import { useActionState } from "react";
import { addDoctor, type AddDoctorState } from "./actions";

const DAYS = [
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
  { value: 0, label: "Sun" },
];

export default function DoctorForm() {
  const [state, formAction, pending] = useActionState<AddDoctorState, FormData>(
    addDoctor,
    null
  );

  const input =
    "mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2";

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Full name
        </label>
        <input id="name" name="name" required className={input} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input id="email" name="email" type="email" required className={input} />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium">
            Temporary password (8+ characters)
          </label>
          <input
            id="password"
            name="password"
            type="text"
            required
            minLength={8}
            className={input}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="specialty" className="text-sm font-medium">
            Specialty
          </label>
          <input
            id="specialty"
            name="specialty"
            required
            placeholder="e.g. Pediatrics"
            className={input}
          />
        </div>
        <div>
          <label htmlFor="experienceYears" className="text-sm font-medium">
            Years of experience
          </label>
          <input
            id="experienceYears"
            name="experienceYears"
            type="number"
            min={0}
            max={60}
            defaultValue={0}
            required
            className={input}
          />
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="text-sm font-medium">
          Short bio (optional)
        </label>
        <textarea id="bio" name="bio" rows={2} maxLength={500} className={input} />
      </div>

      <fieldset>
        <legend className="text-sm font-medium">Working days</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {DAYS.map((d) => (
            <label key={d.value} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                name="days"
                value={d.value}
                defaultChecked={d.value >= 1 && d.value <= 5}
              />
              {d.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="startTime" className="text-sm font-medium">
            Start time
          </label>
          <input
            id="startTime"
            name="startTime"
            type="time"
            defaultValue="10:00"
            required
            className={input}
          />
        </div>
        <div>
          <label htmlFor="endTime" className="text-sm font-medium">
            End time
          </label>
          <input
            id="endTime"
            name="endTime"
            type="time"
            defaultValue="17:00"
            required
            className={input}
          />
        </div>
        <div>
          <label htmlFor="slotMinutes" className="text-sm font-medium">
            Slot length
          </label>
          <select
            id="slotMinutes"
            name="slotMinutes"
            defaultValue="30"
            className={input}
          >
            <option value="15">15 minutes</option>
            <option value="20">20 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        </div>
      </div>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-teal-700 px-5 py-2 font-medium text-white hover:bg-teal-800 disabled:opacity-60"
      >
        {pending ? "Adding doctor..." : "Add doctor"}
              </button>
    </form>
  );
}