"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { StatsEmptyState, StatsErrorState } from "@/components/stats/stats-feedback";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AnalyticsSectionHeading } from "@/features/dashboard/components/analytics/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  icon: LucideIcon;
  title: string;
  description?: ReactNode;
  meta?: ReactNode;
  headingLevel?: 2 | 3;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  children?: ReactNode;
  className?: string;
  loadingSkeleton?: ReactNode;
};

function DefaultSectionSkeleton() {
  return (
    <div className="space-y-2" aria-busy="true">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-3/4" />
    </div>
  );
}

export function SectionShell({
  icon: Icon,
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
  loadingSkeleton,
  headingLevel = 2,
}: SectionShellProps) {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
        <AnalyticsSectionHeading
          icon={Icon}
          title={title}
          description={description}
          headingLevel={headingLevel}
        />
        {meta}
      </CardHeader>
      <CardContent className="min-w-0 pt-6">
        {isLoading ? (
          loadingSkeleton ?? <DefaultSectionSkeleton />
        ) : error ? (
          <StatsErrorState message={error} onRetry={onRetry} />
        ) : isEmpty ? (
          <StatsEmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
