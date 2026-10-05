"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Clock3 } from "lucide-react";
import { SectionHeader } from "@/features/dashboard/components/analytics/section-header";
import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";
import { deriveHourDistribution, deriveWeekdayDistribution } from "@/lib/analytics/listening-patterns";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { StatsEmptyState } from "@/components/stats/stats-feedback";

type ListeningPatternsSectionProps = {
  items: SpotifyPlayHistoryItem[];
};

const hourChartConfig = {
  count: { label: "Plays", color: "oklch(0.72 0.04 265)" },
};

const weekdayChartConfig = {
  count: { label: "Plays", color: "oklch(0.62 0.03 265)" },
};

export function ListeningPatternsSection({ items }: ListeningPatternsSectionProps) {
  const hours = deriveHourDistribution(items);
  const weekdays = deriveWeekdayDistribution(items);
  const hasData = items.length > 0;

  return (
    <section className="rounded-md border border-border/80 bg-card/30 p-4">
      <SectionHeader
        icon={Clock3}
        title="Listening patterns"
        description="Hour and weekday distribution from your recent plays sample — not all-time history"
      />
      {!hasData ? (
        <StatsEmptyState
          title="Not enough recent plays"
          description="Load recently played data to see hour and weekday patterns from that window."
        />
      ) : (
        <div className="mt-3 grid gap-4 lg:grid-cols-2">
          <ChartContainer config={hourChartConfig} className="aspect-[5/2] min-h-[160px] w-full">
            <BarChart data={hours} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="hour" tickLine={false} axisLine={false} tickFormatter={(h) => `${h}`} />
              <YAxis allowDecimals={false} width={28} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" fill="var(--color-count)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer>
          <ChartContainer config={weekdayChartConfig} className="aspect-[5/2] min-h-[160px] w-full">
            <BarChart data={weekdays} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} width={28} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" fill="var(--color-count)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      )}
    </section>
  );
}
