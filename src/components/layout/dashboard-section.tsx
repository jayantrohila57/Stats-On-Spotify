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
    <section aria-label={ariaLabel} className={cn(stack && SECTION_STACK_CLASS, className)}>
      {/* Scroll-spy + hash target: top of section only (not the full tall section box). */}
      <div id={id} className={cn(SECTION_SCROLL_MARGIN_CLASS, "h-0 w-full")} aria-hidden />
      {children}
    </section>
  );
}
