"use client";

import FullPage from "@/components/fullpage/FullPage";
import IntroSection from "@/components/sections/IntroSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedSection from "@/components/sections/FeaturedSection";
import ClientWorkSection from "@/components/sections/ProjectsSection";

export default function Home() {
  return (
    <FullPage>
      <IntroSection />
      <AboutSection />
      <FeaturedSection />
      <ClientWorkSection />
    </FullPage>
  );
}
