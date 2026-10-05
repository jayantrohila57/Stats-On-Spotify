"use client";

import { AnalyticsDashboardSkeleton } from "@/features/dashboard/components/analytics-dashboard-skeleton";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { StatsErrorState } from "@/components/stats/stats-feedback";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
  const { data, isLoading, isRefreshingTops, error, timeRange, setTimeRange, refetch } = useDashboardData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <AnalyticsDashboardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-8">
        <div className="w-full max-w-lg">
          <StatsErrorState message={error} onRetry={refetch} />
          <Button className="mt-4" variant="outline" onClick={() => refetch()}>
            Reload dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <DashboardShell
      data={data}
      timeRange={timeRange}
      onTimeRangeChange={setTimeRange}
      isRefreshingTops={isRefreshingTops}
    />
  );
}
