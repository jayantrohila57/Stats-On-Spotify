"use client";

import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function SectionCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`scroll-mt-24 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 ${className ?? ""}`}>
      {children}
    </div>
  );
}

function SectionHeaderSkeleton() {
  return (
    <div className="mb-5 border-b border-zinc-800/80 pb-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 bg-zinc-800" />
          <Skeleton className="h-4 w-56 max-w-full bg-zinc-800" />
        </div>
        <Skeleton className="h-3 w-20 bg-zinc-800" />
      </div>
    </div>
  );
}

export function AnalyticsDashboardSkeleton() {
  return (
    <div
      className="mx-auto min-h-screen max-w-3xl px-4 py-6 text-white sm:max-w-4xl lg:max-w-5xl"
      aria-busy="true"
      aria-label="Loading listening analytics"
    >
      <div className="sticky top-0 z-20 -mx-4 mb-8 border-b border-zinc-800/80 bg-[#0a0a0a]/95 px-4 py-4 backdrop-blur-sm">
        <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 bg-zinc-800" />
            <Skeleton className="h-3 w-24 bg-zinc-800" />
          </div>
          <Skeleton className="h-10 w-full max-w-md rounded-xl bg-zinc-800 sm:w-80" />
          <Skeleton className="h-10 w-36 rounded-xl bg-zinc-800" />
        </div>
      </div>

      <div className="flex flex-col gap-8 pb-12">
        <SectionCard>
          <SectionHeaderSkeleton />
          <Skeleton className="h-8 w-40 bg-zinc-800" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-20 rounded-xl bg-zinc-800" />
            <Skeleton className="h-20 rounded-xl bg-zinc-800" />
            <Skeleton className="h-20 rounded-xl bg-zinc-800 sm:col-span-2 lg:col-span-1" />
          </div>
        </SectionCard>

        <SectionCard>
          <SectionHeaderSkeleton />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full bg-zinc-800" />
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <SectionHeaderSkeleton />
          <ul className="divide-y divide-zinc-800/80">
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i} className="flex items-center gap-3 px-2 py-3">
                <Skeleton className="size-6 rounded bg-zinc-800" />
                <Skeleton className="size-12 shrink-0 rounded-md bg-zinc-800" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 max-w-[220px] bg-zinc-800" />
                  <Skeleton className="h-3 w-1/2 max-w-[160px] bg-zinc-800" />
                </div>
                <Skeleton className="h-3 w-8 bg-zinc-800" />
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard>
          <SectionHeaderSkeleton />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">
                <Skeleton className="aspect-square w-full rounded-none bg-zinc-800" />
                <div className="space-y-2 p-2.5">
                  <Skeleton className="h-4 w-full bg-zinc-800" />
                  <Skeleton className="h-3 w-8 bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <SectionHeaderSkeleton />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
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
    </div>
  );
}
