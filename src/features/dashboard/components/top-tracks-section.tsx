"use client";

import Image from "next/image";
import { AnalyticsSection } from "@/features/dashboard/components/analytics-section";
import type { SpotifyTrack } from "@/lib/spotify/types";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import { cn } from "@/lib/utils";

type TopTracksSectionProps = {
  tracks: SpotifyTrack[];
  timeRange: SpotifyTimeRange;
  selectedTrackId: string | null;
  onSelectTrack: (track: SpotifyTrack) => void;
  isRefreshing?: boolean;
};

function trackPopularity(track: SpotifyTrack): string {
  return typeof track.popularity === "number" && !Number.isNaN(track.popularity)
    ? String(track.popularity)
    : "—";
}

export function TopTracksSection({
  tracks,
  timeRange,
  selectedTrackId,
  onSelectTrack,
  isRefreshing,
}: TopTracksSectionProps) {
  const list = tracks.slice(0, 20);

  return (
    <AnalyticsSection
      id="top-tracks"
      title="Top tracks"
      description="Your most-played tracks in order."
      timeRange={timeRange}
      isRefreshing={isRefreshing}
    >
      {list.length === 0 ? (
        <p className="py-4 text-center text-sm text-muted-foreground">No top tracks for this period.</p>
      ) : (
        <>
          <div className="mb-2 hidden px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:grid sm:grid-cols-[2rem_3rem_minmax(0,1fr)_3rem] sm:gap-3 sm:pr-2">
            <span>#</span>
            <span className="sr-only sm:not-sr-only">Art</span>
            <span>Track</span>
            <span className="text-right">Pop.</span>
          </div>
          <ol className="divide-y divide-border">
            {list.map((track, index) => {
              const image = track.album.images[0]?.url;
              const isSelected = track.id === selectedTrackId;
              return (
                <li key={track.id}>
                  <button
                    type="button"
                    onClick={() => onSelectTrack(track)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left transition hover:bg-muted/80",
                      isSelected && "bg-muted ring-1 ring-green-500/40",
                    )}
                  >
                    <span className="w-6 shrink-0 text-center text-sm font-medium text-muted-foreground">{index + 1}</span>
                    {image ? (
                      <Image
                        src={image}
                        alt=""
                        width={48}
                        height={48}
                        className="size-12 shrink-0 rounded-md object-cover"
                      />
                    ) : (
                      <div className="size-12 shrink-0 rounded-md bg-muted" aria-hidden />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">{track.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {track.artists.map((a) => a.name).join(", ")}
                      </p>
                    </div>
                    <span
                      className="w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground"
                      title="Spotify popularity"
                    >
                      {trackPopularity(track)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </AnalyticsSection>
  );
}
