"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { SpotifyTrack } from "@/lib/spotify/types";
import { useSpotifyResource } from "@/features/spotify/hooks/use-spotify-resource";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsSectionShell } from "@/features/stats/components/stats-section-shell";

export function TopTracksSection() {
  const { data, isLoading, error } = useSpotifyResource<SpotifyTrack[]>("/api/spotify/top-tracks");

  return (
    <StatsSectionShell
      id="top-tracks"
      title="Your top tracks"
      description="The 50 tracks you listen to most (medium term)."
      nextHref="/#top-artists"
      isLoading={isLoading}
      error={error}
      isEmpty={!data?.length}
    >
      <div className="grid gap-3">
        {data?.map((track, index) => (
          <Card key={track.id} className="border-white/10 bg-white/5">
            <CardContent className="flex gap-4 p-4">
              <div className="flex shrink-0 flex-col items-center justify-center text-green-400">
                <span className="text-sm font-bold">#{index + 1}</span>
                {track.album.images[0]?.url ? (
                  <Image
                    src={track.album.images[0].url}
                    alt={track.name}
                    width={80}
                    height={80}
                    className="mt-2 rounded-lg"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <Link
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-lg font-semibold text-white hover:text-green-400"
                >
                  {track.name}
                  <ExternalLink className="size-3.5" />
                </Link>
                <p className="text-sm text-slate-300">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
                <p className="text-xs text-slate-400">
                  Album: {track.album.name} · Popularity {track.popularity}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
        {isLoading ? (
          <>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </>
        ) : null}
      </div>
    </StatsSectionShell>
  );
}
