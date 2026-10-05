"use client";

import type { ReactNode } from "react";
import { StatsEmptyState, StatsErrorState } from "@/components/stats/stats-feedback";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  title: string;
  description?: string;
  meta?: ReactNode;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  children?: ReactNode;
  className?: string;
};

export function SectionShell({
  title,
  description,
  meta,
  isLoading,
  error,
  onRetry,
  isEmpty,
  emptyTitle = "No data",
  emptyDescription = "Nothing to show for this period.",
  children,
  className,
}: SectionShellProps) {
  return (
    <section className={cn("rounded-md border border-border/80 bg-card/30", className)}>
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border/60 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
          {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
        </div>
        {meta}
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="space-y-2" aria-busy="true">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
          </div>
        ) : error ? (
          <StatsErrorState message={error} onRetry={onRetry} />
        ) : isEmpty ? (
          <StatsEmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          children
        )}
      </div>
    </section>
  );
}
