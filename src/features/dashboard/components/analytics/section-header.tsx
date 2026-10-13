"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
type SectionHeaderProps = {
  icon: LucideIcon;
  title: string;
  description?: ReactNode;
  meta?: ReactNode;
};

export function SectionHeader({ icon: Icon, title, description, meta }: SectionHeaderProps) {
  return (
    <div className="border-b border-border pb-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex min-w-0 gap-2">
          <Icon className="mt-1 size-5 shrink-0 text-muted-foreground" aria-hidden />
          <div className="min-w-0">
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            {description ? (
              typeof description === "string" ? (
                <p className="mt-1 text-sm leading-snug text-muted-foreground">{description}</p>
              ) : (
                description
              )
            ) : null}
          </div>
        </div>
        {meta}
      </div>
    </div>
  );
}
