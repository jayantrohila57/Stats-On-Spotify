"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { Activity } from "lucide-react";
import { SectionHeader } from "@/features/dashboard/components/analytics/section-header";
import type { NormalizedArtist, NormalizedTrack } from "@/lib/analytics/normalize";
import { deriveTasteDimensions, topNConcentrationShare, uniqueArtistRatioInTopTracks } from "@/lib/analytics/behavior";
import type { SpotifyArtist, SpotifySavedTrack } from "@/lib/spotify/types";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  DASHBOARD_CHART_CLASS_TALL,
  dashboardChartColors,
  seriesChartConfig,
} from "@/features/dashboard/lib/chart-theme";

type ListeningBehaviorSectionProps = {
  topTracks: NormalizedTrack[];
  topArtists: NormalizedArtist[];
  savedTracks: SpotifySavedTrack[];
  followedArtists: SpotifyArtist[];
};

const barChartConfig = {
  ...seriesChartConfig,
  value: { label: "Score", color: dashboardChartColors.primary },
};

export function ListeningBehaviorSection({
  topTracks,
  topArtists,
  savedTracks,
  followedArtists,
}: ListeningBehaviorSectionProps) {
  const dimensions = deriveTasteDimensions(topTracks, topArtists, savedTracks, followedArtists);
  const top10Share = topNConcentrationShare(topTracks, 10);
  const diversity = uniqueArtistRatioInTopTracks(topTracks);

  const barData = dimensions.map((d) => ({
    label: d.label
      .replace("Top-10 concentration", "Top-10 focus")
      .replace("Artist diversity", "Diversity")
      .replace("Saved overlap", "Saved overlap")
      .replace("Follow overlap", "Follow overlap"),
    value: d.value,
    hint: d.hint,
  }));

  return (
    <section className="rounded-md border border-border/80 bg-card/30 p-4">
      <SectionHeader
        icon={Activity}
        title="Listening behavior (derived)"
        description="Concentration and overlap metrics from top lists — not true play counts or repeat rate"
      />
      <div className="mt-3 grid gap-4 lg:grid-cols-2">
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Top-10 inverse-rank share:</span>{" "}
            <span className="font-medium tabular-nums">{(top10Share * 100).toFixed(1)}%</span>
          </p>
          <p>
            <span className="text-muted-foreground">Unique artists per top track:</span>{" "}
            <span className="font-medium tabular-nums">{diversity.toFixed(2)}</span>
          </p>
          <ul className="mt-2 space-y-1 text-[11px] text-muted-foreground">
            {dimensions.map((d) => (
              <li key={d.label}>
                <span className="text-foreground">{d.label}</span>: {d.value}/100 — {d.hint}
              </li>
            ))}
          </ul>
        </div>
        <ChartContainer config={barChartConfig} className={DASHBOARD_CHART_CLASS_TALL}>
          <BarChart
            accessibilityLayer
            data={barData}
            layout="vertical"
            margin={{ right: 28, left: 4, top: 4, bottom: 4 }}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <YAxis dataKey="label" type="category" hide />
            <XAxis dataKey="value" type="number" hide domain={[0, 100]} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value, _name, item) => {
                    const hint = (item.payload as { hint?: string }).hint;
                    return [`${value}/100`, hint ?? "Score"];
                  }}
                />
              }
            />
            <Bar dataKey="value" fill="var(--color-value)" radius={4} maxBarSize={24}>
              <LabelList
                dataKey="label"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={10}
              />
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={11}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </section>
  );
}
