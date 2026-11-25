import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, Send } from "lucide-react";
import { prisma } from "../../lib/prisma";
import { getLocale } from "../../lib/i18n";
import { pages11 } from "../../lib/messages/pages11";
import PageHeader from "../components/PageHeader";
import { sendEnquiry } from "./actions";

type SearchParams = Promise<{ sent?: string; error?: string; doctor?: string }>;

async function Content({ searchParams }: { searchParams: SearchParams }) {
  const locale = await getLocale();
  const tr = (k: keyof typeof pages11) => pages11[k][locale];
  const { sent, error, doctor } = await searchParams;

  const doctors = await prisma.doctor.findMany({
    select: {
      id: true,
      specialty: true,
      user: { select: { name: true } },
      hospital: { select: { name: true } },
    },
    orderBy: { user: { name: "asc" } },
  });

  const field =
    "w-full rounded-2xl bg-[#eaf7f5] px-4 py-3 text-base text-[#0a1f44] outline-none placeholder:text-slate-400";
  const label = "mb-1.5 block text-sm font-semibold text-[#0a1f44]";

  return (
    <>
      <PageHeader title={tr("enq_title")} sub={tr("enq_sub")} />
      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {sent ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
            <CheckCircle2 className="mx-auto h-14 w-14 text-[#0d8f82]" />
            <h2 className="mt-4 text-2xl font-extrabold text-[#0a1f44]">
              {tr("enq_sent_title")}
            </h2>
            <p className="mt-2 text-slate-500">{tr("enq_sent_text")}</p>
            <Link
              href="/enquiry"
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-6 py-3 text-sm font-semibold text-white shadow-md"
            >
              {tr("enq_another")}
            </Link>
          </div>
        ) : (
          <form
            action={sendEnquiry}
            className="space-y-5 rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 sm:p-8"
          >
            {error && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {tr("enq_error")}
              </p>
            )}
            <div>
              <label className={label} htmlFor="doctorId">
                {tr("enq_doctor")}
              </label>
              <select
                id="doctorId"
                name="doctorId"
                defaultValue={doctor ?? ""}
                className={field}
              >
                <option value="">{tr("enq_general")}</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.user.name} - {d.specialty} ({d.hospital.name})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="name">
                  {tr("enq_name")}
                </label>
                <input id="name" name="name" required maxLength={100} className={field} />
              </div>
              <div>
                <label className={label} htmlFor="email">
                  {tr("enq_email")}
                </label>
                <input id="email" name="email" type="email" required maxLength={150} className={field} />
              </div>
            </div>
            <div>
              <label className={label} htmlFor="phone">
                {tr("enq_phone")}
              </label>
              <input id="phone" name="phone" type="tel" maxLength={30} className={field} />
            </div>
            <div>
              <label className={label} htmlFor="message">
                {tr("enq_message")}
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={5}
                maxLength={2000}
                rows={5}
                className={field}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-7 py-3 font-semibold text-white shadow-md hover:opacity-95"
            >
              <Send className="h-4 w-4" />
              {tr("enq_send")}
            </button>
          </form>
        )}
      </section>
    </>
  );
}

export default function EnquiryPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={<p className="px-6 py-10 text-slate-500">Loading...</p>}>
        <Content searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
