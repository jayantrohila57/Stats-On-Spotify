"use client";

import { Cell, Pie, PieChart } from "recharts";
import { deriveGenreStatsWithOther, formatGenreLabel } from "@/lib/analytics/derive";
import type { SpotifyArtist } from "@/lib/spotify/types";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { GenrePeriodChart } from "@/features/dashboard/components/analytics/genre-period-chart";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const PIE_COLORS = [
  "oklch(0.72 0.04 265)",
  "oklch(0.65 0.03 265)",
  "oklch(0.58 0.02 265)",
  "oklch(0.52 0.02 265)",
  "oklch(0.46 0.02 265)",
  "oklch(0.4 0.02 265)",
  "oklch(0.55 0.04 200)",
  "oklch(0.5 0.03 200)",
  "oklch(0.45 0.02 200)",
];

type GenreDistributionProps = {
  artists: SpotifyArtist[];
  artistsByPeriod?: Record<SpotifyTimeRange, SpotifyArtist[]>;
  activeRange?: SpotifyTimeRange;
  compareRange?: SpotifyTimeRange;
  description?: string;
  isLoading: boolean;
  error: string | null;
};

export function GenreDistribution({
  artists,
  artistsByPeriod,
  activeRange,
  compareRange,
  description,
  isLoading,
  error,
}: GenreDistributionProps) {
  const stats = deriveGenreStatsWithOther(artists);
  const diversity = stats.length;
  const pieData = stats.map((item) => ({
    name: item.genre === "other" ? "Other" : formatGenreLabel(item.genre),
    value: item.count,
    share: item.share,
  }));

  const pieConfig = pieData.reduce<Record<string, { label: string; color?: string }>>((acc, item, index) => {
    acc[item.name] = { label: item.name, color: PIE_COLORS[index % PIE_COLORS.length] };
    return acc;
  }, {});

  return (
    <SectionShell
      title="Genre distribution"
      description={description ?? "Derived from genre tags on your top artists"}
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && !error && stats.length === 0}
      emptyTitle="No genre metadata"
      emptyDescription="Spotify did not return genre tags for your top artists in this period."
      meta={
        stats.length > 0 ? (
          <span className="text-xs text-muted-foreground">
            Diversity (derived): <span className="font-medium text-foreground">{diversity}</span> tags shown
          </span>
        ) : null
      }
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <ul className="min-w-0 flex-1 space-y-3">
          {stats.map((item) => (
            <li key={item.genre}>
              <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                <span className="truncate font-medium">
                  {item.genre === "other" ? "Other" : formatGenreLabel(item.genre)}
                </span>
                <span className="shrink-0 font-mono-stats text-muted-foreground">
                  {item.count} artist{item.count === 1 ? "" : "s"} · {(item.share * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-sm bg-muted">
                <div className="h-full bg-foreground/70" style={{ width: `${Math.max(item.share * 100, 2)}%` }} />
              </div>
            </li>
          ))}
        </ul>
        {pieData.length > 0 ? (
          <ChartContainer config={pieConfig} className="mx-auto aspect-square max-h-[160px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={42} outerRadius={64} strokeWidth={1}>
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-xs font-medium">
                {diversity}
              </text>
            </PieChart>
          </ChartContainer>
        ) : null}
      </div>
      {artistsByPeriod && activeRange && compareRange ? (
        <GenrePeriodChart artistsByPeriod={artistsByPeriod} activeRange={activeRange} compareRange={compareRange} />
      ) : null}
    </SectionShell>
  );
}
