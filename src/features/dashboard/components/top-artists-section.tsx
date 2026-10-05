"use client";

import Image from "next/image";
import { analyticsCardClass } from "@/features/dashboard/lib/surface";
import type { SpotifyArtist } from "@/lib/spotify/types";
import { timeRangeLabel, type SpotifyTimeRange } from "@/lib/spotify/time-range";
import { cn } from "@/lib/utils";

type TopArtistsSectionProps = {
  artists: SpotifyArtist[];
  timeRange: SpotifyTimeRange;
  selectedArtistId: string | null;
  onSelectArtist: (artist: SpotifyArtist) => void;
  isRefreshing?: boolean;
};

export function TopArtistsSection({
  artists,
  timeRange,
  selectedArtistId,
  onSelectArtist,
  isRefreshing,
}: TopArtistsSectionProps) {
  const list = artists.slice(0, 12);

  return (
    <section className={`${analyticsCardClass} p-4`}>
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">Top artists</h3>
        <p className="text-xs text-zinc-500">{timeRangeLabel(timeRange)}</p>
      </div>
      {isRefreshing ? <p className="mb-2 text-xs text-[#1db954]">Updating…</p> : null}
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((artist, index) => {
          const isSelected = artist.id === selectedArtistId;
          return (
            <li key={artist.id}>
              <button
                type="button"
                onClick={() => onSelectArtist(artist)}
                className={cn(
                  "group w-full overflow-hidden rounded-xl bg-zinc-900/50 text-left transition hover:bg-zinc-900",
                  isSelected && "ring-2 ring-[#1db954]/50",
                )}
              >
                {artist.images?.[0]?.url ? (
                  <Image
                    src={artist.images[0].url}
                    alt={artist.name}
                    width={200}
                    height={200}
                    className="aspect-square w-full object-cover transition group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center bg-zinc-800 text-sm text-zinc-400">
                    {artist.name.slice(0, 1)}
                  </div>
                )}
                <div className="px-2 py-2">
                  <p className="truncate text-sm font-medium">{artist.name}</p>
                  <p className="text-xs text-zinc-500">#{index + 1}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      {list.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-500">No top artists for this period.</p>
      ) : null}
    </section>
  );
}
