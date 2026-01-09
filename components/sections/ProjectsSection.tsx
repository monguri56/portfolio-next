"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Category = "all" | "design" | "development";

type Bullet = {
  text: string;
  href?: string;      // 내부/외부 링크 모두 가능
  external?: boolean; // 외부 링크면 true
};

type Project = {
  id: string;
  title: string;
  category: ("design" | "development")[];
  thumb: string; // public 경로
  bullets: Bullet[];
  websiteUrl?: string; // Website Link (외부)
};

export default function ClientWorkSection() {
  const [active, setActive] = useState<Category>("all");

  const tabs: { key: Category; label: string }[] = [
    { key: "all", label: "All" },
    { key: "design", label: "Design" },
    { key: "development", label: "Development" },
  ];

  // ✅ 캡쳐 12개 전부 데이터로 등록
  // (필터는 category로, 밑줄 링크는 bullet.href로 제어)
  const projects: Project[] = useMemo(
    () => [
      
      {
        id: "client-01",
        title: "여행/투어 예약 사이트 (그누보드 기반 반응형)",
        category: ["design", "development"],
        thumb: "/projects/sample-01.png",
        bullets: [
          { text: "서브 페이지 디자인" },
          { text: "반응형 퍼블리싱" },
          { text: "투어 게시판 커스텀", href: "/projects/sample-01/tour-board" },
        ],
        websiteUrl: "https://example.com",
      },
      {
        id: "client-02",
        title: "기업 홈페이지 (그누보드 기반 반응형)",
        category: ["development"],
        thumb: "/projects/sample-02.png",
        bullets: [
          { text: "반응형 퍼블리싱" },
          {
            text: "연혁/제품/카탈로그/문의하기 게시판 커스텀",
            href: "/projects/sample-02/boards",
          },
        ],
        websiteUrl: "https://example.com",
      },
      {
        id: "client-03",
        title: "블로그형 콘텐츠 사이트 (그누보드 기반 반응형)",
        category: ["design"],
        thumb: "/projects/sample-03.png",
        bullets: [
          { text: "메인페이지 게시판 형태", href: "/projects/sample-03/main-board" },
        ],
        websiteUrl: "https://example.com",
      },
      {
        id: "client-04",
        title: "기업 홈페이지 (그누보드 기반 반응형)",
        category: ["design", "development"],
        thumb: "/projects/sample-04.png",
        bullets: [
          { text: "메인/제품 페이지 디자인" },
          { text: "반응형 퍼블리싱" },
          { text: "제품 게시판 커스텀", href: "/projects/sample-04/product-board" },
        ],
        websiteUrl: "https://example.com",
      },
      {
        id: "client-05",
        title: "기업 홈페이지 (그누보드 기반 반응형)",
        category: ["development"],
        thumb: "/projects/sample-05.png",
        bullets: [
          { text: "반응형 퍼블리싱" },
          { text: "제품/자료실 게시판 커스텀", href: "/projects/sample-05/library-board" },
        ],
        websiteUrl: "https://example.com",
      },
      {
        id: "client-06",
        title: "기업 홈페이지 (그누보드 기반 반응형)",
        category: ["design", "development"],
        thumb: "/projects/sample-06.png",
        bullets: [
          { text: "서브 페이지 디자인" },
          { text: "반응형 퍼블리싱" },
          { text: "제품 게시판 커스텀", href: "/projects/sample-06/product-board" },
        ],
        websiteUrl: "https://example.com",
      },
      {
        id: "client-07",
        title: "기업 홈페이지 (그누보드 기반 반응형)",
        category: ["development"],
        thumb: "/projects/sample-07.png",
        bullets: [
          { text: "반응형 퍼블리싱" },
          { text: "제품 게시판 커스텀", href: "/projects/sample-07/product-board" },
        ],
        websiteUrl: "https://example.com",
      },
      {
        id: "client-08",
        title: "기업 홈페이지 (그누보드 기반 반응형)",
        category: ["development"],
        thumb: "/projects/sample-08.png",
        bullets: [
          { text: "제품/문의하기 게시판 커스텀", href: "/projects/sample-08/inquiry-board" },
        ],
        websiteUrl: "https://example.com",
      },

      {
        id: "client-09",
        title: "체험 예약 홈페이지 (그누보드 기반 반응형)",
        category: ["development"],
        thumb: "/projects/sample-09.png",
        bullets: [{ text: "체험 예약 관리 커스텀", href: "/projects/sample-09/reservation" }],
        websiteUrl: "https://example.com",
      },
      {
        id: "client-10",
        title: "기업 홈페이지 (그누보드 기반 반응형)",
        category: ["design", "development"],
        thumb: "/projects/sample-10.png",
        bullets: [
          { text: "메인 배너/서브 페이지 디자인" },
          { text: "반응형 퍼블리싱" },
        ],
        websiteUrl: "https://example.com",
      },
      {
        id: "client-11",
        title: "기업 홈페이지 (그누보드 기반 반응형)",
        category: ["development"],
        thumb: "/projects/sample-11.png",
        bullets: [{ text: "메인 페이지 반응형 퍼블리싱" }],
        websiteUrl: "https://example.com",
      },
      {
        id: "client-12",
        title: "기업 홈페이지 (그누보드 기반 반응형)",
        category: ["development"],
        thumb: "/projects/sample-12.png",
        bullets: [{ text: "반응형 퍼블리싱" }],
        websiteUrl: "https://example.com",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((p) => p.category.includes(active));
  }, [active, projects]);

  // ✅ 리스트 영역 휠은 내부 스크롤만 (풀페이지 이벤트로 전파 X)
  const onWheelCapture = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="h-full w-full bg-white flex items-center justify-center">
      <div className="w-full max-w-[1440px] px-10">
        {/* 필터 */}
        <div className="flex items-center gap-10 text-sm">
          {tabs.map((t) => {
            const isOn = t.key === active;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className="flex items-center gap-2"
              >
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full border ${
                    isOn
                      ? "bg-zinc-800 border-zinc-800"
                      : "bg-transparent border-zinc-300"
                  }`}
                />
                <span className={isOn ? "text-zinc-900 font-semibold" : "text-zinc-600"}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* 내부 스크롤 리스트 */}
        <div className="mt-12">
          <div
            onWheelCapture={onWheelCapture}
            className="relative h-[560px] 2xl:h-[600px] overflow-y-auto pr-8 client-scroll"
          >
            {/* ✅ 2분할: 모바일 1열, md 이상 2열 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {filtered.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 스크롤바 얇게 */}
      <style jsx global>{`
        .client-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .client-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .client-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.35);
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="bg-zinc-50 px-10 py-10">
      <div className="grid grid-cols-12 gap-8 items-center">
        {/* 썸네일 */}
        <div className="col-span-6">
          <div className="relative w-full h-[150px]">
            <Image src={p.thumb} alt={p.title} fill className="object-contain" />
          </div>
        </div>

        {/* 텍스트 */}
        <div className="col-span-6">
          <h3 className="text-[15px] font-semibold text-zinc-900">{p.title}</h3>

          <ul className="mt-4 space-y-2 text-sm text-zinc-800">
            {p.bullets.map((b, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="mt-[7px] h-1 w-1 rounded-full bg-zinc-500" />

                {/* ✅ href 있으면 링크(밑줄), 없으면 텍스트 */}
                {b.href ? (
                  b.external ? (
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-zinc-900"
                    >
                      {b.text}
                    </a>
                  ) : (
                    <Link
                      href={b.href}
                      className="underline underline-offset-4 hover:text-zinc-900"
                    >
                      {b.text}
                    </Link>
                  )
                ) : (
                  <span>{b.text}</span>
                )}
              </li>
            ))}
          </ul>

          {/* Website Link */}
          {p.websiteUrl ? (
            <div className="mt-6 flex justify-end">
              <a
                href={p.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-800 underline underline-offset-4"
              >
                <span aria-hidden>🔗</span>
                Website Link
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
