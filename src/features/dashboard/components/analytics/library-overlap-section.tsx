"use client";

import { Library } from "lucide-react";
import { SectionHeader } from "@/features/dashboard/components/analytics/section-header";
import type { LibraryOverlapMetrics } from "@/lib/analytics/library-overlap";
import { SAVED_TRACKS_SAMPLE_LIMIT } from "@/lib/analytics/library-overlap";
import { AnalyticsSectionCard } from "@/components/layout/analytics-section-card";
import { INSET_PANEL_CLASS } from "@/lib/ui/layout-classes";
import { Progress } from "@/components/ui/progress";

type LibraryOverlapSectionProps = {
  libraryOverlap: LibraryOverlapMetrics;
};

export function LibraryOverlapSection({ libraryOverlap }: LibraryOverlapSectionProps) {
  const { tracks, artists } = libraryOverlap;

  const savedSampleNote = tracks.savedSampleCapped
    ? `Saved tracks: first ~${SAVED_TRACKS_SAMPLE_LIMIT} from your library (${tracks.savedSampleWithIds} with IDs)`
    : `Saved tracks: ${tracks.savedSampleFetched} fetched (${tracks.savedSampleWithIds} with IDs)`;

  return (
    <AnalyticsSectionCard>
      <SectionHeader
        icon={Library}
        title="Library & follows overlap"
        description={`Overlap with your current top lists. ${savedSampleNote}. Followed artists sample: ${artists.followedSampleFetched}.`}
      />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className={INSET_PANEL_CLASS}>
          <p className="text-xs font-medium">Top tracks in saved library</p>
          <p className="text-lg font-semibold tabular-nums">
            {tracks.overlapCount}/{tracks.topTrackTotal}{" "}
            <span className="text-sm font-normal text-muted-foreground">({tracks.overlapPercentOfTop}%)</span>
          </p>
          <Progress value={tracks.overlapPercentOfTop} className="h-1.5" />
          <p className="text-xs text-muted-foreground">
            % of your top {tracks.topTrackTotal} tracks that appear in the saved sample (denominator is top-list size,
            not library size).
          </p>
        </div>
        <div className={INSET_PANEL_CLASS}>
          <p className="text-xs font-medium">Top artists you follow</p>
          <p className="text-lg font-semibold tabular-nums">
            {artists.overlapCount}/{artists.topArtistTotal}{" "}
            <span className="text-sm font-normal text-muted-foreground">({artists.overlapPercentOfTop}%)</span>
          </p>
          <Progress value={artists.overlapPercentOfTop} className="h-1.5" />
          <p className="text-xs text-muted-foreground">
            % of your top {artists.topArtistTotal} artists that appear in the followed-artists sample.
          </p>
        </div>
      </div>
    </AnalyticsSectionCard>
  );
}
