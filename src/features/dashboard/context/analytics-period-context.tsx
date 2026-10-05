"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { AnalyticsPeriodId } from "@/lib/spotify/period";
import { periodToTimeRange } from "@/lib/spotify/period";

type AnalyticsPeriodContextValue = {
  period: AnalyticsPeriodId;
  setPeriod: (period: AnalyticsPeriodId) => void;
  timeRange: ReturnType<typeof periodToTimeRange>;
};

const AnalyticsPeriodContext = createContext<AnalyticsPeriodContextValue | null>(null);

export function AnalyticsPeriodProvider({ children }: { children: ReactNode }) {
  const [period, setPeriod] = useState<AnalyticsPeriodId>("6m");
  const value = useMemo(
    () => ({
      period,
      setPeriod,
      timeRange: periodToTimeRange(period),
    }),
    [period],
  );
  return <AnalyticsPeriodContext.Provider value={value}>{children}</AnalyticsPeriodContext.Provider>;
}

export function useAnalyticsPeriod() {
  const ctx = useContext(AnalyticsPeriodContext);
  if (!ctx) {
    throw new Error("useAnalyticsPeriod must be used within AnalyticsPeriodProvider");
  }
  return ctx;
}
