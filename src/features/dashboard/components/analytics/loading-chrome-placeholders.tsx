"use client";

import { ANALYTICS_PERIODS } from "@/lib/spotify/period";
import { PageContainer } from "@/components/layout/page-container";
import { SEGMENTED_CONTROL_CLASS } from "@/lib/ui/layout-classes";
import { DASHBOARD_SECTIONS } from "@/features/dashboard/components/analytics/dashboard-section-nav";
import { cn } from "@/lib/utils";

const PULSE_CHIP = "animate-pulse rounded bg-muted";

/** Reserves exact layout of PeriodFilterBar (invisible label text + period buttons). */
export function PeriodFilterBarPlaceholder({ className }: { className?: string }) {
  return (
    <div className={cn("border-b border-border bg-background", className)}>
      <PageContainer className="flex flex-wrap items-center gap-3 py-2.5">
        <span className={cn("text-xs font-medium text-transparent", PULSE_CHIP)} aria-hidden>
          Period
        </span>
        <div className={SEGMENTED_CONTROL_CLASS} aria-hidden>
          {ANALYTICS_PERIODS.map((item) => (
            <span
              key={item.id}
              className={cn("rounded px-3 py-1 text-xs font-medium text-transparent", PULSE_CHIP)}
            >
              {item.label}
            </span>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}

/** Reserves exact layout of mobile section nav chips (9 tabs, per-label widths). */
export function MobileSectionNavPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn("sticky top-14 z-30 mb-3 border-b border-border bg-background/95 backdrop-blur-sm lg:hidden", className)}
      aria-hidden
    >
      <PageContainer className="flex gap-1 overflow-x-auto overscroll-x-contain py-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {DASHBOARD_SECTIONS.map((section) => (
          <span
            key={section.id}
            className={cn(
              "shrink-0 rounded-md border border-border px-2.5 py-1 text-xs text-transparent",
              PULSE_CHIP,
            )}
          >
            {section.label}
          </span>
        ))}
      </PageContainer>
    </div>
  );
}

/** Matches loaded header account control: border, px-2 py-1.5, size-7 avatar + chevron gap. */
export function HeaderAccountButtonPlaceholder() {
  return (
    <div
      className="flex h-[42px] w-[68px] shrink-0 items-center justify-center gap-2 rounded-md border border-border bg-card px-2 py-1.5"
      aria-hidden
    >
      <span className={cn("size-7 shrink-0 rounded-full", PULSE_CHIP)} />
      <span className={cn("size-3.5 shrink-0 rounded-sm", PULSE_CHIP)} />
    </div>
  );
}
