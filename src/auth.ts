import NextAuth, { type Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Spotify from "next-auth/providers/spotify";
import { applyAuthUrlEnvDefaults } from "@/lib/site-url";
import { SPOTIFY_SCOPE_STRING } from "@/lib/spotify/scopes";
import { refreshSpotifyAccessToken } from "@/server/spotify/client";

applyAuthUrlEnvDefaults();

type SpotifyJwt = JWT & {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  spotifyUserId?: string;
  error?: "RefreshAccessTokenError";
};

async function refreshAccessToken(token: SpotifyJwt): Promise<SpotifyJwt> {
  if (!token.refreshToken) {
    return { ...token, error: "RefreshAccessTokenError" };
  }

  try {
    const refreshed = await refreshSpotifyAccessToken(token.refreshToken);
    return {
      ...token,
      accessToken: refreshed.access_token,
      accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
      error: undefined,
    };
  } catch {
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: SPOTIFY_SCOPE_STRING,
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      const spotifyToken = token as SpotifyJwt;

      if (account) {
        return {
          ...spotifyToken,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : Date.now() + 3600 * 1000,
          spotifyUserId: account.providerAccountId,
        };
      }

      if (spotifyToken.accessTokenExpires && Date.now() < spotifyToken.accessTokenExpires) {
        return spotifyToken;
      }

      return refreshAccessToken(spotifyToken);
    },
    async session({ session, token }) {
      const spotifyToken = token as SpotifyJwt;
      const enriched: Session = {
        ...session,
        user: {
          ...session.user,
          accessToken: spotifyToken.accessToken ?? "",
          refreshToken: spotifyToken.refreshToken ?? "",
          spotifyUserId: spotifyToken.spotifyUserId ?? "",
        },
        error: spotifyToken.error,
      };
      return enriched;
    },
  },
});
