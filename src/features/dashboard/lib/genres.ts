import type { SpotifyArtist } from "@/lib/spotify/types";

export type GenreStat = {
  key: string;
  label: string;
  artistCount: number;
};

function formatGenreLabel(genre: string): string {
  return genre
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function collectGenreStats(artists: SpotifyArtist[], limit = 12): GenreStat[] {
  const counts = new Map<string, { label: string; artistCount: number }>();

  for (const artist of artists) {
    for (const raw of artist.genres ?? []) {
      const key = raw.toLowerCase();
      const existing = counts.get(key);
      if (existing) {
        existing.artistCount += 1;
      } else {
        counts.set(key, { label: formatGenreLabel(raw), artistCount: 1 });
      }
    }
  }

  return Array.from(counts.entries())
    .map(([key, value]) => ({ key, label: value.label, artistCount: value.artistCount }))
    .sort((a, b) => b.artistCount - a.artistCount)
    .slice(0, limit);
}

export function artistsForGenre(artists: SpotifyArtist[], genreKey: string): SpotifyArtist[] {
  return artists.filter((artist) => artist.genres?.some((g) => g.toLowerCase() === genreKey));
}
