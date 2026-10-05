"use client";

import { Fragment, useState } from "react";
import { History, ChevronDown } from "lucide-react";
import { SectionHeader } from "@/features/dashboard/components/analytics/section-header";
import { SpotifyEntityPreview } from "@/features/dashboard/components/analytics/spotify-entity-preview";
import { SpotifyThumbnail } from "@/components/spotify/spotify-media";
import { albumImageFromTrack } from "@/lib/spotify/images";
import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";
import { StatsEmptyState, StatsErrorState } from "@/components/stats/stats-feedback";
import { Skeleton } from "@/components/ui/skeleton";
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

  return (
    <section className="rounded-md border border-border/80 bg-card/30 p-4">
      <SectionHeader
        icon={History}
        title="Recently played"
        description="Latest plays from Spotify (up to 50). Not a full listening history."
      />
      {isLoading ? (
        <div className="mt-3 space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : error ? (
        <StatsErrorState message={error} onRetry={onRetry} />
      ) : items.length === 0 ? (
        <StatsEmptyState title="No recent plays" description="Spotify returned an empty recently played list." />
      ) : (
        <Table className="mt-3">
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
      )}
    </section>
  );
}
