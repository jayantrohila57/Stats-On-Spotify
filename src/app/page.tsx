import { StatsDashboard } from "@/features/dashboard/components/stats-dashboard";
import { GetStartedSection } from "@/features/home/components/get-started-section";
import { HeroSection } from "@/features/home/components/hero-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GetStartedSection />
      <StatsDashboard />
    </>
  );
}
