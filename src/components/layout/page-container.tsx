import type { ReactNode } from "react";
import { PAGE_CONTAINER_CLASS } from "@/lib/ui/layout-classes";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "main";
};

export function PageContainer({ children, className, as = "div" }: PageContainerProps) {
  const Tag = as;
  return <Tag className={cn(PAGE_CONTAINER_CLASS, className)}>{children}</Tag>;
}
