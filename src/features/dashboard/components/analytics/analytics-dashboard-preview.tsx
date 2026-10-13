"use client";

import { PageContainer } from "@/components/layout/page-container";
import { AlbumsFromTracksTable } from "@/features/dashboard/components/analytics/albums-from-tracks-table";
import { GenreDistribution } from "@/features/dashboard/components/analytics/genre-distribution";
import { RecentlyPlayedSection } from "@/features/dashboard/components/analytics/recently-played-section";
import { TasteEvolutionSection } from "@/features/dashboard/components/analytics/taste-evolution-section";
import { TopArtistsSection } from "@/features/dashboard/components/analytics/top-artists-section";
import { TopTracksTable } from "@/features/dashboard/components/analytics/top-tracks-table";
import { NowPlayingCard } from "@/features/dashboard/components/analytics/now-playing-card";
import { UnavailableMetricsPanel } from "@/features/dashboard/components/analytics/unavailable-metrics";
import {
  fixtureArtists,
  fixturePlaylists,
  fixtureRecent,
  fixtureTracks,
} from "@/features/dashboard/fixtures/dashboard-fixtures";
import type { SpotifyArtist } from "@/lib/spotify/types";

const artistsByPeriod = {
  short_term: fixtureArtists as SpotifyArtist[],
  medium_term: fixtureArtists as SpotifyArtist[],
  long_term: fixtureArtists as SpotifyArtist[],
};

export function AnalyticsDashboardPreview() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <header className="border-b border-border px-4 py-4 md:px-6">
        <p className="text-sm font-semibold">Dashboard preview (fixture data)</p>
        <p className="text-xs text-muted-foreground">Signed-out QA — responsive tables and spacing</p>
      </header>
      <PageContainer className="space-y-8 py-6">
        <NowPlayingCard
          isLoading={false}
          payload={{
            scopeMissing: false,
            playing: {
              timestamp: Date.now(),
              is_playing: true,
              progress_ms: 86000,
              currently_playing_type: "track",
              item: fixtureTracks[0],
            },
          }}
        />
        <TopTracksTable
          tracks={fixtureTracks}
          topArtists={fixtureArtists}
          compareRange="medium_term"
          comparePeriodReady
          isLoading={false}
          error={null}
        />
        <GenreDistribution artists={fixtureArtists} isLoading={false} error={null} />
        <AlbumsFromTracksTable tracks={fixtureTracks} isLoading={false} error={null} />
        <TopArtistsSection
          artists={fixtureArtists}
          compareRange="medium_term"
          comparePeriodReady
          isLoading={false}
          error={null}
        />
        <TasteEvolutionSection
          artists={fixtureArtists}
          artistsByPeriod={artistsByPeriod}
          timeRange="short_term"
          compareRange="medium_term"
        />
        <RecentlyPlayedSection items={fixtureRecent} isLoading={false} error={null} />
        <UnavailableMetricsPanel />
        <p className="text-xs text-muted-foreground">Playlists fixture count: {fixturePlaylists.length}</p>
      </PageContainer>
    </div>
  );
}
