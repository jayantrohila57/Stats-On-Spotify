"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { SpotifyTrack } from "@/lib/spotify/types";
import { pickSpotifyImageUrl } from "@/lib/spotify/images";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { SPOTIFY_MEDIA_SIZE, SpotifyThumbnail } from "@/components/spotify/spotify-media";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type AlbumsFromTracksTableProps = {
  tracks: SpotifyTrack[];
  isLoading: boolean;
  error: string | null;
};

function trackCountLabel(count: number): string {
  return `${count} ${count === 1 ? "track" : "tracks"}`;
}

export function AlbumsFromTracksTable({ tracks, isLoading, error }: AlbumsFromTracksTableProps) {
  const albums = useMemo(() => {
    const map = new Map<
      string,
      { id: string; name: string; image?: string; url: string; artists: string; trackCount: number; bestRank: number }
    >();
    tracks.forEach((track, index) => {
      const rank = index + 1;
      const existing = map.get(track.album.id);
      const image = pickSpotifyImageUrl(track.album.images);
      if (!existing) {
        map.set(track.album.id, {
          id: track.album.id,
          name: track.album.name,
          image,
          url: track.album.external_urls.spotify,
          artists: track.artists.map((a) => a.name).join(", "),
          trackCount: 1,
          bestRank: rank,
        });
      } else {
        existing.trackCount += 1;
        existing.bestRank = Math.min(existing.bestRank, rank);
        if (!existing.image && image) {
          existing.image = image;
        }
      }
    });
    return [...map.values()].sort((a, b) => a.bestRank - b.bestRank);
  }, [tracks]);

  return (
    <SectionShell
      title="Albums in your top tracks"
      description="Grouped from top track results for this period"
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && !error && albums.length === 0}
      emptyTitle="No albums"
      emptyDescription="Add top tracks for this period to see album groupings."
    >
      <Table className="min-w-[32rem]">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-14 pr-0">Artwork</TableHead>
            <TableHead className="min-w-[8rem]">Album</TableHead>
            <TableHead className="hidden min-w-[6rem] md:table-cell">Artists on tracks</TableHead>
            <TableHead className="w-[5.5rem] text-right sm:w-auto" title="Number of top tracks from this album and best rank in your list">
              In top list
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {albums.slice(0, 20).map((album) => (
            <TableRow key={album.id}>
              <TableCell className="w-14 py-2 pr-2 pl-2 align-middle">
                <SpotifyThumbnail src={album.image} alt="" size={SPOTIFY_MEDIA_SIZE.artwork} />
              </TableCell>
              <TableCell className="min-w-0 py-2">
                <Link
                  href={album.url}
                  target="_blank"
                  rel="noreferrer"
                  className="line-clamp-2 font-medium leading-snug hover:underline"
                  title={album.name}
                >
                  {album.name}
                </Link>
                <p className="line-clamp-2 text-xs text-muted-foreground md:hidden" title={album.artists}>
                  {album.artists}
                </p>
              </TableCell>
              <TableCell className="hidden min-w-0 py-2 text-muted-foreground md:table-cell">
                <span className="line-clamp-2 text-sm" title={album.artists}>
                  {album.artists}
                </span>
              </TableCell>
              <TableCell className="py-2 text-right text-xs text-muted-foreground whitespace-nowrap">
                <span className="tabular-nums">{trackCountLabel(album.trackCount)}</span>
                <span className="mx-1 text-border">·</span>
                <span className="tabular-nums">#{album.bestRank}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionShell>
  );
}
