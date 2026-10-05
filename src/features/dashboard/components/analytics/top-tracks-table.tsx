"use client";

import { useMemo, useState } from "react";
import type { SpotifyTrack } from "@/lib/spotify/types";
import { albumImageFromTrack } from "@/lib/spotify/images";
import { DetailSheet } from "@/features/dashboard/components/analytics/detail-sheet";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { SpotifyThumbnail } from "@/components/spotify/spotify-media";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const PAGE_SIZES = [10, 25, 50] as const;

const POPULARITY_HEADER_TITLE =
  "Spotify global popularity score from 0–100. This is not your personal play count.";

type TopTracksTableProps = {
  tracks: SpotifyTrack[];
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
};

export function TopTracksTable({ tracks, isLoading, error, onRetry }: TopTracksTableProps) {
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(25);
  const [selected, setSelected] = useState<{ track: SpotifyTrack; rank: number } | null>(null);

  const visible = useMemo(() => tracks.slice(0, pageSize), [tracks, pageSize]);

  return (
    <>
      <SectionShell
        title="Top tracks"
        description="Your Spotify top tracks for the selected period"
        isLoading={isLoading}
        error={error}
        onRetry={onRetry}
        isEmpty={!isLoading && !error && tracks.length === 0}
        emptyTitle="No top tracks"
        emptyDescription="Spotify returned an empty list for this time range. Try another period or listen more on Spotify."
        meta={
          <div className="flex items-center gap-1 rounded-md border border-border/80 p-0.5">
            {PAGE_SIZES.map((size) => (
              <Button
                key={size}
                type="button"
                variant="ghost"
                size="sm"
                className={cn("h-7 px-2 text-xs", pageSize === size && "bg-muted")}
                onClick={() => setPageSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        }
      >
        <Table className="table-fixed" wrapperClassName="overflow-x-hidden">
          <colgroup>
            <col className="w-8" />
            <col className="w-10" />
            <col />
            <col className="w-11" />
          </colgroup>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>#</TableHead>
              <TableHead className="sr-only">Artwork</TableHead>
              <TableHead>Track</TableHead>
              <TableHead className="hidden 2xl:table-cell">Artist</TableHead>
              <TableHead className="hidden 2xl:table-cell">Album</TableHead>
              <TableHead className="text-right" title={POPULARITY_HEADER_TITLE}>
                Pop.
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((track, index) => {
              const rank = index + 1;
              const image = albumImageFromTrack(track);
              const artistLine = track.artists.map((a) => a.name).join(", ");
              return (
                <TableRow
                  key={track.id}
                  className="cursor-pointer"
                  onClick={() => setSelected({ track, rank })}
                >
                  <TableCell className="tabular-nums text-muted-foreground">{rank}</TableCell>
                  <TableCell className="w-10 shrink-0 px-2">
                    <SpotifyThumbnail src={image} alt="" />
                  </TableCell>
                  <TableCell className="min-w-0">
                    <p className="truncate font-medium" title={track.name}>{track.name}</p>
                    <p className="truncate text-xs text-muted-foreground 2xl:hidden" title={artistLine}>
                      {artistLine}
                    </p>
                    <p className="hidden truncate text-xs text-muted-foreground xl:block 2xl:hidden" title={track.album.name}>
                      {track.album.name}
                    </p>
                  </TableCell>
                  <TableCell className="hidden min-w-0 truncate text-muted-foreground 2xl:table-cell" title={artistLine}>
                    {artistLine}
                  </TableCell>
                  <TableCell className="hidden min-w-0 truncate text-muted-foreground 2xl:table-cell" title={track.album.name}>
                    {track.album.name}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{track.popularity}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </SectionShell>
      <DetailSheet
        open={selected !== null}
        onClose={() => setSelected(null)}
        track={selected?.track ?? null}
        artist={null}
        rank={selected?.rank}
      />
    </>
  );
}
