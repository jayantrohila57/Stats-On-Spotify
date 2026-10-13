"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DashboardIconSectionProps = {
  icon: LucideIcon;
  title: string;
  description?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

/** Icon-led analytics section — matches SectionShell header divider (full-bleed border-b). */
export function DashboardIconSection({
  icon: Icon,
  title,
  description,
  meta,
  children,
  className,
  contentClassName,
}: DashboardIconSectionProps) {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
        <div className="flex min-w-0 gap-2">
          <Icon className="mt-1 size-5 shrink-0 text-muted-foreground" aria-hidden />
          <div className="min-w-0 space-y-1.5">
            <CardTitle className="text-lg font-semibold tracking-tight">{title}</CardTitle>
            {description ? (
              typeof description === "string" ? (
                <CardDescription className="leading-snug">{description}</CardDescription>
              ) : (
                description
              )
            ) : null}
          </div>
        </div>
        {meta}
      </CardHeader>
      <CardContent className={cn("min-w-0 pt-6", contentClassName)}>{children}</CardContent>
    </Card>
  );
}
