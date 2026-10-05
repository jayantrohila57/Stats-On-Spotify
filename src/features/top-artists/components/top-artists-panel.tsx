"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { SpotifyArtist } from "@/lib/spotify/types";
import { useSpotifyResource } from "@/features/spotify/hooks/use-spotify-resource";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  StatsEmptyState,
  StatsErrorState,
  StatsLoadingList,
} from "@/components/stats/stats-feedback";

export function TopArtistsPanel() {
  const { data, isLoading, error, refetch } = useSpotifyResource<SpotifyArtist[]>("/api/spotify/top-artists");

  if (isLoading) return <StatsLoadingList rows={8} />;
  if (error) return <StatsErrorState message={error} onRetry={refetch} />;
  if (!data?.length) {
    return (
      <StatsEmptyState
        title="No top artists yet"
        description="Your top artists appear after you have enough listening history on Spotify."
      />
    );
  }

  return (
    <ScrollArea className="h-[min(70vh,720px)] pr-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {data.map((artist, index) => (
          <Card key={artist.id} className="border-white/10 bg-black/30">
            <CardContent className="flex gap-4 p-4">
              {artist.images?.[0]?.url ? (
                <Image
                  src={artist.images[0].url}
                  alt={artist.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              ) : (
                <div className="flex size-16 items-center justify-center rounded-full bg-white/10 text-green-400">
                  <Badge variant="secondary">#{index + 1}</Badge>
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-semibold text-green-400">#{index + 1}</p>
                <Link
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-white hover:text-green-400"
                >
                  {artist.name}
                  <ExternalLink className="size-3.5" />
                </Link>
                {artist.genres?.length ? (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{artist.genres.join(", ")}</p>
                ) : null}
                {artist.followers ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {artist.followers.total.toLocaleString()} followers on Spotify
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
