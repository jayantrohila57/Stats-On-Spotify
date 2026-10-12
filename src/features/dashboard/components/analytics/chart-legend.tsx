"use client";

import { cn } from "@/lib/utils";

type ChartLegendItem = {
  key: string;
  label: string;
  color: string;
};

type ChartLegendProps = {
  items: ChartLegendItem[];
  className?: string;
};

export function ChartLegend({ items, className }: ChartLegendProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-4 gap-y-1", className)}>
      {items.map((item) => (
        <li key={item.key} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="size-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} aria-hidden />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
