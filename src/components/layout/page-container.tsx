import { forwardRef, type ReactNode } from "react";
import { PAGE_CONTAINER_CLASS } from "@/lib/ui/layout-classes";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "main" | "nav";
  "aria-label"?: string;
};

export const PageContainer = forwardRef<HTMLElement, PageContainerProps>(function PageContainer(
  { children, className, as = "div", "aria-label": ariaLabel },
  ref,
) {
  const Tag = as;
  return (
    <Tag ref={ref as never} className={cn(PAGE_CONTAINER_CLASS, className)} aria-label={ariaLabel}>
      {children}
    </Tag>
  );
});
