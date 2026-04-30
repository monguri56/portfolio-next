"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type DetailSection = {
  title: string;
  eyebrow: string;
  summary: string;
  image?: string;
  links?: { label: string; href: string }[];
  table?: { label: string; value: string }[];
  split?: { title: string; items: string[] }[];
  list?: string[];
};

type FeaturedProject = {
  id: string;
  title: string;
  image: string;
  projectName: string;
  background: string;
  role: string[];
  highlights: string[];
  techStack: string[];
  sections: DetailSection[];
  links?: { label: string; href: string }[];
};

const helaxStack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "MUI",
  "Prisma",
  "Supabase",
  "bcrypt",
  "Vercel",
];

const helaxRoles = [
  "Next App Router 기반 퍼블릭/관리자 라우트 분리 설계",
  "객실 목록, 상세, 예약 생성, 마이페이지 예약 조회 구현",
  "관리자 객실 등록/수정/삭제, 예약 상태 변경, 공지 관리 화면 구성",
  "Prisma 모델링과 Route Handler 기반 REST API 작성",
  "bcrypt 로그인/회원가입과 localStorage 기반 사용자 상태 관리 구성",
];

const helaxRetrospectives = [
  "정적 호텔 소개 페이지를 실제 예약 흐름을 가진 풀스택 서비스로 확장",
  "퍼블릭 예약 경험과 관리자 운영 경험을 분리해 서비스 구조를 명확히 정리",
  "예약 중복 검증, 객실 활성화, 공지 고정 등 운영에 필요한 규칙을 데이터 모델에 반영",
  "MUI 기반 폼/카드/테이블 컴포넌트로 관리자 화면의 조작성을 확보",
  "Vercel 배포까지 완료하며 로컬 개발 결과를 외부에서 확인 가능한 상태로 정리",
];

const helaxProjectStatus = [
  { label: "배포", value: "Vercel 배포 완료" },
  { label: "버전", value: "v0.1.0" },
  { label: "DB", value: "Supabase PostgreSQL + Prisma" },
  { label: "계정", value: "데모 관리자 로그인 지원" },
];

const helaxRoutes: {
  group: string;
  tone: "green" | "brown" | "blue";
  items: string[];
}[] = [
  {
    group: "/",
    tone: "green",
    items: ["메인", "about", "rooms", "rooms/:roomId", "community", "login", "register", "mypage"],
  },
  {
    group: "/admin",
    tone: "brown",
    items: ["dashboard", "rooms", "rooms/new", "rooms/:roomId/edit", "reservations", "notices"],
  },
  {
    group: "/api",
    tone: "blue",
    items: ["auth/login", "auth/register", "rooms", "reservations", "reviews", "notices", "comments"],
  },
];

const helaxDataModels = ["User", "Room", "Reservation", "Review", "Notice", "NoticeComment"];

const helaxCommonComponents = [
  "PublicPageShell",
  "RoomCard",
  "ReservationForm",
  "ReviewSection",
  "AdminCard",
  "SubBanner",
];

const helaxFlowSteps = [
  {
    title: "객실 탐색",
    request: "GET /rooms, GET /rooms/:roomId",
    response: "객실 이미지, 가격, 최대 인원, 리뷰 요약",
    note: "필터와 정렬로 후보 객실을 좁힘",
  },
  {
    title: "로그인",
    request: "POST /api/auth/login",
    response: "UserContext에 사용자 정보 저장",
    note: "예약 전 인증 상태 확인",
  },
  {
    title: "예약 생성",
    request: "POST /api/reservations",
    response: "Reservation 생성 후 마이페이지에서 확인",
    note: "서버에서 날짜, 인원, 중복 예약 검증",
  },
  {
    title: "관리자 처리",
    request: "Admin server action",
    response: "PENDING, CONFIRMED, CANCELED 상태 변경",
    note: "운영자가 예약 현황을 대시보드에서 관리",
  },
];

const helaxPortfolioStack = [
  "Next.js 16 App Router",
  "React 19",
  "TypeScript",
  "MUI",
  "Prisma",
  "Supabase PostgreSQL",
  "bcrypt",
  "Server Action",
];

const helaxPortfolioRoles = [
  "리조트 예약 서비스 도메인 설계",
  "객실, 예약, 리뷰, 공지, 사용자 모델링",
  "사용자 화면과 관리자 콘솔 분리",
  "객실 검색/필터/상세/예약 플로우 구현",
  "마이페이지 예약 조회 및 취소 기능 구현",
  "관리자 객실/예약/공지 관리 기능 구현",
  "Prisma 기반 데이터 CRUD 및 예약 중복 검증 로직 구현",
];

const helaxPortfolioHighlights = [
  "객실 조회부터 예약 생성, 마이페이지 확인까지 구현",
  "관리자 객실/예약/공지 관리 화면 구성",
  "Supabase PostgreSQL과 Prisma 기반 데이터 모델링",
];

