"use client";

import { cn } from "@/lib/utils";

export const DASHBOARD_SECTIONS = [
  { id: "section-overview", label: "Overview" },
  { id: "section-patterns", label: "Activity" },
  { id: "section-tracks", label: "Tracks" },
  { id: "section-artists", label: "Artists" },
  { id: "section-genres", label: "Genres" },
  { id: "section-taste", label: "Taste" },
  { id: "section-library", label: "Library" },
  { id: "section-playlists", label: "Playlists" },
  { id: "section-recent", label: "Recent" },
] as const;

type DashboardSectionNavProps = {
  className?: string;
};

export function DashboardSectionNav({ className }: DashboardSectionNavProps) {
  return (
    <nav
      aria-label="Dashboard sections"
      className={cn(
        "sticky top-0 z-20 -mx-1 hidden max-h-[calc(100vh-2rem)] flex-col gap-0.5 overflow-y-auto border-r border-border/60 pr-3 lg:flex",
        className,
      )}
    >
      {DASHBOARD_SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="rounded-sm px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}

export function DashboardSectionNavMobile() {
  return (
    <nav
      aria-label="Dashboard sections"
      className="sticky top-0 z-20 -mx-4 mb-4 flex gap-1 overflow-x-auto border-b border-border/60 bg-background/95 px-4 py-2 backdrop-blur-sm lg:hidden"
    >
      {DASHBOARD_SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="shrink-0 rounded-md border border-border/70 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
