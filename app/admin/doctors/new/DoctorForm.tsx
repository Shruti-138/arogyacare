"use client";

import { useActionState } from "react";
import { addDoctor, type AddDoctorState } from "./actions";

type Opt = { value: string; label: string };

export default function DoctorForm({
  labels,
  days,
  specialties,
  slotOptions,
  errors,
}: {
  labels: Record<string, string>;
  days: { value: number; label: string }[];
  specialties: Opt[];
  slotOptions: Opt[];
  errors: Record<string, string>;
}) {
  const [state, formAction, pending] = useActionState<AddDoctorState, FormData>(
    addDoctor,
    null
  );

  const input =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-[#f3fbf9] px-4 py-3.5 text-base text-[#0a1f44] outline-none transition focus:border-[#0fa596] focus:ring-4 focus:ring-[#0fa596]/15";
  const label = "text-sm font-semibold text-[#0a1f44]";

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="name" className={label}>
          {labels.name}
        </label>
        <input id="name" name="name" required className={input} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={label}>
            {labels.email}
          </label>
          <input id="email" name="email" type="email" required className={input} />
        </div>
        <div>
          <label htmlFor="password" className={label}>
            {labels.password}
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="specialty" className={label}>
            {labels.specialty}
          </label>
          <select
            id="specialty"
            name="specialty"
            required
            defaultValue=""
            className={input}
          >
            <option value="" disabled>
              {labels.choose}
            </option>
            {specialties.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="experienceYears" className={label}>
            {labels.years}
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
        <label htmlFor="bio" className={label}>
          {labels.bio}
        </label>
        <textarea id="bio" name="bio" rows={2} maxLength={500} className={input} />
      </div>

      <fieldset>
        <legend className={label}>{labels.days}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {days.map((d) => (
            <label key={d.value} className="cursor-pointer">
              <input
                type="checkbox"
                name="days"
                value={d.value}
                defaultChecked={d.value >= 1 && d.value <= 5}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0a1f44] ring-1 ring-slate-200 peer-checked:bg-gradient-to-r peer-checked:from-[#0fa596] peer-checked:to-[#0a6a9a] peer-checked:text-white peer-checked:ring-0">
                {d.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="startTime" className={label}>
            {labels.start}
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
          <label htmlFor="endTime" className={label}>
            {labels.end}
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
          <label htmlFor="slotMinutes" className={label}>
            {labels.slot}
          </label>
          <select
            id="slotMinutes"
            name="slotMinutes"
            defaultValue="30"
            className={input}
          >
            {slotOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {state?.error && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errors[state.error]}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-teal-600/25 hover:opacity-95 disabled:opacity-60"
      >
        {pending ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
