"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { useMemo } from "react";
import { useSpotifyAnalyticsQueries } from "@/features/spotify/hooks/use-spotify-queries";
import { AnalyticsHeader } from "@/features/dashboard/components/analytics/analytics-header";
import { PeriodFilterBar } from "@/features/dashboard/components/analytics/period-filter-bar";
import { SectionHeader } from "@/features/dashboard/components/analytics/section-header";
import { KpiGrid } from "@/features/dashboard/components/analytics/kpi-grid";
import { TopTracksTable } from "@/features/dashboard/components/analytics/top-tracks-table";
import { TopArtistsSection } from "@/features/dashboard/components/analytics/top-artists-section";
import { GenreDistribution } from "@/features/dashboard/components/analytics/genre-distribution";
import { PlaylistsTable } from "@/features/dashboard/components/analytics/playlists-table";
import { AlbumsFromTracksTable } from "@/features/dashboard/components/analytics/albums-from-tracks-table";
import { UnavailableMetricsPanel } from "@/features/dashboard/components/analytics/unavailable-metrics";
import { NowPlayingCard } from "@/features/dashboard/components/analytics/now-playing-card";
import { RecentlyPlayedSection } from "@/features/dashboard/components/analytics/recently-played-section";
import { ListeningPatternsSection } from "@/features/dashboard/components/analytics/listening-patterns-section";
import { TasteEvolutionSection } from "@/features/dashboard/components/analytics/taste-evolution-section";
import { LibraryOverlapSection } from "@/features/dashboard/components/analytics/library-overlap-section";
import { ListeningBehaviorSection } from "@/features/dashboard/components/analytics/listening-behavior-section";
import { OverviewSnapshot } from "@/features/dashboard/components/analytics/overview-snapshot";
import {
  DashboardSectionNav,
  DashboardSectionNavMobile,
} from "@/features/dashboard/components/analytics/dashboard-section-nav";
import { pickSpotifyImageUrl } from "@/lib/spotify/images";
import { SPOTIFY_MEDIA_SIZE, SpotifyThumbnail } from "@/components/spotify/spotify-media";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { DashboardSection } from "@/components/layout/dashboard-section";
import { computeLibraryOverlapMetrics } from "@/lib/analytics/library-overlap";
import { countDistinctGenreTags, deriveGenreStatsWithOther, formatGenreLabel } from "@/lib/analytics/derive";
import { SectionErrorBoundary } from "@/components/stats/section-error-boundary";
import { useDashboardSectionSpy } from "@/features/dashboard/hooks/use-dashboard-section-spy";
import { Skeleton } from "@/components/ui/skeleton";

