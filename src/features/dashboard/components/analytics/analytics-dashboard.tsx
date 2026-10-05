"use client";

import type { SpotifyAlbumRelease, SpotifyArtist, SpotifyPlaylist, SpotifyTrack, SpotifyUserProfile } from "@/lib/spotify/types";
import { useAnalyticsPeriod } from "@/features/dashboard/context/analytics-period-context";
import { useSpotifyResource } from "@/features/spotify/hooks/use-spotify-resource";
import { AnalyticsHeader } from "@/features/dashboard/components/analytics/analytics-header";
import { PeriodFilterBar } from "@/features/dashboard/components/analytics/period-filter-bar";
import { KpiGrid } from "@/features/dashboard/components/analytics/kpi-grid";
import { TopTracksTable } from "@/features/dashboard/components/analytics/top-tracks-table";
import { TopArtistsSection } from "@/features/dashboard/components/analytics/top-artists-section";
import { GenreDistribution } from "@/features/dashboard/components/analytics/genre-distribution";
import { PlaylistsTable } from "@/features/dashboard/components/analytics/playlists-table";
import { AlbumsFromTracksTable } from "@/features/dashboard/components/analytics/albums-from-tracks-table";
import { UnavailableMetricsPanel } from "@/features/dashboard/components/analytics/unavailable-metrics";
import { SectionShell } from "@/features/dashboard/components/analytics/section-shell";
import Image from "next/image";
import Link from "next/link";

function usePeriodEndpoint<T>(path: string) {
  const { timeRange } = useAnalyticsPeriod();
  const endpoint = `${path}?time_range=${timeRange}`;
  return useSpotifyResource<T>(endpoint);
}

export function AnalyticsDashboard() {
  const topTracks = usePeriodEndpoint<SpotifyTrack[]>("/api/spotify/top-tracks");
  const topArtists = usePeriodEndpoint<SpotifyArtist[]>("/api/spotify/top-artists");
  const playlists = useSpotifyResource<SpotifyPlaylist[]>("/api/spotify/playlists");
  const profile = useSpotifyResource<SpotifyUserProfile>("/api/spotify/profile");
  const newReleases = useSpotifyResource<SpotifyAlbumRelease[]>("/api/spotify/new-releases");

  const kpiLoading =
    topTracks.isLoading || topArtists.isLoading || playlists.isLoading || profile.isLoading;

  const hasAnyKpiData =
    (topTracks.data?.length ?? 0) > 0 ||
    (topArtists.data?.length ?? 0) > 0 ||
    (playlists.data?.length ?? 0) > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnalyticsHeader profile={profile.data} profileLoading={profile.isLoading} />
      <PeriodFilterBar />
      <main className="mx-auto max-w-[1400px] space-y-6 px-4 py-6 md:px-6">
        <section aria-label="Listening overview">
          <div className="mb-3">
            <h2 className="text-sm font-semibold">Listening overview</h2>
            <p className="text-xs text-muted-foreground">Counts and summaries from live Spotify API responses</p>
          </div>
          {kpiLoading && !hasAnyKpiData ? (
            <div className="h-24 animate-pulse rounded-md border border-border/80 bg-muted/30" />
          ) : (
            <KpiGrid
              topTracks={topTracks.data ?? []}
              topArtists={topArtists.data ?? []}
              playlists={playlists.data ?? []}
              profile={profile.data}
            />
          )}
        </section>

        <TopTracksTable
          tracks={topTracks.data ?? []}
          isLoading={topTracks.isLoading}
          error={topTracks.error}
          onRetry={topTracks.refetch}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <GenreDistribution
            artists={topArtists.data ?? []}
            isLoading={topArtists.isLoading}
            error={topArtists.error}
          />
          <AlbumsFromTracksTable
            tracks={topTracks.data ?? []}
            isLoading={topTracks.isLoading}
            error={topTracks.error}
          />
        </div>

        <TopArtistsSection
          artists={topArtists.data ?? []}
          isLoading={topArtists.isLoading}
          error={topArtists.error}
          onRetry={topArtists.refetch}
        />

        <PlaylistsTable
          playlists={playlists.data ?? []}
          isLoading={playlists.isLoading}
          error={playlists.error}
          onRetry={playlists.refetch}
        />

        <SectionShell
          title="New releases (browse)"
          description="Spotify catalog new releases — not personalized to your listening"
          isLoading={newReleases.isLoading}
          error={newReleases.error}
          onRetry={newReleases.refetch}
          isEmpty={!newReleases.isLoading && !newReleases.error && (newReleases.data?.length ?? 0) === 0}
          emptyTitle="No releases"
          emptyDescription="Browse new releases could not be loaded."
        >
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {(newReleases.data ?? []).slice(0, 8).map((album) => {
              const image = album.images[0]?.url;
              return (
                <li key={album.id} className="flex gap-2 rounded-md border border-border/70 p-2">
                  {image ? (
                    <Image src={image} alt="" width={48} height={48} className="size-12 rounded border border-border/60" />
                  ) : (
                    <div className="size-12 rounded bg-muted" />
                  )}
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
