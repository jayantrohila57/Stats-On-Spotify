"use client";

import { useSessionGuard } from "@/features/auth/hooks/use-session-guard";
import { StatsLoadingList, StatsSignInPrompt } from "@/components/stats/stats-feedback";
import { AnalyticsPeriodProvider } from "@/features/dashboard/context/analytics-period-context";
import { AnalyticsDashboard } from "@/features/dashboard/components/analytics/analytics-dashboard";
import { AnalyticsDashboardSkeleton } from "@/features/dashboard/components/analytics-dashboard-skeleton";

export function DashboardPage() {
  const { status } = useSessionGuard();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background">
        <AnalyticsDashboardSkeleton />
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-8">
        <StatsSignInPrompt />
      </div>
    );
  }

  return (
    <AnalyticsPeriodProvider>
      <AnalyticsDashboard />
    </AnalyticsPeriodProvider>
  );
}
