"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  id: string;
  title: string;
  image: string;
  href: string;
  projectName: string;
  background: string;
  role: string[];
  highlights: string[];
  techStack: string;
};

export default function FeaturedSection() {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "project-a",
        title: "project A",
        image: "/featured/project-01.png",
        href: "/projects/project-a",
        projectName: "전주 관광·투어 플랫폼",
        background:
          "여행업 디지털 전환 사업을 통해 매칭데이터에서 업체와 컨택하여 진행한 프로젝트",
        role: [
          "서브페이지 UI 디자인",
          "반응형 퍼블리싱",
          "메인 콘텐츠 관리 기능 개발",
          "전용 게시판 커스텀 (리스트/상세/후기/별점)",
          "예약 상품 관리 기능 확장",
          "카카오맵 API 기반 위치/주변 정보 자동화",
        ],
        highlights: [
          "관리자 전용 수정 기능 개발",
          "콘텐츠 상태값 제어 시스템",
          "지도 기반 정보 자동 노출",
          "후기/별점 시스템 구현",
        ],
        techStack:
          "HTML, CSS, JavaScript, jQuery, PHP, MySQL, Kakao Map API",
      },
      {
        id: "project-b",
        title: "Project B",
        image: "/featured/project-02.png",
        href: "http://finesse.co.kr/home/",
        projectName: "오토바이 아카데미 홈페이지",
        background: "지인 소개로 진행한 외주 프로젝트",
        role: [
          "전체 페이지 UI/UX 구현",
          "관리자 페이지 UI 구성",
          "예약 시스템 연동",
          "클라이언트 요구사항 반영",
        ],
        highlights: ["예약 흐름 기반 UX 설계", "실제 운영 사이트 구축"],
        techStack: "HTML, CSS, JavaScript, jQuery, PHP, MySQL",
      },
      {
        id: "project-c",
        title: "Project C",
        image: "/featured/project-03.png",
        href: "#",
        projectName: "리조트 홈페이지 리뉴얼",
        background:
          "기존 HTML 사이트를 Next.js 기반으로 리뉴얼 중인 프로젝트",
        role: ["전체 UI/UX 설계", "Next.js 구조 설계", "컴포넌트화", "반응형 구현"],
        highlights: ["Next.js 기반 전환", "컴포넌트 구조 설계"],
        techStack: "React, Next.js, TypeScript, Tailwind CSS",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const infoScrollRef = useRef<HTMLDivElement | null>(null);

  const [containerW, setContainerW] = useState(0);

  const isMobile = containerW < 768;
  const slideRatio = isMobile ? 0.92 : 0.78;
  const gap = isMobile ? 18 : 42;

  const slideW = containerW * slideRatio;
  const step = slideW + gap;
  const translateX = containerW / 2 - (active * step + slideW / 2);

  const clamp = (n: number) => Math.max(0, Math.min(slides.length - 1, n));
  const prev = () => setActive((p) => clamp(p - 1));
  const next = () => setActive((p) => clamp(p + 1));
  const go = (n: number) => setActive(clamp(n));

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => setContainerW(el.clientWidth);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const infoEl = infoScrollRef.current;
      if (infoEl && infoEl.contains(e.target as Node)) return;

      if (Math.abs(e.deltaY) < 8) return;
      e.preventDefault();

      if (e.deltaY > 0) next();
      else prev();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, containerW]);

  const startX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const diff = e.clientX - startX.current;
    startX.current = null;

    if (Math.abs(diff) < 40) return;
    if (diff < 0) next();
    else prev();
  };

  const activeSlide = slides[active];

  const RIGHT_SCROLL_H = 720;
  const RIGHT_BUTTON_H = 48;
  const RIGHT_BUTTON_GAP = 16;

  const LEFT_CARD_H = RIGHT_SCROLL_H + RIGHT_BUTTON_H + RIGHT_BUTTON_GAP; // 784
  const DOT_AREA_H = 72;
  const SLIDE_AREA_H = LEFT_CARD_H - DOT_AREA_H;

  const IMAGE_H = isMobile ? 360 : 420;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* LEFT */}
          <div
            className="lg:col-span-8 rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden"
            style={{ height: LEFT_CARD_H }}
          >
            <div className="flex h-full flex-col">
              <div
                ref={viewportRef}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                className="relative overflow-hidden select-none"
                style={{ height: SLIDE_AREA_H }}
              >
                <ArrowButton left onClick={prev} />
                <ArrowButton onClick={next} />

                <div
                  className="flex items-center"
                  style={{
                    height: "100%",
                    gap: `${gap}px`,
                    transform: `translate3d(${translateX}px,0,0)`,
                    transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
                    willChange: "transform",
                  }}
                >
                  {slides.map((s, i) => {
                    const isActive = i === active;

                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => go(i)}
                        style={{ width: slideW, height: SLIDE_AREA_H }}
                        className="shrink-0"
                        aria-label={`Go to ${s.title}`}
                      >
                        <div
                          className="h-full w-full flex items-center justify-center"
                          style={{
                            transform: `scale(${isActive ? 1 : 0.92})`,
                            opacity: isActive ? 1 : 0.55,
                            transition:
                              "transform 700ms cubic-bezier(0.16,1,0.3,1), opacity 400ms ease",
                          }}
                        >
                          <div className="relative w-full" style={{ height: IMAGE_H }}>
                            <Image
                              src={s.image}
                              alt={s.title}
                              fill
                              className="object-contain"
                              priority={i === 0}
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* dots */}
              <div className="flex items-center justify-center" style={{ height: DOT_AREA_H }}>
                <div className="flex items-center gap-3">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      className={`h-2 w-2 rounded-full transition ${
                        i === active ? "bg-zinc-900" : "bg-zinc-300"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <div
                ref={infoScrollRef}
                className="px-8 py-8 space-y-8 h-[720px] overflow-y-auto featured-scroll"
                onWheelCapture={(e) => e.stopPropagation()}
              >
                <InfoBlock label="Project Name" value={activeSlide.projectName} />
                <InfoBlock label="Background" value={activeSlide.background} />
                <InfoList label="Role" items={activeSlide.role} />
                <InfoList label="Highlights" items={activeSlide.highlights} />
                <TechStack value={activeSlide.techStack} />
              </div>
            </div>

            <Link
              href={activeSlide.href}
              className="
                mt-4 flex h-12 items-center justify-center
                rounded-xl bg-zinc-900 text-white
                hover:bg-zinc-800 transition
              "
            >
              View Project
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

function ArrowButton({ left, onClick }: { left?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`
        absolute top-1/2 -translate-y-1/2 z-10
        h-12 w-12 rounded-full
        border border-zinc-200 bg-white shadow-sm
        flex items-center justify-center
        hover:scale-105 transition
        ${left ? "left-4" : "right-4"}
      `}
      aria-label={left ? "Previous slide" : "Next slide"}
      type="button"
    >
      {left ? "‹" : "›"}
    </button>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-zinc-400">{label}</div>
      <div className="mt-2 text-sm text-zinc-800 leading-6">{value}</div>
    </div>
  );
}

function InfoList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-zinc-400">{label}</div>
      <ul className="mt-3 space-y-2 text-sm text-zinc-800">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 w-1 h-1 bg-zinc-400 rounded-full" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TechStack({ value }: { value: string }) {
  const chips = value.split(",");
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-zinc-400">Tech Stack</div>
      <div className="flex flex-wrap gap-2 mt-3">
        {chips.map((chip, i) => (
          <span
            key={i}
            className="text-xs border border-zinc-200 bg-zinc-50 px-3 py-1 rounded-full"
          >
            {chip.trim()}
          </span>
        ))}
      </div> 
    </div>
  );
}