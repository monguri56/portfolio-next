"use client";

type Props = {
  total: number;
  activeIndex: number;
  onSelect: (index: number) => void;
};

const labels = ["Intro", "About", "Main Projects", "Works"];

export default function PaginationDots({ total, activeIndex, onSelect }: Props) {
  return (
    <nav
      className="fixed right-5 top-1/2 z-[100] hidden -translate-y-1/2 lg:block"
      aria-label="Section navigation"
    >
      <ol className="flex flex-col items-end gap-3">
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === activeIndex;
          const label = labels[index] ?? `Section ${index + 1}`;

          return (
            <li key={index}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-label={`Go to ${label}`}
                aria-current={isActive ? "step" : undefined}
                className="group flex h-8 items-center gap-3"
              >
                <span
                  className={[
                    "text-[11px] uppercase tracking-[0.16em] transition",
                    isActive
                      ? "text-zinc-950 opacity-100"
                      : "text-zinc-400 opacity-0 group-hover:opacity-100",
                  ].join(" ")}
                >
                  {label}
                </span>
                <span
                  className={[
                    "block h-px transition-all",
                    isActive
                      ? "w-10 bg-zinc-950"
                      : "w-5 bg-zinc-300 group-hover:w-8 group-hover:bg-zinc-600",
                  ].join(" ")}
                />
                <span
                  className={[
                    "text-[11px] tabular-nums transition",
                    isActive ? "text-zinc-950" : "text-zinc-400 group-hover:text-zinc-700",
                  ].join(" ")}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
