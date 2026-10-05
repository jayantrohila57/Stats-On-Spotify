"use client";

import Image from "next/image";
import { AnalyticsSection } from "@/features/dashboard/components/analytics-section";
import type { SpotifyTrack, SpotifyUserProfile } from "@/lib/spotify/types";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";

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
  const topTrackImage = topTrack?.album.images[0]?.url;

  return (
    <AnalyticsSection
      id="overview"
      title="Overview"
      description={`A snapshot of your listening for this period.`}
      timeRange={timeRange}
    >
      <p className="text-2xl font-bold tracking-tight">Hi, {name}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Top tracks</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{topTrackCount}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Top artists</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{topArtistCount}</p>
        </div>
        {topTrack ? (
          <div className="flex min-w-0 gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 sm:col-span-2 lg:col-span-1">
            {topTrackImage ? (
              <Image
                src={topTrackImage}
                alt=""
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-md object-cover"
              />
            ) : (
              <div className="size-14 shrink-0 rounded-md bg-zinc-800" />
            )}
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">#1 track</p>
              <p className="mt-0.5 truncate font-semibold">{topTrack.name}</p>
              <p className="truncate text-sm text-zinc-500">{topTrack.artists.map((a) => a.name).join(", ")}</p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-800 px-4 py-3 text-sm text-zinc-500 sm:col-span-2 lg:col-span-1">
            No top track data for this period yet.
          </div>
        )}
      </div>
    </AnalyticsSection>
  );
}
