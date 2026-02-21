"use client";

import Image from "next/image";

export default function IntroSection() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
      <div
        className="
          relative
          aspect-square

          w-[85vw]
          sm:w-[70vw]
          md:w-[60vw]
          lg:w-[520px]
          xl:w-[600px]

          rounded-full
          bg-white

          flex flex-col items-center justify-center text-center

          intro-shadow
        "
      >
        {/* logo */}
        <div
          className="
            relative

            w-[160px] h-[90px]
            sm:w-[200px] sm:h-[110px]
            md:w-[240px] md:h-[130px]
            lg:w-[260px] lg:h-[140px]

            intro-fade-logo
          "
        >
          <Image
            src="/intro-logo.png"
            alt="intro logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* text */}
        <p
          className="
            mt-4 sm:mt-6 md:mt-7

            px-6 sm:px-8 md:px-10

            text-[13px]
            sm:text-[14px]
            md:text-[15px]
            lg:text-[16px]

            leading-6
            sm:leading-7
            md:leading-8

            text-zinc-700

            intro-fade-text
          "
        >
          가꾸지 않아도 저절로 나서 자라는 여러 가지 풀
          <br />
          잡초처럼 환경이 바뀌어도 스스로 배우고 적응합니다.
        </p>
      </div>
    </div>
  );
}