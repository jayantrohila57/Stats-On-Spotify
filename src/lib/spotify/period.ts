import type { SpotifyTimeRange } from "@/lib/spotify/time-range";

export type { SpotifyTimeRange };

export type AnalyticsPeriodId = "4w" | "6m" | "all";

export const ANALYTICS_PERIODS: { id: AnalyticsPeriodId; label: string; timeRange: SpotifyTimeRange }[] = [
  { id: "4w", label: "Last 4 weeks", timeRange: "short_term" },
  { id: "6m", label: "6 months", timeRange: "medium_term" },
  { id: "all", label: "All time", timeRange: "long_term" },
];

export function periodToTimeRange(period: AnalyticsPeriodId): SpotifyTimeRange {
  return ANALYTICS_PERIODS.find((p) => p.id === period)?.timeRange ?? "medium_term";
}

/**
 * Baseline period for rank comparison (the "Was" column).
 * - 4 weeks → compare to 6 months
 * - 6 months → compare to all time
 * - All time → compare to 6 months (recent medium-term window)
 */
export function baselineCompareRange(active: SpotifyTimeRange): SpotifyTimeRange {
  if (active === "short_term") return "medium_term";
  if (active === "medium_term") return "long_term";
  return "medium_term";
}

export function baselineCompareLabel(active: SpotifyTimeRange): string {
  const compare = baselineCompareRange(active);
  return ANALYTICS_PERIODS.find((p) => p.timeRange === compare)?.label ?? compare;
}
