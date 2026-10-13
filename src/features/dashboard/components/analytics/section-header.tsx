"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const ANALYTICS_SECTION_TITLE_CLASS = "truncate text-lg font-semibold tracking-tight";

export const ANALYTICS_SECTION_DESCRIPTION_CLASS =
  "line-clamp-3 min-w-0 text-sm leading-snug text-muted-foreground sm:line-clamp-none";

type AnalyticsSectionHeadingProps = {
  icon: LucideIcon;
  title: string;
  description?: ReactNode;
  /** h2 for dashboard sections; h3 for nested cards (e.g. overview snapshot). */
  headingLevel?: 2 | 3;
  className?: string;
};

export function AnalyticsSectionHeading({
  icon: Icon,
  title,
  description,
  headingLevel = 2,
  className,
}: AnalyticsSectionHeadingProps) {
  const TitleTag = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className={cn("flex min-w-0 flex-1 gap-2", className)}>
      <Icon className="mt-1 size-5 shrink-0 text-muted-foreground" aria-hidden />
      <div className="min-w-0 flex-1 space-y-1.5">
        <TitleTag className={ANALYTICS_SECTION_TITLE_CLASS}>{title}</TitleTag>
        {description ? (
          typeof description === "string" ? (
            <p className={ANALYTICS_SECTION_DESCRIPTION_CLASS}>{description}</p>
          ) : (
            description
          )
        ) : null}
      </div>
    </div>
  );
}

type SectionHeaderProps = {
  icon: LucideIcon;
  title: string;
  description?: ReactNode;
  meta?: ReactNode;
  headingLevel?: 2 | 3;
};

/** Page-level section chrome (no card) — matches SectionShell header spacing. */
export function SectionHeader({ icon, title, description, meta, headingLevel = 2 }: SectionHeaderProps) {
  return (
    <div className="border-b border-border pb-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <AnalyticsSectionHeading
          icon={icon}
          title={title}
          description={description}
          headingLevel={headingLevel}
        />
        {meta}
      </div>
    </div>
  );
}
