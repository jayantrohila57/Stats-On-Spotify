import type { ReactNode } from "react";
import { SECTION_SCROLL_MARGIN_CLASS, SECTION_STACK_CLASS } from "@/lib/ui/layout-classes";
import { cn } from "@/lib/utils";

type DashboardSectionProps = {
  id: string;
  "aria-label"?: string;
  children: ReactNode;
  className?: string;
  stack?: boolean;
};

export function DashboardSection({
  id,
  "aria-label": ariaLabel,
  children,
  className,
  stack = false,
}: DashboardSectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(SECTION_SCROLL_MARGIN_CLASS, stack && SECTION_STACK_CLASS, className)}
    >
      {children}
    </section>
  );
}
