"use client";

import { Fragment, useState } from "react";
import { History, ChevronDown } from "lucide-react";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { SpotifyEntityPreview } from "@/features/dashboard/components/analytics/spotify-entity-preview";
import { SpotifyThumbnail } from "@/components/spotify/spotify-media";
import { albumImageFromTrack } from "@/lib/spotify/images";
import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDurationMs } from "@/lib/text/duration";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

type RecentlyPlayedSectionProps = {
  items: SpotifyPlayHistoryItem[];
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
};

export function RecentlyPlayedSection({ items, isLoading, error, onRetry }: RecentlyPlayedSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const description =
    items.length > 0
      ? `${items.length} plays in Spotify’s recent window (max 50) — not full listening history`
      : "Latest plays from Spotify (up to 50). Not a full listening history.";

  return (
    <SectionShell
      icon={History}
      title="Recently played"
      description={description}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      isEmpty={!isLoading && !error && items.length === 0}
      emptyTitle="No recent plays"
      emptyDescription="Spotify returned an empty recently played list."
    >
      <Table className="min-w-[32rem]">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-8" />
            <TableHead>Track</TableHead>
            <TableHead className="w-24 text-right">When</TableHead>
            <TableHead className="hidden md:table-cell">Context</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const track = item.track;
            const rowKey = `${track.id}-${item.played_at}`;
            const isExpanded = expandedId === rowKey;
            return (
              <Fragment key={rowKey}>
                <TableRow>
                  <TableCell className="p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      aria-label="Expand row"
                      onClick={() => setExpandedId(isExpanded ? null : rowKey)}
                    >
                      <ChevronDown className={cn("size-4 transition-transform", isExpanded && "rotate-180")} />
                    </Button>
                  </TableCell>
                  <TableCell className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2">
                      <SpotifyThumbnail src={albumImageFromTrack(track)} alt="" />
                      <SpotifyEntityPreview kind="track" track={track}>
                        <button type="button" className="min-w-0 text-left">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="block truncate text-sm font-medium">{track.name}</span>
                            </TooltipTrigger>
                            <TooltipContent>{track.name}</TooltipContent>
                          </Tooltip>
                          <p className="truncate text-xs text-muted-foreground">
                            {track.artists.map((a) => a.name).join(", ")}
                          </p>
                        </button>
                      </SpotifyEntityPreview>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground" title={item.played_at}>
                    {relativeTime(item.played_at)}
                  </TableCell>
                  <TableCell className="hidden truncate text-xs text-muted-foreground md:table-cell">
                    {item.context?.type ?? "—"}
                  </TableCell>
                </TableRow>
                {isExpanded ? (
                  <TableRow key={`${rowKey}-detail`} className="bg-muted/20 hover:bg-muted/20">
                    <TableCell colSpan={4} className="py-2 text-xs text-muted-foreground">
                      Played at {new Date(item.played_at).toLocaleString()} · Duration{" "}
                      {formatDurationMs(track.duration_ms)} · Album {track.album.name}
                      {item.context ? ` · Context: ${item.context.type}` : ""}
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
