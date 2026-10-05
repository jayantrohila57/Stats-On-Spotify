import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://statsonspotify.vercel.app"),
  title: {
    default: "Stats On Spotify | Your Top Tracks, Artists, Playlists & more.",
    template: "%s | Stats On Spotify",
  },
  description:
    "Review your Spotify listening stats: top tracks, artists, and playlists with secure Spotify login.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://statsonspotify.vercel.app/",
    siteName: "Stats On Spotify",
    title: "Stats On Spotify | Your Top Tracks, Artists, Playlists & more.",
    description:
      "Review your Spotify listening stats: top tracks, artists, and playlists with secure Spotify login.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stats On Spotify",
    description: "Your personal Spotify listening stats in the browser.",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${poppins.variable} min-h-screen bg-black`}>
        <AppProviders>
          <SiteHeader />
          <main className="pb-16">{children}</main>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
