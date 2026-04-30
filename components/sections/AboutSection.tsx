"use client";

import Image from "next/image";
import DownloadLink from "./about/DownloadLink";
import SkillColumn from "./about/SkillColumn";

const designSkills = [
  {
    title: "Figma",
    description: (
      <>
        웹사이트 구조 설계, 와이어프레임 및 화면 디자인 작업
        <br />
        개발을 고려한 컴포넌트 구성과 레이아웃 설계 가능
      </>
    ),
  },
  {
    title: "Photoshop",
    description: (
      <>
        이미지 제작 및 보정, 배너·비주얼 리소스 작업
        <br />
        디자인 요소를 개발에 맞게 정리하여 활용
      </>
    ),
  },
  {
    title: "Illustrator",
    description: <>아이콘, 벡터 이미지 수정 및 간단한 그래픽 작업</>,
  },
];

const developmentSkills = [
  {
    title: "HTML5, CSS3, JavaScript (ES6+)",
    description: (
      <>
        웹 표준 기반의 마크업과 레이아웃 구성,
        <br />
        동적 UI와 사용자 인터랙션 구현
      </>
    ),
  },
  {
    title: "React, Next.js, TypeScript, Tailwind CSS",
    description: (
      <>
        컴포넌트 기반 UI 설계와 라우팅 구조를 중심으로,
        <br />
        유지보수를 고려한 화면 구현
      </>
    ),
  },
  {
    title: "PHP, MySQL, Prisma",
    description: (
      <>
        프론트엔드 개발에 필요한 데이터 구조를 이해하고,
        <br />
        CRUD 구현 및 기존 서비스의 유지·확장 작업 수행
      </>
    ),
  },
];

export default function AboutSection() {
  return (
    <div className="h-full w-full bg-white flex items-center justify-center">
      <div className="w-full max-w-[1500px] px-5 sm:px-8 lg:px-10 py-12">
        <div className="flex justify-center">
          <div className="flex w-full flex-col lg:flex-row gap-10 lg:gap-14 items-center lg:items-center">
            <div className="w-full sm:w-[360px] lg:w-[360px] shrink-0">
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-100">
                  <Image
                    src="/about/profile.png"
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-10 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                    <DownloadLink href="/pdf/resume.pdf">이력서 PDF</DownloadLink>
                    <DownloadLink href="/pdf/employment.pdf">경력증명서 PDF</DownloadLink>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0 w-full">
              <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
                Work Style
              </h2>

              <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-6 sm:leading-7 text-zinc-700">
                역할이 주어지면 필요한 기술을 스스로 익혀 문제를 해결해왔습니다.
                <br className="hidden sm:block" />
                한 영역에 머무르기보다, 서비스가 완성되는 흐름 전체를 이해하려
                노력합니다.
              </p>

              <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
                <SkillColumn
                  title="Design"
                  summary="웹 화면을 직접 설계합니다"
                  skills={designSkills}
                />
                <SkillColumn
                  title="Development"
                  summary="웹 화면의 구조와 기능을 구현합니다"
                  skills={developmentSkills}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
