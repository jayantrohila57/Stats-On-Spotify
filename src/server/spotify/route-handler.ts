import { NextResponse } from "next/server";
import { getRequiredSession } from "@/server/auth/session";

export async function withSpotifySession<T>(
  handler: (accessToken: string) => Promise<T>,
): Promise<NextResponse> {
  const session = await getRequiredSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.error === "RefreshAccessTokenError") {
    return NextResponse.json({ error: "Session expired" }, { status: 401 });
  }

  try {
    const data = await handler(session.user.accessToken);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Spotify request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
