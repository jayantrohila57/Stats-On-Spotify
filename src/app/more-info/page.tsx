import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "More Info",
};

export default function MoreInfoPage() {
  return (
    <div className="px-4 pb-24 md:px-8">
      <div className="mx-auto max-w-3xl pt-28">
        <Button asChild variant="ghost" className="mb-6 text-slate-300 hover:text-green-400">
          <Link href="/#get-started">← Back</Link>
        </Button>
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">More info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-300">
            <p>
              Stats On Spotify is a personal listening-stats viewer. Sign in with your Spotify account to see your top
              tracks, artists, and playlists in the browser.
            </p>
            <p>
              Live site:{" "}
              <Link href="https://statsonspotify.vercel.app" className="text-green-400 hover:underline">
                statsonspotify.vercel.app
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
