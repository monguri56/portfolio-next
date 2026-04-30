"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type WorkLinkButtonProps = {
  href: string;
  children: ReactNode;
};

export default function WorkLinkButton({ href, children }: WorkLinkButtonProps) {
  const isInternal = href.startsWith("/");
  const className =
    "inline-flex h-10 w-full items-center justify-center border border-zinc-300 px-3 text-sm text-zinc-800 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white";

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
