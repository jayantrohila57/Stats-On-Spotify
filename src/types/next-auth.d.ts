import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      spotifyUserId: string;
    } & DefaultSession["user"];
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    spotifyUserId?: string;
    error?: "RefreshAccessTokenError";
  }
}
