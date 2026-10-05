"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { SpotifyPlaylist } from "@/lib/spotify/types";
import { useSpotifyResource } from "@/features/spotify/hooks/use-spotify-resource";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsSectionShell } from "@/features/stats/components/stats-section-shell";

export function PlaylistsSection() {
  const { data, isLoading, error } = useSpotifyResource<SpotifyPlaylist[]>("/api/spotify/playlists");

  return (
    <StatsSectionShell
      id="playlists"
      title="Your playlists"
      description="Playlists in your library, including ones you follow."
      nextHref="/#new-releases"
      isLoading={isLoading}
      error={error}
      isEmpty={!data?.length}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {data?.map((playlist) => (
          <Card key={playlist.id} className="border-white/10 bg-white/5">
            <CardContent className="flex gap-4 p-4">
              {playlist.images[0]?.url ? (
                <Image
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  width={88}
                  height={88}
                  className="rounded-md"
                />
              ) : null}
              <div className="min-w-0">
                <Link
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-lg font-semibold text-white hover:text-green-400"
                >
                  {playlist.name}
                  <ExternalLink className="size-3.5" />
                </Link>
                {playlist.description ? (
                  <p className="mt-1 line-clamp-2 text-xs text-slate-400">{playlist.description}</p>
                ) : null}
                <p className="mt-2 text-xs text-slate-400">
                  By {playlist.owner.display_name} · {playlist.tracks.total} tracks
                </p>
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
