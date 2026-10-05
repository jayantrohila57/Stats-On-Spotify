"use client";

import Image from "next/image";
import Link from "next/link";
import type { SpotifyPlaylist } from "@/lib/spotify/types";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type PlaylistsTableProps = {
  playlists: SpotifyPlaylist[];
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
};

export function PlaylistsTable({ playlists, isLoading, error, onRetry }: PlaylistsTableProps) {
  const sorted = [...playlists].sort((a, b) => (b.tracks?.total ?? 0) - (a.tracks?.total ?? 0));

  return (
    <SectionShell
      title="Playlists"
      description="Your Spotify playlists (not filtered by period)"
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      isEmpty={!isLoading && !error && playlists.length === 0}
      emptyTitle="No playlists"
      emptyDescription="No playlists were returned for your account."
    >
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10" />
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Owner</TableHead>
            <TableHead className="w-24 text-right">Tracks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.slice(0, 30).map((playlist) => {
            const image = playlist.images[0]?.url;
            return (
              <TableRow key={playlist.id}>
                <TableCell>
                  {image ? (
                    <Image src={image} alt="" width={32} height={32} className="size-8 rounded border border-border/60" />
                  ) : (
                    <div className="size-8 rounded bg-muted" />
                  )}
                </TableCell>
                <TableCell className="max-w-[280px]">
                  <Link
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate font-medium hover:underline"
                  >
                    {playlist.name}
                  </Link>
                  {playlist.description ? (
                    <p className="truncate text-xs text-muted-foreground">{playlist.description}</p>
                  ) : null}
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">{playlist.owner.display_name}</TableCell>
                <TableCell className="text-right tabular-nums">{playlist.tracks?.total?.toLocaleString() ?? "—"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </SectionShell>
  );
}
