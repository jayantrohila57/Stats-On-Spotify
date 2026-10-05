"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  StatsEmptyState,
  StatsErrorState,
  StatsLoadingList,
  StatsSignInPrompt,
} from "@/components/stats/stats-feedback";

type StatsSectionShellProps = {
  id: string;
  title: string;
  description: string;
  nextHref?: string;
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  children: React.ReactNode;
};

export function StatsSectionShell({
  id,
  title,
  description,
  nextHref,
  isLoading,
  error,
  isEmpty,
  onRetry,
  emptyTitle = "Nothing here yet",
  emptyDescription = "Spotify did not return any items for this view.",
  children,
}: StatsSectionShellProps) {
  const { status } = useSession();

  let body: React.ReactNode = children;
  if (status !== "authenticated") {
    body = <StatsSignInPrompt />;
  } else if (isLoading) {
    body = <StatsLoadingList />;
  } else if (error) {
    body = <StatsErrorState message={error} onRetry={onRetry} />;
  } else if (isEmpty) {
    body = <StatsEmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <section id={id} className="scroll-mt-24 px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">{description}</p>
          </div>
          {nextHref ? (
            <Button asChild variant="outline" className="border-white/20 text-slate-200 hover:text-green-400">
              <Link href={nextHref}>Next</Link>
            </Button>
          ) : null}
        </div>
        {body}
      </div>
    </section>
  );
}
