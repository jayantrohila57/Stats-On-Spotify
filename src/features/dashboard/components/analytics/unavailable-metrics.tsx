"use client";

import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";

export function UnavailableMetricsPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionShell
        title="Listening activity over time"
        description="Play counts by day or week"
        isLoading={false}
        error={null}
        isEmpty
        emptyTitle="Not enough historical data"
        emptyDescription="This app does not store listening history. Spotify does not expose a time-series play log via the endpoints used here."
      />
      <SectionShell
        title="Listening patterns"
        description="By hour and weekday"
        isLoading={false}
        error={null}
        isEmpty
        emptyTitle="Not enough historical data"
        emptyDescription="Hour and weekday breakdowns require recently played timestamps or stored history, which are not available in the current integration."
      />
      <SectionShell
        title="Taste evolution"
        description="How your top artists change across periods"
        isLoading={false}
        error={null}
        isEmpty
        emptyTitle="Not enough historical data"
        emptyDescription="Comparing snapshots over time would require saved historical pulls. Switch periods above to compare current Spotify windows manually."
      />
      <SectionShell
        title="Now playing & recently played"
        isLoading={false}
        error={null}
        isEmpty
        emptyTitle="Not available"
        emptyDescription="Playback state and recently played feeds are not wired in this dashboard. Top tracks reflect your Spotify top lists for the selected period."
      />
    </div>
  );
}
