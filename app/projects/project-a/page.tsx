"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type TabKey = "overview" | "main" | "product" | "city" | "coupon";

type LinkItem = {
  label: string;
  href: string;
};

type DetailSection = {
  title: string;
  eyebrow: string;
  summary: string;
  image: string;
  links: LinkItem[];
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "main", label: "Main" },
  { key: "product", label: "Product" },
  { key: "city", label: "City" },
  { key: "coupon", label: "Coupon" },
];

const sections: Record<Exclude<TabKey, "overview">, DetailSection[]> = {
  main: [
    {
      eyebrow: "Main Page",
      title: "관리자 입력값으로 완성되는 메인 콘텐츠",
      summary:
        "관리자 페이지에서 설정한 진행 상태, 카테고리, 상품 소개 값에 따라 메인 상품 영역이 자동 분류되고 노출되도록 구현했습니다. 카드 hover 상태에서는 운영자가 입력한 소개 문구를 확인할 수 있습니다.",
      image: "/projects/pro-a/main-1.png",
      links: [{ label: "메인 페이지 보기", href: "https://portcreat.mycafe24.com/home" }],
    },
  ],
  product: [
    {
      eyebrow: "Product List",
      title: "예약 상품 목록과 지역 정보 노출",
      summary:
        "상품 등록 시 목록에 자동 노출되며, 관리자 페이지에서 선택한 시/군 정보가 상품 카드에 표시되도록 구성했습니다. 사용자가 목록에서 필요한 정보를 빠르게 구분할 수 있도록 카드 구조를 정리했습니다.",
      image: "/projects/pro-a/product-list.png",
      links: [
        {
          label: "목록 페이지 보기",
          href: "https://portcreat.mycafe24.com/home/performance",
        },
      ],
    },
    {
      eyebrow: "Product Detail",
      title: "지도, 주변 정보, 후기까지 연결한 상세 화면",
      summary:
        "Kakao Map API를 활용해 관리자 페이지에서 입력한 주소 기준으로 지도와 주변 관광지, 맛집, 카페 정보를 보여줍니다. 게시판 커스터마이징을 통해 상품 상세에 후기와 별점 흐름도 연결했습니다.",
      image: "/projects/pro-a/product-detail.png",
      links: [
        {
          label: "상세 페이지 보기",
          href: "https://portcreat.mycafe24.com/home/bbs/board.php?bo_table=performance&cp_code=&mode=orderform&rm_ix=10",
        },
        {
          label: "리뷰 페이지 보기",
          href: "https://portcreat.mycafe24.com/home/review",
        },
      ],
    },
  ],
  city: [
    {
      eyebrow: "City Contents",
      title: "지역별 콘텐츠 자동 분류",
      summary:
        "지역 선택 시 해당 지역 게시판 카테고리 목록으로 이동하도록 구현했습니다. 그누보드 게시판과 연동해 지역별 콘텐츠가 자동 분류되고 노출되도록 구성했습니다.",
      image: "/projects/pro-a/city.png",
      links: [{ label: "지역 페이지 보기", href: "https://portcreat.mycafe24.com/home/city_f.php" }],
    },
  ],
  coupon: [
    {
      eyebrow: "Coupon Admin",
      title: "예약 플러그인에 맞춘 쿠폰 관리 기능",
      summary:
        "기본 쿠폰 관리 구조를 참고해 예약 플러그인에서도 사용할 수 있는 쿠폰 생성 및 관리 기능을 확장했습니다. 쿠폰 코드, 할인율, 만료일, 사용 여부를 관리자 페이지에서 제어할 수 있습니다.",
      image: "/projects/pro-a/coupon.png",
      links: [],
    },
  ],
};

const overviewItems = [
  { label: "Role", value: "Design · Publishing · Admin Customizing" },
  { label: "Scope", value: "메인, 상품, 지역 콘텐츠, 후기, 쿠폰 관리" },
  { label: "Stack", value: "HTML, CSS, JavaScript, jQuery, PHP, MySQL, Kakao Map API" },
];

const keyResults = [
  "관리자가 입력한 콘텐츠가 화면에 자동 반영되는 구조 구현",
  "예약 상품 탐색부터 상세 확인, 후기 확인까지 이어지는 흐름 정리",
  "지역 정보와 쿠폰 관리 기능을 운영 환경에 맞게 확장",
];

export default function ProjectAPage() {
  const [active, setActive] = useState<TabKey>("overview");

  const visibleSections = useMemo(() => {
    if (active === "overview") {
      return [sections.main[0], sections.product[0], sections.product[1]];
    }

    return sections[active];
  }, [active]);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <header className="border-b border-zinc-200 pb-8 sm:pb-10">
          <Link href="/#featured" className="text-sm text-zinc-500 transition hover:text-zinc-950">
            ← Featured
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                Featured Case
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
                관광 예약 플랫폼
              </h1>
            </div>

            <p className="text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
              예약 상품, 지역 콘텐츠, 후기와 쿠폰 기능을 운영할 수 있도록 확장한
              그누보드 기반 프로젝트입니다. 디자인과 반응형 퍼블리싱, 관리자 기능
              커스텀을 함께 담당했습니다.
            </p>
          </div>
        </header>

        <section className="grid border-b border-zinc-200 py-8 sm:grid-cols-3">
          {overviewItems.map((item) => (
            <div
              key={item.label}
              className="border-zinc-200 py-4 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-800">{item.value}</p>
            </div>
          ))}
        </section>

        <nav
          className="sticky top-0 z-20 -mx-5 border-b border-zinc-200 bg-white/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
          aria-label="Project detail sections"
        >
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = active === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(tab.key)}
                  className={[
                    "h-10 shrink-0 border px-4 text-sm transition",
                    isActive
                      ? "border-zinc-950 bg-zinc-950 text-white"
                      : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-950 hover:text-zinc-950",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        {active === "overview" ? (
          <section className="grid gap-6 border-b border-zinc-200 py-10 lg:grid-cols-[380px_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                Result
              </p>
              <h2 className="mt-3 text-3xl font-semibold">핵심 구현 내용</h2>
            </div>

            <ul className="grid gap-3">
              {keyResults.map((result, index) => (
                <li
                  key={result}
                  className="flex gap-4 border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-700"
                >
                  <span className="text-xs font-semibold text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="space-y-10 py-10">
          {visibleSections.map((section) => (
            <ProjectSection key={section.title} section={section} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ProjectSection({ section }: { section: DetailSection }) {
  return (
    <section className="grid border border-zinc-200 bg-white lg:grid-cols-[360px_1fr]">
      <div className="border-b border-zinc-200 p-5 sm:p-7 lg:border-b-0 lg:border-r">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
          {section.eyebrow}
        </p>
        <h2 className="mt-4 text-2xl font-semibold leading-tight text-zinc-950">
          {section.title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-zinc-600">{section.summary}</p>

        {section.links.length > 0 ? (
          <div className="mt-6 flex flex-col gap-2">
            {section.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center justify-center border border-zinc-300 text-sm text-zinc-800 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bg-zinc-50 p-4 sm:p-6">
        <div className="max-h-[70vh] overflow-y-auto border border-zinc-200 bg-white">
          <Image
            src={section.image}
            alt={section.title}
            width={1600}
            height={1400}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 960px"
          />
        </div>
      </div>
    </section>
  );
}
