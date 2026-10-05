"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Pause, Play } from "lucide-react";
import { useState } from "react";
import type { SpotifyTrack } from "@/lib/spotify/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TracksOfWeekList({ tracks }: { tracks: SpotifyTrack[] }) {
  const [activeId, setActiveId] = useState<string | null>(tracks[0]?.id ?? null);
  const list = tracks.slice(0, 8);

  return (
    <section className="rounded-3xl border border-white/5 bg-zinc-950/60 p-4">
      <h3 className="mb-3 text-lg font-semibold">Tracks of the Week</h3>
      <ScrollArea className="h-[320px] pr-2">
        <ul className="space-y-2">
          {list.map((track) => {
            const image = track.album.images[0]?.url;
            const isActive = track.id === activeId;
            return (
              <li
                key={track.id}
                className="flex items-center gap-3 rounded-2xl bg-zinc-900/50 px-3 py-2 hover:bg-zinc-900"
              >
                {image ? (
                  <Image src={image} alt={track.name} width={44} height={44} className="rounded-md" />
                ) : (
                  <div className="size-11 rounded-md bg-zinc-800" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{track.artists.map((a) => a.name).join(", ")}</p>
                  <Link
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate text-xs text-zinc-400 hover:text-[#1db954]"
                  >
                    {track.name}
                  </Link>
                </div>
                <span className="text-xs text-zinc-500">{track.popularity}</span>
                <Button variant="ghost" size="icon" className="size-8 text-zinc-400">
                  <Heart className="size-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  className={`size-9 rounded-full ${isActive ? "bg-[#1db954] text-black" : "bg-zinc-800 text-white"}`}
                  onClick={() => setActiveId(track.id)}
                >
                  {isActive ? <Pause className="size-4" /> : <Play className="size-4 fill-current" />}
                </Button>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </section>
  );
}
