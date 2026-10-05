"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { SpotifyTrack } from "@/lib/spotify/types";
import { pickSpotifyImageUrl } from "@/lib/spotify/images";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { SpotifyImage } from "@/components/spotify/spotify-image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type AlbumsFromTracksTableProps = {
  tracks: SpotifyTrack[];
  isLoading: boolean;
  error: string | null;
};

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
      <Table className="table-fixed" wrapperClassName="overflow-x-hidden">
        <colgroup>
          <col className="w-10" />
          <col />
          <col className="w-[5.5rem]" />
        </colgroup>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="sr-only">Artwork</TableHead>
            <TableHead>Album</TableHead>
            <TableHead className="hidden 2xl:table-cell">Artists on tracks</TableHead>
            <TableHead className="text-right" title="Number of top tracks from this album and best rank in your list">
              In top list
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {albums.slice(0, 20).map((album) => (
            <TableRow key={album.id}>
              <TableCell className="px-2">
                <SpotifyImage src={album.image} alt="" size={32} className="border border-border/60" />
              </TableCell>
              <TableCell className="min-w-0">
                <Link
                  href={album.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block truncate font-medium hover:underline"
                  title={album.name}
                >
                  {album.name}
                </Link>
                <p className="truncate text-xs text-muted-foreground 2xl:hidden" title={album.artists}>
                  {album.artists}
                </p>
              </TableCell>
              <TableCell
                className="hidden min-w-0 truncate text-muted-foreground 2xl:table-cell"
                title={album.artists}
              >
                {album.artists}
              </TableCell>
              <TableCell className="text-right text-xs text-muted-foreground">
                <span className="tabular-nums">{album.trackCount}</span>
                <span className="hidden sm:inline"> tracks</span>
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
