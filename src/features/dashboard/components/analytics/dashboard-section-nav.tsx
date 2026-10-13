"use client";

import { PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils";

export const DASHBOARD_SECTIONS = [
  { id: "section-overview", label: "Overview" },
  { id: "section-patterns", label: "Activity" },
  { id: "section-tracks", label: "Tracks" },
  { id: "section-genres", label: "Genres" },
  { id: "section-artists", label: "Artists" },
  { id: "section-taste", label: "Taste" },
  { id: "section-library", label: "Library" },
  { id: "section-playlists", label: "Playlists" },
  { id: "section-recent", label: "Recent" },
] as const;

type DashboardSectionNavProps = {
  className?: string;
  activeSectionId?: string;
};

function navLinkClassName(isActive: boolean, base: string) {
  return cn(
    base,
    isActive
      ? "bg-muted/80 font-medium text-foreground"
      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
  );
}

export function DashboardSectionNav({ className, activeSectionId }: DashboardSectionNavProps) {
  return (
    <nav
      aria-label="Dashboard sections"
      className={cn(
        "sticky top-20 z-20 hidden max-h-[calc(100vh-5rem)] flex-col gap-0.5 overflow-y-auto lg:flex",
        className,
      )}
    >
      {DASHBOARD_SECTIONS.map((section) => {
        const isActive = activeSectionId === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={isActive ? "location" : undefined}
            className={navLinkClassName(isActive, "rounded-sm px-2 py-1.5 text-xs transition-colors")}
          >
            {section.label}
          </a>
        );
      })}
    </nav>
  );
}

export function DashboardSectionNavMobile({ activeSectionId }: { activeSectionId?: string }) {
  return (
    <div className="sticky top-14 z-30 mb-3 border-b border-border bg-background/95 backdrop-blur-sm lg:hidden">
      <PageContainer
        className="flex gap-1 overflow-x-auto overscroll-x-contain py-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Dashboard sections"
        as="nav"
      >
        {DASHBOARD_SECTIONS.map((section) => {
          const isActive = activeSectionId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? "location" : undefined}
              className={navLinkClassName(
                isActive,
                "shrink-0 rounded-md border border-border px-2.5 py-1 text-xs transition-colors",
              )}
            >
              {section.label}
            </a>
          );
        })}
      </PageContainer>
    </div>
  );
}
