"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import {
  countDistinctGenreTags,
  deriveGenreStatsWithOther,
  formatGenreLabel,
} from "@/lib/analytics/derive";
import type { SpotifyArtist } from "@/lib/spotify/types";
import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  DASHBOARD_CHART_CLASS,
  dashboardChartColors,
  seriesChartConfig,
} from "@/features/dashboard/lib/chart-theme";
import { useClientListeningDistributions } from "@/features/dashboard/hooks/use-client-listening-distributions";

type OverviewMiniChartProps = {
  topArtists: SpotifyArtist[];
  recentPlays: SpotifyPlayHistoryItem[];
};

export function OverviewMiniChart({ topArtists, recentPlays }: OverviewMiniChartProps) {
  const genreStats = deriveGenreStatsWithOther(topArtists, 5);
  const distinctTags = countDistinctGenreTags(topArtists);
  const { hours } = useClientListeningDistributions(recentPlays);
  const peakHour = hours.reduce((best, bucket) => (bucket.count > best.count ? bucket : best), hours[0]);
  const topGenre = genreStats[0];

  const barData = genreStats.map((item) => {
    const value = Math.round(item.share * 100);
    return {
      label: item.genre === "other" ? "Other" : formatGenreLabel(item.genre),
      value,
      valueLabel: `${value}%`,
    };
  });

  const barChartConfig = {
    ...seriesChartConfig,
    value: { label: "Share", color: dashboardChartColors.primary },
  };

  if (barData.length === 0 && recentPlays.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 rounded-md border border-border/70 bg-background/40 p-3 sm:p-4">
      <div className="flex flex-col gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium">Overview snapshot</p>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            {topGenre
              ? `${topGenre.genre === "other" ? "Other" : formatGenreLabel(topGenre.genre)} covers ${(topGenre.share * 100).toFixed(0)}% of top-artist genre tags · ${distinctTags} distinct tags`
              : "No genre tags on top artists for this period"}
            {recentPlays.length > 0
              ? ` · Peak recent-play hour: ${peakHour.hour}:00 (${peakHour.count} of ${recentPlays.length} sample plays, ${(peakHour.share * 100).toFixed(0)}%)`
              : ""}
          </p>
        </div>
        {barData.length > 0 ? (
          <ChartContainer config={barChartConfig} className={DASHBOARD_CHART_CLASS}>
            <BarChart
              accessibilityLayer
              data={barData}
              layout="vertical"
              margin={{ right: 24, left: 4, top: 2, bottom: 2 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <YAxis dataKey="label" type="category" hide />
              <XAxis dataKey="value" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" formatter={(v) => [`${v}%`, "Share"]} />}
              />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} maxBarSize={18}>
                <LabelList
                  dataKey="label"
                  position="insideLeft"
                  offset={6}
                  className="fill-[--color-label]"
                  fontSize={10}
                />
                <LabelList
                  dataKey="valueLabel"
                  position="right"
                  offset={6}
                  className="fill-foreground"
                  fontSize={10}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : null}
      </div>
    </div>
  );
}
