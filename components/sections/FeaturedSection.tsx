"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  id: string;
  title: string;
  image: string; // public 경로
  href: string; // 상세페이지 링크
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
        id: "jeonju",
        title: "Jeonju Tour Platform",
        image: "/featured/project-01.png",
        href: "/projects/jeonju",
        projectName: "전주 관광·투어 플랫폼 구축",
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
          "콘텐츠 종류·상태값 제어 시스템",
          "지도 + 주변 장소 자동 노출",
          "후기/별점 시스템 구현",
          "지역 기반 카테고리 연동",
          "커스텀 예약/상품 페이지 설계",
        ],
        techStack: "HTML, CSS, JavaScript, jQuery, PHP, MySQL, Kakao Map API",
      },
      {
        id: "project-b",
        title: "Project B",
        image: "/featured/project-01.png",
        href: "/projects/project-b",
        projectName: "프로젝트 B",
        background: "프로젝트 배경 설명을 여기에 작성",
        role: ["역할 1", "역할 2", "역할 3"],
        highlights: ["하이라이트 1", "하이라이트 2"],
        techStack: "Next.js, TypeScript, TailwindCSS",
      },
      {
        id: "project-c",
        title: "Project C",
        image: "/featured/project-01.png",
        href: "/projects/project-c",
        projectName: "프로젝트 C",
        background: "프로젝트 배경 설명을 여기에 작성",
        role: ["역할 1", "역할 2"],
        highlights: ["하이라이트 1", "하이라이트 2", "하이라이트 3"],
        techStack: "React, Next.js",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  // 왼쪽 슬라이드 뷰포트 / 오른쪽 스크롤 패널
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const infoScrollRef = useRef<HTMLDivElement | null>(null);

  // 슬라이드 폭 계산
  const [containerW, setContainerW] = useState(0);

  // 레이아웃 값 (스샷 느낌: 좌우가 살짝 보이는 센터모드)
  const isMobile = containerW < 768;
  const slideRatio = isMobile ? 0.92 : 0.78; // 데스크탑에서 좌우가 둘 다 보이게 더 넓게
  const gap = isMobile ? 18 : 42;

  const slideW = containerW * slideRatio;
  const step = slideW + gap;
  const translateX = containerW / 2 - (active * step + slideW / 2);

  const clamp = (n: number) => Math.max(0, Math.min(slides.length - 1, n));
  const prev = () => setActive((p) => clamp(p - 1));
  const next = () => setActive((p) => clamp(p + 1));
  const go = (n: number) => setActive(clamp(n));

  // viewport width 측정
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => setContainerW(el.clientWidth);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // wheel: 왼쪽 영역에서만 슬라이드 넘김 (오른쪽 패널 wheel은 허용)
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

  // 드래그/스와이프
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

  return (
    <div className="h-full w-full bg-white flex items-center justify-center">
      <div className="w-full max-w-[1440px] px-10">

        {/* 2분할 */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          {/* LEFT: 슬라이더 */}
          <div className="lg:col-span-8">
            <div
              ref={viewportRef}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              className="relative overflow-hidden select-none touch-pan-y"
            >
              {/* Prev/Next 버튼 (스샷처럼 이미지 양옆 중앙) */}
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="
                  absolute left-4 top-1/2 -translate-y-1/2 z-20
                  h-12 w-12 rounded-full
                  bg-white/70 backdrop-blur
                  border border-zinc-300
                  flex items-center justify-center
                  cursor-pointer
                  hover:bg-white transition
                "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-800"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="
                  absolute right-4 top-1/2 -translate-y-1/2 z-20
                  h-12 w-12 rounded-full
                  bg-white/70 backdrop-blur
                  border border-zinc-300
                  flex items-center justify-center
                  cursor-pointer
                  hover:bg-white transition
                "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-800"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>

              {/* 트랙 */}
              <div
                className="flex items-center"
                style={{
                  gap: `${gap}px`,
                  transform: `translate3d(${translateX}px, 0, 0)`,
                  transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
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
                      className="shrink-0 text-left"
                      style={{ width: `${slideW}px` }}
                      aria-label={`Go to ${s.title}`}
                    >
                      <div
                        className="relative w-full h-[340px] sm:h-[460px]"
                        style={{
                          transform: `scale(${isActive ? 1 : 0.92})`,
                          opacity: isActive ? 1 : 0.7,
                          transition:
                            "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease",
                        }}
                      >
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          className="object-contain"
                          priority={i === 0}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 도트 (가운데 아래) */}
            <div className="mt-10 flex items-center justify-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-2.5 w-2.5 rounded-full border ${
                    i === active
                      ? "bg-zinc-700 border-zinc-700"
                      : "bg-transparent border-zinc-400"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: 인포 패널 */}
          <aside className="lg:col-span-4">
            <div className="max-w-[420px] ml-auto">
              {/* 세로 라인(스샷 느낌) */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 h-full w-px bg-zinc-300" />

                <div
                  ref={infoScrollRef}
                  className="h-[420px] overflow-y-auto pr-4 featured-scroll"
                  onWheelCapture={(e) => {
                    // FullPage(섹션 이동)로 wheel 전달 막기
                    e.stopPropagation();
                  }}
                >
                  <InfoBlock label="Project Name">
                    {activeSlide.projectName}
                  </InfoBlock>

                  <div className="mt-6" />
                  <InfoBlock label="Background">
                    {activeSlide.background}
                  </InfoBlock>

                  <div className="mt-6" />
                  <InfoList label="Role" items={activeSlide.role} />

                  <div className="mt-6" />
                  <InfoList label="Highlights" items={activeSlide.highlights} />

                  <div className="mt-6" />
                  <InfoBlock label="Tech Stack">{activeSlide.techStack}</InfoBlock>
                </div>

                {/* 더보기 (하단, 스샷처럼 오른쪽 박스 아래) */}
                <div className="mt-6">
                  <Link
                    href={activeSlide.href}
                    className="h-12 w-full bg-zinc-200 flex items-center justify-center text-sm text-zinc-800 hover:bg-zinc-300 transition-colors"
                  >
                    더보기
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[14px] font-semibold tracking-widest text-blue-700">
        {label}
      </h3>
      <p className="mt-2 text-[12px] leading-6 text-zinc-700">{children}</p>
    </div>
  );
}

function InfoList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-[14px] font-semibold tracking-widest text-blue-700">
        {label}
      </h3>
      <ul className="mt-2 space-y-1 text-[12px] leading-6 text-zinc-700">
        {items.map((t, idx) => (
          <li key={idx}>· {t}</li>
        ))}
      </ul>
    </div>
  );
}
