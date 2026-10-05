"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { AuthSessionProvider } from "@/features/auth/components/session-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      <QueryClientProvider client={queryClient}>
        <AuthSessionProvider>
          <TooltipProvider delayDuration={300}>
            {children}
            <Toaster richColors closeButton position="top-center" />
          </TooltipProvider>
        </AuthSessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
