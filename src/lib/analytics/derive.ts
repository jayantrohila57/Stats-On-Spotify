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
  const total = [...counts.values()].reduce((sum, c) => sum + c, 0);
  if (total === 0) {
    return [];
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
  return sorted.map(([genre, count]) => ({
    genre,
    count,
    share: count / total,
  }));
}

export type GenrePeriodRow = {
  genre: string;
  label: string;
  activePct: number;
  comparePct: number;
};

/** Top genres by max share across two periods; shares use full tag totals per period. */
export function deriveGenrePeriodComparison(
  activeArtists: SpotifyArtist[],
  compareArtists: SpotifyArtist[],
  limit = 8,
): GenrePeriodRow[] {
  const activeStats = deriveGenreStats(activeArtists, 50);
  const compareStats = deriveGenreStats(compareArtists, 50);
  const activeMap = new Map(activeStats.map((g) => [g.genre, g.share]));
  const compareMap = new Map(compareStats.map((g) => [g.genre, g.share]));

  const genres = [...new Set([...activeMap.keys(), ...compareMap.keys()])]
    .sort((a, b) => {
      const scoreA = Math.max(activeMap.get(a) ?? 0, compareMap.get(a) ?? 0);
      const scoreB = Math.max(activeMap.get(b) ?? 0, compareMap.get(b) ?? 0);
      return scoreB - scoreA;
    })
    .slice(0, limit);

  return genres.map((genre) => ({
    genre,
    label: genre === "other" ? "Other" : formatGenreLabel(genre),
    activePct: Math.round((activeMap.get(genre) ?? 0) * 100),
    comparePct: Math.round((compareMap.get(genre) ?? 0) * 100),
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

/** Distinct genre tag strings across all top artists (not capped by display limit). */
export function countDistinctGenreTags(artists: SpotifyArtist[]): number {
  const tags = new Set<string>();
  for (const artist of artists) {
    for (const genre of artist.genres ?? []) {
      tags.add(genre);
    }
  }
  return tags.size;
}
