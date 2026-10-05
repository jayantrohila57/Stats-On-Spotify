"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { SpotifyPlaylist } from "@/lib/spotify/types";
import { Button } from "@/components/ui/button";

const cardThemes = [
  "from-violet-600/90 via-purple-700/80 to-purple-950",
  "from-blue-600/90 via-blue-700/80 to-indigo-950",
  "from-amber-500/90 via-orange-600/80 to-orange-950",
  "from-rose-500/90 via-red-600/80 to-red-950",
];

export function FeaturedPlaylistCards({ playlists }: { playlists: SpotifyPlaylist[] }) {
  const featured = playlists.slice(0, 4);

  if (!featured.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center text-sm text-zinc-500">
        No playlists yet. Follow or create playlists on Spotify to see them here.
      </div>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {featured.map((playlist, index) => {
        const image = playlist.images[0]?.url;
        const theme = cardThemes[index % cardThemes.length];
        const meta =
          playlist.tracks.total > 0
            ? `${playlist.tracks.total} Tracks`
            : `${playlist.owner.display_name}`;

        return (
          <article
            key={playlist.id}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme} p-5 min-h-[220px]`}
          >
            <p className="text-xs font-medium text-white/80">{meta}</p>
            <h2 className="mt-2 line-clamp-2 text-2xl font-bold leading-tight">{playlist.name}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-white/75">
              {playlist.description || `By ${playlist.owner.display_name}`}
            </p>
            {image ? (
              <Image
                src={image}
                alt={playlist.name}
                width={120}
                height={120}
                className="absolute right-3 bottom-3 rounded-2xl object-cover shadow-2xl"
              />
            ) : null}
            <Button
              asChild
              size="icon"
              className="absolute bottom-4 left-4 size-11 rounded-full bg-[#1db954] text-black hover:bg-[#1ed760]"
            >
              <Link href={playlist.external_urls.spotify} target="_blank" rel="noreferrer" aria-label="Open in Spotify">
                <Play className="size-5 fill-black" />
              </Link>
            </Button>
          </article>
        );
      })}
    </section>
  );
}
