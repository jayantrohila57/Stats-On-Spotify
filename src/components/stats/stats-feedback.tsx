"use client";

import { AlertCircle, Inbox, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SpotifyAuthButton } from "@/features/auth/components/spotify-auth-button";

export function StatsLoadingList({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading Spotify data">
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full rounded-md" />
      ))}
    </div>
  );
}

export function StatsErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <Alert variant="destructive" className="border-red-500/40 bg-red-500/10">
      <AlertCircle className="size-4" />
      <AlertTitle>Could not load data</AlertTitle>
      <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span>{message}</span>
        {onRetry ? (
          <Button type="button" variant="outline" size="sm" onClick={() => onRetry()}>
            <RefreshCw />
            Try again
          </Button>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}

export function StatsEmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border px-6 py-10 text-center">
      <Inbox className="size-8 text-muted-foreground" />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function StatsSignInPrompt() {
  return (
    <div className="flex max-w-md flex-col items-center gap-4 rounded-md border border-dashed border-border bg-card px-6 py-10 text-center">
      <p className="text-sm text-muted-foreground">Sign in with Spotify to load your personal listening analytics.</p>
      <SpotifyAuthButton size="lg" />
    </div>
  );
}
