import type { SpotifyArtist, SpotifyPlaylist, SpotifyTrack } from "@/lib/spotify/types";

export type GenreStat = {
  genre: string;
  count: number;
  share: number;
};

/** Derived: genre frequency from top artists' genre tags (not play-weighted). */
export function deriveGenreStatsWithOther(artists: SpotifyArtist[], limit = 8): GenreStat[] {
  const all = deriveGenreStats(artists, 50);
  if (all.length <= limit) return all;
  const head = all.slice(0, limit);
  const rest = all.slice(limit);
  const otherCount = rest.reduce((sum, g) => sum + g.count, 0);
  const total = all.reduce((sum, g) => sum + g.count, 0);
  if (otherCount === 0 || total === 0) return head;
  return [
    ...head,
    {
      genre: "other",
      count: otherCount,
      share: otherCount / total,
    },
  ];
}

export function deriveGenreStats(artists: SpotifyArtist[], limit = 12): GenreStat[] {
  const counts = new Map<string, number>();
  for (const artist of artists) {
    for (const genre of artist.genres ?? []) {
      counts.set(genre, (counts.get(genre) ?? 0) + 1);
    }
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
  const total = sorted.reduce((sum, [, c]) => sum + c, 0);
  if (total === 0) {
    return [];
  }
  return sorted.map(([genre, count]) => ({
    genre,
    count,
    share: count / total,
  }));
}

/** Derived: inverse-rank weighting — Spotify does not expose play counts on this endpoint. */
export function deriveRankShare(rank: number, total: number): number {
  if (total <= 0) return 0;
  const weights = Array.from({ length: total }, (_, i) => total - i);
  const sum = weights.reduce((a, b) => a + b, 0);
  const weight = weights[rank - 1] ?? 0;
  return weight / sum;
}

export function uniqueAlbumCountFromTracks(tracks: SpotifyTrack[]): number {
  return new Set(tracks.map((t) => t.album.id)).size;
}

export function uniqueArtistCountFromTracks(tracks: SpotifyTrack[]): number {
  const ids = new Set<string>();
  for (const track of tracks) {
    for (const artist of track.artists) {
      ids.add(artist.id);
    }
  }
  return ids.size;
}

export function medianTrackPopularity(tracks: SpotifyTrack[]): number | null {
  if (!tracks.length) return null;
  const sorted = [...tracks.map((t) => t.popularity)].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export function totalPlaylistTracks(playlists: SpotifyPlaylist[]): number {
  return playlists.reduce((sum, p) => sum + (p.tracks?.total ?? 0), 0);
}

export function formatGenreLabel(genre: string): string {
  return genre
    .split(" ")
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(" ");
}
