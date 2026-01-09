"use client";

import { ReactNode, Children } from "react";
import useFullPageScroll from "./useFullPageScroll";
import PaginationDots from "./PaginationDots";

type Props = {
  children: ReactNode;
  duration?: number;
};

export default function FullPage({ children, duration = 700 }: Props) {
  const sections = Children.toArray(children);
  const total = sections.length;

  const { index, goTo } = useFullPageScroll({ total, duration });

  return (
    <main className="fullpage">
      <PaginationDots total={total} activeIndex={index} onSelect={goTo} />

      <div
        className="fullpage-track"
        style={{ transform: `translateY(-${index * 100}vh)` }}
      >
        {sections.map((section, i) => (
          <section className="fullpage-section" key={i}>
            {section}
          </section>
        ))}
      </div>
    </main>
  );
}
