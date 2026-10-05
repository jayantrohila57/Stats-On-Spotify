"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnalyticsDetailPanel } from "@/features/dashboard/components/analytics-detail-panel";
import { AnalyticsSummaryHeader } from "@/features/dashboard/components/analytics-summary-header";
import { AnalyticsToolbar } from "@/features/dashboard/components/analytics-toolbar";
import { GenresSection } from "@/features/dashboard/components/genres-section";
import { PlaylistsStatsSection } from "@/features/dashboard/components/playlists-stats-section";
import { TopArtistsSection } from "@/features/dashboard/components/top-artists-section";
import { TopTracksSection } from "@/features/dashboard/components/top-tracks-section";
import { artistsForGenre } from "@/features/dashboard/lib/genres";
import type { AnalyticsSelection } from "@/features/dashboard/types/analytics-selection";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import type { SpotifyArtist, SpotifyPlaylist, SpotifyTrack, SpotifyUserProfile } from "@/lib/spotify/types";

export type DashboardShellData = {
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
  playlists: SpotifyPlaylist[];
  profile: SpotifyUserProfile | null;
};

type DashboardShellProps = {
  data: DashboardShellData;
  timeRange: SpotifyTimeRange;
  onTimeRangeChange: (range: SpotifyTimeRange) => void;
  isRefreshingTops?: boolean;
};

export function DashboardShell({ data, timeRange, onTimeRangeChange, isRefreshingTops }: DashboardShellProps) {
  const [selection, setSelection] = useState<AnalyticsSelection>(null);

  const selectedTrackId = selection?.kind === "track" ? selection.track.id : null;
  const selectedArtistId = selection?.kind === "artist" ? selection.artist.id : null;
  const selectedGenreKey = selection?.kind === "genre" ? selection.genre : null;

  const closePanel = useCallback(() => {
    setSelection(null);
  }, []);

  const openTrack = useCallback((track: SpotifyTrack) => {
    setSelection({ kind: "track", track });
  }, []);

  const openArtist = useCallback((artist: SpotifyArtist) => {
    setSelection({ kind: "artist", artist });
  }, []);

  const openArtistById = useCallback(
    (artistId: string) => {
      const artist = data.topArtists.find((a) => a.id === artistId);
      if (artist) {
        openArtist(artist);
      }
    },
    [data.topArtists, openArtist],
  );

  const openTrackById = useCallback(
    (trackId: string) => {
      const track = data.topTracks.find((t) => t.id === trackId);
      if (track) {
        openTrack(track);
      }
    },
    [data.topTracks, openTrack],
  );

  const openGenre = useCallback(
    (genreKey: string) => {
      setSelection({
        kind: "genre",
        genre: genreKey,
        relatedArtists: artistsForGenre(data.topArtists, genreKey),
      });
    },
    [data.topArtists],
  );

  const panelOpen = selection !== null;

  useEffect(() => {
    if (!panelOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [panelOpen, closePanel]);

  const layoutClass = useMemo(() => (panelOpen ? "lg:pr-[min(28rem,100%)]" : ""), [panelOpen]);

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-white transition-[padding] ${layoutClass}`}>
      <main className="mx-auto max-w-3xl px-4 py-6 sm:max-w-4xl lg:max-w-5xl">
        <div className="sticky top-0 z-20 -mx-4 mb-8 border-b border-zinc-800/80 bg-[#0a0a0a]/95 px-4 py-4 backdrop-blur-sm">
          <AnalyticsToolbar
            profile={data.profile}
            timeRange={timeRange}
            onTimeRangeChange={onTimeRangeChange}
            isRefreshingTops={isRefreshingTops}
          />
        </div>

        <div className="flex flex-col gap-8 pb-12">
          <AnalyticsSummaryHeader
            profile={data.profile}
            topTrack={data.topTracks[0] ?? null}
            timeRange={timeRange}
            topTrackCount={data.topTracks.length}
            topArtistCount={data.topArtists.length}
          />
          <GenresSection
            artists={data.topArtists}
            timeRange={timeRange}
            selectedGenreKey={selectedGenreKey}
            onSelectGenre={(key) => openGenre(key)}
            isRefreshing={isRefreshingTops}
          />
          <TopTracksSection
            tracks={data.topTracks}
            timeRange={timeRange}
            selectedTrackId={selectedTrackId}
            onSelectTrack={openTrack}
            isRefreshing={isRefreshingTops}
          />
          <TopArtistsSection
            artists={data.topArtists}
            timeRange={timeRange}
            selectedArtistId={selectedArtistId}
            onSelectArtist={openArtist}
            isRefreshing={isRefreshingTops}
          />
          <PlaylistsStatsSection playlists={data.playlists} />
        </div>
      </main>

      {panelOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          aria-label="Close detail panel"
          onClick={closePanel}
        />
      ) : null}
      <AnalyticsDetailPanel
        selection={selection}
        onClose={closePanel}
        onSelectArtist={openArtistById}
        onSelectTrack={openTrackById}
      />
    </div>
  );
}
