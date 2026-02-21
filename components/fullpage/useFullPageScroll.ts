"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  total: number;
  duration?: number;
  threshold?: number;
  enabled?: boolean; 
};

export default function useFullPageScroll({
  total,
  duration = 700,
  threshold = 20,
  enabled = true, 
}: Options) {
  const [index, setIndex] = useState(0);
  const lockRef = useRef(false);

  const goTo = (nextIndex: number) => {
    if (lockRef.current) return;
    lockRef.current = true;

    setIndex(() => {
      if (nextIndex < 0) return 0;
      if (nextIndex > total - 1) return total - 1;
      return nextIndex;
    });

    window.setTimeout(() => {
      lockRef.current = false;
    }, duration);
  };

  useEffect(() => {
    if (!enabled) return; 

    const onWheel = (e: WheelEvent) => {
      if (lockRef.current) return;

      if (Math.abs(e.deltaY) < threshold) return;

      const isDown = e.deltaY > 0;

      lockRef.current = true;

      setIndex((prev) => {
        const next = isDown ? prev + 1 : prev - 1;
        if (next < 0) return 0;
        if (next > total - 1) return total - 1;
        return next;
      });

      window.setTimeout(() => {
        lockRef.current = false;
      }, duration);
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => window.removeEventListener("wheel", onWheel);

  }, [total, duration, threshold, enabled]);

  return { index, setIndex: goTo, goTo };
}