"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Clock3 } from "lucide-react";
import { SectionHeader } from "@/features/dashboard/components/analytics/section-header";
import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { StatsEmptyState } from "@/components/stats/stats-feedback";
import { useClientListeningDistributions } from "@/features/dashboard/hooks/use-client-listening-distributions";
import {
  DASHBOARD_CHART_CLASS,
  dashboardChartColors,
  formatHourTick,
  HOUR_AXIS_TICKS,
  seriesChartConfig,
} from "@/features/dashboard/lib/chart-theme";

type ListeningPatternsSectionProps = {
  items: SpotifyPlayHistoryItem[];
};

const hourChartConfig = {
  count: { label: "Plays", color: dashboardChartColors.primary },
};

const weekdayBarConfig = {
  ...seriesChartConfig,
  count: { label: "Plays", color: dashboardChartColors.secondary },
};

export function ListeningPatternsSection({ items }: ListeningPatternsSectionProps) {
  const { hours, weekdays } = useClientListeningDistributions(items);
  const hasData = items.length > 0;
  const peakHour = hours.reduce((best, b) => (b.count > best.count ? b : best), hours[0]);
  const peakDay = weekdays.reduce((best, b) => (b.count > best.count ? b : best), weekdays[0]);

  const description = hasData
    ? `${items.length} plays in sample · busiest hour ${peakHour.hour}:00 (${peakHour.count} plays, ${(peakHour.share * 100).toFixed(0)}%) · busiest day ${peakDay.label} (${peakDay.count})`
    : "Hour and weekday distribution from your recent plays sample — not all-time history";

  return (
    <section className="rounded-md border border-border/80 bg-card/30 p-4 md:p-5">
      <SectionHeader icon={Clock3} title="Listening patterns" description={description} />
      {!hasData ? (
        <StatsEmptyState
          title="Not enough recent plays"
          description="Load recently played data to see hour and weekday patterns from that window."
        />
      ) : (
        <div className="mt-4 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-foreground">Plays by hour (local time)</h3>
            <ChartContainer config={hourChartConfig} className={DASHBOARD_CHART_CLASS}>
              <AreaChart
                accessibilityLayer
                data={hours}
                margin={{ left: 4, right: 8, top: 8, bottom: 4 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="hour"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  ticks={HOUR_AXIS_TICKS}
                  tickFormatter={formatHourTick}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      hideLabel
                      formatter={(value, _name, item) => {
                        const hour = (item.payload as { hour?: number }).hour;
                        return [`${value} plays`, `${hour ?? ""}:00`];
                      }}
                    />
                  }
                />
                <Area
                  dataKey="count"
                  type="step"
                  fill="var(--color-count)"
                  fillOpacity={0.35}
                  stroke="var(--color-count)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-foreground">Plays by weekday</h3>
            <ChartContainer config={weekdayBarConfig} className={DASHBOARD_CHART_CLASS}>
              <BarChart
                accessibilityLayer
                data={weekdays}
                layout="vertical"
                margin={{ left: 4, right: 28, top: 4, bottom: 4 }}
              >
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <XAxis dataKey="count" type="number" hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" hideLabel />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={4} maxBarSize={20}>
                  <LabelList
                    dataKey="label"
                    position="insideLeft"
                    offset={8}
                    className="fill-[--color-label]"
                    fontSize={11}
                  />
                  <LabelList
                    dataKey="count"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={11}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      )}
    </section>
  );
}
