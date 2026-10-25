import {
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  FileText,
  Stethoscope,
} from "lucide-react";
import { getT } from "../../lib/i18n";

export default async function PhoneMock() {
  const { t } = await getT();

  const tiles = [
    { Icon: Stethoscope, label: t("mock_t1") },
    { Icon: CalendarDays, label: t("mock_t2") },
    { Icon: FileText, label: t("mock_t3") },
    { Icon: ClipboardList, label: t("mock_t4") },
  ];

  return (
    <div className="relative mx-auto w-[300px] rounded-[44px] bg-[#0a2a5c] p-3 shadow-2xl shadow-[#0a2a5c]/30 sm:w-[340px]">
      <div className="absolute left-1/2 top-5 z-10 h-2 w-24 -translate-x-1/2 rounded-full bg-[#0a2a5c]" />
      <div className="overflow-hidden rounded-[34px] bg-white">
        <div className="bg-gradient-to-b from-[#0fa596] to-[#0a4a8a] px-5 pb-5 pt-10 text-white">
          <p className="text-xs opacity-90">{t("mock_welcome")}</p>
          <p className="text-xl font-bold">{t("mock_headline")}</p>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            {t("mock_status")}
          </div>
        </div>

        <div className="min-h-[360px] bg-white p-4">
          <div className="grid grid-cols-2 gap-3">
            {tiles.map(({ Icon, label }) => (
              <div
                key={label}
                className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e3f6f2] text-[#0d8f82]">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-2 text-xs font-semibold text-[#0a1f44]">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm font-bold text-[#0a1f44]">
            {t("mock_upcoming")}
          </p>

          <div className="mt-2 flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a3a7a] text-white">
              <CalendarCheck className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-bold text-[#0a1f44]">
                {t("mock_i1_title")}
              </span>
              <span className="block truncate text-[11px] text-slate-500">
                {t("mock_i1_sub")}
              </span>
            </span>
            <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white">
              {t("mock_i1_btn")}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0d8f82] text-white">
              <FileText className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-bold text-[#0a1f44]">
                {t("mock_i2_title")}
              </span>
              <span className="block truncate text-[11px] text-slate-500">
                {t("mock_i2_sub")}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
