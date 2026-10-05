import type { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { SPOTIFY_SCOPE_STRING } from "@/lib/spotify/scopes";
import { refreshSpotifyAccessToken } from "@/server/spotify/client";

async function refreshAccessToken(token: {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  spotifyUserId?: string;
}) {
  if (!token.refreshToken) {
    return { ...token, error: "RefreshAccessTokenError" as const };
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
    return { ...token, error: "RefreshAccessTokenError" as const };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: SPOTIFY_SCOPE_STRING,
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : Date.now() + 3600 * 1000,
          spotifyUserId: account.providerAccountId,
        };
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken ?? "";
      session.user.refreshToken = token.refreshToken ?? "";
      session.user.spotifyUserId = token.spotifyUserId ?? "";
      session.error = token.error;
      return session;
    },
  },
};
