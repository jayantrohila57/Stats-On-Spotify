import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://statsonspotify.vercel.app"),
  title: {
    default: "Stats On Spotify",
    template: "%s | Stats On Spotify",
  },
  description: "Personal Spotify listening analytics: top tracks, artists, playlists, and derived insights.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansJp.variable} min-h-screen font-sans antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
