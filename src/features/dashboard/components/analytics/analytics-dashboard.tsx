"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";
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
import { pickSpotifyImageUrl } from "@/lib/spotify/images";
import { SPOTIFY_MEDIA_SIZE, SpotifyThumbnail } from "@/components/spotify/spotify-media";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import { idsFromTracks, overlapCount } from "@/lib/analytics/behavior";
import { SectionErrorBoundary } from "@/components/stats/section-error-boundary";

export function AnalyticsDashboard() {
  const {
    topTracks,
    topArtists,
    artistsByPeriod,
    compareRange,
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

  const savedList = savedTracks.data ?? [];
  const savedOverlap = overlapCount(idsFromTracks(topTracks), new Set(savedList.map((s) => s.track.id)));

  const kpiLoading =
    initialTopsLoading || (playlists.isLoading && !playlists.data) || (profile.isLoading && !profile.data);

  const topsLoading = initialTopsLoading && topTracks.length === 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnalyticsHeader profile={profile.data ?? null} profileLoading={profile.isLoading} />
      <PeriodFilterBar />
      <main className="mx-auto max-w-[1400px] space-y-6 px-4 py-6 md:px-6">
        <section aria-label="Listening overview">
          <SectionHeader
            icon={BarChart3}
            title="Listening overview"
            description="Counts and summaries from live Spotify API responses"
          />
          {kpiLoading ? (
            <div className="mt-3 h-24 animate-pulse rounded-md border border-border/80 bg-muted/30" />
          ) : (
            <div className="mt-3">
              <KpiGrid
                topTracks={topTracks}
                topArtists={topArtists}
                playlists={playlists.data ?? []}
                profile={profile.data ?? null}
                savedTrackCount={savedList.length}
                savedOverlapCount={savedOverlap}
                recentPlayCount={(recentlyPlayed.data ?? []).length}
              />
            </div>
          )}
        </section>

        <SectionErrorBoundary sectionTitle="Top tracks">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TopTracksTable
              tracks={topTracks}
              compareRange={compareRange}
              isLoading={topsLoading}
              error={topTracksError}
              onRetry={() => void refetchTops()}
            />
          </div>
          <NowPlayingCard
            data={currentlyPlaying.data}
            isLoading={currentlyPlaying.isLoading && currentlyPlaying.data === undefined}
            error={currentlyPlaying.error?.message ?? null}
            onRetry={() => currentlyPlaying.refetch()}
          />
        </div>
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionTitle="Genres and albums">
        <div className="grid gap-6 lg:grid-cols-2">
          <GenreDistribution
            artists={topArtists}
            artistsByPeriod={artistsByPeriod}
            activeRange={timeRange}
            compareRange={compareRange}
            isLoading={topsLoading}
            error={topTracksError}
          />
          <AlbumsFromTracksTable tracks={topTracks} isLoading={topsLoading} error={topTracksError} />
        </div>
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionTitle="Top artists">
        <TopArtistsSection
          artists={topArtists}
          compareRange={compareRange}
          isLoading={topsLoading}
          error={topTracksError}
          onRetry={() => void refetchTops()}
        />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionTitle="Recently played">
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

        <LibraryOverlapSection
          topTracks={topTracks}
          topArtists={topArtists}
          savedTracks={savedList}
          followedArtists={followedArtists.data ?? []}
        />

        <RecentlyPlayedSection
          items={recentlyPlayed.data ?? []}
          isLoading={recentlyPlayed.isLoading && !recentlyPlayed.data}
          error={recentlyPlayed.error?.message ?? null}
          onRetry={() => recentlyPlayed.refetch()}
        />

        <ListeningPatternsSection items={recentlyPlayed.data ?? []} />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionTitle="Playlists">
        <PlaylistsTable
          playlists={playlists.data ?? []}
          isLoading={playlists.isLoading && !playlists.data}
          error={playlists.error?.message ?? null}
          onRetry={() => playlists.refetch()}
        />
        </SectionErrorBoundary>

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
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {(newReleases.data ?? []).slice(0, 4).map((album) => {
              const image = pickSpotifyImageUrl(album.images);
              return (
                <li key={album.id} className="flex gap-2 rounded-md border border-border/70 p-2">
                  <SpotifyThumbnail src={image} alt={album.name} size={SPOTIFY_MEDIA_SIZE.release} />
                  <div className="min-w-0">
                    <Link
                      href={album.external_urls.spotify}
                      target="_blank"
                      rel="noreferrer"
                      className="line-clamp-2 text-xs font-medium hover:underline"
                    >
                      {album.name}
                    </Link>
                    <p className="truncate text-[11px] text-muted-foreground">
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
  );
}
