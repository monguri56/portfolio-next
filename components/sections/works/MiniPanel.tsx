"use client";

type MiniPanelProps = {
  label: string;
  items: string[];
};

export default function MiniPanel({ label, items }: MiniPanelProps) {
  return (
    <div className="border border-zinc-200 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 bg-zinc-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
