import type { ReactNode } from "react";

type DownloadLinkProps = {
  href: string;
  children: ReactNode;
};

export default function DownloadLink({ href, children }: DownloadLinkProps) {
  return (
    <a
      href={href}
      download
      className="h-12 sm:h-14 w-full flex items-center justify-center bg-zinc-300 text-zinc-800 text-sm hover:bg-zinc-400 transition"
    >
      {children}
    </a>
  );
}