export function AnalyticsDashboard() {
  const activeSectionId = useDashboardSectionSpy();
  const {
    topTracks,
    topArtists,
    artistsByPeriod,
    compareRange,
    comparePeriodReady,
    timeRange,
    profile,
    playlists,
    recentlyPlayed,
    savedTracks,
    followedArtists,
    currentlyPlaying,
    newReleases,
    initialTopsLoading,
    topTracksError,
    refetchTops,
  } = useSpotifyAnalyticsQueries();

  const libraryOverlap = useMemo(
    () =>
      computeLibraryOverlapMetrics(
        topTracks,
        topArtists,
        savedTracks.data ?? [],
        followedArtists.data ?? [],
      ),
    [topTracks, topArtists, savedTracks.data, followedArtists.data],
  );

  const savedList = savedTracks.data ?? [];
  const recentList = recentlyPlayed.data ?? [];

  const kpiLoading =
    initialTopsLoading ||
    (playlists.isLoading && !playlists.data) ||
    (profile.isLoading && !profile.data) ||
    (savedTracks.isLoading && savedTracks.data === undefined);

  const overlapHintsReady =
    topTracks.length > 0 &&
    topArtists.length > 0 &&
    savedTracks.data !== undefined &&
    !savedTracks.isLoading &&
    followedArtists.data !== undefined &&
    !followedArtists.isLoading;

  const topsLoading = initialTopsLoading && topTracks.length === 0;

  const genreStats = deriveGenreStatsWithOther(topArtists, 3);
  const distinctGenreTags = countDistinctGenreTags(topArtists);
  const topGenreLine = genreStats[0]
    ? `${genreStats[0].genre === "other" ? "Other" : formatGenreLabel(genreStats[0].genre)} ${(genreStats[0].share * 100).toFixed(0)}% of top-artist genre tags · ${distinctGenreTags} distinct tags`
    : "Genre tags from your top artists";

  const overviewDescription = kpiLoading
    ? null
    : `${topTracks.length} tracks · ${topArtists.length} artists · ${playlists.data?.length ?? 0} playlists · ${recentList.length} recent plays in sample`;

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <AnalyticsHeader profile={profile.data ?? null} profileLoading={profile.isLoading} />
      <PeriodFilterBar />
      <DashboardSectionNavMobile activeSectionId={activeSectionId} />
      <PageContainer className="flex items-stretch gap-8 py-6">
        <aside className="hidden w-36 shrink-0 border-r border-border pr-3 lg:block">
          <DashboardSectionNav className="pt-1" activeSectionId={activeSectionId} />
        </aside>
        <main className="min-w-0 flex-1 space-y-8">
          <DashboardSection id="section-overview" aria-label="Listening overview">
            <SectionHeader
              icon={BarChart3}
              title="Listening overview"
              description={
                overviewDescription ?? <Skeleton className="mt-1 h-4 w-full max-w-md" aria-hidden />
              }
            />
            {kpiLoading ? (
              <div className="mt-3 space-y-4" aria-busy="true">
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4 lg:grid-cols-6">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="space-y-2 border border-border bg-muted/20 px-3 py-2.5">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-8 w-12" />
                    </div>
                  ))}
                </div>
                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                  <div className="space-y-2 border-b border-border p-6 pb-4">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-full max-w-lg" />
                  </div>
                  <div className="space-y-3 p-6 pt-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-full" />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-3 space-y-0">
                <KpiGrid
                  topTracks={topTracks}
                  topArtists={topArtists}
                  playlists={playlists.data ?? []}
                  profile={profile.data ?? null}
                  libraryOverlap={libraryOverlap}
                  recentPlayCount={recentList.length}
                  overlapHintsReady={overlapHintsReady}
                />
                <OverviewSnapshot topArtists={topArtists} recentPlays={recentList} />
              </div>
            )}
          </DashboardSection>

          <DashboardSection id="section-patterns" stack>
            <SectionErrorBoundary sectionTitle="Listening patterns">
              <ListeningPatternsSection items={recentList} />
            </SectionErrorBoundary>
          </DashboardSection>

          <DashboardSection id="section-tracks" stack>
            <SectionErrorBoundary sectionTitle="Top tracks">
              <TopTracksTable
                tracks={topTracks}
                topArtists={topArtists}
                compareRange={compareRange}
                comparePeriodReady={comparePeriodReady}
                isLoading={topsLoading}
                error={topTracksError}
                onRetry={() => void refetchTops()}
              />
              <NowPlayingCard
                payload={currentlyPlaying.data}
                isLoading={currentlyPlaying.isLoading && currentlyPlaying.data === undefined}
              />
            </SectionErrorBoundary>
          </DashboardSection>

          <DashboardSection id="section-genres">
            <SectionErrorBoundary sectionTitle="Genres and albums">
              <GenreDistribution
                artists={topArtists}
                isLoading={topsLoading}
                error={topTracksError}
                description={topGenreLine}
              />
              <div className="mt-8">
                <AlbumsFromTracksTable tracks={topTracks} isLoading={topsLoading} error={topTracksError} />
              </div>
            </SectionErrorBoundary>
          </DashboardSection>

          <DashboardSection id="section-artists">
            <SectionErrorBoundary sectionTitle="Top artists">
              <TopArtistsSection
                artists={topArtists}
                compareRange={compareRange}
                comparePeriodReady={comparePeriodReady}
                isLoading={topsLoading}
                error={topTracksError}
                onRetry={() => void refetchTops()}
              />
            </SectionErrorBoundary>
          </DashboardSection>

          <DashboardSection id="section-taste" stack>
            <SectionErrorBoundary sectionTitle="Taste evolution">
              <TasteEvolutionSection
                artists={topArtists}
                artistsByPeriod={artistsByPeriod}
                timeRange={timeRange}
                compareRange={compareRange}
              />
              <ListeningBehaviorSection
                topTracks={topTracks}
                topArtists={topArtists}
                savedTracks={savedList}
                followedArtists={followedArtists.data ?? []}
              />
            </SectionErrorBoundary>
          </DashboardSection>

          <DashboardSection id="section-library">
            <SectionErrorBoundary sectionTitle="Library overlap">
              <LibraryOverlapSection libraryOverlap={libraryOverlap} />
            </SectionErrorBoundary>
          </DashboardSection>

          <DashboardSection id="section-playlists">
            <SectionErrorBoundary sectionTitle="Playlists">
              <PlaylistsTable
                playlists={playlists.data ?? []}
                isLoading={playlists.isLoading && !playlists.data}
                error={playlists.error?.message ?? null}
                onRetry={() => playlists.refetch()}
              />
            </SectionErrorBoundary>
          </DashboardSection>

          <DashboardSection id="section-recent" stack>
            <SectionErrorBoundary sectionTitle="Recently played">
              <RecentlyPlayedSection
                items={recentList}
                isLoading={recentlyPlayed.isLoading && !recentlyPlayed.data}
                error={recentlyPlayed.error?.message ?? null}
                onRetry={() => recentlyPlayed.refetch()}
              />
            </SectionErrorBoundary>
          </DashboardSection>

          <SectionShell
            title="New releases (browse)"
            description="Spotify catalog — not personalized analytics"
            isLoading={newReleases.isLoading && !newReleases.data}
            error={newReleases.error?.message ?? null}
            onRetry={() => newReleases.refetch()}
            isEmpty={!newReleases.isLoading && !newReleases.error && (newReleases.data?.length ?? 0) === 0}
            emptyTitle="No releases"
            emptyDescription="Browse new releases could not be loaded."
            className="opacity-90"
          >
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(newReleases.data ?? []).slice(0, 4).map((album) => {
                const image = pickSpotifyImageUrl(album.images);
                return (
                  <li key={album.id} className="flex gap-3 rounded-md border border-border p-3">
                    <SpotifyThumbnail src={image} alt={album.name} size={SPOTIFY_MEDIA_SIZE.release} />
                    <div className="min-w-0">
                      <Link
                        href={album.external_urls.spotify}
                        target="_blank"
                        rel="noreferrer"
                        className="line-clamp-2 text-sm font-medium hover:underline"
                      >
                        {album.name}
                      </Link>
                      <p className="truncate text-xs text-muted-foreground">
                        {album.artists.map((a) => a.name).join(", ")}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </SectionShell>

          <UnavailableMetricsPanel />
        </main>
      </PageContainer>
    </div>
  );
}
