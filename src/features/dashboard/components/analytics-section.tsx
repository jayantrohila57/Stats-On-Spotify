"use client";

import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SECTION_SCROLL_MARGIN_CLASS } from "@/lib/ui/layout-classes";
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
    <Card id={id} aria-labelledby={titleId} className={cn(SECTION_SCROLL_MARGIN_CLASS, "shadow-sm", className)}>
      <CardHeader className="border-b pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 space-y-1.5">
            <CardTitle id={titleId} className="text-xl font-semibold tracking-tight">
              {title}
            </CardTitle>
            {description ? <CardDescription className="leading-relaxed">{description}</CardDescription> : null}
          </div>
          {timeRange ? (
            <p className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {timeRangeLabel(timeRange)}
            </p>
          ) : null}
        </div>
        {isRefreshing ? <p className="text-xs text-green-500">Updating…</p> : null}
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  );
}
