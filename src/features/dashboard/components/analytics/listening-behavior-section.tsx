"use client";

import { Activity } from "lucide-react";
import { DashboardIconSection } from "@/components/layout/dashboard-icon-section";
import type { NormalizedArtist, NormalizedTrack } from "@/lib/analytics/normalize";
import { deriveTasteDimensions, topNConcentrationShare, uniqueArtistRatioInTopTracks } from "@/lib/analytics/behavior";
import type { SpotifyArtist, SpotifySavedTrack } from "@/lib/spotify/types";

type ListeningBehaviorSectionProps = {
  topTracks: NormalizedTrack[];
  topArtists: NormalizedArtist[];
  savedTracks: SpotifySavedTrack[];
  followedArtists: SpotifyArtist[];
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

  return (
    <DashboardIconSection
      icon={Activity}
      title="Listening behavior (derived)"
      description="Concentration and overlap metrics from top lists — not true play counts or repeat rate"
    >
      <div className="space-y-3 text-sm">
        <p>
          <span className="text-muted-foreground">Top-10 inverse-rank share:</span>{" "}
          <span className="font-medium tabular-nums">{(top10Share * 100).toFixed(1)}%</span>
        </p>
        <p>
          <span className="text-muted-foreground">Unique artists per top track:</span>{" "}
          <span className="font-medium tabular-nums">{diversity.toFixed(2)}</span>
        </p>
        <ul className="space-y-3">
          {dimensions.map((d) => (
            <li key={d.label}>
              <div className="mb-1 flex items-center justify-between gap-4 text-xs">
                <span className="min-w-0 truncate font-medium text-foreground">{d.label}</span>
                <span className="shrink-0 font-mono-stats text-muted-foreground">{d.value}/100</span>
              </div>
              <div className="h-1 overflow-hidden rounded-sm bg-muted">
                <div className="h-full bg-chart-1" style={{ width: `${Math.max(d.value, 2)}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{d.hint}</p>
            </li>
          ))}
        </ul>
      </div>
    </DashboardIconSection>
  );
}
