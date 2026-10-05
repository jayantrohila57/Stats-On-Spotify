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
import { OverviewMiniChart } from "@/features/dashboard/components/analytics/overview-mini-chart";
import {
  DashboardSectionNav,
  DashboardSectionNavMobile,
} from "@/features/dashboard/components/analytics/dashboard-section-nav";
import { pickSpotifyImageUrl } from "@/lib/spotify/images";
import { SPOTIFY_MEDIA_SIZE, SpotifyThumbnail } from "@/components/spotify/spotify-media";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { computeLibraryOverlapMetrics } from "@/lib/analytics/library-overlap";
import { deriveGenreStatsWithOther, formatGenreLabel } from "@/lib/analytics/derive";
import { SectionErrorBoundary } from "@/components/stats/section-error-boundary";
import { useDashboardSectionSpy } from "@/features/dashboard/hooks/use-dashboard-section-spy";

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

  const topsLoading = initialTopsLoading && topTracks.length === 0;

  const genreStats = deriveGenreStatsWithOther(topArtists, 3);
  const topGenreLine = genreStats[0]
    ? `${genreStats[0].genre === "other" ? "Other" : formatGenreLabel(genreStats[0].genre)} ${(genreStats[0].share * 100).toFixed(0)}% of top-artist genres · ${genreStats.length}+ tags in view`
    : "Genre tags from your top artists";

  const overviewDescription = `${topTracks.length} tracks · ${topArtists.length} artists · ${playlists.data?.length ?? 0} playlists · ${recentList.length} recent plays in sample`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnalyticsHeader profile={profile.data ?? null} profileLoading={profile.isLoading} />
      <PeriodFilterBar />
      <DashboardSectionNavMobile activeSectionId={activeSectionId} />
      <div className="mx-auto flex max-w-[1400px] gap-8 px-4 py-6 md:px-6">
        <DashboardSectionNav className="w-36 shrink-0 pt-1" activeSectionId={activeSectionId} />
        <main className="min-w-0 flex-1 space-y-8">
          <section id="section-overview" aria-label="Listening overview" className="scroll-mt-20">
            <SectionHeader
              icon={BarChart3}
              title="Listening overview"
              description={overviewDescription}
            />
            {kpiLoading ? (
              <div className="mt-3 h-28 animate-pulse rounded-md border border-border/80 bg-muted/30" />
            ) : (
              <div className="mt-3 space-y-0">
                <KpiGrid
                  topTracks={topTracks}
                  topArtists={topArtists}
                  playlists={playlists.data ?? []}
                  profile={profile.data ?? null}
                  libraryOverlap={libraryOverlap}
                  recentPlayCount={recentList.length}
                />
                <OverviewMiniChart topArtists={topArtists} recentPlays={recentList} />
              </div>
            )}
          </section>

          <section id="section-patterns" className="scroll-mt-20 space-y-8">
            <SectionErrorBoundary sectionTitle="Listening patterns">
              <ListeningPatternsSection items={recentList} />
            </SectionErrorBoundary>
          </section>

          <section id="section-tracks" className="scroll-mt-20 space-y-8">
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
          </section>

          <section id="section-genres" className="scroll-mt-20">
            <SectionErrorBoundary sectionTitle="Genres and albums">
              <GenreDistribution
                artists={topArtists}
                artistsByPeriod={artistsByPeriod}
                activeRange={timeRange}
                compareRange={compareRange}
                isLoading={topsLoading}
                error={topTracksError}
                description={topGenreLine}
              />
              <div className="mt-8">
                <AlbumsFromTracksTable tracks={topTracks} isLoading={topsLoading} error={topTracksError} />
              </div>
            </SectionErrorBoundary>
          </section>

          <section id="section-artists" className="scroll-mt-20">
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
          </section>

          <section id="section-taste" className="scroll-mt-20 space-y-8">
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
          </section>

          <section id="section-library" className="scroll-mt-20">
            <SectionErrorBoundary sectionTitle="Library overlap">
              <LibraryOverlapSection libraryOverlap={libraryOverlap} />
            </SectionErrorBoundary>
          </section>

          <section id="section-playlists" className="scroll-mt-20">
            <SectionErrorBoundary sectionTitle="Playlists">
              <PlaylistsTable
                playlists={playlists.data ?? []}
                isLoading={playlists.isLoading && !playlists.data}
                error={playlists.error?.message ?? null}
                onRetry={() => playlists.refetch()}
              />
            </SectionErrorBoundary>
          </section>

          <section id="section-recent" className="scroll-mt-20 space-y-8">
            <SectionErrorBoundary sectionTitle="Recently played">
              <RecentlyPlayedSection
                items={recentList}
                isLoading={recentlyPlayed.isLoading && !recentlyPlayed.data}
                error={recentlyPlayed.error?.message ?? null}
                onRetry={() => recentlyPlayed.refetch()}
              />
            </SectionErrorBoundary>
          </section>

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
                  <li key={album.id} className="flex gap-3 rounded-md border border-border/70 p-3">
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
                      <p className="truncate text-[13px] text-muted-foreground">
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
      </div>
    </div>
  );
}
