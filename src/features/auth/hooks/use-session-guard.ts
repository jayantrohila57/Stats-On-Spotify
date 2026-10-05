"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function useSessionGuard() {
  const { data: session, status } = useSession();
  const hasPromptedRefresh = useRef(false);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError" && !hasPromptedRefresh.current) {
      hasPromptedRefresh.current = true;
      toast.error("Spotify session expired", {
        description: "Please sign in again to continue.",
      });
      void signIn("spotify");
    }
  }, [session?.error]);

  return { session, status };
}
