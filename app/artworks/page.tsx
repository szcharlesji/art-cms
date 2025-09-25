import { Metadata } from "next";
import { Suspense } from "react";
import { getArtworks } from "@/lib/actions/artworks";
import StaticArtworkGallery from "@/components/StaticArtworkGallery";
import Starter from "@/components/Starter";

export const metadata: Metadata = {
  title: "Artworks - Xuecong Wang",
  description:
    "Explore the artistic works of Xuecong Wang, featuring paintings, sculptures, installations, and other art forms",
  openGraph: {
    title: "Artworks - Xuecong Wang",
    description:
      "Explore the artistic works of Xuecong Wang, featuring paintings, sculptures, installations, and other art forms",
  },
};

export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function ArtworksPage() {
  const artworks = await getArtworks();

  return (
    <div>
      <Starter />
      <Suspense fallback={<div>Loading...</div>}>
        <StaticArtworkGallery artworks={artworks} />
      </Suspense>
    </div>
  );
}
