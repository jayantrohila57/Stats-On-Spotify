"use client";

import { useCallback, useEffect, useState } from "react";
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
  error: string | null;
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

export function useDashboardData(): DashboardState {
  const [data, setData] = useState<DashboardData>(empty);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [topTracks, topArtists, playlists, profile] = await Promise.all([
        fetchJson<SpotifyTrack[]>("/api/spotify/top-tracks"),
        fetchJson<SpotifyArtist[]>("/api/spotify/top-artists"),
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
  }, []);

  useEffect(() => {
    let active = true;
    const run = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [topTracks, topArtists, playlists, profile] = await Promise.all([
          fetchJson<SpotifyTrack[]>("/api/spotify/top-tracks"),
          fetchJson<SpotifyArtist[]>("/api/spotify/top-artists"),
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
        }
      }
    };
    void run();
    return () => {
      active = false;
    };
  }, []);

  return { data, isLoading, error, refetch };
}
