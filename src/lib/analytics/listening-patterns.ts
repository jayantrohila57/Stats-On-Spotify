import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type HourBucket = { hour: number; count: number; share: number };
export type WeekdayBucket = { weekday: number; label: string; count: number; share: number };

export function deriveHourDistribution(items: SpotifyPlayHistoryItem[]): HourBucket[] {
  const counts = Array.from({ length: 24 }, () => 0);
  for (const item of items) {
    counts[new Date(item.played_at).getHours()]++;
  }
  const total = counts.reduce((a, b) => a + b, 0);
  return counts.map((count, hour) => ({
    hour,
    count,
    share: total > 0 ? count / total : 0,
  }));
}

export function deriveWeekdayDistribution(items: SpotifyPlayHistoryItem[]): WeekdayBucket[] {
  const counts = Array.from({ length: 7 }, () => 0);
  for (const item of items) {
    counts[new Date(item.played_at).getDay()]++;
  }
  const total = counts.reduce((a, b) => a + b, 0);
  return counts.map((count, weekday) => ({
    weekday,
    label: WEEKDAY_LABELS[weekday],
    count,
    share: total > 0 ? count / total : 0,
  }));
}
