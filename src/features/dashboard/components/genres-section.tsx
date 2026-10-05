"use client";

import type { SpotifyArtist } from "@/lib/spotify/types";
import { collectGenreStats } from "@/features/dashboard/lib/genres";
import { AnalyticsSection } from "@/features/dashboard/components/analytics-section";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GenresSectionProps = {
  artists: SpotifyArtist[];
  timeRange: SpotifyTimeRange;
  selectedGenreKey: string | null;
  onSelectGenre: (genreKey: string) => void;
  isRefreshing?: boolean;
};

export function GenresSection({
  artists,
  timeRange,
  selectedGenreKey,
  onSelectGenre,
  isRefreshing,
}: GenresSectionProps) {
  const genres = collectGenreStats(artists);

  return (
    <AnalyticsSection
      id="genres"
      title="Genres"
      description="Derived from genre tags on your top artists in this period."
      timeRange={timeRange}
      isRefreshing={isRefreshing}
    >
      {genres.length === 0 ? (
        <p className="text-sm text-zinc-500">No genre tags available for your top artists.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Button
              key={genre.key}
              type="button"
              variant="secondary"
              onClick={() => onSelectGenre(genre.key)}
              className={cn(
                "h-auto rounded-full bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800",
                selectedGenreKey === genre.key && "ring-1 ring-[#1db954]",
              )}
            >
              {genre.label}
              <span className="ml-1.5 text-zinc-500">({genre.artistCount})</span>
            </Button>
          ))}
        </div>
      )}
    </AnalyticsSection>
  );
}
