import { Video } from "lucide-react";
import type { Locale } from "../../lib/i18n";
import { canJoinNow, meetingUrl } from "../../lib/meeting";
import { pages7 } from "../../lib/messages/pages7";

export default function JoinCall({
  id,
  mode,
  startsAt,
  locale,
}: {
  id: string;
  mode: "IN_PERSON" | "ONLINE";
  startsAt: Date;
  locale: Locale;
}) {
  if (mode !== "ONLINE") return null;

  const now = Date.now();
  const open = canJoinNow(startsAt, now);
  const future = startsAt.getTime() > now;

  return (
    <>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
        <Video className="h-3.5 w-3.5" />
        {pages7.online_badge[locale]}
      </span>
      {open ? (
        <a
          href={meetingUrl(id)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0fa596] to-[#0a6a9a] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-95"
        >
          <Video className="h-4 w-4" />
          {pages7.join_call[locale]}
        </a>
      ) : future ? (
        <span className="max-w-[12rem] text-xs text-slate-500">
          {pages7.join_later[locale]}
        </span>
      ) : null}
    </>
  );
}
