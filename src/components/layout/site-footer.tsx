import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/80 py-4 text-center text-xs text-slate-300 backdrop-blur-sm">
      <p>
        © {new Date().getFullYear()} StatsOnSpotify. All Rights Reserved.
        <br className="md:hidden" />
        <span className="md:ml-2">
          <Link href="https://github.com/jayantrohila57" className="text-green-500 hover:underline">
            Creator: @JayantRohila57
          </Link>
        </span>
      </p>
    </footer>
  );
}
