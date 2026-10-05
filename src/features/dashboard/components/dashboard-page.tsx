"use client";

import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { StatsErrorState, StatsLoadingList } from "@/components/stats/stats-feedback";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
  const { data, isLoading, error, refetch } = useDashboardData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] p-8">
        <StatsLoadingList rows={10} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] p-8">
        <div className="w-full max-w-lg">
          <StatsErrorState message={error} onRetry={refetch} />
          <Button className="mt-4" variant="outline" onClick={() => refetch()}>
            Reload dashboard
          </Button>
        </div>
      </div>
    );
  }

  return <DashboardShell data={data} />;
}
