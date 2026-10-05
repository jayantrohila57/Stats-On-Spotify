"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export function useSessionGuard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn("spotify");
    }
  }, [session?.error]);

  return { session, status };
}
