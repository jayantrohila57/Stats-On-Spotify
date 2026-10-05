"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Pause, PictureInPicture2, Send, SkipBack, SkipForward, Volume2 } from "lucide-react";
import type { SpotifyTrack } from "@/lib/spotify/types";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

/**
 * PLACEHOLDER player chrome: shows the user's #1 top track metadata only.
 * Full playback requires Spotify client SDK / Premium and is not implemented here.
 */
export function PlayerBar({ track }: { track: SpotifyTrack | null }) {
  if (!track) {
    return null;
  }

  const image = track.album.images[0]?.url;
  const artist = track.artists.map((a) => a.name).join(", ");

  return (
    <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-white/5 bg-zinc-950/95 px-4 py-3 backdrop-blur md:pl-20">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 md:flex-row md:items-center">
        <div className="flex min-w-0 items-center gap-3 md:w-1/4">
          {image ? <Image src={image} alt={track.name} width={56} height={56} className="rounded-md" /> : null}
          <div className="min-w-0">
            <Link
              href={track.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
              className="block truncate text-sm font-semibold hover:text-[#1db954]"
            >
              {track.name}
            </Link>
            <p className="truncate text-xs text-zinc-500">{artist}</p>
          </div>
          <Button variant="ghost" size="icon" className="text-zinc-400">
            <Heart className="size-4" />
          </Button>
        </div>

        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-zinc-300">
              <SkipBack className="size-5" />
            </Button>
            <Button size="icon" className="size-11 rounded-full bg-white text-black hover:bg-zinc-200">
              <Pause className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-300">
              <SkipForward className="size-5" />
            </Button>
          </div>
          <div className="flex w-full max-w-xl items-center gap-2 text-[10px] text-zinc-500">
            <span>0:00</span>
            <Slider defaultValue={[35]} max={100} step={1} className="flex-1" disabled />
            <span>—</span>
          </div>
        </div>

        <div className="hidden items-center justify-end gap-2 md:flex md:w-1/4">
          <Button variant="ghost" size="icon" className="text-zinc-400">
            <Send className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-400">
            <PictureInPicture2 className="size-4" />
          </Button>
          <Volume2 className="size-4 text-zinc-400" />
          <Slider defaultValue={[70]} max={100} step={1} className="w-24" />
        </div>
      </div>
    </footer>
  );
}
