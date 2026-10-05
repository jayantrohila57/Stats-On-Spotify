import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/Account", destination: "/", permanent: true },
      { source: "/account", destination: "/", permanent: true },
      { source: "/Contribute", destination: "/login", permanent: true },
      { source: "/contribute", destination: "/login", permanent: true },
      { source: "/More-Info", destination: "/login", permanent: true },
      { source: "/more-info", destination: "/login", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "mosaic.scdn.co" },
      { protocol: "https", hostname: "wrapped-images.spotifycdn.com" },
      { protocol: "https", hostname: "seed-mix-image.spotifycdn.com" },
      { protocol: "https", hostname: "image-cdn-ak.spotifycdn.com" },
      { protocol: "https", hostname: "image-cdn-fa.spotifycdn.com" },
      { protocol: "https", hostname: "**.scdn.co" },
      { protocol: "https", hostname: "**.spotifycdn.com" },
    ],
  },
};

export default nextConfig;
