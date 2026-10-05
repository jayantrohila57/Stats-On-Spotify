"use client";

import { ThemeProvider } from "next-themes";
import { AuthSessionProvider } from "@/features/auth/components/session-provider";
import { Toaster } from "@/components/ui/sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      <AuthSessionProvider>
        {children}
        <Toaster richColors closeButton position="top-center" />
      </AuthSessionProvider>
    </ThemeProvider>
  );
}
