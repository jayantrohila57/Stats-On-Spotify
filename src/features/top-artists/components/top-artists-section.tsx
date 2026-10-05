"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { SpotifyArtist } from "@/lib/spotify/types";
import { useSpotifyResource } from "@/features/spotify/hooks/use-spotify-resource";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsSectionShell } from "@/features/stats/components/stats-section-shell";

export function TopArtistsSection() {
  const { data, isLoading, error } = useSpotifyResource<SpotifyArtist[]>("/api/spotify/top-artists");

  return (
    <StatsSectionShell
      id="top-artists"
      title="Your top artists"
      description="The 50 artists you listen to most (medium term)."
      nextHref="/#playlists"
      isLoading={isLoading}
      error={error}
      isEmpty={!data?.length}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {data?.map((artist, index) => (
          <Card key={artist.id} className="border-white/10 bg-white/5">
            <CardContent className="flex gap-4 p-4">
              {artist.images?.[0]?.url ? (
                <Image
                  src={artist.images[0].url}
                  alt={artist.name}
                  width={72}
                  height={72}
                  className="rounded-full"
                />
              ) : (
                <div className="flex size-[72px] items-center justify-center rounded-full bg-white/10 text-green-400">
                  #{index + 1}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-semibold text-green-400">#{index + 1}</p>
                <Link
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-lg font-semibold text-white hover:text-green-400"
                >
                  {artist.name}
                  <ExternalLink className="size-3.5" />
                </Link>
                {artist.genres?.length ? (
                  <p className="mt-1 line-clamp-2 text-xs text-slate-400">{artist.genres.join(", ")}</p>
                ) : null}
                {artist.followers ? (
                  <p className="mt-1 text-xs text-slate-400">{artist.followers.total.toLocaleString()} followers</p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
        {isLoading ? (
          <>
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </>
        ) : null}
      </div>
    </StatsSectionShell>
  );
}
