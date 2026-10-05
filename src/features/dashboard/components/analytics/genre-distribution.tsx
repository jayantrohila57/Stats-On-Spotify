"use client";

import { deriveGenreStats, formatGenreLabel } from "@/lib/analytics/derive";
import type { SpotifyArtist } from "@/lib/spotify/types";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";

type GenreDistributionProps = {
  artists: SpotifyArtist[];
  isLoading: boolean;
  error: string | null;
};

export function GenreDistribution({ artists, isLoading, error }: GenreDistributionProps) {
  const stats = deriveGenreStats(artists);
  const diversity = stats.length;

  return (
    <SectionShell
      title="Genre distribution"
      description="Derived from genre tags on your top artists"
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && !error && stats.length === 0}
      emptyTitle="No genre metadata"
      emptyDescription="Spotify did not return genre tags for your top artists in this period."
      meta={
        stats.length > 0 ? (
          <span className="text-xs text-muted-foreground">
            Diversity (derived): <span className="font-medium text-foreground">{diversity}</span> unique tags in top
            artists
          </span>
        ) : null
      }
    >
      <ul className="space-y-2.5">
        {stats.map((item) => (
          <li key={item.genre}>
            <div className="mb-1 flex items-center justify-between gap-2 text-xs">
              <span className="truncate font-medium">{formatGenreLabel(item.genre)}</span>
              <span className="shrink-0 tabular-nums text-muted-foreground">
                {item.count} artist{item.count === 1 ? "" : "s"} · {(item.share * 100).toFixed(0)}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-sm bg-muted">
              <div
                className="h-full bg-foreground/70"
                style={{ width: `${Math.max(item.share * 100, 2)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
