import type { Session } from "next-auth";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

function hasSpotifyAccess(session: Session | null | undefined): boolean {
  if (!session?.user || !("accessToken" in session.user)) {
    return false;
  }
  const token = session.user.accessToken;
  return typeof token === "string" && token.length > 0;
}

export default auth((request) => {
  if (!request.nextUrl.pathname.startsWith("/account")) {
    return NextResponse.next();
  }

  if (hasSpotifyAccess(request.auth)) {
    return NextResponse.next();
  }

  const home = new URL("/", request.nextUrl.origin);
  home.searchParams.set("signin", "spotify");
  return NextResponse.redirect(home);
});

export const config = {
  matcher: ["/account"],
};
