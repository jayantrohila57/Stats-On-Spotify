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
        emptyTitle="Not available"
        emptyDescription="Spotify does not expose a full time-series play log. Recently played covers only the latest window."
      />
      <SectionShell
        title="Session length & play counts"
        description="Per-track play totals and listening hours"
        isLoading={false}
        error={null}
        isEmpty
        emptyTitle="Not available"
        emptyDescription="Personal play counts and listening hours are not returned by the endpoints used here."
      />
    </div>
  );
}
