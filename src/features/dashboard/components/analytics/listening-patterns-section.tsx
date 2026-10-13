"use client";

import { Clock3 } from "lucide-react";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";
import { deriveHourDistribution, deriveWeekdayDistribution } from "@/lib/analytics/listening-patterns";
type ListeningPatternsSectionProps = {
  items: SpotifyPlayHistoryItem[];
};

function DistributionList({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; count: number; share: number }>;
}) {
  const max = Math.max(...rows.map((r) => r.count), 1);

  return (
    <div className="min-w-0 space-y-2">
      <h3 className="text-xs font-medium text-foreground">{title}</h3>
      <ul className="space-y-1.5">
        {rows.map((row) => (
          <li key={row.label}>
            <div className="mb-0.5 flex items-center justify-between gap-4 text-xs">
              <span className="min-w-0 truncate font-medium tabular-nums">{row.label}</span>
              <span className="shrink-0 text-muted-foreground">
                {row.count} · {(row.share * 100).toFixed(0)}%
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-sm bg-muted">
              <div
                className="h-full bg-chart-2"
                style={{ width: `${Math.max((row.count / max) * 100, row.count > 0 ? 4 : 0)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ListeningPatternsSection({ items }: ListeningPatternsSectionProps) {
  const hours = deriveHourDistribution(items);
  const weekdays = deriveWeekdayDistribution(items);
  const hasData = items.length > 0;
  const peakHour = hours.reduce((best, b) => (b.count > best.count ? b : best), hours[0]);
  const peakDay = weekdays.reduce((best, b) => (b.count > best.count ? b : best), weekdays[0]);

  const description = hasData
    ? `${items.length} plays in sample · busiest hour ${peakHour.hour}:00 (${peakHour.count} plays, ${(peakHour.share * 100).toFixed(0)}%) · busiest day ${peakDay.label} (${peakDay.count})`
    : "Hour and weekday distribution from your recent plays sample — not all-time history";

  const hourRows = hours
    .filter((b) => b.count > 0)
    .sort((a, b) => a.hour - b.hour)
    .map((b) => ({ label: `${b.hour}:00`, count: b.count, share: b.share }));

  const weekdayRows = weekdays.map((b) => ({ label: b.label, count: b.count, share: b.share }));

  return (
    <SectionShell
      icon={Clock3}
      title="Listening patterns"
      description={description}
      isLoading={false}
      error={null}
      isEmpty={!hasData}
      emptyTitle="Not enough recent plays"
      emptyDescription="Load recently played data to see hour and weekday patterns from that window."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <DistributionList title="Plays by hour (local time)" rows={hourRows} />
        <DistributionList title="Plays by weekday" rows={weekdayRows} />
      </div>
    </SectionShell>
  );
}
