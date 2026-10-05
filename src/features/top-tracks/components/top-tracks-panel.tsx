"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { SpotifyTrack } from "@/lib/spotify/types";
import { useSpotifyResource } from "@/features/spotify/hooks/use-spotify-resource";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  StatsEmptyState,
  StatsErrorState,
  StatsLoadingList,
} from "@/components/stats/stats-feedback";

export function TopTracksPanel() {
  const { data, isLoading, error, refetch } = useSpotifyResource<SpotifyTrack[]>("/api/spotify/top-tracks");

  if (isLoading) return <StatsLoadingList rows={8} />;
  if (error) return <StatsErrorState message={error} onRetry={refetch} />;
  if (!data?.length) {
    return (
      <StatsEmptyState
        title="No top tracks yet"
        description="Listen to more music on Spotify, then check back for your top tracks."
      />
    );
  }

  return (
    <ScrollArea className="h-[min(70vh,720px)] pr-3">
      <div className="space-y-3">
        {data.map((track, index) => (
          <Card key={track.id} className="border-white/10 bg-black/30">
            <CardContent className="flex gap-4 p-4">
              <Badge variant="secondary" className="shrink-0 bg-green-500/15 text-green-300">
                #{index + 1}
              </Badge>
              {track.album.images[0]?.url ? (
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  width={72}
                  height={72}
                  className="rounded-md"
                />
              ) : null}
              <div className="min-w-0 flex-1">
                <Link
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-white hover:text-green-400"
                >
                  {track.name}
                  <ExternalLink className="size-3.5" />
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {track.album.name} · Popularity {track.popularity}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
