"use client";

import {
  countDistinctGenreTags,
  deriveGenreStatsWithOther,
  formatGenreLabel,
} from "@/lib/analytics/derive";
import { deriveHourDistribution } from "@/lib/analytics/listening-patterns";
import type { SpotifyArtist } from "@/lib/spotify/types";
import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";
import { INSET_PANEL_CLASS } from "@/lib/ui/layout-classes";
import { cn } from "@/lib/utils";

type OverviewSnapshotProps = {
  topArtists: SpotifyArtist[];
  recentPlays: SpotifyPlayHistoryItem[];
};

export function OverviewSnapshot({ topArtists, recentPlays }: OverviewSnapshotProps) {
  const genreStats = deriveGenreStatsWithOther(topArtists, 5);
  const distinctTags = countDistinctGenreTags(topArtists);
  const hours = deriveHourDistribution(recentPlays);
  const peakHour = hours.reduce((best, bucket) => (bucket.count > best.count ? bucket : best), hours[0]);
  const topGenre = genreStats[0];

  if (genreStats.length === 0 && recentPlays.length === 0) {
    return null;
  }

  return (
    <div className={cn(INSET_PANEL_CLASS, "mt-4")}>
      <p className="text-sm font-medium">Overview snapshot</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {topGenre
          ? `${topGenre.genre === "other" ? "Other" : formatGenreLabel(topGenre.genre)} covers ${(topGenre.share * 100).toFixed(0)}% of top-artist genre tags · ${distinctTags} distinct tags`
          : "No genre tags on top artists for this period"}
        {recentPlays.length > 0
          ? ` · Peak recent-play hour: ${peakHour.hour}:00 (${peakHour.count} of ${recentPlays.length} sample plays, ${(peakHour.share * 100).toFixed(0)}%)`
          : ""}
      </p>
      {genreStats.length > 0 ? (
        <ul className="mt-3 space-y-2 border-t border-border pt-3">
          {genreStats.map((item) => (
            <li key={item.genre}>
              <div className="mb-1 flex items-center justify-between gap-4 text-xs">
                <span className="min-w-0 truncate font-medium">
                  {item.genre === "other" ? "Other" : formatGenreLabel(item.genre)}
                </span>
                <span className="shrink-0 tabular-nums font-mono-stats text-muted-foreground">
                  {(item.share * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-1 overflow-hidden rounded-sm bg-muted">
                <div
                  className="h-full bg-chart-1"
                  style={{ width: `${Math.max(item.share * 100, 2)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
