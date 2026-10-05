import { getMyTopTracks } from "@/server/spotify/client";
import { withSpotifySession } from "@/server/spotify/route-handler";

export async function GET() {
  return withSpotifySession((accessToken) => getMyTopTracks(accessToken));
}
