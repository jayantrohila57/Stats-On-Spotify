"use client";

import type { SpotifyArtist } from "@/lib/spotify/types";
import { Button } from "@/components/ui/button";

const fallbackGenres = ["Classic", "House", "Minimal", "Hip-hop", "Electronic", "Chillout", "Blues", "Country", "Techno"];

function collectGenres(artists: SpotifyArtist[]): string[] {
  const set = new Set<string>();
  for (const artist of artists) {
    for (const genre of artist.genres ?? []) {
      const label = genre
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
      set.add(label);
      if (set.size >= 9) break;
    }
    if (set.size >= 9) break;
  }
  const fromArtists = Array.from(set);
  return fromArtists.length ? fromArtists : fallbackGenres;
}

export function GenresGrid({ artists }: { artists: SpotifyArtist[] }) {
  const genres = collectGenres(artists);

  return (
    <section className="rounded-3xl border border-white/5 bg-zinc-950/60 p-4">
      <h3 className="mb-3 text-lg font-semibold">Genres</h3>
      <div className="grid grid-cols-3 gap-2">
        {genres.map((genre) => (
          <Button
            key={genre}
            type="button"
            variant="secondary"
            className="h-9 rounded-full bg-zinc-900 text-xs text-zinc-300 hover:bg-zinc-800"
          >
            {genre}
          </Button>
        ))}
      </div>
      <Button type="button" variant="outline" className="mt-3 w-full rounded-full border-white/10 bg-zinc-900">
        All Genres
      </Button>
    </section>
  );
}
