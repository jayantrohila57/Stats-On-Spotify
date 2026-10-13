"use client";

import {
  Disc3,
  Headphones,
  Layers,
  ListMusic,
  Mic2,
  Music2,
  Tags,
  TrendingUp,
  Users,
  Heart,
  History,
} from "lucide-react";
import type { NormalizedArtist, NormalizedTrack } from "@/lib/analytics/normalize";
import type { SpotifyPlaylist, SpotifyUserProfile } from "@/lib/spotify/types";
import {
  countDistinctGenreTags,
  medianTrackPopularity,
  totalPlaylistTracks,
  uniqueAlbumCountFromTracks,
  uniqueArtistCountFromTracks,
} from "@/lib/analytics/derive";
import { topNConcentrationShare } from "@/lib/analytics/behavior";
import type { LibraryOverlapMetrics } from "@/lib/analytics/library-overlap";
import { topTracksSavedOverlapHint } from "@/lib/analytics/library-overlap";
import type { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type KpiGridProps = {
  topTracks: NormalizedTrack[];
  topArtists: NormalizedArtist[];
  playlists: SpotifyPlaylist[];
  profile: SpotifyUserProfile | null;
  libraryOverlap: LibraryOverlapMetrics;
  recentPlayCount: number;
  overlapHintsReady?: boolean;
};

function KpiCell({
  icon: Icon,
  label,
  value,
  hint,
  hintLoading,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  hintLoading?: boolean;
}) {
  return (
    <div className="border border-border bg-muted/20 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5 shrink-0 opacity-70" aria-hidden />
        {label}
      </div>
      <p className="mt-1 font-mono-stats text-3xl font-semibold leading-none tracking-tight">{value}</p>
      {hintLoading ? (
        <Skeleton className="mt-1 h-3 w-full max-w-[140px]" aria-hidden />
      ) : hint ? (
        <p className="mt-1 text-xs leading-snug text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function KpiGrid({
  topTracks,
  topArtists,
  playlists,
  profile,
  libraryOverlap,
  recentPlayCount,
  overlapHintsReady = true,
}: KpiGridProps) {
  const medianPop = medianTrackPopularity(topTracks);
  const uniqueGenres = countDistinctGenreTags(topArtists);
  const top10Share = topNConcentrationShare(topTracks, 10);
  const { tracks: savedOverlap } = libraryOverlap;
  const savedOverlapReady = overlapHintsReady && savedOverlap.topTrackTotal > 0;

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4 lg:grid-cols-6">
      <KpiCell icon={Music2} label="Top tracks" value={String(topTracks.length)} hint="Spotify top tracks (max 50)" />
      <KpiCell icon={Mic2} label="Top artists" value={String(topArtists.length)} hint="Spotify top artists (max 50)" />
      <KpiCell
        icon={Users}
        label="Unique artists"
        value={String(uniqueArtistCountFromTracks(topTracks))}
        hint="Across top tracks list"
      />
      <KpiCell
        icon={Disc3}
        label="Unique albums"
        value={String(uniqueAlbumCountFromTracks(topTracks))}
        hint="Across top tracks list"
      />
      <KpiCell
        icon={TrendingUp}
        label="Median popularity"
        value={medianPop !== null ? String(Math.round(medianPop)) : "—"}
        hint="Spotify score 0–100, not play count"
      />
      <KpiCell icon={Tags} label="Genre tags" value={String(uniqueGenres)} hint="Derived from top artists" />
      <KpiCell
        icon={Layers}
        label="Top-10 concentration"
        value={`${(top10Share * 100).toFixed(0)}%`}
        hint="Derived inverse-rank weight in top 10"
      />
      <KpiCell icon={ListMusic} label="Playlists" value={String(playlists.length)} hint="Your library playlists" />
      <KpiCell
        icon={Headphones}
        label="Playlist tracks"
        value={totalPlaylistTracks(playlists).toLocaleString()}
        hint="Sum of playlist totals"
      />
      <KpiCell
        icon={Heart}
        label="Saved overlap"
        value={savedOverlapReady ? `${savedOverlap.overlapPercentOfTop}%` : "—"}
        hint={savedOverlapReady ? topTracksSavedOverlapHint(savedOverlap) : undefined}
        hintLoading={!savedOverlapReady}
      />
      <KpiCell
        icon={History}
        label="Recent plays"
        value={String(recentPlayCount)}
        hint="Items in recently played window"
      />
      {profile ? (
        <KpiCell
          icon={Users}
          label="Followers"
          value={profile.followers.total.toLocaleString()}
          hint="Public profile metric"
        />
      ) : null}
    </div>
  );
}
