import { GetStartedSection } from "@/features/home/components/get-started-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { NewReleasesSection } from "@/features/new-releases/components/new-releases-section";
import { PlaylistsSection } from "@/features/playlists/components/playlists-section";
import { TopArtistsSection } from "@/features/top-artists/components/top-artists-section";
import { TopTracksSection } from "@/features/top-tracks/components/top-tracks-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GetStartedSection />
      <TopTracksSection />
      <TopArtistsSection />
      <PlaylistsSection />
      <NewReleasesSection />
    </>
  );
}
