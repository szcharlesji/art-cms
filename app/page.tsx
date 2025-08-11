import { Metadata } from "next";
import { getArtworks } from "@/lib/actions/artworks";
import StaticArtworkGallery from "@/components/StaticArtworkGallery";

export const metadata: Metadata = {
  title: "Xuecong Wang - Artist Portfolio",
  description: "Explore the artistic works of Xuecong Wang, featuring paintings, sculptures, installations, and other art forms",
  openGraph: {
    title: "Xuecong Wang - Artist Portfolio",
    description: "Explore the artistic works of Xuecong Wang, featuring paintings, sculptures, installations, and other art forms",
  },
};

export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function Home() {
  const artworks = await getArtworks();

  return (
    <div>
      <StaticArtworkGallery artworks={artworks} />
    </div>
  );
}
