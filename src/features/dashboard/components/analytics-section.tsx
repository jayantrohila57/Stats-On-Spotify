"use client";

import type { ReactNode } from "react";
import { analyticsCardClass } from "@/features/dashboard/lib/surface";
import { timeRangeLabel, type SpotifyTimeRange } from "@/lib/spotify/time-range";
import { cn } from "@/lib/utils";

type AnalyticsSectionProps = {
  id: string;
  title: string;
  description?: string;
  timeRange?: SpotifyTimeRange;
  isRefreshing?: boolean;
  className?: string;
  children: ReactNode;
};

export function AnalyticsSection({
  id,
  title,
  description,
  timeRange,
  isRefreshing,
  className,
  children,
}: AnalyticsSectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn(analyticsCardClass, "scroll-mt-24 p-5 sm:p-6", className)}
    >
      <header className="mb-5 border-b border-zinc-800/80 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 id={titleId} className="text-xl font-semibold tracking-tight text-white">
              {title}
            </h2>
            {description ? <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">{description}</p> : null}
          </div>
          {timeRange ? (
            <p className="shrink-0 text-xs font-medium uppercase tracking-wide text-zinc-500">
              {timeRangeLabel(timeRange)}
            </p>
          ) : null}
        </div>
        {isRefreshing ? <p className="mt-2 text-xs text-[#1db954]">Updating…</p> : null}
      </header>
      {children}
    </section>
  );
}
