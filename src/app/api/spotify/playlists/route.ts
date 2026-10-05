import { getMyPlaylists } from "@/server/spotify/client";
import { withSpotifySession } from "@/server/spotify/route-handler";

export async function GET() {
  return withSpotifySession((accessToken) => getMyPlaylists(accessToken));
}
