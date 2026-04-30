"use client";

type FilterButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export default function FilterButton({ label, active, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-10 border px-4 text-sm transition",
        active
          ? "border-zinc-950 bg-zinc-950 text-white"
          : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-950 hover:text-zinc-950",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
