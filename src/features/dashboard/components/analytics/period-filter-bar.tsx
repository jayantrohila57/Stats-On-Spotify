"use client";

import { ANALYTICS_PERIODS, baselineCompareLabel, periodToTimeRange } from "@/lib/spotify/period";
import { useAnalyticsPeriod } from "@/features/dashboard/context/analytics-period-context";
import { PageContainer } from "@/components/layout/page-container";
import { SEGMENTED_CONTROL_CLASS } from "@/lib/ui/layout-classes";
import { cn } from "@/lib/utils";

export function PeriodFilterBar() {
  const { period, setPeriod } = useAnalyticsPeriod();

  return (
    <div className="border-b border-border bg-background">
      <PageContainer className="flex flex-wrap items-center gap-3 py-2.5">
        <span className="text-xs font-medium text-muted-foreground">Period</span>
        <div className={SEGMENTED_CONTROL_CLASS} role="group" aria-label="Time period">
          {ANALYTICS_PERIODS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPeriod(item.id)}
              className={cn(
                "rounded px-3 py-1 text-xs font-medium transition-colors",
                period === item.id
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="hidden min-w-0 text-xs text-muted-foreground sm:block">
          Applies to top tracks, top artists, and derived metrics. Rank “Was” / movement compares to{" "}
          {baselineCompareLabel(periodToTimeRange(period))}.
        </p>
      </PageContainer>
    </div>
  );
}
