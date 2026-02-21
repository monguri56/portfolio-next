"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";

type TabKey = "main" | "product" | "extra" | "coupon";

type LinkItem = {
  label: string;
  href: string;
};

type SectionItem = {
  title: string;
  summary: ReactNode;
  image: string;
  links: LinkItem[];
};

type SimplePage = {
  title: string;
  summary: ReactNode;
  image: string;
  links: LinkItem[];
};

type ProductPage = {
  title: string;
  sections: SectionItem[];
};

type PageDataMap = {
  main: SimplePage;
  product: ProductPage;
  extra: SimplePage;
  coupon: SimplePage;
};

export default function ProjectAPage() {
  const [active, setActive] = useState<TabKey>("main");

  const TABS: { key: TabKey; label: string }[] = [
    { key: "main", label: "메인" },
    { key: "product", label: "상품" },
    { key: "extra", label: "지역" },
    { key: "coupon", label: "쿠폰" },
  ];

  const PAGE_DATA: PageDataMap = {
    main: {
      title: "메인페이지",
      summary: (
        <>
          관리자 페이지에서 설정한 진행상태, PROGRESS, 카테고리 등록값에 따라 상품이 자동 분류 및
          노출되며,
          <br />
          입력한 소개 내용은 상품 카드 hover 시 표시되도록 구현했습니다.
        </>
      ),
      image: "/projects/pro-a/main-1.png",
      links: [
        {
          label: "메인페이지 보기",
          href: "https://portcreat.mycafe24.com/home",
        },
      ],
    },

    product: {
      title: "상품페이지 (목록 / 상세)",
      sections: [
        {
          title: "목록 페이지",
          summary: (
            <>
              상품 등록 시 목록에 자동 노출되며 hover 시 관리자페이지에서 입력한 소개 내용이 표시됩니다.
              <br />
              관리자페이지에서 시,군 선택 시 상품 카드 상단 좌측에 해당 지역명이 노출됩니다.
            </>
          ),
          image: "/projects/pro-a/product-list.png",
          links: [
            {
              label: "목록페이지 보기",
              href: "https://portcreat.mycafe24.com/home/performance",
            },
          ],
        },

        {
          title: "상세 페이지",
          summary: (
            <>
              카카오맵 API를 활용하여 관리자페이지에서 입력한 주소 기준으로 지도 및 주변 관광지, 맛집,
              카페가 자동 표시됩니다.
              <br />
              또한 게시판 커스터마이징을 통해 상품 상세페이지에 후기 기능을 구현했습니다.
            </>
          ),
          image: "/projects/pro-a/product-detail.png",
          links: [
            {
              label: "상세페이지 보기",
              href: "https://portcreat.mycafe24.com/home/bbs/board.php?bo_table=performance&cp_code=&mode=orderform&rm_ix=10",
            },
            {
              label: "리뷰페이지 보기",
              href: "https://portcreat.mycafe24.com/home/review",
            },
          ],
        },
      ],
    },

    extra: {
      title: "지역별 콘텐츠 페이지",
      summary: (
        <>
          지역 선택 시 해당 지역 게시판 카테고리 목록 페이지로 이동하도록 구현했습니다.
          <br />
          그누보드 게시판과 연동하여 지역별 콘텐츠를 자동으로 분류 및 노출하도록 구성했습니다.
        </>
      ),
      image: "/projects/pro-a/city.png",
      links: [
        {
          label: "페이지 보기",
          href: "https://portcreat.mycafe24.com/home/city_f.php",
        },
      ],
    },

    coupon: {
      title: "쿠폰관리",
      summary: (
        <>
          그누보드 기본 쿠폰관리 기능을 참고하여 예약 플러그인에서도 사용할 수 있도록 쿠폰 생성 및
          관리 기능을 새로 구현했습니다.
          <br />
          관리자 페이지에서 쿠폰 코드, 할인율, 만료일, 사용 여부를 설정하고 예약 시스템과 연동할 수
          있도록 확장했습니다.
        </>
      ),
      image: "/projects/pro-a/coupon.png",
      links: [],
    },
  };

  const current = PAGE_DATA[active];

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          {TABS.map((t) => {
            const on = t.key === active;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={[
                  "rounded-full border px-4 py-2 text-sm transition",
                  on
                    ? "border-zinc-800 bg-zinc-800 text-white"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-10">
          {/* product만 특별 처리 */}
          {active === "product" ? (
            PAGE_DATA.product.sections.map((section: SectionItem, idx: number) => (
              <div key={idx} className="mb-16">
                {/* title */}
                <h2 className="text-xl font-semibold text-zinc-900 mb-2">{section.title}</h2>

                {/* summary */}
                <p className="text-sm text-zinc-600 mb-4">{section.summary}</p>

                {/* links */}
                {section.links.length > 0 ? (
                  <div className="flex justify-end gap-2 mb-6">
                    {section.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-700 hover:border-zinc-400"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                ) : null}

                {/* image */}
                <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                  <div className="relative h-[420px] md:h-[520px]">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 1100px"
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              {/* title */}
              <h2 className="text-xl font-semibold text-zinc-900 mb-2">{current.title}</h2>

              {/* summary (가드) */}
              {"summary" in current && current.summary ? (
                <p className="text-sm text-zinc-600 mb-4">{current.summary}</p>
              ) : null}

              {/* links (가드) */}
              {"links" in current && current.links.length > 0 ? (
                <div className="flex justify-end gap-2 mb-6">
                  {current.links.map((link: LinkItem, i: number) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-700 hover:border-zinc-400"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              ) : null}

              {/* image */}
              {"image" in current ? (
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                  <div className="h-[420px] md:h-[520px] overflow-y-auto">
                    <Image
                      src={current.image}
                      alt={current.title}
                      width={1600}
                      height={2000}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}