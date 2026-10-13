"use client";

import { Library } from "lucide-react";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import type { LibraryOverlapMetrics } from "@/lib/analytics/library-overlap";
import { SAVED_TRACKS_SAMPLE_LIMIT } from "@/lib/analytics/library-overlap";
import { INSET_PANEL_CLASS } from "@/lib/ui/layout-classes";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

type LibraryOverlapSectionProps = {
  libraryOverlap: LibraryOverlapMetrics;
  metricsReady: boolean;
};

function OverlapPanelsSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {[0, 1].map((key) => (
        <div key={key} className={INSET_PANEL_CLASS}>
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-2 h-8 w-28" />
          <Skeleton className="mt-3 h-1.5 w-full" />
          <Skeleton className="mt-3 h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

export function LibraryOverlapSection({ libraryOverlap, metricsReady }: LibraryOverlapSectionProps) {
  const { tracks, artists } = libraryOverlap;

  const savedSampleNote = tracks.savedSampleCapped
    ? `Saved tracks: first ~${SAVED_TRACKS_SAMPLE_LIMIT} from your library (${tracks.savedSampleWithIds} with IDs)`
    : `Saved tracks: ${tracks.savedSampleFetched} fetched (${tracks.savedSampleWithIds} with IDs)`;

  const description = `Overlap with your current top lists. ${savedSampleNote}. Followed artists sample: ${artists.followedSampleFetched}.`;

  return (
    <SectionShell
      icon={Library}
      title="Library & follows overlap"
      description={metricsReady ? description : <Skeleton className="mt-1 h-4 w-full max-w-lg" aria-hidden />}
      isLoading={!metricsReady}
      error={null}
      loadingSkeleton={<OverlapPanelsSkeleton />}
    >
      <div className="grid gap-8 sm:grid-cols-2">
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
    </SectionShell>
  );
}
