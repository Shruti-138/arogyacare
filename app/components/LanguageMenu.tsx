"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { setLanguage } from "../actions";

type Option = { code: string; label: string };

export default function LanguageMenu({
  locale,
  options,
}: {
  locale: string;
  options: Option[];
}) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = options.find((o) => o.code === locale) ?? options[0];

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function closeSoon() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(false), 500);
  }

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full bg-[#e3f6f2] px-4 py-2 text-sm font-semibold text-[#0a1f44]"
      >
        <Globe className="h-4 w-4 text-[#0d8f82]" aria-hidden="true" />
        {current.label}
        <ChevronDown
          className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <form
        action={setLanguage}
        className={`absolute right-0 z-50 mt-2 w-44 rounded-xl bg-white p-1 shadow-xl ring-1 ring-slate-100 ${
          open ? "block" : "hidden"
        }`}
      >
        {options.map((o) => (
          <button
            key={o.code}
            type="submit"
            name="lang"
            value={o.code}
            onClick={closeSoon}
            className={
              o.code === locale
                ? "flex w-full items-center justify-between rounded-lg bg-[#e3f6f2] px-3 py-2 text-left text-sm font-semibold text-[#0d8f82]"
                : "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-[#0a1f44] hover:bg-slate-50"
            }
          >
            <span>{o.label}</span>
            {o.code === locale && <Check className="h-4 w-4" />}
          </button>
        ))}
      </form>
    </div>
  );
}
