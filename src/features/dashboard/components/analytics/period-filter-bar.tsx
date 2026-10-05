"use client";

import { ANALYTICS_PERIODS, baselineCompareLabel, periodToTimeRange } from "@/lib/spotify/period";
import { useAnalyticsPeriod } from "@/features/dashboard/context/analytics-period-context";
import { cn } from "@/lib/utils";

export function PeriodFilterBar() {
  const { period, setPeriod } = useAnalyticsPeriod();

  return (
    <div className="border-b border-border/60 bg-background">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-4 py-2.5 md:px-6">
        <span className="text-xs font-medium text-muted-foreground">Period</span>
        <div className="inline-flex rounded-md border border-border/80 p-0.5" role="group" aria-label="Time period">
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
        <p className="text-xs text-muted-foreground">
          Applies to top tracks, top artists, and derived metrics. Rank “Was” / movement compares to{" "}
          {baselineCompareLabel(periodToTimeRange(period))}.
        </p>
      </div>
    </div>
  );
}
