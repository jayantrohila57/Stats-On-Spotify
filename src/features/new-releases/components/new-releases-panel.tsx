"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { SpotifyAlbumRelease } from "@/lib/spotify/types";
import { useSpotifyResource } from "@/features/spotify/hooks/use-spotify-resource";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  StatsEmptyState,
  StatsErrorState,
  StatsLoadingList,
} from "@/components/stats/stats-feedback";

export function NewReleasesPanel() {
  const { data, isLoading, error, refetch } = useSpotifyResource<SpotifyAlbumRelease[]>("/api/spotify/new-releases");

  if (isLoading) return <StatsLoadingList rows={6} />;
  if (error) return <StatsErrorState message={error} onRetry={refetch} />;
  if (!data?.length) {
    return (
      <StatsEmptyState
        title="No new releases"
        description="Spotify did not return new releases for your market right now."
      />
    );
  }

  return (
    <ScrollArea className="h-[min(70vh,720px)] pr-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((album) => (
          <Card key={album.id} className="border-white/10 bg-black/30">
            <CardContent className="space-y-3 p-4">
              {album.images[0]?.url ? (
                <Image
                  src={album.images[0].url}
                  alt={album.name}
                  width={240}
                  height={240}
                  className="aspect-square w-full rounded-md object-cover"
                />
              ) : null}
              <Link
                href={album.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-white hover:text-green-400"
              >
                {album.name}
                <ExternalLink className="size-3.5" />
              </Link>
              <p className="text-xs text-muted-foreground">{album.artists.map((a) => a.name).join(", ")}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
