"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { SpotifyTrack } from "@/lib/spotify/types";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
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
      if (!existing) {
        map.set(track.album.id, {
          id: track.album.id,
          name: track.album.name,
          image: track.album.images[0]?.url,
          url: track.album.external_urls.spotify,
          artists: track.artists.map((a) => a.name).join(", "),
          trackCount: 1,
          bestRank: rank,
        });
      } else {
        existing.trackCount += 1;
        existing.bestRank = Math.min(existing.bestRank, rank);
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
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10" />
            <TableHead>Album</TableHead>
            <TableHead className="hidden md:table-cell">Artists on tracks</TableHead>
            <TableHead className="w-24 text-right">Top tracks</TableHead>
            <TableHead className="w-20 text-right">Best rank</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {albums.slice(0, 20).map((album) => (
            <TableRow key={album.id}>
              <TableCell>
                {album.image ? (
                  <Image src={album.image} alt="" width={32} height={32} className="size-8 rounded border border-border/60" />
                ) : (
                  <div className="size-8 rounded bg-muted" />
                )}
              </TableCell>
              <TableCell className="max-w-[220px]">
                <Link href={album.url} target="_blank" rel="noreferrer" className="truncate font-medium hover:underline">
                  {album.name}
                </Link>
              </TableCell>
              <TableCell className="hidden max-w-[200px] truncate text-muted-foreground md:table-cell">{album.artists}</TableCell>
              <TableCell className="text-right tabular-nums">{album.trackCount}</TableCell>
              <TableCell className="text-right tabular-nums text-muted-foreground">#{album.bestRank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionShell>
  );
}
