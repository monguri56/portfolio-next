"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <div className="h-full w-full bg-white flex items-center justify-center">
      <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex justify-center">
          <div className="flex w-full max-w-[1240px] flex-col lg:flex-row gap-10 lg:gap-14 items-center lg:items-center">
            {/* LEFT */}
            <div className="w-full sm:w-[360px] lg:w-[360px] shrink-0">
              <div className="flex flex-col items-center">
                {/* 이미지 */}
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
                    <a
                      href="/pdf/resume.pdf"
                      download
                      className="h-12 sm:h-14 w-full flex items-center justify-center bg-zinc-300 text-zinc-800 text-sm hover:bg-zinc-400 transition"
                    >
                      이력서 PDF
                    </a>

                    <a
                      href="/pdf/employment.pdf"
                      download
                      className="h-12 sm:h-14 w-full flex items-center justify-center bg-zinc-300 text-zinc-800 text-sm hover:bg-zinc-400 transition"
                    >
                      경력증명서 PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
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
                {/* Design */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-zinc-900">
                    Design
                  </h3>
                  <p className="mt-3 sm:mt-5 text-sm sm:text-base text-zinc-700">
                    웹 화면을 직접 설계합니다
                  </p>

                  <ul className="mt-6 sm:mt-8 space-y-6 sm:space-y-8 border-l border-zinc-400 pl-5 sm:pl-6">
                    <li>
                      <p className="text-sm sm:text-base font-semibold text-zinc-900">
                        Figma
                      </p>
                      <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-zinc-600">
                        웹사이트 구조 설계, 와이어프레임 및 화면 디자인 작업
                        <br />
                        개발을 고려한 컴포넌트 구성과 레이아웃 설계 가능
                      </p>
                    </li>
                    <li>
                      <p className="text-sm sm:text-base font-semibold text-zinc-900">
                        Photoshop
                      </p>
                      <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-zinc-600">
                        이미지 제작 및 보정, 배너·비주얼 리소스 작업
                        <br />
                        디자인 요소를 개발에 맞게 정리하여 활용
                      </p>
                    </li>
                    <li>
                      <p className="text-sm sm:text-base font-semibold text-zinc-900">
                        Illustrator
                      </p>
                      <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-zinc-600">
                        아이콘, 벡터 이미지 수정 및 간단한 그래픽 작업
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Development */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-zinc-900">
                    Development
                  </h3>
                  <p className="mt-3 sm:mt-5 text-sm sm:text-base text-zinc-700">
                    웹 화면의 구조와 기능을 구현합니다
                  </p>

                  <ul className="mt-6 sm:mt-8 space-y-6 sm:space-y-8 border-l border-zinc-400 pl-5 sm:pl-6">
                    <li>
                      <p className="text-sm sm:text-base font-semibold text-zinc-900">
                        HTML5, CSS3, JavaScript (ES6+)
                      </p>
                      <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-zinc-600">
                        웹 표준 기반의 마크업과 레이아웃 구성,
                        <br />
                        동적 UI와 사용자 인터랙션 구현
                      </p>
                    </li>

                    <li>
                      <p className="text-sm sm:text-base font-semibold text-zinc-900">
                        React, Next.js, TypeScript, Tailwind CSS
                      </p>
                      <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-zinc-600">
                        컴포넌트 기반 UI 설계와 라우팅 구조를 중심으로,
                        <br />
                        유지보수를 고려한 화면 구현
                      </p>
                    </li>

                    <li>
                      <p className="text-sm sm:text-base font-semibold text-zinc-900">
                        PHP, MySQL, Prisma
                      </p>
                      <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-zinc-600">
                        프론트엔드 개발에 필요한 데이터 구조를 이해하고,
                        <br />
                        CRUD 구현 및 기존 서비스의 유지·확장 작업 수행
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* RIGHT 끝 */}
          </div>
        </div>
      </div>
    </div>
  );
}