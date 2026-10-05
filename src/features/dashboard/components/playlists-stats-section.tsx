"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { SpotifyPlaylist } from "@/lib/spotify/types";

type PlaylistsStatsSectionProps = {
  playlists: SpotifyPlaylist[];
  onSelectPlaylist?: (playlist: SpotifyPlaylist) => void;
};

export function PlaylistsStatsSection({ playlists }: PlaylistsStatsSectionProps) {
  const list = playlists.slice(0, 8);
  const totalTracks = playlists.reduce((sum, p) => sum + p.tracks.total, 0);

  if (!list.length) {
    return (
      <section className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-zinc-500">
        No playlists in your library yet.
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-white/5 bg-zinc-950/60 p-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">Your playlists</h3>
        <p className="text-xs text-zinc-500">
          {playlists.length} playlist{playlists.length === 1 ? "" : "s"} · {totalTracks.toLocaleString()} tracks
          total
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((playlist) => {
          const image = playlist.images[0]?.url;
          return (
            <li key={playlist.id} className="rounded-xl border border-white/5 bg-zinc-900/40 p-3">
              <div className="flex gap-3">
                {image ? (
                  <Image
                    src={image}
                    alt=""
                    width={64}
                    height={64}
                    className="size-16 shrink-0 rounded-md object-cover"
                  />
                ) : (
                  <div className="size-16 shrink-0 rounded-md bg-zinc-800" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold leading-snug">{playlist.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">{playlist.tracks.total} tracks</p>
                  <Link
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-[#1db954] hover:underline"
                  >
                    Spotify
                    <ExternalLink className="size-3" />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
