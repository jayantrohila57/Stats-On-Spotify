"use client";

import { Cell, Pie, PieChart } from "recharts";
import { deriveGenreStatsWithOther, formatGenreLabel } from "@/lib/analytics/derive";
import { deriveHourDistribution } from "@/lib/analytics/listening-patterns";
import type { SpotifyArtist } from "@/lib/spotify/types";
import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const PIE_COLORS = [
  "oklch(0.72 0.04 265)",
  "oklch(0.65 0.03 265)",
  "oklch(0.58 0.02 265)",
  "oklch(0.52 0.02 265)",
  "oklch(0.46 0.02 265)",
  "oklch(0.4 0.02 265)",
];

type OverviewMiniChartProps = {
  topArtists: SpotifyArtist[];
  recentPlays: SpotifyPlayHistoryItem[];
};

export function OverviewMiniChart({ topArtists, recentPlays }: OverviewMiniChartProps) {
  const genreStats = deriveGenreStatsWithOther(topArtists, 5);
  const hours = deriveHourDistribution(recentPlays);
  const peakHour = hours.reduce((best, bucket) => (bucket.count > best.count ? bucket : best), hours[0]);
  const topGenre = genreStats[0];

  const pieData = genreStats.map((item) => ({
    name: item.genre === "other" ? "Other" : formatGenreLabel(item.genre),
    value: item.count,
    share: item.share,
  }));

  const pieConfig = pieData.reduce<Record<string, { label: string }>>((acc, item) => {
    acc[item.name] = { label: item.name };
    return acc;
  }, {});

  if (pieData.length === 0 && recentPlays.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 rounded-md border border-border/70 bg-background/40 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium">Overview snapshot</p>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            {topGenre
              ? `${topGenre.genre === "other" ? "Other" : formatGenreLabel(topGenre.genre)} covers ${(topGenre.share * 100).toFixed(0)}% of top-artist genre tags · ${genreStats.length} tags in mix`
              : "No genre tags on top artists for this period"}
            {recentPlays.length > 0
              ? ` · Peak recent-play hour: ${peakHour.hour}:00 (${peakHour.count} of ${recentPlays.length} sample plays, ${(peakHour.share * 100).toFixed(0)}%)`
              : ""}
          </p>
        </div>
        {pieData.length > 0 ? (
          <ChartContainer config={pieConfig} className="mx-auto aspect-square h-[120px] w-[120px] shrink-0">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={32} outerRadius={52} strokeWidth={1}>
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : null}
      </div>
    </div>
  );
}
