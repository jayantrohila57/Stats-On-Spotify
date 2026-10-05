import { parseTimeRange } from "@/lib/spotify/time-range";
import { getMyTopTracks } from "@/server/spotify/client";
import { withSpotifySession } from "@/server/spotify/route-handler";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeRange = parseTimeRange(searchParams.get("time_range"));
  return withSpotifySession((accessToken) => getMyTopTracks(accessToken, 50, timeRange));
}
