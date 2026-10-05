"use client";

import { Radar, RadarChart, PolarAngleAxis, PolarGrid } from "recharts";
import { Activity } from "lucide-react";
import { SectionHeader } from "@/features/dashboard/components/analytics/section-header";
import type { NormalizedArtist, NormalizedTrack } from "@/lib/analytics/normalize";
import { deriveTasteDimensions, topNConcentrationShare, uniqueArtistRatioInTopTracks } from "@/lib/analytics/behavior";
import type { SpotifyArtist, SpotifySavedTrack } from "@/lib/spotify/types";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type ListeningBehaviorSectionProps = {
  topTracks: NormalizedTrack[];
  topArtists: NormalizedArtist[];
  savedTracks: SpotifySavedTrack[];
  followedArtists: SpotifyArtist[];
};

const radarConfig = {
  value: { label: "Score", color: "oklch(0.7 0.04 265)" },
};

export function ListeningBehaviorSection({
  topTracks,
  topArtists,
  savedTracks,
  followedArtists,
}: ListeningBehaviorSectionProps) {
  const savedIds = new Set(savedTracks.map((s) => s.track.id));
  const followedIds = new Set(followedArtists.map((a) => a.id));
  const dimensions = deriveTasteDimensions(topTracks, topArtists, savedIds, followedIds);
  const top10Share = topNConcentrationShare(topTracks, 10);
  const diversity = uniqueArtistRatioInTopTracks(topTracks);

  const radarData = dimensions.map((d) => ({
    dimension: d.label.replace("Top-10 concentration", "Top-10 focus").replace("Artist diversity", "Diversity"),
    value: d.value,
    fullLabel: d.label,
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
        <ChartContainer config={radarConfig} className="mx-auto aspect-square max-h-[240px]">
          <RadarChart data={radarData} outerRadius="70%">
            <PolarGrid />
            <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 9 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Radar dataKey="value" fill="var(--color-value)" fillOpacity={0.2} stroke="var(--color-value)" />
          </RadarChart>
        </ChartContainer>
      </div>
    </section>
  );
}
