"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import type { SpotifyArtist, SpotifyPlaylist, SpotifyTrack, SpotifyUserProfile } from "@/lib/spotify/types";

type DashboardData = {
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
  playlists: SpotifyPlaylist[];
  profile: SpotifyUserProfile | null;
};

type DashboardState = {
  data: DashboardData;
  isLoading: boolean;
  isRefreshingTops: boolean;
  error: string | null;
  timeRange: SpotifyTimeRange;
  setTimeRange: (range: SpotifyTimeRange) => void;
  refetch: () => Promise<void>;
};

const empty: DashboardData = {
  topTracks: [],
  topArtists: [],
  playlists: [],
  profile: null,
};

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error ?? `Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

function topsQuery(timeRange: SpotifyTimeRange): string {
  return `time_range=${encodeURIComponent(timeRange)}`;
}

export function useDashboardData(): DashboardState {
  const [data, setData] = useState<DashboardData>(empty);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshingTops, setIsRefreshingTops] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<SpotifyTimeRange>("medium_term");
  const skipTimeRangeEffect = useRef(true);

  const fetchTops = useCallback(async (range: SpotifyTimeRange) => {
    const q = topsQuery(range);
    const [topTracks, topArtists] = await Promise.all([
      fetchJson<SpotifyTrack[]>(`/api/spotify/top-tracks?${q}`),
      fetchJson<SpotifyArtist[]>(`/api/spotify/top-artists?${q}`),
    ]);
    return { topTracks, topArtists };
  }, []);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const q = topsQuery(timeRange);
      const [topTracks, topArtists, playlists, profile] = await Promise.all([
        fetchJson<SpotifyTrack[]>(`/api/spotify/top-tracks?${q}`),
        fetchJson<SpotifyArtist[]>(`/api/spotify/top-artists?${q}`),
        fetchJson<SpotifyPlaylist[]>("/api/spotify/playlists"),
        fetchJson<SpotifyUserProfile>("/api/spotify/profile"),
      ]);
      setData({ topTracks, topArtists, playlists, profile });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
      setData(empty);
    } finally {
      setIsLoading(false);
    }
  }, [timeRange]);

  const initialTimeRange = useRef(timeRange);

  useEffect(() => {
    let active = true;
    const run = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const q = topsQuery(initialTimeRange.current);
        const [topTracks, topArtists, playlists, profile] = await Promise.all([
          fetchJson<SpotifyTrack[]>(`/api/spotify/top-tracks?${q}`),
          fetchJson<SpotifyArtist[]>(`/api/spotify/top-artists?${q}`),
          fetchJson<SpotifyPlaylist[]>("/api/spotify/playlists"),
          fetchJson<SpotifyUserProfile>("/api/spotify/profile"),
        ]);
        if (active) {
          setData({ topTracks, topArtists, playlists, profile });
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load dashboard");
          setData(empty);
        }
      } finally {
        if (active) {
          setIsLoading(false);
          skipTimeRangeEffect.current = false;
        }
      }
    };
    void run();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (skipTimeRangeEffect.current) {
      return;
    }

    let active = true;
    const run = async () => {
      setIsRefreshingTops(true);
      setError(null);
      try {
        const { topTracks, topArtists } = await fetchTops(timeRange);
        if (active) {
          setData((prev) => ({ ...prev, topTracks, topArtists }));
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load listening stats");
        }
      } finally {
        if (active) {
          setIsRefreshingTops(false);
        }
      }
    };
    void run();
    return () => {
      active = false;
    };
  }, [timeRange, fetchTops]);

  return { data, isLoading, isRefreshingTops, error, timeRange, setTimeRange, refetch };
}
