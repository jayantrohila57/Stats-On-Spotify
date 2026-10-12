"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { deriveGenrePeriodComparison } from "@/lib/analytics/derive";
import type { SpotifyArtist } from "@/lib/spotify/types";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import { timeRangeLabel } from "@/lib/spotify/time-range";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend } from "@/features/dashboard/components/analytics/chart-legend";
import {
  DASHBOARD_CHART_CLASS_TALL,
  dashboardChartColors,
  periodCompareChartConfig,
} from "@/features/dashboard/lib/chart-theme";

type GenrePeriodChartProps = {
  artistsByPeriod: Record<SpotifyTimeRange, SpotifyArtist[]>;
  activeRange: SpotifyTimeRange;
  compareRange: SpotifyTimeRange;
};

export function GenrePeriodChart({ artistsByPeriod, activeRange, compareRange }: GenrePeriodChartProps) {
  const rows = deriveGenrePeriodComparison(
    artistsByPeriod[activeRange] ?? [],
    artistsByPeriod[compareRange] ?? [],
    8,
  );

  const data = rows.map((row) => ({
    label: row.label,
    active: row.activePct,
    compare: row.comparePct,
  }));

  if (!data.length) return null;

  const activeLabel = timeRangeLabel(activeRange);
  const compareLabel = timeRangeLabel(compareRange);

  return (
    <div className="mt-4 space-y-2">
      <p className="text-xs text-muted-foreground">
        Genre tag share by artist count (% of all tags in period) — {activeLabel} vs {compareLabel}
      </p>
      <ChartLegend
        className="justify-end"
        items={[
          { key: "active", label: activeLabel, color: dashboardChartColors.primary },
          { key: "compare", label: compareLabel, color: dashboardChartColors.secondary },
        ]}
      />
      <ChartContainer config={periodCompareChartConfig} className={DASHBOARD_CHART_CLASS_TALL}>
        <BarChart accessibilityLayer data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval={0}
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => (value.length > 10 ? `${value.slice(0, 9)}…` : value)}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="dashed"
                formatter={(value) => [`${value}%`, ""]}
              />
            }
          />
          <Bar dataKey="active" fill="var(--color-active)" radius={4} maxBarSize={28} />
          <Bar dataKey="compare" fill="var(--color-compare)" radius={4} maxBarSize={28} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
