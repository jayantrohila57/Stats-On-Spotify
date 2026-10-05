"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { SpotifyPlaylist } from "@/lib/spotify/types";
import { useSpotifyResource } from "@/features/spotify/hooks/use-spotify-resource";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  StatsEmptyState,
  StatsErrorState,
  StatsLoadingList,
} from "@/components/stats/stats-feedback";

export function PlaylistsPanel() {
  const { data, isLoading, error, refetch } = useSpotifyResource<SpotifyPlaylist[]>("/api/spotify/playlists");

  if (isLoading) return <StatsLoadingList rows={8} />;
  if (error) return <StatsErrorState message={error} onRetry={refetch} />;
  if (!data?.length) {
    return (
      <StatsEmptyState
        title="No playlists found"
        description="Create or follow playlists on Spotify to see them here."
      />
    );
  }

  return (
    <ScrollArea className="h-[min(70vh,720px)] pr-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {data.map((playlist) => (
          <Card key={playlist.id} className="border-white/10 bg-black/30">
            <CardContent className="flex gap-4 p-4">
              {playlist.images[0]?.url ? (
                <Image
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
              ) : null}
              <div className="min-w-0">
                <Link
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-white hover:text-green-400"
                >
                  {playlist.name}
                  <ExternalLink className="size-3.5" />
                </Link>
                {playlist.description ? (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{playlist.description}</p>
                ) : null}
                <p className="mt-2 text-xs text-muted-foreground">
                  By {playlist.owner.display_name} · {playlist.tracks.total} tracks
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
