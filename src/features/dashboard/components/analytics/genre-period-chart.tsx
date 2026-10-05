"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { deriveGenreStats, formatGenreLabel } from "@/lib/analytics/derive";
import type { SpotifyArtist } from "@/lib/spotify/types";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import { timeRangeLabel } from "@/lib/spotify/time-range";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type GenrePeriodChartProps = {
  artistsByPeriod: Record<SpotifyTimeRange, SpotifyArtist[]>;
  activeRange: SpotifyTimeRange;
  compareRange: SpotifyTimeRange;
};

const chartConfig = {
  active: { label: "Selected period", color: "oklch(0.72 0.04 265)" },
  compare: { label: "Compare period", color: "oklch(0.55 0.02 265)" },
};

export function GenrePeriodChart({ artistsByPeriod, activeRange, compareRange }: GenrePeriodChartProps) {
  const activeStats = deriveGenreStats(artistsByPeriod[activeRange] ?? [], 8);
  const compareStats = deriveGenreStats(artistsByPeriod[compareRange] ?? [], 8);
  const genres = [...new Set([...activeStats.map((g) => g.genre), ...compareStats.map((g) => g.genre)])].slice(0, 8);

  const activeMap = new Map(activeStats.map((g) => [g.genre, g.share]));
  const compareMap = new Map(compareStats.map((g) => [g.genre, g.share]));

  const data = genres.map((genre) => ({
    genre: formatGenreLabel(genre),
    active: Math.round((activeMap.get(genre) ?? 0) * 100),
    compare: Math.round((compareMap.get(genre) ?? 0) * 100),
  }));

  if (!data.length) return null;

  return (
    <div className="mt-4">
      <p className="mb-2 text-xs text-muted-foreground">
        Derived genre tag share by artist count — {timeRangeLabel(activeRange)} vs {timeRangeLabel(compareRange)}
      </p>
      <ChartContainer config={chartConfig} className="aspect-[2/1] min-h-[180px] w-full">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 8 }}>
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <XAxis type="number" tickLine={false} axisLine={false} unit="%" />
          <YAxis type="category" dataKey="genre" width={88} tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="active" fill="var(--color-active)" radius={[0, 2, 2, 0]} barSize={10} />
          <Bar dataKey="compare" fill="var(--color-compare)" radius={[0, 2, 2, 0]} barSize={10} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
