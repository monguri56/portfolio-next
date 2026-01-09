"use client";

type Props = {
  total: number;
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function PaginationDots({ total, activeIndex, onSelect }: Props) {
  return (
    <nav className="pagination" aria-label="Section navigation">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          className={i === activeIndex ? "active" : ""}
          onClick={() => onSelect(i)}
          aria-label={`Go to section ${i + 1}`}
        />
      ))}
    </nav>
  );
}
