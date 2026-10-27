import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Stethoscope,
  Users,
} from "lucide-react";
import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/session";
import { getLocale } from "../../lib/i18n";
import { TZ, formatTime, timeOf } from "../../lib/slots";
import { dayLabel } from "../../lib/dates";
import { pages4 } from "../../lib/messages/pages4";
import { pages5 } from "../../lib/messages/pages5";
import { specialtyNames } from "../../lib/messages/home";
import PageHeader from "../components/PageHeader";

function dateOf(d: Date) {
  return d.toLocaleDateString("en-CA", { timeZone: TZ });
}

const STATUS = {
  PENDING: { key: "st_pending", style: "bg-yellow-100 text-yellow-800" },
  CONFIRMED: { key: "st_confirmed", style: "bg-blue-100 text-blue-800" },
  COMPLETED: { key: "st_completed", style: "bg-emerald-100 text-emerald-800" },
  CANCELLED: { key: "st_cancelled", style: "bg-slate-100 text-slate-600" },
} as const;

function StatCard({
  Icon,
  label,
  value,
}: {
  Icon: LucideIcon;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d5f1ec] text-[#0d8f82]">
        <Icon className="h-6 w-6" />
      </span>
      <p className="mt-4 text-3xl font-extrabold text-[#0a1f44]">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

async function AdminDashboard() {
  const locale = await getLocale();
  const tr = (k: keyof typeof pages5) => pages5[k][locale];

  const session = await getSession();
  if (!session) redirect("/login");

  const admin =
    session.role === "ADMIN"
      ? await prisma.user.findUnique({
          where: { id: session.userId },
          select: {
            hospitalId: true,
            hospital: { select: { name: true, city: true } },
          },
        })
      : null;

  if (session.role !== "ADMIN") {
    return (
      <>
        <PageHeader title={tr("admin_title")} />
        <p className="mx-auto mt-8 max-w-5xl rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
          {tr("only_admins")}
        </p>
      </>
    );
  }
  if (!admin?.hospitalId || !admin.hospital) {
    return (
      <>
        <PageHeader title={tr("admin_title")} />
        <p className="mx-auto mt-8 max-w-5xl rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
          {tr("no_hospital")}
        </p>
      </>
    );
  }

  const hospitalId = admin.hospitalId;
  const where = { doctor: { hospitalId } };
  const now = new Date();

  const [doctorCount, total, upcoming, completed, patientRows, doctors, recent] =
    await Promise.all([
      prisma.doctor.count({ where: { hospitalId } }),
      prisma.appointment.count({ where }),
      prisma.appointment.count({
        where: {
          ...where,
          startsAt: { gt: now },
          status: { in: ["PENDING", "CONFIRMED"] },
        },
      }),
      prisma.appointment.count({ where: { ...where, status: "COMPLETED" } }),
      prisma.appointment.findMany({
        where,
        distinct: ["patientId"],
        select: { patientId: true },
      }),
      prisma.doctor.findMany({
        where: { hospitalId },
        select: {
          id: true,
          specialty: true,
          user: { select: { name: true } },
          _count: { select: { appointments: true } },
        },
        orderBy: { user: { name: "asc" } },
      }),
      prisma.appointment.findMany({
        where,
        select: {
          id: true,
          startsAt: true,
          status: true,
          patient: { select: { user: { select: { name: true } } } },
          doctor: { select: { user: { select: { name: true } } } },
        },
        orderBy: { startsAt: "desc" },
        take: 20,
      }),
    ]);

  const th = "px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500";

  return (
    <>
      <PageHeader
        title={tr("admin_title")}
        sub={`${admin.hospital.name}, ${admin.hospital.city ?? ""}`}
      />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatCard Icon={Stethoscope} label={tr("stat_doctors")} value={doctorCount} />
          <StatCard Icon={Users} label={tr("stat_patients")} value={patientRows.length} />
          <StatCard Icon={CalendarDays} label={tr("stat_total")} value={total} />
          <StatCard Icon={Clock} label={tr("stat_upcoming")} value={upcoming} />
          <StatCard Icon={CheckCircle2} label={tr("stat_completed")} value={completed} />
        </div>

        <div className="mt-12 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold text-[#0a1f44]">
            {tr("doctors_h")}
          </h2>
          <Link
            href="/admin/doctors/new"
            className="rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-95"
          >
            {tr("add_doctor")}
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto rounded-3xl bg-white shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-[#f3fbf9]">
              <tr>
                <th className={th}>{tr("col_name")}</th>
                <th className={th}>{tr("col_specialty")}</th>
                <th className={th}>{tr("col_appts")}</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-5 py-4 font-semibold text-[#0a1f44]">
                    {d.user.name}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-[#d5f1ec] px-3 py-1 text-xs font-bold text-[#0d8f82]">
                      {specialtyNames[d.specialty]?.[locale] ?? d.specialty}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#0a1f44]">
                    {d._count.appointments}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-2xl font-extrabold text-[#0a1f44]">
          {tr("recent")}
        </h2>
        {recent.length === 0 ? (
          <p className="mt-4 rounded-2xl bg-white p-6 text-slate-500 shadow-sm ring-1 ring-slate-100">
            {tr("no_appts")}
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-3xl bg-white shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-[#f3fbf9]">
                <tr>
                  <th className={th}>{tr("col_when")}</th>
                  <th className={th}>{tr("col_patient")}</th>
                  <th className={th}>{tr("col_doctor")}</th>
                  <th className={th}>{tr("col_status")}</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((a) => {
                  const st = STATUS[a.status];
                  return (
                    <tr key={a.id} className="border-b border-slate-50 last:border-0">
                      <td className="px-5 py-4 text-[#0a1f44]">
                        {dayLabel(dateOf(a.startsAt), locale)},{" "}
                        {formatTime(timeOf(a.startsAt))}
                      </td>
                      <td className="px-5 py-4 text-[#0a1f44]">
                        {a.patient.user.name}
                      </td>
                      <td className="px-5 py-4 text-[#0a1f44]">
                        {a.doctor.user.name}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${st.style}`}
                        >
                          {pages4[st.key][locale]}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={<p className="px-6 py-10 text-slate-500">Loading...</p>}>
        <AdminDashboard />
      </Suspense>
    </main>
  );
}
