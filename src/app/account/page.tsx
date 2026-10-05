import type { Metadata } from "next";
import Link from "next/link";
import { ProfilePanel } from "@/features/profile/components/profile-panel";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <div className="px-4 pb-24 md:px-8">
      <div className="mx-auto flex max-w-5xl justify-start pt-28">
        <Button asChild variant="ghost" className="text-slate-300 hover:text-green-400">
          <Link href="/#get-started">← Back</Link>
        </Button>
      </div>
      <ProfilePanel />
    </div>
  );
}
