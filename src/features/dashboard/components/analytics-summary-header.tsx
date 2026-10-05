"use client";

import { analyticsCardClass } from "@/features/dashboard/lib/surface";
import type { SpotifyTrack, SpotifyUserProfile } from "@/lib/spotify/types";
import { timeRangeLabel, type SpotifyTimeRange } from "@/lib/spotify/time-range";
import { cn } from "@/lib/utils";

type AnalyticsSummaryHeaderProps = {
  profile: SpotifyUserProfile | null;
  topTrack: SpotifyTrack | null;
  timeRange: SpotifyTimeRange;
  topArtistCount: number;
  topTrackCount: number;
};

export function AnalyticsSummaryHeader({
  profile,
  topTrack,
  timeRange,
  topArtistCount,
  topTrackCount,
}: AnalyticsSummaryHeaderProps) {
  const name = profile?.display_name ?? "there";

  return (
    <section className={cn(analyticsCardClass, "p-5")}>
      <p className="text-sm text-zinc-400">Overview · {timeRangeLabel(timeRange)}</p>
      <h2 className="mt-1 text-2xl font-bold">Hi, {name}</h2>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div>
          <p className="text-zinc-500">Top tracks loaded</p>
          <p className="text-xl font-semibold tabular-nums">{topTrackCount}</p>
        </div>
        <div>
          <p className="text-zinc-500">Top artists loaded</p>
          <p className="text-xl font-semibold tabular-nums">{topArtistCount}</p>
        </div>
        {topTrack ? (
          <div className="min-w-0 flex-1">
            <p className="text-zinc-500">#1 track</p>
            <p className="truncate font-semibold">{topTrack.name}</p>
            <p className="truncate text-xs text-zinc-500">{topTrack.artists.map((a) => a.name).join(", ")}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
