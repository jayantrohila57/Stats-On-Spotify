"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import {
  countDistinctGenreTags,
  deriveGenreStatsWithOther,
  formatGenreLabel,
} from "@/lib/analytics/derive";
import type { SpotifyArtist } from "@/lib/spotify/types";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { GenrePeriodChart } from "@/features/dashboard/components/analytics/genre-period-chart";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  DASHBOARD_CHART_CLASS_TALL,
  dashboardChartColors,
  seriesChartConfig,
} from "@/features/dashboard/lib/chart-theme";

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
  const distinctTags = countDistinctGenreTags(artists);

  const barData = stats.map((item) => {
    const value = Math.round(item.share * 100);
    return {
      label: item.genre === "other" ? "Other" : formatGenreLabel(item.genre),
      value,
      valueLabel: `${value}%`,
      count: item.count,
    };
  });

  const barChartConfig = {
    ...seriesChartConfig,
    value: { label: "Share", color: dashboardChartColors.primary },
  };

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
            <span className="font-medium text-foreground">{distinctTags}</span> distinct tags · top{" "}
            <span className="font-medium text-foreground">{stats.length}</span> shown (incl. Other)
          </span>
        ) : null
      }
    >
      <div className="flex flex-col gap-4">
        <ul className="min-w-0 space-y-2 md:max-w-md">
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
              <div className="h-1 overflow-hidden rounded-sm bg-muted">
                <div className="h-full bg-chart-1" style={{ width: `${Math.max(item.share * 100, 2)}%` }} />
              </div>
            </li>
          ))}
        </ul>
        {barData.length > 0 ? (
          <ChartContainer config={barChartConfig} className={DASHBOARD_CHART_CLASS_TALL}>
            <BarChart
              accessibilityLayer
              data={barData}
              layout="vertical"
              margin={{ right: 28, left: 4, top: 4, bottom: 4 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <YAxis dataKey="label" type="category" hide />
              <XAxis dataKey="value" type="number" hide domain={[0, "dataMax + 4"]} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    formatter={(value, _name, item) => {
                      const count = (item.payload as { count?: number }).count;
                      return [`${value}% · ${count ?? 0} artist tags`, "Share"];
                    }}
                  />
                }
              />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} maxBarSize={22}>
                <LabelList
                  dataKey="label"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={11}
                />
                <LabelList
                  dataKey="valueLabel"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={11}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : null}
      </div>
      {artistsByPeriod && activeRange && compareRange ? (
        <GenrePeriodChart artistsByPeriod={artistsByPeriod} activeRange={activeRange} compareRange={compareRange} />
      ) : null}
    </SectionShell>
  );
}
