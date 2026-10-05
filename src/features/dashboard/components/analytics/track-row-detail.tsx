"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { NormalizedTrack } from "@/lib/analytics/normalize";
import { deriveRankShare, formatGenreLabel } from "@/lib/analytics/derive";
import type { SpotifyArtist } from "@/lib/spotify/types";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import { timeRangeLabel } from "@/lib/spotify/time-range";
import { formatDurationMs } from "@/lib/text/duration";
import { SPOTIFY_MEDIA_SIZE, SpotifyThumbnail } from "@/components/spotify/spotify-media";
import { albumImageFromTrack } from "@/lib/spotify/images";

type TrackRowDetailProps = {
  track: NormalizedTrack;
  rank: number;
  totalTracks: number;
  compareRange: SpotifyTimeRange;
  artistsById: Map<string, SpotifyArtist>;
};

function periodRankLabel(range: SpotifyTimeRange): string {
  if (range === "short_term") return "4w";
  if (range === "medium_term") return "6m";
  return "all";
}

export function TrackRowDetail({ track, rank, totalTracks, compareRange, artistsById }: TrackRowDetailProps) {
  const share = deriveRankShare(rank, totalTracks);
  const compareRank = track.periods[compareRange];
  const genreSet = new Set<string>();
  for (const artist of track.artists) {
    const full = artistsById.get(artist.id);
    for (const g of full?.genres ?? []) {
      genreSet.add(formatGenreLabel(g));
    }
  }
  const genres = [...genreSet].slice(0, 6);

  const periodRanks = (["short_term", "medium_term", "long_term"] as SpotifyTimeRange[])
    .map((r) => (track.periods[r] ? `${periodRankLabel(r)} #${track.periods[r]}` : null))
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex flex-col gap-3 py-2 sm:flex-row sm:gap-4">
      <SpotifyThumbnail src={albumImageFromTrack(track)} alt={track.name} size={SPOTIFY_MEDIA_SIZE.detail} />
      <div className="min-w-0 flex-1 space-y-2 text-[13px]">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="font-medium text-foreground">{track.name}</p>
            <p className="text-muted-foreground">{track.artists.map((a) => a.name).join(", ")}</p>
          </div>
          <Link
            href={track.external_urls.spotify}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline"
          >
            Open in Spotify
            <ExternalLink className="size-3" aria-hidden />
          </Link>
        </div>
        <dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-[12px] uppercase tracking-wide text-muted-foreground">Popularity</dt>
            <dd className="font-mono-stats text-sm">{track.popularity}</dd>
          </div>
          <div>
            <dt className="text-[12px] uppercase tracking-wide text-muted-foreground">Duration</dt>
            <dd className="font-mono-stats text-sm">{formatDurationMs(track.duration_ms)}</dd>
          </div>
          <div>
            <dt className="text-[12px] uppercase tracking-wide text-muted-foreground">Album</dt>
            <dd className="truncate text-sm">{track.album.name}</dd>
          </div>
          <div>
            <dt className="text-[12px] uppercase tracking-wide text-muted-foreground">Derived top-list share</dt>
            <dd className="font-mono-stats text-sm">{(share * 100).toFixed(1)}%</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[12px] uppercase tracking-wide text-muted-foreground">Period ranks</dt>
            <dd className="font-mono-stats text-sm">{periodRanks || "—"}</dd>
          </div>
          <div>
            <dt className="text-[12px] uppercase tracking-wide text-muted-foreground">vs {timeRangeLabel(compareRange)}</dt>
            <dd className="font-mono-stats text-sm">{compareRank ? `#${compareRank}` : "not ranked"}</dd>
          </div>
        </dl>
        {genres.length > 0 ? (
          <p className="text-[12px] text-muted-foreground">
            Artist genres (from top artists): {genres.join(" · ")}
          </p>
        ) : (
          <p className="text-[12px] text-muted-foreground">No genre tags linked for these artists in your top-artist lists.</p>
        )}
      </div>
    </div>
  );
}
