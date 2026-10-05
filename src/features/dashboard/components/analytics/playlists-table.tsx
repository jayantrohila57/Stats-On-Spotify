"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { SpotifyPlaylist } from "@/lib/spotify/types";
import { pickSpotifyImageUrl } from "@/lib/spotify/images";
import { spotifyPlainText } from "@/lib/text/plaintext";
import { SpotifyEntityPreview } from "@/features/dashboard/components/analytics/spotify-entity-preview";
import { SpotifyThumbnail } from "@/components/spotify/spotify-media";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type PlaylistsTableProps = {
  playlists: SpotifyPlaylist[];
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
};

export function PlaylistsTable({ playlists, isLoading, error, onRetry }: PlaylistsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
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
            <TableHead className="w-8" />
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
            const isExpanded = expandedId === playlist.id;
            return (
              <Fragment key={playlist.id}>
                <TableRow>
                  <TableCell className="p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={() => setExpandedId(isExpanded ? null : playlist.id)}
                    >
                      <ChevronDown className={cn("size-4 transition-transform", isExpanded && "rotate-180")} />
                    </Button>
                  </TableCell>
                  <TableCell className="w-10 shrink-0 px-2">
                    <SpotifyThumbnail src={image} alt="" />
                  </TableCell>
                  <TableCell className="min-w-0 max-w-0">
                    <SpotifyEntityPreview kind="playlist" playlist={playlist}>
                      <div className="min-w-0">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={playlist.external_urls.spotify}
                              target="_blank"
                              rel="noreferrer"
                              className="block truncate font-medium hover:underline"
                            >
                              {playlist.name}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>{playlist.name}</TooltipContent>
                        </Tooltip>
                        {description ? (
                          <p className="truncate text-xs text-muted-foreground" title={description}>{description}</p>
                        ) : null}
                      </div>
                    </SpotifyEntityPreview>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">{playlist.owner.display_name}</TableCell>
                  <TableCell className="text-right tabular-nums">{playlist.tracks?.total?.toLocaleString() ?? "—"}</TableCell>
                </TableRow>
                {isExpanded ? (
                  <TableRow className="bg-muted/20 hover:bg-muted/20">
                    <TableCell colSpan={5} className="text-xs text-muted-foreground">
                      Owner {playlist.owner.display_name} · {description || "No description"} ·{" "}
                      <Link href={playlist.external_urls.spotify} className="underline" target="_blank" rel="noreferrer">
                        Open in Spotify
                      </Link>
                    </TableCell>
                  </TableRow>
                ) : null}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </SectionShell>
  );
}
