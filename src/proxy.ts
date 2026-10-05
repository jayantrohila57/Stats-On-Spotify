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
  const { pathname } = request.nextUrl;
  const authenticated = hasSpotifyAccess(request.auth);

  if (pathname === "/login") {
    if (authenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/") {
    if (!authenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/", "/login"],
};
