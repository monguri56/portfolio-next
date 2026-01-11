import Image from "next/image";

type Section = {
  id: string;
  title: string;
  desc: string;
  bullets: string[];
  image: string; // public path
  imageAlt: string;
};

export default function JeonjuProjectPage() {
  const sections: Section[] = [
    {
      id: "main",
      title: "Main Page",
      desc:
        "메인 페이지는 상단 내비게이션으로 주요 카테고리를 안내하며 아래 콘텐츠 영역은 관리자에서 게시판/상품관리로 등록한 데이터가 카테고리에 맞게 자동으로 노출되는 구조로 개발하였습니다.",
      bullets: [
        "게시판/상품관리 연동 자동 출력",
        "카테고리 + 상태값(진행중/예정/종료) 자동 분류",
        "BEST 콘텐츠 Progress 영역 강조 노출",
        "메인 전용 커스텀 출력 모듈 개발",
      ],
      image: "/projects/pro-a/main.png",
      imageAlt: "전주 투어 플랫폼 메인 페이지",
    },
    {
      id: "list",
      title: "List Page",
      desc:
        "리스트 페이지는 ‘필터링’과 ‘가독성’을 우선으로 잡았습니다. 카테고리 이동이 잦아도 구조가 무너지지 않게 카드형 UI와 정렬 규칙을 고정해 유지보수를 쉽게 했습니다.",
      bullets: [
        "카테고리 기반 리스트 구성(일관된 카드 UI)",
        "콘텐츠 타입별 공통 템플릿 적용으로 운영 효율 강화",
        "검색/필터 확장 가능한 구조로 설계",
        "반응형 그리드로 다양한 화면에서 가독성 유지",
      ],
      image: "/projects/pro-a/list.png",
      imageAlt: "전주 투어 플랫폼 리스트 페이지",
    },
    {
      id: "detail",
      title: "Detail Page",
      desc:
        "상세 페이지에서는 정보가 길어져도 사용자가 ‘예약/문의’까지 자연스럽게 도달하도록 콘텐츠 블록의 우선순위를 재배치했습니다. 핵심 정보는 위로, 행동(CTA)은 반복 노출되도록 구성했습니다.",
      bullets: [
        "상세 콘텐츠 블록 재구성(정보 우선순위 기반)",
        "예약/문의 CTA 동선 강화(상·하단 반복 배치 가능)",
        "후기/별점 영역 연동으로 신뢰 요소 강화",
        "지도/주변 정보 연결로 체류시간 개선",
      ],
      image: "/projects/pro-a/detail.png",
      imageAlt: "전주 투어 플랫폼 상세 페이지",
    },
    {
      id: "sub",
      title: "Sub Page",
      desc:
        "서브 페이지는 콘텐츠가 많아져도 ‘읽기 편한 문서형’ 흐름이 유지되도록 구성했습니다. 공통 레이아웃과 컴포넌트를 재사용해 전체 페이지 톤을 통일하고 작업 속도를 높였습니다.",
      bullets: [
        "서브 페이지 레이아웃/스타일 가이드 적용",
        "공통 섹션 컴포넌트화로 재사용성 강화",
        "PC/Mobile에서 동일한 정보 구조 유지",
        "콘텐츠 추가 시에도 레이아웃이 무너지지 않게 설계",
      ],
      image: "/projects/pro-a/sub.png",
      imageAlt: "전주 투어 플랫폼 서브 페이지",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="mx-auto w-full max-w-[1440px] px-6 md:px-10 pt-14 pb-8">
        <p className="text-sm text-zinc-500">Project</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-zinc-900">
          전주 관광·투어 플랫폼 구축
        </h1>

        <p className="mt-4 text-sm leading-7 text-zinc-600 max-w-[920px]">
          여행/투어 콘텐츠를 카테고리 중심으로 재구성하고, 리스트·상세·후기·지도 기능을 하나의 흐름으로 연결한 프로젝트입니다.
          운영자가 콘텐츠를 추가하거나 상태값을 변경해도 자동 분류/노출 구조가 유지되도록 설계했습니다.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {["HTML", "CSS", "JavaScript", "jQuery", "PHP", "MySQL", "Kakao Map API"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* ✅ Sticky Nav */}
      <div className="sticky top-0 z-30 border-b border-zinc-100 bg-white/80 backdrop-blur">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 py-3">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="hover:text-zinc-900 underline-offset-4 hover:underline"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Sections */}
      <section className="mx-auto w-full max-w-[1440px] px-6 md:px-10 pb-20 pt-10 space-y-14">
        {sections.map((s, idx) => (
          <FeatureSection key={s.id} section={s} reverse={idx % 2 === 1} />
        ))}
      </section>
    </main>
  );
}

function FeatureSection({
  section,
  reverse,
}: {
  section: Section;
  reverse?: boolean;
}) {
  return (
    <div
      id={section.id}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
        reverse ? "lg:[&>div:first-child]:order-2" : ""
      }`}
    >
      {/* ✅ Image Box: 가득차게 + 내부 스크롤 */}
      <div className="lg:col-span-7">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {/* 박스 자체는 고정 높이 */}
          <div className="h-[360px] md:h-[420px] overflow-y-auto">
            {/* 이미지가 박스 너비를 '꽉' 채우도록 */}
            <Image
              src={section.image}
              alt={section.imageAlt}
              width={1600}
              height={2400}
              className="w-full h-auto"
              priority={section.id === "main"}
            />
          </div>
        </div>

        {/* (선택) 스크롤 힌트 */}
        <p className="mt-2 text-xs text-zinc-400">
          이미지 안에서 스크롤 가능합니다.
        </p>
      </div>

      {/* Text */}
      <div className="lg:col-span-5 max-w-[520px]">
        <h2 className="text-xl md:text-2xl font-semibold text-zinc-900">
          {section.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-zinc-600">{section.desc}</p>

        <ul className="mt-6 space-y-2 text-sm text-zinc-800">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[7px] h-1 w-1 rounded-full bg-zinc-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
