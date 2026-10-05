"use client";

import { Fragment, useState } from "react";
import { SPOTIFY_MEDIA_SIZE, SpotifyArtistAvatar } from "@/components/spotify/spotify-media";
import { pickSpotifyImageUrl } from "@/lib/spotify/images";
import { deriveRankShare, formatGenreLabel } from "@/lib/analytics/derive";
import { getRankDelta } from "@/lib/analytics/compare";
import type { NormalizedArtist } from "@/lib/analytics/normalize";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import { timeRangeLabel } from "@/lib/spotify/time-range";
import { DetailSheet } from "@/features/dashboard/components/analytics/detail-sheet";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { RankMovement } from "@/features/dashboard/components/analytics/rank-movement";
import { SpotifyEntityPreview } from "@/features/dashboard/components/analytics/spotify-entity-preview";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type TopArtistsSectionProps = {
  artists: NormalizedArtist[];
  compareRange: SpotifyTimeRange;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
};

export function TopArtistsSection({ artists, compareRange, isLoading, error, onRetry }: TopArtistsSectionProps) {
  const [selected, setSelected] = useState<{ artist: NormalizedArtist; rank: number; share: number } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const topFive = artists.slice(0, 5);
  const total = artists.length;

  return (
    <>
      <SectionShell
        title="Top artists"
        description={
          artists.length > 0
            ? `${artists.length} top artists · top 5 cards use derived inverse-rank share`
            : "Ranked by Spotify for the selected period"
        }
        isLoading={isLoading}
        error={error}
        onRetry={onRetry}
        isEmpty={!isLoading && !error && artists.length === 0}
        emptyTitle="No top artists"
        emptyDescription="Spotify returned an empty list for this time range."
      >
        {topFive.length > 0 ? (
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {topFive.map((artist, index) => {
              const rank = index + 1;
              const image = pickSpotifyImageUrl(artist.images);
              const share = deriveRankShare(rank, total);
              const delta = getRankDelta(artist.periods[compareRange], rank);
              return (
                <SpotifyEntityPreview key={artist.id} kind="artist" artist={artist}>
                  <button
                    type="button"
                    onClick={() => setSelected({ artist, rank, share })}
                    className="flex w-full flex-col items-start gap-2 rounded-md border border-border/70 bg-background/50 p-2 text-left transition-colors hover:bg-muted/40"
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="text-xs font-medium text-muted-foreground tabular-nums">#{rank}</span>
                      <RankMovement delta={delta} />
                    </div>
                    <SpotifyArtistAvatar src={image} name={artist.name} size={SPOTIFY_MEDIA_SIZE.card} />
                    <span className="line-clamp-2 text-sm font-medium leading-snug">{artist.name}</span>
                    <span className="font-mono-stats text-[12px] text-muted-foreground">{(share * 100).toFixed(1)}% derived share</span>
                  </button>
                </SpotifyEntityPreview>
              );
            })}
          </div>
        ) : null}

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-8" />
              <TableHead className="w-10">#</TableHead>
              <TableHead className="w-10" />
              <TableHead>Artist</TableHead>
              <TableHead className="hidden md:table-cell">Genres</TableHead>
              <TableHead className="w-20 text-right">Move</TableHead>
              <TableHead className="w-24 text-right">Derived share</TableHead>
              <TableHead className="w-28 text-right">Popularity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artists.slice(0, 25).map((artist, index) => {
              const rank = index + 1;
              const share = deriveRankShare(rank, total);
              const image = pickSpotifyImageUrl(artist.images);
              const genres = (artist.genres ?? []).slice(0, 2).map(formatGenreLabel).join(", ");
              const delta = getRankDelta(artist.periods[compareRange], rank);
              const isExpanded = expandedId === artist.id;
              return (
                <Fragment key={artist.id}>
                  <TableRow className="cursor-pointer [&>td]:py-3">
                    <TableCell className="p-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => setExpandedId(isExpanded ? null : artist.id)}
                      >
                        <ChevronDown className={cn("size-4 transition-transform", isExpanded && "rotate-180")} />
                      </Button>
                    </TableCell>
                    <TableCell className="tabular-nums text-muted-foreground" onClick={() => setSelected({ artist, rank, share })}>
                      {rank}
                    </TableCell>
                    <TableCell className="w-10 shrink-0 px-2" onClick={() => setSelected({ artist, rank, share })}>
                      <SpotifyArtistAvatar src={image} name={artist.name} size={SPOTIFY_MEDIA_SIZE.table} />
                    </TableCell>
                    <TableCell className="min-w-0 max-w-0" onClick={() => setSelected({ artist, rank, share })}>
                      <SpotifyEntityPreview kind="artist" artist={artist}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="block truncate font-medium">{artist.name}</span>
                          </TooltipTrigger>
                          <TooltipContent>{artist.name}</TooltipContent>
                        </Tooltip>
                      </SpotifyEntityPreview>
                    </TableCell>
                    <TableCell
                      className="hidden min-w-0 max-w-0 truncate text-xs text-muted-foreground md:table-cell"
                      title={genres || undefined}
                    >
                      {genres ? genres : <span className="text-muted-foreground/70">No genres listed</span>}
                    </TableCell>
                    <TableCell className="text-right">
                      <RankMovement delta={delta} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-xs">{(share * 100).toFixed(1)}%</TableCell>
                    <TableCell className="text-right tabular-nums">{artist.popularity ?? "—"}</TableCell>
                  </TableRow>
                  {isExpanded ? (
                    <TableRow className="bg-muted/20 hover:bg-muted/20">
                      <TableCell colSpan={8} className="text-xs text-muted-foreground">
                        Period ranks:{" "}
                        {(["short_term", "medium_term", "long_term"] as SpotifyTimeRange[])
                          .map((r) =>
                            artist.periods[r]
                              ? `${r === "short_term" ? "4w" : r === "medium_term" ? "6m" : "all"} #${artist.periods[r]}`
                              : null,
                          )
                          .filter(Boolean)
                          .join(" · ")}{" "}
                        · vs {timeRangeLabel(compareRange)}:{" "}
                        {artist.periods[compareRange] ? `#${artist.periods[compareRange]}` : "not ranked"}
                      </TableCell>
                    </TableRow>
                  ) : null}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Derived share uses inverse rank weighting across your top artist list — not personal play counts from Spotify.
        </p>
      </SectionShell>
      <DetailSheet
        open={selected !== null}
        onClose={() => setSelected(null)}
        track={null}
        artist={selected?.artist ?? null}
        rank={selected?.rank}
        derivedShare={selected?.share}
      />
    </>
  );
}
