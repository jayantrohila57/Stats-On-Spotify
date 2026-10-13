"use client";

import Image from "next/image";
import { AnalyticsSection } from "@/features/dashboard/components/analytics-section";
import type { SpotifyArtist } from "@/lib/spotify/types";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
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
    <AnalyticsSection
      id="top-artists"
      title="Top artists"
      description="Artists you listened to most."
      timeRange={timeRange}
      isRefreshing={isRefreshing}
    >
      {list.length === 0 ? (
        <p className="py-4 text-center text-sm text-muted-foreground">No top artists for this period.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {list.map((artist, index) => {
            const isSelected = artist.id === selectedArtistId;
            return (
              <li key={artist.id}>
                <button
                  type="button"
                  onClick={() => onSelectArtist(artist)}
                  className={cn(
                    "group w-full overflow-hidden rounded-xl border border-border bg-muted/40 text-left transition hover:border-border hover:bg-muted",
                    isSelected && "ring-2 ring-green-500/50",
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
                    <div className="flex aspect-square items-center justify-center bg-muted text-sm text-muted-foreground">
                      {artist.name.slice(0, 1)}
                    </div>
                  )}
                  <div className="px-2.5 py-2.5">
                    <p className="truncate text-sm font-medium">{artist.name}</p>
                    <p className="text-xs text-muted-foreground">#{index + 1}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </AnalyticsSection>
  );
}
