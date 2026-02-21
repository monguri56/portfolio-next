"use client";

import { ReactNode, Children, useEffect, useMemo, useState } from "react";
import useFullPageScroll from "./useFullPageScroll";
import PaginationDots from "./PaginationDots";

type Props = {
  children: ReactNode;
  duration?: number;
  disableBelowPx?: number; // default 1024 (lg)
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);

    onChange(); // init
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [query]);

  return matches;
}

export default function FullPage({
  children,
  duration = 700,
  disableBelowPx = 1024,
}: Props) {
  const sections = useMemo(() => Children.toArray(children), [children]);

  const isDesktop = useMediaQuery(`(min-width: ${disableBelowPx}px)`);

  const total = sections.length;
  const { index, goTo } = useFullPageScroll({
    total,
    duration,
    enabled: isDesktop, 
  });

  if (!isDesktop) {
    return (
      <main className="w-full">
        {sections.map((section, i) => (
          <section key={i} className="w-full">
            {section}
          </section>
        ))}
      </main>
    );
  }

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