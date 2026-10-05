"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

type SectionHeaderProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  meta?: ReactNode;
};

export function SectionHeader({ icon: Icon, title, description, meta }: SectionHeaderProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex gap-2">
          <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
          <div>
            <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
            {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
          </div>
        </div>
        {meta}
      </div>
      <Separator className="bg-border/60" />
    </div>
  );
}
