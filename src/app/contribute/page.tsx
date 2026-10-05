import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contribute",
};

export default function ContributePage() {
  return (
    <div className="px-4 pb-24 md:px-8">
      <div className="mx-auto max-w-3xl pt-28">
        <Button asChild variant="ghost" className="mb-6 text-slate-300 hover:text-green-400">
          <Link href="/#get-started">← Back</Link>
        </Button>
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Contribute</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-300">
            <p>
              This project is open source. Contributions, bug reports, and ideas are welcome on GitHub.
            </p>
            <Link href="https://github.com/jayantrohila57/Stats-On-Spotify" className="text-green-400 hover:underline">
              github.com/jayantrohila57/Stats-On-Spotify
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
