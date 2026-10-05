"use client";

import type { SpotifyArtist, SpotifyPlaylist, SpotifyTrack, SpotifyUserProfile } from "@/lib/spotify/types";
import {
  deriveGenreStats,
  medianTrackPopularity,
  totalPlaylistTracks,
  uniqueAlbumCountFromTracks,
  uniqueArtistCountFromTracks,
} from "@/lib/analytics/derive";

type KpiGridProps = {
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
  playlists: SpotifyPlaylist[];
  profile: SpotifyUserProfile | null;
};

function KpiCell({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="border border-border/60 bg-background/40 px-3 py-2.5">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums tracking-tight">{value}</p>
      {hint ? <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function KpiGrid({ topTracks, topArtists, playlists, profile }: KpiGridProps) {
  const medianPop = medianTrackPopularity(topTracks);
  const genreStats = deriveGenreStats(topArtists);
  const uniqueGenres = genreStats.length;

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border/80 bg-border/40 md:grid-cols-4 lg:grid-cols-6">
      <KpiCell label="Top tracks" value={String(topTracks.length)} hint="From Spotify top tracks (max 50)" />
      <KpiCell label="Top artists" value={String(topArtists.length)} hint="From Spotify top artists (max 50)" />
      <KpiCell
        label="Unique artists"
        value={String(uniqueArtistCountFromTracks(topTracks))}
        hint="Across your top tracks list"
      />
      <KpiCell
        label="Unique albums"
        value={String(uniqueAlbumCountFromTracks(topTracks))}
        hint="Across your top tracks list"
      />
      <KpiCell
        label="Median popularity"
        value={medianPop !== null ? String(Math.round(medianPop)) : "—"}
        hint="Spotify popularity score (0–100), not your play count"
      />
      <KpiCell
        label="Genre tags"
        value={String(uniqueGenres)}
        hint="Derived from top artists' genre metadata"
      />
      <KpiCell label="Playlists" value={String(playlists.length)} hint="Your library playlists" />
      <KpiCell
        label="Playlist tracks"
        value={totalPlaylistTracks(playlists).toLocaleString()}
        hint="Sum of playlist track totals from Spotify"
      />
      {profile ? (
        <KpiCell
          label="Spotify followers"
          value={profile.followers.total.toLocaleString()}
          hint="Public profile metric"
        />
      ) : null}
    </div>
  );
}
