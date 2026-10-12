"use client";

import {
  countDistinctGenreTags,
  deriveGenreStatsWithOther,
  formatGenreLabel,
} from "@/lib/analytics/derive";
import type { SpotifyArtist } from "@/lib/spotify/types";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";

type GenreDistributionProps = {
  artists: SpotifyArtist[];
  description?: string;
  isLoading: boolean;
  error: string | null;
};

export function GenreDistribution({ artists, description, isLoading, error }: GenreDistributionProps) {
  const stats = deriveGenreStatsWithOther(artists);
  const distinctTags = countDistinctGenreTags(artists);

  return (
    <SectionShell
      title="Genre distribution"
      description={description ?? "Derived from genre tags on your top artists"}
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && !error && stats.length === 0}
      emptyTitle="No genre metadata"
      emptyDescription="Spotify did not return genre tags for your top artists in this period."
      meta={
        stats.length > 0 ? (
          <span className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{distinctTags}</span> distinct tags · top{" "}
            <span className="font-medium text-foreground">{stats.length}</span> shown (incl. Other)
          </span>
        ) : null
      }
    >
      <ul className="min-w-0 space-y-2 md:max-w-lg">
        {stats.map((item) => (
          <li key={item.genre}>
            <div className="mb-1 flex items-center justify-between gap-2 text-sm">
              <span className="truncate font-medium">
                {item.genre === "other" ? "Other" : formatGenreLabel(item.genre)}
              </span>
              <span className="shrink-0 font-mono-stats text-muted-foreground">
                {item.count} artist{item.count === 1 ? "" : "s"} · {(item.share * 100).toFixed(0)}%
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-sm bg-muted">
              <div className="h-full bg-chart-1" style={{ width: `${Math.max(item.share * 100, 2)}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
