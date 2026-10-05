"use client";

import Image from "next/image";
import { useState } from "react";
import type { SpotifyArtist } from "@/lib/spotify/types";
import { deriveRankShare, formatGenreLabel } from "@/lib/analytics/derive";
import { DetailSheet } from "@/features/dashboard/components/analytics/detail-sheet";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TopArtistsSectionProps = {
  artists: SpotifyArtist[];
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
};

export function TopArtistsSection({ artists, isLoading, error, onRetry }: TopArtistsSectionProps) {
  const [selected, setSelected] = useState<{ artist: SpotifyArtist; rank: number; share: number } | null>(null);
  const topFive = artists.slice(0, 5);
  const total = artists.length;

  return (
    <>
      <SectionShell
        title="Top artists"
        description="Ranked by Spotify for the selected period"
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
              const image = artist.images?.[0]?.url;
              const share = deriveRankShare(rank, total);
              return (
                <button
                  key={artist.id}
                  type="button"
                  onClick={() => setSelected({ artist, rank, share })}
                  className="flex flex-col items-start gap-2 rounded-md border border-border/70 bg-background/50 p-2 text-left transition-colors hover:bg-muted/40"
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground tabular-nums">#{rank}</span>
                    {image ? (
                      <Image src={image} alt="" width={40} height={40} className="size-10 rounded-full border border-border/60 object-cover" />
                    ) : (
                      <div className="size-10 rounded-full bg-muted" />
                    )}
                  </div>
                  <span className="line-clamp-2 text-xs font-medium leading-snug">{artist.name}</span>
                  <span className="text-[10px] text-muted-foreground">{(share * 100).toFixed(1)}% derived share</span>
                </button>
              );
            })}
          </div>
        ) : null}

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10">#</TableHead>
              <TableHead className="w-10" />
              <TableHead>Artist</TableHead>
              <TableHead className="hidden md:table-cell">Genres</TableHead>
              <TableHead className="w-24 text-right">Derived share</TableHead>
              <TableHead className="w-28 text-right">Spotify popularity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artists.slice(0, 25).map((artist, index) => {
              const rank = index + 1;
              const share = deriveRankShare(rank, total);
              const image = artist.images?.at(-1)?.url ?? artist.images?.[0]?.url;
              const genres = (artist.genres ?? []).slice(0, 2).map(formatGenreLabel).join(", ");
              return (
                <TableRow key={artist.id} className="cursor-pointer" onClick={() => setSelected({ artist, rank, share })}>
                  <TableCell className="tabular-nums text-muted-foreground">{rank}</TableCell>
                  <TableCell>
                    {image ? (
                      <Image src={image} alt="" width={32} height={32} className="size-8 rounded-full border border-border/60 object-cover" />
                    ) : (
                      <div className="size-8 rounded-full bg-muted" />
                    )}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate font-medium">{artist.name}</TableCell>
                  <TableCell className="hidden max-w-[240px] truncate text-xs text-muted-foreground md:table-cell">
                    {genres || "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs">{(share * 100).toFixed(1)}%</TableCell>
                  <TableCell className="text-right tabular-nums">{artist.popularity ?? "—"}</TableCell>
                </TableRow>
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
