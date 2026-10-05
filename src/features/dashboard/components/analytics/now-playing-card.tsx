"use client";

import Link from "next/link";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { SpotifyThumbnail } from "@/components/spotify/spotify-media";
import type { CurrentlyPlayingPayload } from "@/lib/spotify/types";
import {
  playbackItemDurationMs,
  playbackItemImageUrl,
  playbackItemSpotifyUrl,
  playbackItemSubtitle,
  playbackItemTitle,
} from "@/lib/spotify/currently-playing";
import { formatDurationMs } from "@/lib/text/duration";
import { Progress } from "@/components/ui/progress";
import { SPOTIFY_MEDIA_SIZE } from "@/components/spotify/spotify-media";

type NowPlayingCardProps = {
  payload: CurrentlyPlayingPayload | undefined;
  isLoading: boolean;
};

export function NowPlayingCard({ payload, isLoading }: NowPlayingCardProps) {
  const data = payload?.playing;
  const item = data?.item ?? null;
  const scopeMissing = payload?.scopeMissing;

  return (
    <SectionShell
      title="Now playing"
      description={
        scopeMissing
          ? "Playback scope missing — sign out and reconnect Spotify to enable live now playing"
          : "Live playback from Spotify (polls every 30s when nothing is on screen)"
      }
      isLoading={isLoading}
      error={null}
      isEmpty={!isLoading && !item}
      emptyTitle={scopeMissing ? "Reconnect Spotify for now playing" : "Nothing playing"}
      emptyDescription={
        scopeMissing
          ? "Your session is missing user-read-currently-playing. Sign out and sign in again to grant playback read access."
          : "Spotify returned no active track. Start playback on a device or the Web Player."
      }
    >
      {item ? (
        <div className="flex gap-4">
          <SpotifyThumbnail
            src={playbackItemImageUrl(item)}
            alt={playbackItemTitle(item)}
            size={SPOTIFY_MEDIA_SIZE.card}
          />
          <div className="min-w-0 flex-1">
            {playbackItemSpotifyUrl(item) ? (
              <Link
                href={playbackItemSpotifyUrl(item)!}
                target="_blank"
                rel="noreferrer"
                className="truncate text-[15px] font-medium hover:underline"
              >
                {playbackItemTitle(item)}
              </Link>
            ) : (
              <p className="truncate text-[15px] font-medium">{playbackItemTitle(item)}</p>
            )}
            <p className="truncate text-sm text-muted-foreground">{playbackItemSubtitle(item)}</p>
            {data?.currently_playing_type === "episode" ? (
              <p className="mt-0.5 text-[12px] text-muted-foreground">Podcast episode</p>
            ) : null}
            {typeof data?.progress_ms === "number" && playbackItemDurationMs(item) ? (
              <div className="mt-3 space-y-1">
                <Progress value={(data.progress_ms / playbackItemDurationMs(item)!) * 100} className="h-1.5" />
                <p className="font-mono-stats text-[12px] text-muted-foreground">
                  {formatDurationMs(data.progress_ms)} / {formatDurationMs(playbackItemDurationMs(item)!)}
                  {data.is_playing ? " · playing" : " · paused"}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </SectionShell>
  );
}
