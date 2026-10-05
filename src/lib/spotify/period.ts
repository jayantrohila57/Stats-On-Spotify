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
