"use client";

import Image from "next/image";

export default function IntroSection() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-white">
        <div
        className="
            relative
            aspect-square
            w-[72vw] max-w-[720px]
            rounded-full
            bg-white
            flex flex-col items-center justify-center
            text-center
            intro-shadow
        "
        >

        <div className="relative w-[220px] h-[120px] sm:w-[260px] sm:h-[140px] intro-fade-logo">
          <Image
            src="/intro-logo.png"
            alt="intro logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <p className="mt-6 px-8 text-[14px] sm:text-[16px] leading-7 text-zinc-700 intro-fade-text">
          가꾸지 않아도 저절로 나서 자라는 여러 가지 풀
          <br />
          잡초처럼 환경이 바뀌어도 스스로 배우고 적응합니다.
        </p>
      </div>
    </div>
  );
}