export default function FeaturedSection() {
  const projects: FeaturedProject[] = useMemo(
    () => [
      {
        id: "ondo-diary",
        title: "온도일기",
        image: "/featured/project-03.png",
        projectName: "ondo-diary",
        background:
          "오늘의 날씨, 온도, 옷차림, 사진, 메모를 함께 기록하는 모바일 중심 다이어리 앱입니다. 날씨 앱과 일기 앱의 목적을 결합해, 이후 비슷한 온도의 날에 실제 옷차림 기록을 다시 참고할 수 있도록 설계했습니다.",
        role: [
          "모바일 앱 전체 UI/UX 설계 및 구현",
          "Expo Router 기반 홈/기록 화면 라우팅 구성",
          "SQLite 기반 일기 저장 구조 설계",
          "위치 권한 요청 및 Open-Meteo 날씨 API 연동",
          "이미지 선택, 로컬 저장, 온도 워터마크 공유 기능 구현",
        ],
        highlights: [
          "현재 위치 기반 온도 및 날씨 조회",
          "사진, 메모, 온도, 날씨를 포함한 날짜별 일기 저장",
          "연/월/주 캘린더 기반 기록 탐색",
          "비슷한 온도의 과거 기록 추천",
          "SQLite와 로컬 파일 시스템 기반 퍼시스턴스",
        ],
        techStack: [
          "React Native",
          "Expo",
          "TypeScript",
          "Expo Router",
          "Expo SQLite",
          "AsyncStorage",
          "Expo FileSystem",
          "Expo Location",
          "Expo Image Picker",
          "Open-Meteo API",
        ],
        sections: [],
      },
      {
        id: "helax-next",
        title: "Helax",
        image: "/featured/project-03.png",
        projectName: "HELAX 1.0 ver",
        background:
          "객실 조회, 예약, 리뷰, 공지, 관리자 콘솔까지 구현한 Next.js 기반 리조트 예약 풀스택 웹 서비스입니다.",
        role: helaxPortfolioRoles,
        highlights: helaxPortfolioHighlights,
        techStack: helaxPortfolioStack,
        links: [{ label: "Website", href: "https://helax-gules.vercel.app/" }],
        sections: [
          {
            eyebrow: "Tech Stack",
            title: "역할별 기술 구성",
            summary:
              "프론트엔드, UI, 서버, 데이터베이스, 인증/운영 도구를 역할별로 나눠 구성했습니다.",
            table: [
              { label: "Frontend", value: "Next.js 16 App Router, React 19, TypeScript" },
              { label: "UI / Styling", value: "MUI, MUI Icons, Emotion, CSS Modules, global CSS, Tailwind CSS 4 설정" },
              { label: "Backend", value: "Next.js Route Handler, Server Component, Server Action" },
              { label: "Database / ORM", value: "Supabase PostgreSQL, Prisma 7, Prisma Adapter PG" },
              { label: "Auth", value: "bcrypt 비밀번호 해싱, UserContext/localStorage 세션 관리" },
              { label: "Etc", value: "ESLint, npm scripts, Prisma seed/migration" },
            ],
          },
          {
            eyebrow: "Architecture",
            title: "App Router 기반 풀스택 구조",
            summary:
              "사용자 페이지, 관리자 페이지, API Route Handler를 라우트 그룹과 폴더 역할에 맞춰 분리했습니다.",
            table: [
              { label: "app/(public)", value: "메인, 객실 목록/상세, 로그인/회원가입, 마이페이지, 커뮤니티/공지" },
              { label: "app/(admin)", value: "관리자 대시보드, 객실 관리, 예약 관리, 공지 관리" },
              { label: "app/api", value: "auth, rooms, reservations, reviews, notices API Route Handler" },
              { label: "components", value: "공통 UI, 관리자 UI, 예약/리뷰 컴포넌트" },
              { label: "context/UserContext.tsx", value: "로그인 사용자 상태 관리" },
              { label: "lib/prisma.ts", value: "Prisma Client 연결" },
              { label: "prisma/schema.prisma", value: "User, Room, Reservation, Review, Notice 모델 정의" },
            ],
          },
          {
            eyebrow: "Service Flow",
            title: "사용자/관리자/예약 생성 흐름",
            summary:
              "예약 서비스의 핵심 흐름을 사용자, 관리자, 예약 생성 단계로 나눠 정리했습니다.",
            table: [
              { label: "사용자", value: "회원가입/로그인 -> 객실 목록 조회 -> 검색/인원/가격 필터링 -> 객실 상세 -> 날짜/인원 선택 -> 예약 생성 -> 마이페이지 조회/취소 -> 리뷰 작성" },
              { label: "관리자", value: "관리자 로그인 -> AdminAccessGuard 권한 확인 -> 대시보드 확인 -> 객실 등록/수정/삭제 -> 예약 상태 변경 -> 공지 등록/수정/삭제 및 상단 고정" },
              { label: "예약 생성", value: "예약 폼 입력 -> 로그인 확인 -> /api/reservations POST -> 필수값 검증 -> 날짜/객실/인원/중복 검증 -> 총 금액 계산 -> Reservation 생성" },
            ],
          },
          {
            eyebrow: "Validation",
            title: "서버 중심 예약 검증",
            summary:
              "예약 폼 입력 후 로그인 여부, 필수값, 체크인/체크아웃 날짜, 객실 활성 상태, 최대 인원, 기존 예약과의 날짜 겹침 여부를 서버에서 검증합니다. 검증이 통과되면 총 금액을 계산하고 Reservation 데이터를 생성합니다.",
            list: [
              "로그인 여부와 필수값 확인",
              "체크인/체크아웃 날짜 역전 방지",
              "객실 활성 상태 확인",
              "최대 인원 초과 여부 확인",
              "기존 예약과 날짜 겹침 여부 확인",
              "총 금액 계산 후 Reservation 생성",
            ],
          },
          {
            eyebrow: "Retrospective",
            title: "좋았던 점과 개선점",
            summary:
              "구현하며 잘 정리된 지점과 실서비스 기준으로 보완할 지점을 분리했습니다.",
            split: [
              {
                title: "좋았던 점",
                items: [
                  "Server Component로 객실 목록, 상세, 관리자 대시보드 같은 DB 조회 중심 화면을 간결하게 구성",
                  "Prisma 관계 모델로 객실-예약-리뷰-사용자 데이터를 명확하게 연결",
                  "사용자 화면과 관리자 화면을 route group으로 분리해 구조를 읽기 쉽게 정리",
                  "예약 생성 시 날짜 역전, 최대 인원, 중복 예약을 서버에서 검증",
                ],
              },
              {
                title: "개선점",
                items: [
                  "localStorage와 클라이언트 Context 중심 인증을 HttpOnly 쿠키, 세션/JWT 기반으로 보강",
                  "관리자 접근 제어를 API 레벨에서도 ADMIN 권한 검증하도록 강화",
                  "일부 한글 문자열 인코딩을 UTF-8 기준으로 정리",
                  "예약/공지/객실 API 테스트 코드 추가",
                  "이미지 업로드를 URL 문자열 대신 스토리지 연동 구조로 개선",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "tour-platform",
        title: "오고가고",
        image: "/featured/project-01.png",
        projectName: "오고가고",
        background:
          "예약 상품, 지역 콘텐츠, 후기와 쿠폰 기능을 운영할 수 있도록 확장한 그누보드 기반 프로젝트입니다.",
        role: [
          "서브 페이지 UI 디자인",
          "반응형 퍼블리싱",
          "상품 목록/상세 게시판 커스텀",
          "예약 상품 관리 기능 확장",
          "Kakao Map API 기반 위치 정보 연동",
        ],
        highlights: [
          "관리자 입력값에 따라 콘텐츠와 상품 정보 자동 노출",
          "지역 기반 정보와 주변 장소를 함께 보여주는 상세 화면 구성",
          "후기, 별점, 쿠폰 등 예약 흐름에 필요한 기능 구현",
        ],
        techStack: ["HTML", "CSS", "JavaScript", "jQuery", "PHP", "MySQL"],
        links: [{ label: "운영 사이트 보기", href: "https://portcreat.mycafe24.com/home" }],
        sections: [
          {
            eyebrow: "Main Page",
            title: "관리자 입력값으로 완성되는 메인 콘텐츠",
            summary:
              "관리자 페이지에서 설정한 진행 상태, 카테고리, 상품 소개 값에 따라 메인 상품 영역이 자동 분류되고 노출되도록 구현했습니다.",
            image: "/projects/pro-a/main-1.png",
            links: [{ label: "메인 페이지 보기", href: "https://portcreat.mycafe24.com/home" }],
          },
          {
            eyebrow: "Product List",
            title: "예약 상품 목록과 지역 정보 노출",
            summary:
              "상품 등록 시 목록에 자동 노출되며, 관리자 페이지에서 선택한 시/군 정보가 상품 카드에 표시되도록 구성했습니다.",
            image: "/projects/pro-a/product-list.png",
            links: [{ label: "목록 페이지 보기", href: "https://portcreat.mycafe24.com/home/performance" }],
          },
          {
            eyebrow: "Product Detail",
            title: "지도, 주변 정보, 후기까지 연결한 상세 화면",
            summary:
              "Kakao Map API를 활용해 입력 주소 기준으로 지도와 주변 관광지, 맛집, 카페 정보를 보여주고 후기/별점 흐름을 연결했습니다.",
            image: "/projects/pro-a/product-detail.png",
            links: [
              {
                label: "상세 페이지 보기",
                href: "https://portcreat.mycafe24.com/home/bbs/board.php?bo_table=performance&cp_code=&mode=orderform&rm_ix=10",
              },
              { label: "리뷰 페이지 보기", href: "https://portcreat.mycafe24.com/home/review" },
            ],
          },
          {
            eyebrow: "City Contents",
            title: "지역별 콘텐츠 자동 분류",
            summary:
              "지역 선택 시 해당 지역 게시판 카테고리 목록으로 이동하고, 게시판과 연동된 콘텐츠가 자동 분류되도록 구성했습니다.",
            image: "/projects/pro-a/city.png",
            links: [{ label: "지역 페이지 보기", href: "https://portcreat.mycafe24.com/home/city_f.php" }],
          },
          {
            eyebrow: "Coupon Admin",
            title: "예약 플러그인에 맞춘 쿠폰 관리 기능",
            summary:
              "쿠폰 코드, 할인율, 만료일, 사용 여부를 관리자 페이지에서 제어할 수 있도록 예약 플러그인 기능을 확장했습니다.",
            image: "/projects/pro-a/coupon.png",
          },
        ],
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [openProject, setOpenProject] = useState<FeaturedProject | null>(null);
  const [mounted, setMounted] = useState(false);
  const activeProject = projects[active];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!openProject) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [openProject]);

  const goPrev = () => setActive((current) => Math.max(0, current - 1));
  const goNext = () => setActive((current) => Math.min(projects.length - 1, current + 1));

  return (
    <div id="featured" className="h-full w-full bg-white flex items-center justify-center">
      <div className="w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 py-12">
        <div className="mb-8 flex flex-col gap-4 border-b border-zinc-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Main Projects
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-zinc-950">
              주요 프로젝트
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={goPrev} className="h-10 w-10 border border-zinc-300 bg-white text-zinc-900 transition hover:bg-zinc-950 hover:text-white" aria-label="Previous project">
              ←
            </button>
            <button type="button" onClick={goNext} className="h-10 w-10 border border-zinc-300 bg-white text-zinc-900 transition hover:bg-zinc-950 hover:text-white" aria-label="Next project">
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch lg:h-[682px]">
          <div className="lg:col-span-8 flex min-h-0 flex-col border border-zinc-200 bg-white">
            <div className="relative h-[320px] sm:h-[460px] lg:h-[600px] bg-zinc-50">
              <Image src={activeProject.image} alt={activeProject.projectName} fill className="object-contain p-4 sm:p-8" priority />
            </div>

            <div className="grid grid-cols-3 border-t border-zinc-200">
              {projects.map((project, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setActive(index)}
                    className={[
                      "min-h-20 border-r border-zinc-200 px-3 py-4 text-left transition last:border-r-0 sm:px-4",
                      isActive ? "bg-zinc-950 text-white" : "bg-white text-zinc-600 hover:bg-zinc-50",
                    ].join(" ")}
                  >
                    <span className="block text-xs uppercase tracking-[0.18em] opacity-60">0{index + 1}</span>
                    <span className="mt-2 block text-sm font-semibold">{project.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="lg:col-span-4 min-h-0 border border-zinc-200 bg-white">
            <div className="flex h-full min-h-[560px] flex-col p-6 sm:p-8 lg:min-h-0">
              <div
                className="h-[190px] shrink-0 overflow-y-auto border-b border-zinc-200 pb-6 pr-2 featured-scroll"
                onWheelCapture={(event) => event.stopPropagation()}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Project Name
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-zinc-950">
                  {activeProject.projectName}
                </h3>
                <p className="mt-5 text-sm leading-7 text-zinc-600">
                  {activeProject.background}
                </p>
              </div>

              <div
                className="mt-6 min-h-0 flex-1 overflow-y-auto pr-2 featured-scroll"
                onWheelCapture={(event) => event.stopPropagation()}
              >
                <InfoList label="Role" items={activeProject.role} flush />
                <InfoList label="Highlights" items={activeProject.highlights} />
              </div>

              <button
                type="button"
                onClick={() => setOpenProject(activeProject)}
                className="mt-6 flex h-12 shrink-0 items-center justify-center bg-zinc-950 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                상세 설명
              </button>
            </div>
          </aside>
        </div>
      </div>

      {mounted && openProject
        ? createPortal(<ProjectModal project={openProject} onClose={() => setOpenProject(null)} />, document.body)
        : null}
    </div>
  );
}

function InfoList({
  label,
  items,
  flush = false,
}: {
  label: string;
  items: string[];
  flush?: boolean;
}) {
  return (
    <div className={flush ? "" : "mt-8"}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">{label}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 bg-zinc-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: FeaturedProject; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center overflow-y-auto bg-black/55 px-4 py-6 sm:px-8 lg:px-12"
      role="dialog"
      aria-modal="true"
      onWheel={(event) => event.stopPropagation()}
    >
      <div className="mx-auto flex max-h-[calc(100vh-48px)] w-full max-w-[1440px] flex-col border border-zinc-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-6 sm:p-8 lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">Project Detail</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <h3 className="text-3xl font-semibold text-zinc-950">
                {project.projectName}
              </h3>
              {project.links?.[0] ? (
                <a
                  href={project.links[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-zinc-500 transition hover:text-zinc-950"
                >
                  -&gt; Website
                </a>
              ) : null}
            </div>
          </div>
          <button type="button" onClick={onClose} className="h-10 w-10 shrink-0 border border-zinc-300 text-[0px] text-zinc-700 transition before:content-['X'] before:text-sm before:font-semibold hover:bg-zinc-950 hover:text-white" aria-label="Close project detail">
            ×
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-8 lg:p-10" onWheel={(event) => event.stopPropagation()}>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-[320px] border border-zinc-200 bg-zinc-50">
              <Image src={project.image} alt={project.projectName} fill className="object-contain p-5" sizes="(max-width: 1024px) 100vw, 440px" />
            </div>

            <div className="grid gap-6">
              <div className="border border-zinc-200 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Overview
                </p>
                <p className="mt-4 text-sm leading-7 text-zinc-600">{project.background}</p>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <MiniPanel label="Role" items={project.role} />
                <MiniPanel label="Highlights" items={project.highlights} />
              </div>

              <div className="border border-zinc-200 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Tech Stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {project.id === "ondo-diary" ? (
            <OndoDiaryLowerDetail />
          ) : project.id === "helax-next" ? (
            <HelaxLowerDetail />
          ) : (
              <div className="mt-10 space-y-7">
              {project.sections.map((section) => (
                <section key={section.title} className="grid border border-zinc-200 bg-white lg:grid-cols-[360px_1fr]">
                  <div className="border-b border-zinc-200 p-6 lg:border-b-0 lg:border-r">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{section.eyebrow}</p>
                    <h4 className="mt-3 text-xl font-semibold text-zinc-950">{section.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-zinc-600">{section.summary}</p>
                    {section.links?.length ? (
                      <div className="mt-5 flex flex-col gap-2">
                        {section.links.map((link) => (
                          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="flex h-10 items-center justify-center border border-zinc-300 px-4 text-sm text-zinc-800 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white">
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  {section.image ? (
                    <div className="bg-zinc-50 p-5 sm:p-6">
                      <div className="max-h-[620px] overflow-y-auto border border-zinc-200 bg-white" onWheel={(event) => event.stopPropagation()}>
                        <Image src={section.image} alt={section.title} width={1600} height={1400} className="h-auto w-full" sizes="(max-width: 1024px) 100vw, 800px" />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-zinc-50 p-5 text-sm leading-7 text-zinc-600">
                      <DetailSectionBody section={section} />
                    </div>
                  )}
                </section>
              ))}
              </div>
          )}

        </div>
      </div>
    </div>
  );
}

function OndoDiaryLowerDetail() {
  const architecture = [
    { label: "App", value: "React Native + Expo", tone: "text-sky-600" },
    { label: "Route", value: "Home / Diary", tone: "text-violet-600" },
    { label: "Device", value: "Location / Image Picker", tone: "text-emerald-600" },
    { label: "Storage", value: "SQLite / FileSystem", tone: "text-slate-700" },
    { label: "Weather", value: "Open-Meteo API", tone: "text-orange-600" },
  ];

  const routeGroups = [
    {
      title: "home",
      color: "border-sky-500 text-sky-700",
      items: ["현재 날씨", "온도별 옷차림 추천", "오늘 기록", "유사 온도 기록"],
    },
    {
      title: "diary",
      color: "border-violet-500 text-violet-700",
      items: ["연간 캘린더", "월간 캘린더", "주간 캘린더", "오늘 기록 저장"],
    },
    {
      title: "local data",
      color: "border-emerald-500 text-emerald-700",
      items: ["날짜별 일기", "앱 내부 이미지", "샘플 기록", "공유용 워터마크"],
    },
  ];

  const projectStructure = [
    ["app/(tabs)/index.tsx", "현재 날씨, 오늘 기록, 옷차림 추천, 유사 기록 추천"],
    ["app/(tabs)/diary.tsx", "연/월/주 캘린더와 오늘 사진/메모 저장"],
    ["lib/diary-db.ts", "SQLite 기반 날짜별 일기 CRUD와 샘플 데이터 시딩"],
    ["lib/image-files.ts", "선택 이미지를 앱 문서 디렉터리에 복사해 영구 저장"],
    ["lib/location.ts", "위치 권한 요청과 좌표 조회"],
    ["lib/weather.ts", "Open-Meteo 기반 현재/일별 날씨 조회"],
  ];

  const recordFlow = [
    "앱 실행",
    "위치 권한 요청",
    "현재 위치 기반 날씨 조회",
    "온도별 옷차림 추천 확인",
    "기록 화면에서 오늘 날짜 선택",
    "사진과 메모 저장",
    "홈에서 오늘 기록과 유사 온도 기록 확인",
  ];

  const dataFlow = [
    "이미지 선택",
    "앱 내부 문서 디렉터리로 복사",
    "날짜, 온도, 날씨, 메모, 이미지 경로 저장",
    "SQLite에서 날짜 기준 조회",
    "현재 온도와 가까운 기록 필터링",
    "온도 워터마크 이미지 공유",
  ];

  const implementationCards = [
    {
      title: "기록 중심 UX",
      tone: "border-sky-500 text-sky-700",
      items: ["모바일 우선", "오늘 기록 우선", "캘린더 탐색", "상단 액션"],
    },
    {
      title: "로컬 퍼시스턴스",
      tone: "border-emerald-500 text-emerald-700",
      items: ["SQLite CRUD", "파일 복사 저장", "재실행 유지", "샘플 시딩"],
    },
    {
      title: "온도 기반 추천",
      tone: "border-orange-500 text-orange-700",
      items: ["현재 온도 비교", "유사 기록 추출", "옷차림 회고", "공유 이미지"],
    },
  ];

  const troubleshooting = [
    {
      title: "이미지 URI 지속성",
      asIs: "이미지 피커가 반환한 URI만 저장하면 앱 재실행이나 원본 위치 변경 후 기록 이미지가 깨질 수 있었습니다.",
      toBe: "선택한 이미지를 앱 내부 문서 디렉터리에 복사하고, SQLite에는 복사된 파일 경로를 저장했습니다.",
      next: "다음 단계에서는 이미지 정리 정책과 클라우드 백업을 함께 설계해 저장 공간과 동기화를 관리할 계획입니다.",
    },
    {
      title: "날씨 호출 위치",
      asIs: "일부 날씨 조회 로직이 화면 내부에 있어 화면 책임과 데이터 요청 책임이 섞일 여지가 있었습니다.",
      toBe: "위치와 날씨 유틸리티를 분리해 권한 요청, 좌표 조회, API 호출의 역할을 나눴습니다.",
      next: "캐싱 전략을 추가해 같은 날짜와 위치의 날씨 요청을 줄이고 오프라인 UX도 보강할 수 있습니다.",
    },
    {
      title: "캘린더 탐색 밀도",
      asIs: "연/월/주 보기가 모두 필요해 화면이 정보 과밀해질 수 있었습니다.",
      toBe: "날짜 선택은 캘린더에 모으고, 실제 작성은 오늘 날짜 중심으로 제한해 기록 흐름을 단순화했습니다.",
      next: "기록이 많아지면 온도대 필터나 계절별 모아보기로 탐색 방식을 확장할 수 있습니다.",
    },
  ];

  const versionPlan = [
    ["현재 범위", "위치 기반 날씨 조회, 날짜별 기록 저장, 캘린더 탐색, 유사 온도 추천, 워터마크 공유"],
    ["다음 버전", "날씨 캐싱, 기록 검색/필터, 이미지 저장소 정리, 계정 기반 백업, 클라우드 동기화"],
  ];

  return (
    <div className="mt-10 space-y-6">
      <CaseSection
        eyebrow="Architecture"
        title="앱 구조"
        description="화면, 로컬 데이터, 디바이스 기능, 날씨 조회를 역할별로 분리해 모바일 기록 앱의 기본 흐름을 정리했습니다."
      >
        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="grid gap-5">
            <div className="grid gap-3 md:grid-cols-5">
              {architecture.map((node) => (
                <div key={node.label} className="border border-zinc-200 bg-zinc-50 p-4 text-center">
                  <b className={`block text-lg ${node.tone}`}>{node.label}</b>
                  <span className="mt-2 block text-xs font-semibold leading-5 text-zinc-600">
                    {node.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {routeGroups.map((group) => (
                <div key={group.title} className={`border-t-2 ${group.color} border-x border-b border-zinc-200 p-5`}>
                  <h5 className="text-base font-semibold">{group.title}</h5>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm leading-6 text-zinc-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border border-zinc-200 bg-zinc-50 p-5 font-mono text-xs leading-6 text-zinc-700">
              <p>Mobile UI</p>
              <p className="pl-4">↓</p>
              <p>Expo Router</p>
              <p className="pl-4">├─ home weather / recommendation</p>
              <p className="pl-4">├─ diary calendar / editor</p>
              <p className="pl-4">└─ share image / watermark</p>
              <p className="pl-8">↓</p>
              <p className="pl-4">SQLite + FileSystem</p>
              <p className="pl-8">↓</p>
              <p className="pl-4">Open-Meteo / Device APIs</p>
            </div>
          </div>

          <div className="grid gap-4">
            <InfoTable title="주요 파일" rows={projectStructure} />
            <ChipPanel
              title="핵심 데이터"
              items={["date", "temperature", "weather", "outfit memo", "image uri"]}
            />
            <ChipPanel
              title="디바이스 연동"
              items={["location permission", "image picker", "local document directory"]}
            />
          </div>
        </div>
      </CaseSection>

      <CaseSection
        eyebrow="Flow"
        title="기록 플로우"
        description="사용자가 오늘의 날씨를 확인하고 기록을 남긴 뒤, 비슷한 온도의 과거 기록을 다시 참고하는 흐름으로 설계했습니다."
      >
        <div className="grid auto-rows-fr gap-4 lg:grid-cols-3">
          {implementationCards.map((flow) => (
            <div key={flow.title} className={`h-full border-t-2 ${flow.tone} border-x border-b border-zinc-200 p-5`}>
              <h5 className="text-lg font-semibold">{flow.title}</h5>
              <div className="mt-4 flex flex-wrap gap-2">
                {flow.items.map((item) => (
                  <span key={item} className="bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid auto-rows-fr gap-5 xl:grid-cols-3">
          <FlowColumn title="사용자 플로우" items={recordFlow} />
          <FlowColumn title="데이터 플로우" items={dataFlow} />
          <div className="h-full border border-zinc-200 p-5">
            <h5 className="text-lg font-semibold text-zinc-950">추천 기준</h5>
            <div className="mt-4 grid auto-rows-fr gap-3">
              {[
                ["현재 온도", "위치 기반 날씨 API에서 받은 온도를 기준값으로 사용"],
                ["과거 기록", "SQLite에 저장된 날짜별 온도와 비교"],
                ["유사 기록", "온도 차이가 작은 기록을 홈 화면 추천 영역에 노출"],
              ].map(([title, desc], index) => (
                <div key={title} className="grid min-h-[86px] grid-cols-[34px_1fr] gap-3 border border-zinc-200 bg-zinc-50 p-3">
                  <span className="text-xs font-semibold text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <b className="text-sm text-zinc-950">{title}</b>
                    <p className="mt-1 text-xs leading-5 text-zinc-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CaseSection>

      <CaseSection
        eyebrow="Implementation"
        title="구현 판단"
        description="모바일 기록 앱에서 실제 사용성을 좌우하는 저장 지속성, API 책임 분리, 캘린더 탐색 밀도를 중심으로 정리했습니다."
      >
        <div className="grid gap-4 xl:grid-cols-3">
          {troubleshooting.map((item) => (
            <div key={item.title} className="border border-zinc-200 p-5">
              <h5 className="text-base font-semibold text-zinc-950">{item.title}</h5>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">AS-IS</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{item.asIs}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">TO-BE</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">{item.toBe}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">NEXT</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{item.next}</p>
            </div>
          ))}
        </div>
      </CaseSection>

      <CaseSection
        eyebrow="Retrospective"
        title="회고"
        description="날씨 정보 자체보다 이후 다시 참고할 수 있는 개인 옷차림 기록을 만드는 데 집중했습니다."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <TextList
            title="좋았던 점"
            items={[
              "온도와 실제 옷차림을 연결해 재사용 가능한 개인 기록으로 설계",
              "이미지를 앱 내부 파일로 보관해 기록의 지속성을 확보",
              "SQLite 기반 날짜 저장으로 앱 재실행 후에도 기록이 유지되도록 구현",
              "상단 액션 중심 이동으로 감성적인 기록 앱 분위기와 사용 흐름을 맞춤",
            ]}
          />
          <TextList
            title="개선점"
            items={[
              "날씨 조회 모듈의 책임을 더 명확히 분리",
              "현재 위치와 날짜 기준 날씨 캐싱 추가",
              "클라우드 동기화와 계정 기반 백업으로 여러 기기 사용 지원",
              "기록이 많아졌을 때 온도대/계절별 필터 추가",
            ]}
          />
          <div className="lg:col-span-2">
            <InfoTable title="업그레이드 방향" rows={versionPlan} />
          </div>
        </div>
      </CaseSection>
    </div>
  );
}

function HelaxLowerDetail() {
  const architecture = [
    { label: "Client", value: "Next.js App Router", tone: "text-emerald-600" },
    { label: "Route", value: "Public / Admin / API", tone: "text-violet-600" },
    { label: "Server", value: "Route Handler / Action", tone: "text-blue-600" },
    { label: "ORM", value: "Prisma 7", tone: "text-slate-700" },
    { label: "DB", value: "Supabase PostgreSQL", tone: "text-green-700" },
  ];

  const routeGroups = [
    {
      title: "public routes",
      color: "border-emerald-500 text-emerald-700",
      items: ["메인", "객실 목록/상세", "로그인/회원가입", "마이페이지", "커뮤니티/공지"],
    },
    {
      title: "admin routes",
      color: "border-orange-500 text-orange-700",
      items: ["관리자 대시보드", "객실 관리", "예약 관리", "공지 관리"],
    },
    {
      title: "API routes",
      color: "border-blue-500 text-blue-700",
      items: ["auth", "rooms", "reservations", "reviews", "notices"],
    },
  ];

  const commonComponents = [
    "PublicPageShell",
    "RoomCard",
    "ReservationForm",
    "ReviewSection",
    "AdminCard",
    "SubBanner",
  ];

  const projectStructure = [
    ["app/(public)", "일반 사용자 페이지"],
    ["app/(admin)", "관리자 페이지"],
    ["app/api", "서버 API Route Handler"],
    ["components", "공통 UI, 관리자 UI, 예약/리뷰 컴포넌트"],
    ["context/UserContext.tsx", "로그인 사용자 상태 관리"],
    ["lib/prisma.ts", "Prisma Client 연결"],
    ["prisma/schema.prisma", "User, Room, Reservation, Review, Notice 스키마"],
  ];

  const userFlow = [
    "회원가입/로그인",
    "객실 목록 조회",
    "검색어, 인원, 가격순 필터링",
    "객실 상세 조회",
    "날짜/인원 선택",
    "예약 가능 여부 검증",
    "예약 생성",
    "마이페이지에서 예약 조회/취소",
    "객실 리뷰 작성 및 조회",
  ];

  const adminFlow = [
    "관리자 로그인",
    "AdminAccessGuard로 관리자 권한 확인",
    "대시보드에서 객실/예약/공지 현황 확인",
    "객실 등록/수정/삭제",
    "예약 상태 변경: PENDING / CONFIRMED / CANCELED",
    "공지 등록/수정/삭제 및 상단 고정 관리",
  ];

  const reservationFlow = [
    ["예약 폼 입력", "체크인/체크아웃, 인원 선택"],
    ["로그인 확인", "UserContext/localStorage 상태 확인"],
    ["POST /api/reservations", "Route Handler 요청"],
    ["필수값 검증", "날짜, 객실, 사용자, 인원 확인"],
    ["중복 예약 검증", "기존 예약과 날짜 겹침 여부 확인"],
    ["Reservation 생성", "총 금액 계산 후 마이페이지에서 확인"],
  ];

  const serviceFlowCards = [
    {
      title: "사용자",
      tone: "border-emerald-500 text-emerald-700",
      items: ["회원가입/로그인", "객실 검색/필터", "상세 확인", "예약 조회/취소", "리뷰 작성"],
    },
    {
      title: "Reservation API",
      tone: "border-blue-500 text-blue-700",
      items: ["POST 요청", "필수값 검증", "날짜/인원 검증", "중복 예약 확인", "Reservation 생성"],
    },
    {
      title: "관리자",
      tone: "border-orange-500 text-orange-700",
      items: ["권한 확인", "대시보드 확인", "객실 관리", "예약 상태 변경", "공지 관리"],
    },
  ];

  const troubleshooting = [
    {
      title: "예약 날짜 중복 검증",
      asIs: "클라이언트에서 날짜와 금액을 계산하면 동일 객실에 겹치는 예약이 들어올 수 있었습니다.",
      toBe: "Route Handler에서 체크인/체크아웃 범위, 객실 활성화, 최대 인원, 기존 예약 겹침 여부를 다시 검증했습니다.",
      next: "트래픽이 늘어나는 버전에서는 트랜잭션 범위와 락 전략을 추가해 동시성 안정성을 높일 계획입니다.",
    },
    {
      title: "인증 및 관리자 권한",
      asIs: "현재 v1은 UserContext/localStorage와 클라이언트 가드 중심이라 포트폴리오 데모에는 충분하지만 보안 한계가 있습니다.",
      toBe: "관리자 화면은 AdminAccessGuard로 분리하고, bcrypt 기반 로그인/회원가입과 사용자 상태 관리를 구성했습니다.",
      next: "다음 버전에서는 HttpOnly 쿠키, 세션/JWT, API 레벨 ADMIN 검증으로 권한 체계를 보강할 예정입니다.",
    },
    {
      title: "Supabase DB 배포 연결",
      asIs: "로컬 개발 기준의 Prisma 연결을 배포 환경에서 그대로 사용하기 어려워 DB 연결 기준을 다시 정리해야 했습니다.",
      toBe: "Supabase PostgreSQL, Prisma Adapter PG, 환경 변수 기준으로 운영 DB 연결 구조를 맞췄습니다.",
      next: "운영 데이터가 늘어나면 페이징 조회, 관리자 검색, 공지 목록에 인덱스와 쿼리 최적화를 적용할 계획입니다.",
    },
  ];

  const versionPlan = [
    ["v1 현재 범위", "객실 조회, 예약 생성, 리뷰, 공지, 관리자 콘솔, Vercel 배포"],
    ["다음 버전 계획", "인증 보강, API 권한 검증, 결제/이메일 알림, 이미지 스토리지, 테스트 코드, 관리자 통계"],
  ];

  return (
    <div className="mt-10 space-y-6">
      <CaseSection
        eyebrow="Architecture"
        title="서비스 구조"
        description="사용자 예약 화면, 관리자 운영 화면, 서버 API를 App Router 구조 안에서 역할별로 분리했습니다."
      >
        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="grid gap-5">
            <div className="grid gap-3 md:grid-cols-5">
              {architecture.map((node) => (
                <div key={node.label} className="border border-zinc-200 bg-zinc-50 p-4 text-center">
                  <b className={`block text-lg ${node.tone}`}>{node.label}</b>
                  <span className="mt-2 block text-xs font-semibold leading-5 text-zinc-600">
                    {node.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {routeGroups.map((group) => (
                <div key={group.title} className={`border-t-2 ${group.color} border-x border-b border-zinc-200 p-5`}>
                  <h5 className="text-base font-semibold">{group.title}</h5>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm leading-6 text-zinc-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border border-zinc-200 bg-zinc-50 p-5 font-mono text-xs leading-6 text-zinc-700">
              <p>Client UI</p>
              <p className="pl-4">↓</p>
              <p>Next.js App Router</p>
              <p className="pl-4">├─ public routes</p>
              <p className="pl-4">├─ admin routes</p>
              <p className="pl-4">└─ API routes</p>
              <p className="pl-8">↓</p>
              <p className="pl-4">Prisma ORM</p>
              <p className="pl-8">↓</p>
              <p className="pl-4">Supabase PostgreSQL</p>
            </div>
          </div>

          <div className="grid gap-4">
            <InfoTable title="주요 구조" rows={projectStructure} />
            <ChipPanel title="공통 컴포넌트" items={commonComponents} />
            <ChipPanel title="데이터 모델" items={["User", "Room", "Reservation", "Review", "Notice", "NoticeComment"]} />
          </div>
        </div>
      </CaseSection>

      <CaseSection
        eyebrow="Flow"
        title="서비스 플로우"
        description="화면 이동 흐름은 짧게, 서버 검증 흐름은 단계별로 보여 면접에서 설명하기 쉽도록 정리했습니다."
      >
        <div className="grid auto-rows-fr gap-4 lg:grid-cols-3">
          {serviceFlowCards.map((flow) => (
            <div key={flow.title} className={`h-full border-t-2 ${flow.tone} border-x border-b border-zinc-200 p-5`}>
              <h5 className="text-lg font-semibold">{flow.title}</h5>
              <div className="mt-4 flex flex-wrap gap-2">
                {flow.items.map((item) => (
                  <span key={item} className="bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid auto-rows-fr gap-5 xl:grid-cols-3">
          <FlowColumn title="사용자 플로우" items={userFlow} />
          <FlowColumn title="관리자 플로우" items={adminFlow} />
          <div className="h-full border border-zinc-200 p-5">
            <h5 className="text-lg font-semibold text-zinc-950">예약 생성 검증</h5>
            <div className="mt-4 grid auto-rows-fr gap-3">
              {reservationFlow.map(([title, desc], index) => (
                <div key={title} className="grid min-h-[86px] grid-cols-[34px_1fr] gap-3 border border-zinc-200 bg-zinc-50 p-3">
                  <span className="text-xs font-semibold text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <b className="text-sm text-zinc-950">{title}</b>
                    <p className="mt-1 text-xs leading-5 text-zinc-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CaseSection>

      <CaseSection
        eyebrow="Troubleshooting"
        title="트러블슈팅"
        description="대규모 백엔드 사례처럼 과장하지 않고, HELAX v1에서 실제로 설명 가능한 문제와 다음 개선 방향을 AS-IS / TO-BE로 정리했습니다."
      >
        <div className="grid gap-4 xl:grid-cols-3">
          {troubleshooting.map((item) => (
            <div key={item.title} className="border border-zinc-200 p-5">
              <h5 className="text-base font-semibold text-zinc-950">{item.title}</h5>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">AS-IS</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{item.asIs}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">TO-BE</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">{item.toBe}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">NEXT</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{item.next}</p>
            </div>
          ))}
        </div>
      </CaseSection>

      <CaseSection
        eyebrow="Retrospective"
        title="회고"
        description="현재 v1에서 구현한 성과와 다음 버전에서 보완할 지점을 분리했습니다."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <TextList
            title="좋았던 점"
            items={[
              "Server Component로 DB 조회 중심 화면을 간결하게 구성",
              "Prisma 관계 모델로 객실-예약-리뷰-사용자 데이터를 연결",
              "사용자 화면과 관리자 화면을 route group으로 분리",
              "예약 생성 시 날짜 역전, 최대 인원, 중복 예약을 서버에서 검증",
            ]}
          />
          <TextList
            title="아쉬운 점 / 개선점"
            items={[
              "localStorage와 Context 중심 인증을 HttpOnly 쿠키, 세션/JWT 기반으로 보강",
              "관리자 접근 제어를 API 레벨에서도 ADMIN 권한 검증하도록 강화",
              "한글 문자열 인코딩을 UTF-8 기준으로 정리",
              "예약/공지/객실 API 테스트 코드 추가",
              "이미지 업로드를 스토리지 연동 구조로 개선",
            ]}
          />
          <div className="lg:col-span-2">
            <InfoTable title="업그레이드 방향" rows={versionPlan} />
          </div>
        </div>
      </CaseSection>
    </div>
  );
}

function DetailSectionBody({ section }: { section: DetailSection }) {
  if (section.table) {
    return (
      <div className="divide-y divide-zinc-200 border border-zinc-200 bg-white">
        {section.table.map((row) => (
          <div key={row.label} className="grid gap-2 p-4 sm:grid-cols-[180px_1fr]">
            <b className="text-sm text-zinc-950">{row.label}</b>
            <p className="text-sm leading-7 text-zinc-600">{row.value}</p>
          </div>
        ))}
      </div>
    );
  }

  if (section.split) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {section.split.map((group) => (
          <div key={group.title} className="border border-zinc-200 bg-white p-5">
            <b className="text-sm text-zinc-950">{group.title}</b>
            <ul className="mt-3 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-zinc-600">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-zinc-950" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  if (section.list) {
    return (
      <ul className="grid gap-2 border border-zinc-200 bg-white p-5">
        {section.list.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-zinc-600">
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-zinc-950" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return <p>{section.summary}</p>;
}

function CaseSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          {eyebrow}
        </p>
        <h4 className="mt-3 text-2xl font-semibold text-zinc-950">{title}</h4>
        <p className="mt-3 text-sm leading-7 text-zinc-600">{description}</p>
      </div>
      <div className="p-6 sm:p-8">{children}</div>
    </section>
  );
}

function FlowColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="h-full border border-zinc-200 p-5">
      <h5 className="text-lg font-semibold text-zinc-950">{title}</h5>
      <ol className="mt-4 grid gap-2">
        {items.map((item, index) => (
          <li
            key={`${title}-${item}`}
            className="grid grid-cols-[28px_1fr] gap-2 text-sm leading-6 text-zinc-700"
          >
            <span className="pt-0.5 text-xs font-semibold text-zinc-400">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function InfoTable({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="border border-zinc-200 p-5">
      <h5 className="text-lg font-semibold text-zinc-950">{title}</h5>
      <div className="mt-4 divide-y divide-zinc-200 border border-zinc-200">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-2 p-3 sm:grid-cols-[150px_1fr]">
            <code className="text-xs font-semibold text-zinc-950">{label}</code>
            <span className="text-xs leading-5 text-zinc-600">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChipPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-zinc-200 p-5">
      <h5 className="text-lg font-semibold text-zinc-950">{title}</h5>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-600">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function TextList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-zinc-200 p-5">
      <h5 className="text-lg font-semibold text-zinc-950">{title}</h5>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-zinc-700">
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-zinc-950" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MiniPanel({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="border border-zinc-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{label}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-zinc-950" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
