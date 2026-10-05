"use client";

import Image from "next/image";
import Link from "next/link";
import type { SpotifyArtist } from "@/lib/spotify/types";

export function RecentArtistsGrid({ artists }: { artists: SpotifyArtist[] }) {
  const recent = artists.slice(0, 4);

  return (
    <section className="rounded-3xl border border-white/5 bg-zinc-950/60 p-4">
      <h3 className="mb-3 text-lg font-semibold">Recent Artists</h3>
      <div className="grid grid-cols-2 gap-3">
        {recent.map((artist) => (
          <Link
            key={artist.id}
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-2xl bg-zinc-900"
          >
            {artist.images?.[0]?.url ? (
              <Image
                src={artist.images[0].url}
                alt={artist.name}
                width={200}
                height={200}
                className="aspect-square w-full object-cover transition group-hover:scale-105"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center bg-zinc-800 text-sm text-zinc-400">
                {artist.name}
              </div>
            )}
            <p className="truncate px-2 py-2 text-sm font-medium">{artist.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
