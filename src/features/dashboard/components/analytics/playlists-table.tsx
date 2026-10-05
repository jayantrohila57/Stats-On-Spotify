"use client";

import Link from "next/link";
import type { SpotifyPlaylist } from "@/lib/spotify/types";
import { pickSpotifyImageUrl } from "@/lib/spotify/images";
import { spotifyPlainText } from "@/lib/text/plaintext";
import { SpotifyThumbnail } from "@/components/spotify/spotify-media";
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
            const image = pickSpotifyImageUrl(playlist.images);
            const description = spotifyPlainText(playlist.description);
            return (
              <TableRow key={playlist.id}>
                <TableCell className="w-10 shrink-0 px-2">
                  <SpotifyThumbnail src={image} alt="" />
                </TableCell>
                <TableCell className="min-w-0 max-w-0">
                  <Link
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                    className="block truncate font-medium hover:underline"
                    title={playlist.name}
                  >
                    {playlist.name}
                  </Link>
                  {description ? (
                    <p className="truncate text-xs text-muted-foreground" title={description}>{description}</p>
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
