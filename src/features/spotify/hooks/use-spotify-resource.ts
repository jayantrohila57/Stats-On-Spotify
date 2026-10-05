"use client";

import { useCallback, useEffect, useState } from "react";
import { useSessionGuard } from "@/features/auth/hooks/use-session-guard";

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useSpotifyResource<T>(endpoint: string, enabled = true): FetchState<T> {
  const { status } = useSessionGuard();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled || status !== "authenticated") {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? `Request failed (${response.status})`);
      }
      const json = (await response.json()) as T;
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [enabled, endpoint, status]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
