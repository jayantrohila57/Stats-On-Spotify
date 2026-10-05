"use client";

import { Fragment, useMemo, useState } from "react";
import type { NormalizedTrack } from "@/lib/analytics/normalize";
import { albumImageFromTrack } from "@/lib/spotify/images";
import { deriveRankShare } from "@/lib/analytics/derive";
import { DetailSheet } from "@/features/dashboard/components/analytics/detail-sheet";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { RankMovement } from "@/features/dashboard/components/analytics/rank-movement";
import { SpotifyEntityPreview } from "@/features/dashboard/components/analytics/spotify-entity-preview";
import { TrackRowDetail } from "@/features/dashboard/components/analytics/track-row-detail";
import { SPOTIFY_MEDIA_SIZE, SpotifyThumbnail } from "@/components/spotify/spotify-media";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { getRankDelta } from "@/lib/analytics/compare";
import type { SpotifyArtist } from "@/lib/spotify/types";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import { formatDurationMs } from "@/lib/text/duration";
import { ChevronDown } from "lucide-react";

const PAGE_SIZES = [10, 25, 50] as const;

const POPULARITY_HEADER_TITLE =
  "Spotify global popularity score from 0–100. This is not your personal play count.";

type TopTracksTableProps = {
  tracks: NormalizedTrack[];
  topArtists: SpotifyArtist[];
  compareRange: SpotifyTimeRange;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
};

export function TopTracksTable({
  tracks,
  topArtists,
  compareRange,
  isLoading,
  error,
  onRetry,
}: TopTracksTableProps) {
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(25);
  const [selected, setSelected] = useState<{ track: NormalizedTrack; rank: number } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const visible = useMemo(() => tracks.slice(0, pageSize), [tracks, pageSize]);
  const artistsById = useMemo(() => new Map(topArtists.map((a) => [a.id, a])), [topArtists]);
  const total = tracks.length;

  const description =
    total > 0
      ? `${total} top tracks for this period (instant switch — all periods prefetched) · showing ${Math.min(pageSize, total)}`
      : "Your Spotify top tracks for the selected period";

  return (
    <>
      <SectionShell
        title="Top tracks"
        description={description}
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
                className={cn("h-8 px-2.5 text-xs font-mono-stats", pageSize === size && "bg-muted")}
                onClick={() => setPageSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        }
      >
        <Table className="table-fixed text-[14px]" wrapperClassName="overflow-x-hidden">
          <colgroup>
            <col className="w-9" />
            <col className="w-10" />
            <col className="w-14" />
            <col />
            <col className="w-16" />
            <col className="w-14" />
            <col className="w-11" />
          </colgroup>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-9" />
              <TableHead>#</TableHead>
              <TableHead className="sr-only">Artwork</TableHead>
              <TableHead>Track</TableHead>
              <TableHead className="hidden text-right sm:table-cell">Length</TableHead>
              <TableHead className="text-right">Move</TableHead>
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
              const compareRank = track.periods[compareRange];
              const delta = getRankDelta(compareRank, rank);
              const share = deriveRankShare(rank, total);
              const isExpanded = expandedId === track.id;
              return (
                <Fragment key={track.id}>
                  <TableRow className="cursor-pointer [&>td]:py-3">
                    <TableCell className="p-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label="Expand row"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(isExpanded ? null : track.id);
                        }}
                      >
                        <ChevronDown className={cn("size-4 transition-transform", isExpanded && "rotate-180")} />
                      </Button>
                    </TableCell>
                    <TableCell
                      className="font-mono-stats text-muted-foreground"
                      onClick={() => setSelected({ track, rank })}
                    >
                      {rank}
                    </TableCell>
                    <TableCell className="shrink-0 px-2" onClick={() => setSelected({ track, rank })}>
                      <SpotifyThumbnail src={image} alt="" size={SPOTIFY_MEDIA_SIZE.table} />
                    </TableCell>
                    <TableCell className="min-w-0" onClick={() => setSelected({ track, rank })}>
                      <SpotifyEntityPreview kind="track" track={track}>
                        <div className="min-w-0 text-left">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="block truncate text-[15px] font-medium">{track.name}</span>
                            </TooltipTrigger>
                            <TooltipContent>{track.name}</TooltipContent>
                          </Tooltip>
                          <p className="truncate text-[13px] text-muted-foreground">{artistLine}</p>
                          <p className="mt-0.5 hidden font-mono-stats text-[12px] text-muted-foreground/90 sm:block">
                            {(share * 100).toFixed(1)}% derived share · {track.album.name}
                          </p>
                        </div>
                      </SpotifyEntityPreview>
                    </TableCell>
                    <TableCell
                      className="hidden text-right font-mono-stats text-[13px] text-muted-foreground sm:table-cell"
                      onClick={() => setSelected({ track, rank })}
                    >
                      {formatDurationMs(track.duration_ms)}
                    </TableCell>
                    <TableCell className="text-right">
                      <RankMovement delta={delta} />
                    </TableCell>
                    <TableCell className="text-right font-mono-stats">{track.popularity}</TableCell>
                  </TableRow>
                  {isExpanded ? (
                    <TableRow key={`${track.id}-detail`} className="bg-muted/20 hover:bg-muted/20">
                      <TableCell colSpan={7} className="px-4 py-3">
                        <TrackRowDetail
                          track={track}
                          rank={rank}
                          totalTracks={total}
                          compareRange={compareRange}
                          artistsById={artistsById}
                        />
                      </TableCell>
                    </TableRow>
                  ) : null}
                </Fragment>
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
