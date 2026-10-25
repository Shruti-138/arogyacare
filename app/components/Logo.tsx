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
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0fa596] to-[#0a4a8a] text-white shadow-md">
        <HeartPulse className="h-6 w-6" />
      </span>
      <span className="leading-tight">
        <span
          className={`block text-xl font-extrabold ${
            light ? "text-white" : "text-[#0a1f44]"
          }`}
        >
          ArogyaCare
        </span>
        <span
          className={`block text-[11px] font-semibold ${
            light ? "text-teal-100" : "text-[#0d8f82]"
          }`}
        >
          {tagline}
        </span>
      </span>
    </Link>
  );
}
