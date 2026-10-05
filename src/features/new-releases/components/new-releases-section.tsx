"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { SpotifyAlbumRelease } from "@/lib/spotify/types";
import { useSpotifyResource } from "@/features/spotify/hooks/use-spotify-resource";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsSectionShell } from "@/features/stats/components/stats-section-shell";

export function NewReleasesSection() {
  const { data, isLoading, error } = useSpotifyResource<SpotifyAlbumRelease[]>("/api/spotify/new-releases");

  return (
    <StatsSectionShell
      id="new-releases"
      title="New releases"
      description="Fresh albums from Spotify (US catalog)."
      nextHref="/#home"
      isLoading={isLoading}
      error={error}
      isEmpty={!data?.length}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((album) => (
          <Card key={album.id} className="border-white/10 bg-white/5">
            <CardContent className="space-y-3 p-4">
              {album.images[0]?.url ? (
                <Image
                  src={album.images[0].url}
                  alt={album.name}
                  width={200}
                  height={200}
                  className="w-full rounded-md object-cover"
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
              <p className="text-xs text-slate-400">{album.artists.map((a) => a.name).join(", ")}</p>
            </CardContent>
          </Card>
        ))}
        {isLoading ? (
          <>
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </>
        ) : null}
      </div>
    </StatsSectionShell>
  );
}
