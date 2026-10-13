"use client";

import type { ReactNode } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SEGMENTED_CONTROL_CLASS } from "@/lib/ui/layout-classes";
import { DASHBOARD_SECTIONS } from "@/features/dashboard/components/analytics/dashboard-section-nav";
import { Skeleton } from "@/components/ui/skeleton";

const DASHBOARD_SECTIONS_PREVIEW = DASHBOARD_SECTIONS.map((s) => s.label);

function SectionCardSkeleton({ children }: { children?: ReactNode }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        <Skeleton className="h-8 w-24 rounded-md" />
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  );
}

function KpiGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="space-y-2 border border-border bg-muted/20 px-3 py-2.5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-full max-w-[140px]" />
        </div>
      ))}
    </div>
  );
}

function TableRowsSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <ul className="divide-y divide-border">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 py-3">
          <Skeleton className="size-6 rounded-sm" />
          <Skeleton className="size-12 shrink-0 rounded-sm" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4 max-w-[220px]" />
            <Skeleton className="h-3 w-1/2 max-w-[160px]" />
          </div>
          <Skeleton className="h-3 w-10" />
        </li>
      ))}
    </ul>
  );
}

export function AnalyticsDashboardSkeleton() {
  return (
    <div
      className="min-h-screen overflow-x-clip bg-background text-foreground"
      aria-busy="true"
      aria-label="Loading listening analytics"
    >
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <PageContainer className="flex h-14 items-center gap-4">
          <div className="min-w-0 flex-1 space-y-1.5">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-56 max-w-full" />
          </div>
          <Skeleton className="h-9 w-28 rounded-md" />
        </PageContainer>
      </header>

      <div className="border-b border-border bg-background">
        <PageContainer className="flex flex-wrap items-center gap-3 py-2.5">
          <Skeleton className="h-3 w-12" />
          <div className={SEGMENTED_CONTROL_CLASS}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="mx-0.5 h-7 w-16 rounded-sm" />
            ))}
          </div>
          <Skeleton className="hidden h-3 w-64 sm:block" />
        </PageContainer>
      </div>

      <div className="sticky top-14 z-30 mb-3 border-b border-border bg-background/95 lg:hidden" aria-hidden>
        <PageContainer className="flex gap-1 overflow-x-auto overscroll-x-contain py-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {DASHBOARD_SECTIONS_PREVIEW.map((label) => (
            <Skeleton key={label} className="h-7 w-[4.5rem] shrink-0 rounded-md" />
          ))}
        </PageContainer>
      </div>

      <PageContainer className="flex items-stretch gap-8 py-6">
        <aside className="hidden w-36 shrink-0 border-r border-border pr-3 lg:block" aria-hidden>
          <div className="flex flex-col gap-1 pt-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-full rounded-sm" />
            ))}
          </div>
        </aside>

        <main className="min-w-0 flex-1 space-y-8">
          <section className="scroll-mt-20 space-y-3">
            <div className="space-y-3">
              <div className="flex gap-2">
                <Skeleton className="size-5 rounded-sm" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-44" />
                  <Skeleton className="h-4 w-full max-w-lg" />
                </div>
              </div>
              <Skeleton className="h-px w-full" />
            </div>
            <KpiGridSkeleton />
            <Skeleton className="h-24 w-full rounded-md" />
          </section>

          <SectionCardSkeleton>
            <div className="grid gap-6 md:grid-cols-2">
              <Skeleton className="h-40 w-full rounded-md" />
              <Skeleton className="h-40 w-full rounded-md" />
            </div>
          </SectionCardSkeleton>

          <SectionCardSkeleton>
            <TableRowsSkeleton />
          </SectionCardSkeleton>

          <SectionCardSkeleton>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-md border border-border">
                  <Skeleton className="aspect-square w-full rounded-none" />
                  <div className="space-y-2 p-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                </div>
              ))}
            </div>
          </SectionCardSkeleton>

          <SectionCardSkeleton>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3 rounded-md border border-border p-3">
                  <Skeleton className="size-16 shrink-0 rounded-md" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </SectionCardSkeleton>
        </main>
      </PageContainer>
    </div>
  );
}
