"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  total: number;
  duration?: number;   // 애니메이션 ms
  threshold?: number;  // 휠 민감도 컷
};

export default function useFullPageScroll({
  total,
  duration = 700,
  threshold = 20,
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
    const onWheel = (e: WheelEvent) => {
      // 이동 중이면 무시
      if (lockRef.current) return;

      // 트랙패드 미세 스크롤 컷
      if (Math.abs(e.deltaY) < threshold) return;

      // 아래/위 판단
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
  }, [total, duration, threshold]);

  return { index, setIndex: goTo, goTo };
}
