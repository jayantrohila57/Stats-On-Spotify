"use client";

import Image from "next/image";
import type { SpotifyTrack } from "@/lib/spotify/types";
import { timeRangeLabel, type SpotifyTimeRange } from "@/lib/spotify/time-range";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type TopTracksSectionProps = {
  tracks: SpotifyTrack[];
  timeRange: SpotifyTimeRange;
  selectedTrackId: string | null;
  onSelectTrack: (track: SpotifyTrack) => void;
  isRefreshing?: boolean;
};

export function TopTracksSection({
  tracks,
  timeRange,
  selectedTrackId,
  onSelectTrack,
  isRefreshing,
}: TopTracksSectionProps) {
  const list = tracks.slice(0, 20);

  return (
    <section className="rounded-2xl border border-white/5 bg-zinc-950/60 p-4">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">Top tracks</h3>
        <p className="text-xs text-zinc-500">{timeRangeLabel(timeRange)}</p>
      </div>
      {isRefreshing ? <p className="mb-2 text-xs text-[#1db954]">Updating…</p> : null}
      <ScrollArea className="h-[min(420px,55vh)] pr-2">
        <ol className="space-y-1">
          {list.map((track, index) => {
            const image = track.album.images[0]?.url;
            const isSelected = track.id === selectedTrackId;
            return (
              <li key={track.id}>
                <button
                  type="button"
                  onClick={() => onSelectTrack(track)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-zinc-900",
                    isSelected && "bg-zinc-900 ring-1 ring-[#1db954]/40",
                  )}
                >
                  <span className="w-6 shrink-0 text-center text-xs font-medium text-zinc-500">{index + 1}</span>
                  {image ? (
                    <Image
                      src={image}
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 shrink-0 rounded-md object-cover"
                    />
                  ) : (
                    <div className="size-12 shrink-0 rounded-md bg-zinc-800" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{track.name}</p>
                    <p className="truncate text-xs text-zinc-500">
                      {track.artists.map((a) => a.name).join(", ")}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs tabular-nums text-zinc-500">{track.popularity}</span>
                </button>
              </li>
            );
          })}
          {list.length === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-500">No top tracks for this period.</p>
          ) : null}
        </ol>
      </ScrollArea>
    </section>
  );
}
