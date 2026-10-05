"use client";

import Link from "next/link";
import { Radio } from "lucide-react";
import { SectionHeader } from "@/features/dashboard/components/analytics/section-header";
import { SpotifyThumbnail } from "@/components/spotify/spotify-media";
import { albumImageFromTrack } from "@/lib/spotify/images";
import type { SpotifyCurrentlyPlaying } from "@/lib/spotify/types";
import { formatDurationMs } from "@/lib/text/duration";
import { StatsEmptyState, StatsErrorState } from "@/components/stats/stats-feedback";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

type NowPlayingCardProps = {
  data: SpotifyCurrentlyPlaying | null | undefined;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
};

export function NowPlayingCard({ data, isLoading, error, onRetry }: NowPlayingCardProps) {
  return (
    <section className="rounded-md border border-border/80 bg-card/30 p-4">
      <SectionHeader
        icon={Radio}
        title="Now playing"
        description="Live playback state from Spotify (requires active session)"
      />
      {isLoading ? (
        <Skeleton className="mt-3 h-16 w-full" />
      ) : error ? (
        <StatsErrorState message={error} onRetry={onRetry} />
      ) : !data?.item ? (
        <StatsEmptyState
          title="Nothing playing"
          description="Spotify returned no active track. Start playback on a device or the Web Player."
        />
      ) : (
        <div className="mt-3 flex gap-3">
          <SpotifyThumbnail src={albumImageFromTrack(data.item)} alt={data.item.name} />
          <div className="min-w-0 flex-1">
            <Link href={data.item.external_urls.spotify} target="_blank" rel="noreferrer" className="truncate text-sm font-medium hover:underline">
              {data.item.name}
            </Link>
            <p className="truncate text-xs text-muted-foreground">{data.item.artists.map((a) => a.name).join(", ")}</p>
            {typeof data.progress_ms === "number" && data.item.duration_ms ? (
              <div className="mt-2 space-y-1">
                <Progress value={(data.progress_ms / data.item.duration_ms) * 100} className="h-1" />
                <p className="text-[10px] tabular-nums text-muted-foreground">
                  {formatDurationMs(data.progress_ms)} / {formatDurationMs(data.item.duration_ms)}
                  {data.is_playing ? " · playing" : " · paused"}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}
