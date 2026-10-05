"use client";

import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function SectionCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-zinc-800 bg-zinc-950 p-4 ${className ?? ""}`}>{children}</div>
  );
}

export function AnalyticsDashboardSkeleton() {
  return (
    <div
      className="mx-auto min-h-screen max-w-6xl space-y-5 p-4 text-white"
      aria-busy="true"
      aria-label="Loading listening analytics"
    >
      <SectionCard className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 bg-zinc-800" />
          <Skeleton className="h-3 w-24 bg-zinc-800" />
        </div>
        <Skeleton className="h-10 w-full max-w-md rounded-full bg-zinc-800 sm:w-80" />
        <Skeleton className="h-10 w-36 rounded-xl bg-zinc-800" />
      </SectionCard>

      <SectionCard className="space-y-4">
        <Skeleton className="h-3 w-40 bg-zinc-800" />
        <Skeleton className="h-8 w-48 bg-zinc-800" />
        <div className="flex flex-wrap gap-6">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24 bg-zinc-800" />
            <Skeleton className="h-7 w-10 bg-zinc-800" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-24 bg-zinc-800" />
            <Skeleton className="h-7 w-10 bg-zinc-800" />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-3 w-16 bg-zinc-800" />
            <Skeleton className="h-4 w-full max-w-xs bg-zinc-800" />
            <Skeleton className="h-3 w-48 bg-zinc-800" />
          </div>
        </div>
      </SectionCard>

      <SectionCard className="space-y-3">
        <div className="flex items-baseline justify-between">
          <Skeleton className="h-5 w-20 bg-zinc-800" />
          <Skeleton className="h-3 w-24 bg-zinc-800" />
        </div>
        <Skeleton className="h-3 w-56 bg-zinc-800" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full bg-zinc-800" />
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-5 xl:grid-cols-2">
        <SectionCard className="space-y-3">
          <div className="flex items-baseline justify-between">
            <Skeleton className="h-5 w-24 bg-zinc-800" />
            <Skeleton className="h-3 w-24 bg-zinc-800" />
          </div>
          <ul className="space-y-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl px-2 py-2">
                <Skeleton className="size-6 rounded bg-zinc-800" />
                <Skeleton className="size-12 shrink-0 rounded-md bg-zinc-800" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 max-w-[200px] bg-zinc-800" />
                  <Skeleton className="h-3 w-1/2 max-w-[140px] bg-zinc-800" />
                </div>
                <Skeleton className="h-3 w-6 bg-zinc-800" />
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard className="space-y-3">
          <div className="flex items-baseline justify-between">
            <Skeleton className="h-5 w-24 bg-zinc-800" />
            <Skeleton className="h-3 w-24 bg-zinc-800" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-xl bg-zinc-900">
                <Skeleton className="aspect-square w-full rounded-none bg-zinc-800" />
                <div className="space-y-2 p-2">
                  <Skeleton className="h-4 w-full bg-zinc-800" />
                  <Skeleton className="h-3 w-8 bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard className="space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <Skeleton className="h-5 w-28 bg-zinc-800" />
          <Skeleton className="h-3 w-40 bg-zinc-800" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
              <Skeleton className="size-16 shrink-0 rounded-md bg-zinc-800" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-full bg-zinc-800" />
                <Skeleton className="h-3 w-16 bg-zinc-800" />
                <Skeleton className="h-3 w-14 bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
