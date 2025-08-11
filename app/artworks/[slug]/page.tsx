import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArtworks } from "@/lib/actions/artworks";
import { generateSlug } from "@/lib/utils";
import type { Artwork } from "@/lib/db/schema";
import { imageUrl } from "@/lib/utils";

interface ArtworkPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // Revalidate every hour (ISR)
export const dynamic = "force-dynamic";

// Static params disabled to avoid build-time access to Cloudflare env

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const artwork = await getArtworkBySlug(resolvedParams.slug);
  
  if (!artwork) {
    return {
      title: "Artwork Not Found",
    };
  }

  const ogImage = imageUrl(artwork.image);

  return {
    title: `${artwork.title} - Xuecong Wang`,
    description: Array.isArray(artwork.description) 
      ? artwork.description.join(" ") 
      : artwork.description || `Artwork by Xuecong Wang: ${artwork.title}`,
    openGraph: {
      title: `${artwork.title} - Xuecong Wang`,
      description: Array.isArray(artwork.description) 
        ? artwork.description.join(" ") 
        : artwork.description || `Artwork by Xuecong Wang: ${artwork.title}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 800,
          alt: artwork.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${artwork.title} - Xuecong Wang`,
      description: Array.isArray(artwork.description) 
        ? artwork.description.join(" ") 
        : artwork.description || `Artwork by Xuecong Wang: ${artwork.title}`,
      images: [ogImage],
    },
  };
}

async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  const artworks = await getArtworks();
  return artworks.find((artwork) => generateSlug(artwork.title) === slug) || null;
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const resolvedParams = await params;
  const artwork = await getArtworkBySlug(resolvedParams.slug);

  if (!artwork) {
    notFound();
  }

  const mainImageUrl = imageUrl(artwork.image);
  const detailImages = artwork.details?.map((detail) => imageUrl(detail)) || [];

  return (
    <div className="artwork-page">
      <div className="artwork-container">
        <div className="artwork-images">
          <div className="main-image">
            <img src={mainImageUrl} alt={artwork.title} />
          </div>
          {detailImages.length > 0 && (
            <div className="detail-images">
              {detailImages.map((imageUrl, index) => (
                <img 
                  key={index} 
                  src={imageUrl} 
                  alt={`${artwork.title} detail ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="artwork-info">
          <h1 className="artwork-title">{artwork.title}</h1>
          {artwork.time && <p className="artwork-time">Time: {artwork.time}</p>}
          {artwork.medium && <p className="artwork-medium">Medium: {artwork.medium}</p>}
          {artwork.dimension && <p className="artwork-dimension">Dimension: {artwork.dimension}</p>}
          <p className="artwork-category">Category: {artwork.category}</p>
          
          {artwork.description && (
            <div className="artwork-description">
              <h2>Description:</h2>
              {Array.isArray(artwork.description) ? (
                artwork.description.map((line, index) => (
                  <p key={index}>{line}</p>
                ))
              ) : (
                <p>{artwork.description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

