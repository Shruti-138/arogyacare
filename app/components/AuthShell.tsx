import { Check } from "lucide-react";
import { getT } from "../../lib/i18n";
import Logo from "./Logo";

export default async function AuthShell({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  const { t } = await getT();
  const points = ["trust_1_title", "trust_3_title", "f3_title"] as const;

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#d9f3ee] via-[#eaf8f6] to-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-300/50 ring-1 ring-slate-100 lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-gradient-to-br from-[#021a43] via-[#04306a] to-[#0d8f82] p-10 text-white lg:flex">
          <Logo light tagline={t("tagline")} />
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">
              {t("hero_a")} {t("hero_b")}
            </h2>
            <ul className="mt-8 space-y-4">
              {points.map((k) => (
                <li key={k} className="flex items-center gap-3 text-lg">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#14c8a8] text-[#021a43]">
                    <Check className="h-4 w-4" />
                  </span>
                  {t(k)}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-blue-100/70">{t("foot_rights")}</p>
        </div>

        <div className="p-8 sm:p-12">
          <h1 className="text-3xl font-extrabold text-[#0a1f44] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-slate-500">{sub}</p>
          {children}
        </div>
      </div>
    </main>
  );
}
