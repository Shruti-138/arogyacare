import Link from "next/link";
import { HeartPulse } from "lucide-react";

export default function Logo({
  light = false,
  tagline = "Care That Connects",
}: {
  light?: boolean;
  tagline?: string;
}) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-500 text-white shadow-sm">
        <HeartPulse className="h-6 w-6" />
      </span>
      <span className="leading-tight">
        <span
          className={`block text-lg font-bold ${
            light ? "text-white" : "text-teal-800"
          }`}
        >
          ArogyaCare
        </span>
        <span
          className={`block text-[11px] font-medium ${
            light ? "text-teal-100" : "text-emerald-600"
          }`}
        >
          {tagline}
        </span>
      </span>
    </Link>
  );
}
