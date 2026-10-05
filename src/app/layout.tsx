import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://statsonspotify.vercel.app"),
  title: {
    default: "Stats On Spotify",
    template: "%s | Stats On Spotify",
  },
  description: "Personal Spotify listening dashboard: top tracks, artists, and playlists.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${poppins.variable} min-h-screen bg-[#050505] antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
