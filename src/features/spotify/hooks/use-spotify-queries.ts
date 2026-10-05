"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSessionGuard } from "@/features/auth/hooks/use-session-guard";
import { normalizeArtistsByPeriod, normalizeTracksByPeriod } from "@/lib/analytics/normalize";
import { fetchJson } from "@/lib/spotify/fetch-json";
import { spotifyKeys } from "@/lib/spotify/query-keys";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import type {
  CurrentlyPlayingPayload,
  SpotifyAlbumRelease,
  SpotifyArtist,
  SpotifyPlayHistoryItem,
  SpotifyPlaylist,
  SpotifySavedTrack,
  SpotifyTrack,
  SpotifyUserProfile,
} from "@/lib/spotify/types";
import { useAnalyticsPeriod } from "@/features/dashboard/context/analytics-period-context";
import { baselineCompareRange } from "@/lib/spotify/period";

const TIME_RANGES: SpotifyTimeRange[] = ["short_term", "medium_term", "long_term"];

function useSpotifyQueryEnabled() {
  const { status } = useSessionGuard();
  return status === "authenticated";
}

function useSpotifyQuery<T>(key: readonly unknown[], endpoint: string) {
  const enabled = useSpotifyQueryEnabled();
  return useQuery({
    queryKey: key,
    queryFn: () => fetchJson<T>(endpoint),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSpotifyAnalyticsQueries() {
  const enabled = useSpotifyQueryEnabled();

  const topTrackQueries = useQueries({
    queries: TIME_RANGES.map((timeRange) => ({
      queryKey: spotifyKeys.topTracks(timeRange),
      queryFn: () => fetchJson<SpotifyTrack[]>(`/api/spotify/top-tracks?time_range=${timeRange}`),
      enabled,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const topArtistQueries = useQueries({
    queries: TIME_RANGES.map((timeRange) => ({
      queryKey: spotifyKeys.topArtists(timeRange),
      queryFn: () => fetchJson<SpotifyArtist[]>(`/api/spotify/top-artists?time_range=${timeRange}`),
      enabled,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const profile = useSpotifyQuery<SpotifyUserProfile>(spotifyKeys.profile(), "/api/spotify/profile");
  const playlists = useSpotifyQuery<SpotifyPlaylist[]>(spotifyKeys.playlists(), "/api/spotify/playlists");
  const recentlyPlayed = useSpotifyQuery<SpotifyPlayHistoryItem[]>(
    spotifyKeys.recentlyPlayed(),
    "/api/spotify/recently-played",
  );
  const savedTracks = useSpotifyQuery<SpotifySavedTrack[]>(spotifyKeys.savedTracks(), "/api/spotify/saved-tracks");
  const followedArtists = useSpotifyQuery<SpotifyArtist[]>(
    spotifyKeys.followedArtists(),
    "/api/spotify/followed-artists",
  );
  const currentlyPlaying = useQuery({
    queryKey: spotifyKeys.currentlyPlaying(),
    queryFn: () => fetchJson<CurrentlyPlayingPayload>("/api/spotify/currently-playing"),
    enabled,
    staleTime: 15 * 1000,
    refetchInterval: 30 * 1000,
    retry: false,
  });
  const newReleases = useSpotifyQuery<SpotifyAlbumRelease[]>(spotifyKeys.newReleases(), "/api/spotify/new-releases");

  const tracksByPeriod = useMemo(() => {
    const map: Record<SpotifyTimeRange, SpotifyTrack[]> = {
      short_term: [],
      medium_term: [],
      long_term: [],
    };
    TIME_RANGES.forEach((range, index) => {
      map[range] = topTrackQueries[index]?.data ?? [];
    });
    return map;
  }, [topTrackQueries]);

  const artistsByPeriod = useMemo(() => {
    const map: Record<SpotifyTimeRange, SpotifyArtist[]> = {
      short_term: [],
      medium_term: [],
      long_term: [],
    };
    TIME_RANGES.forEach((range, index) => {
      map[range] = topArtistQueries[index]?.data ?? [];
    });
    return map;
  }, [topArtistQueries]);

  const { timeRange } = useAnalyticsPeriod();

  const topTracks = useMemo(
    () => normalizeTracksByPeriod(tracksByPeriod, timeRange),
    [tracksByPeriod, timeRange],
  );
  const topArtists = useMemo(
    () => normalizeArtistsByPeriod(artistsByPeriod, timeRange),
    [artistsByPeriod, timeRange],
  );

  const compareRange: SpotifyTimeRange = baselineCompareRange(timeRange);

  const compareRangeIndex = TIME_RANGES.indexOf(compareRange);
  const comparePeriodReady =
    compareRangeIndex >= 0 &&
    topTrackQueries[compareRangeIndex]?.data !== undefined &&
    topArtistQueries[compareRangeIndex]?.data !== undefined;

  const initialTopsLoading =
    topTrackQueries.some((q) => q.isLoading && !q.data) || topArtistQueries.some((q) => q.isLoading && !q.data);

  const topTracksError =
    topTrackQueries.find((q) => q.error)?.error?.message ??
    topArtistQueries.find((q) => q.error)?.error?.message ??
    null;

  const refetchTops = async () => {
    await Promise.all([...topTrackQueries, ...topArtistQueries].map((q) => q.refetch()));
  };

  return {
    topTracks,
    topArtists,
    tracksByPeriod,
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
  };
}
