"use client";

import { ArrowDown, ArrowRight, ArrowUp, Sparkles } from "lucide-react";
import type { RankDelta } from "@/lib/analytics/compare";
import { cn } from "@/lib/utils";

type RankMovementProps = {
  delta: RankDelta;
  className?: string;
};

export function RankMovement({ delta, className }: RankMovementProps) {
  if (delta.kind === "new") {
    return (
      <span className={cn("inline-flex items-center gap-0.5 font-mono-stats text-xs font-medium text-emerald-400", className)}>
        <Sparkles className="size-3" aria-hidden />
        NEW
      </span>
    );
  }
  if (delta.kind === "out") {
    return (
      <span className={cn("inline-flex items-center gap-0.5 font-mono-stats text-xs font-medium text-muted-foreground", className)}>
        OUT
      </span>
    );
  }
  if (delta.kind === "same") {
    return (
      <span className={cn("inline-flex items-center gap-0.5 font-mono-stats text-xs text-muted-foreground", className)}>
        <ArrowRight className="size-3" aria-hidden />
        <span className="sr-only">No change</span>
        —
      </span>
    );
  }
  if (delta.kind === "up") {
    return (
      <span className={cn("inline-flex items-center gap-0.5 font-mono-stats text-xs font-medium text-emerald-400", className)}>
        <ArrowUp className="size-3" aria-hidden />
        {delta.delta}
      </span>
    );
  }
  return (
    <span className={cn("inline-flex items-center gap-0.5 font-mono-stats text-xs font-medium text-amber-400", className)}>
      <ArrowDown className="size-3" aria-hidden />
      {delta.delta}
    </span>
  );
}
