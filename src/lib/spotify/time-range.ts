export type SpotifyTimeRange = "short_term" | "medium_term" | "long_term";

export const TIME_RANGE_OPTIONS: {
  value: SpotifyTimeRange;
  label: string;
  shortLabel: string;
}[] = [
  { value: "short_term", label: "Last 4 weeks", shortLabel: "4 weeks" },
  { value: "medium_term", label: "Last 6 months", shortLabel: "6 months" },
  { value: "long_term", label: "All time", shortLabel: "All time" },
];

const VALID: SpotifyTimeRange[] = ["short_term", "medium_term", "long_term"];

export function parseTimeRange(value: string | null | undefined): SpotifyTimeRange {
  if (value && VALID.includes(value as SpotifyTimeRange)) {
    return value as SpotifyTimeRange;
  }
  return "medium_term";
}

export function timeRangeLabel(range: SpotifyTimeRange): string {
  return TIME_RANGE_OPTIONS.find((o) => o.value === range)?.label ?? "Last 6 months";
}
