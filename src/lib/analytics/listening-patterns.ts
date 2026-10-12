import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type HourBucket = { hour: number; hourLabel: string; count: number; share: number };
export type WeekdayBucket = { weekday: number; label: string; count: number; share: number };

export type ListeningBucketOptions = {
  /** IANA timezone; omit to use the runtime default (browser local). */
  timeZone?: string;
};

function getZonedParts(iso: string, timeZone?: string): { hour: number; weekday: number } {
  const date = new Date(iso);
  if (!timeZone) {
    return { hour: date.getHours(), weekday: date.getDay() };
  }
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    weekday: "short",
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const weekdayShort = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const weekday = WEEKDAY_LABELS.indexOf(weekdayShort);
  return { hour, weekday: weekday >= 0 ? weekday : date.getDay() };
}

export const EMPTY_HOUR_BUCKETS: HourBucket[] = Array.from({ length: 24 }, (_, hour) => ({
  hour,
  hourLabel: `${hour}`,
  count: 0,
  share: 0,
}));

export const EMPTY_WEEKDAY_BUCKETS: WeekdayBucket[] = WEEKDAY_LABELS.map((label, weekday) => ({
  weekday,
  label,
  count: 0,
  share: 0,
}));

export function deriveHourDistribution(
  items: SpotifyPlayHistoryItem[],
  options?: ListeningBucketOptions,
): HourBucket[] {
  const counts = Array.from({ length: 24 }, () => 0);
  for (const item of items) {
    const { hour } = getZonedParts(item.played_at, options?.timeZone);
    counts[hour]++;
  }
  const total = counts.reduce((a, b) => a + b, 0);
  return counts.map((count, hour) => ({
    hour,
    hourLabel: `${hour}`,
    count,
    share: total > 0 ? count / total : 0,
  }));
}

export function deriveWeekdayDistribution(
  items: SpotifyPlayHistoryItem[],
  options?: ListeningBucketOptions,
): WeekdayBucket[] {
  const counts = Array.from({ length: 7 }, () => 0);
  for (const item of items) {
    const { weekday } = getZonedParts(item.played_at, options?.timeZone);
    counts[weekday]++;
  }
  const total = counts.reduce((a, b) => a + b, 0);
  return counts.map((count, weekday) => ({
    weekday,
    label: WEEKDAY_LABELS[weekday],
    count,
    share: total > 0 ? count / total : 0,
  }));
}
