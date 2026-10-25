"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active =
    !href.includes("#") &&
    (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={
        active
          ? "whitespace-nowrap text-[17px] font-semibold text-[#0d8f82]"
          : "whitespace-nowrap text-[17px] font-medium text-[#0a1f44] transition hover:text-[#0d8f82]"
      }
    >
      {children}
    </Link>
  );
}
