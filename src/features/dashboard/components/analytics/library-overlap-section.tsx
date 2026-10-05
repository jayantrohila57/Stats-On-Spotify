"use client";

import { Library } from "lucide-react";
import { SectionHeader } from "@/features/dashboard/components/analytics/section-header";
import type { NormalizedArtist, NormalizedTrack } from "@/lib/analytics/normalize";
import { idsFromArtists, idsFromTracks, overlapCount } from "@/lib/analytics/behavior";
import type { SpotifyArtist, SpotifySavedTrack } from "@/lib/spotify/types";
import { Progress } from "@/components/ui/progress";

type LibraryOverlapSectionProps = {
  topTracks: NormalizedTrack[];
  topArtists: NormalizedArtist[];
  savedTracks: SpotifySavedTrack[];
  followedArtists: SpotifyArtist[];
};

export function LibraryOverlapSection({
  topTracks,
  topArtists,
  savedTracks,
  followedArtists,
}: LibraryOverlapSectionProps) {
  const topTrackIds = idsFromTracks(topTracks);
  const savedIds = new Set(savedTracks.map((s) => s.track.id));
  const trackOverlap = overlapCount(topTrackIds, savedIds);

  const topArtistIds = idsFromArtists(topArtists);
  const followedIds = new Set(followedArtists.map((a) => a.id));
  const artistOverlap = overlapCount(topArtistIds, followedIds);

  const trackPct = topTrackIds.size ? Math.round((trackOverlap / topTrackIds.size) * 100) : 0;
  const artistPct = topArtistIds.size ? Math.round((artistOverlap / topArtistIds.size) * 100) : 0;

  return (
    <section className="rounded-md border border-border/80 bg-card/30 p-4">
      <SectionHeader
        icon={Library}
        title="Library & follows overlap"
        description={`Set overlap with saved tracks (sample of ${savedTracks.length}) and followed artists (sample of ${followedArtists.length})`}
      />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 rounded-md border border-border/60 p-3">
          <p className="text-xs font-medium">Top tracks in saved library</p>
          <p className="text-lg font-semibold tabular-nums">
            {trackOverlap}/{topTrackIds.size}{" "}
            <span className="text-sm font-normal text-muted-foreground">({trackPct}%)</span>
          </p>
          <Progress value={trackPct} className="h-1.5" />
          <p className="text-[11px] text-muted-foreground">Tracks appearing in both your top list and saved sample</p>
        </div>
        <div className="space-y-2 rounded-md border border-border/60 p-3">
          <p className="text-xs font-medium">Top artists you follow</p>
          <p className="text-lg font-semibold tabular-nums">
            {artistOverlap}/{topArtistIds.size}{" "}
            <span className="text-sm font-normal text-muted-foreground">({artistPct}%)</span>
          </p>
          <Progress value={artistPct} className="h-1.5" />
          <p className="text-[11px] text-muted-foreground">Artists in both your top list and followed sample</p>
        </div>
      </div>
    </section>
  );
}
