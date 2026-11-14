import { Suspense } from "react";
import Link from "next/link";
import { HeartPulse, Search } from "lucide-react";
import { getLocale } from "../lib/i18n";
import { notfound } from "../lib/messages/notfound";

async function Content() {
  const locale = await getLocale();
  const tr = (k: keyof typeof notfound) => notfound[k][locale];

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-[#d9f3ee] via-[#eaf8f6] to-white px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#12b3a0] to-[#0a6a9a] text-white shadow-lg">
          <HeartPulse className="h-10 w-10" />
        </span>
        <p className="mt-6 bg-gradient-to-r from-[#12b3a0] to-[#0a6a9a] bg-clip-text text-8xl font-extrabold text-transparent">
          404
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#0a1f44] sm:text-4xl">
          {tr("nf_title")}
        </h1>
        <p className="mt-3 text-lg text-slate-500">{tr("nf_text")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-8 py-3 font-semibold text-white shadow-lg shadow-teal-600/25 hover:opacity-95"
          >
            {tr("nf_home")}
          </Link>
          <Link
            href="/doctors"
            className="flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-[#0a3a7a] shadow-md ring-1 ring-slate-100 hover:bg-slate-50"
          >
            <Search className="h-4 w-4" />
            {tr("nf_find")}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] bg-[#eaf7f5]" />}>
      <Content />
    </Suspense>
  );
}
