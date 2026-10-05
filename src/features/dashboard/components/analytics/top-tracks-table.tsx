"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { SpotifyTrack } from "@/lib/spotify/types";
import { DetailSheet } from "@/features/dashboard/components/analytics/detail-sheet";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const PAGE_SIZES = [10, 25, 50] as const;

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
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10">#</TableHead>
              <TableHead className="w-10" />
              <TableHead>Track</TableHead>
              <TableHead className="hidden md:table-cell">Artist</TableHead>
              <TableHead className="hidden lg:table-cell">Album</TableHead>
              <TableHead className="w-28 text-right">Spotify popularity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((track, index) => {
              const rank = index + 1;
              const image = track.album.images.at(-1)?.url ?? track.album.images[0]?.url;
              return (
                <TableRow
                  key={track.id}
                  className="cursor-pointer"
                  onClick={() => setSelected({ track, rank })}
                >
                  <TableCell className="tabular-nums text-muted-foreground">{rank}</TableCell>
                  <TableCell>
                    {image ? (
                      <Image src={image} alt="" width={32} height={32} className="size-8 rounded border border-border/60" />
                    ) : (
                      <div className="size-8 rounded bg-muted" />
                    )}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate font-medium">{track.name}</TableCell>
                  <TableCell className="hidden max-w-[180px] truncate text-muted-foreground md:table-cell">
                    {track.artists.map((a) => a.name).join(", ")}
                  </TableCell>
                  <TableCell className="hidden max-w-[180px] truncate text-muted-foreground lg:table-cell">
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
