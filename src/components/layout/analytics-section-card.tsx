import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AnalyticsSectionCardProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

/** Flat analytics surface — shadcn Card without extra elevation. */
export function AnalyticsSectionCard({ children, className, contentClassName }: AnalyticsSectionCardProps) {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardContent className={cn("p-4 md:p-6", contentClassName)}>{children}</CardContent>
    </Card>
  );
}
