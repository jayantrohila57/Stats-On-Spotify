"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";
import {
  EMPTY_HOUR_BUCKETS,
  EMPTY_WEEKDAY_BUCKETS,
  deriveHourDistribution,
  deriveWeekdayDistribution,
} from "@/lib/analytics/listening-patterns";

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

/** Buckets plays on the client so SSR (UTC) and hydration (local TZ) stay aligned. */
export function useClientListeningDistributions(items: SpotifyPlayHistoryItem[]) {
  const isClient = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const hours = useMemo(
    () => (isClient ? deriveHourDistribution(items) : EMPTY_HOUR_BUCKETS),
    [isClient, items],
  );

  const weekdays = useMemo(
    () => (isClient ? deriveWeekdayDistribution(items) : EMPTY_WEEKDAY_BUCKETS),
    [isClient, items],
  );

  return { hours, weekdays };
}
