import { Suspense } from "react";
import { StatsDashboard } from "@/features/dashboard/components/stats-dashboard";
import { GetStartedFromQuery } from "@/features/home/components/get-started-from-query";
import { GetStartedSection } from "@/features/home/components/get-started-section";
import { HeroSection } from "@/features/home/components/hero-section";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <GetStartedFromQuery />
      </Suspense>
      <HeroSection />
      <GetStartedSection />
      <StatsDashboard />
    </>
  );
}
