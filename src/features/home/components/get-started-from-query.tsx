"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * When proxy redirects unauthenticated /account visits, we land on /?signin=spotify
 * and start OAuth once (no redirect loop).
 */
export function GetStartedFromQuery() {
  const searchParams = useSearchParams();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    if (searchParams.get("signin") !== "spotify") return;
    started.current = true;
    void signIn("spotify", { callbackUrl: "/account" });
  }, [searchParams]);

  return null;
}
