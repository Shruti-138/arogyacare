"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-6 py-3 text-sm font-semibold text-white shadow-md print:hidden"
    >
      Print / Save as PDF
    </button>
  );
}
