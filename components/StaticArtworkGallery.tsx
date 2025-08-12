"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { imageUrl, generateSlug } from "@/lib/utils";
import Popup from "./Popup";
import Filter from "./Filter";
import type { Artwork } from "@/lib/db/schema";

interface StaticArtworkGalleryProps {
  artworks: Artwork[];
}

export default function StaticArtworkGallery({
  artworks,
}: StaticArtworkGalleryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentDetailIndex, setCurrentDetailIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    if (selectedArtwork) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedArtwork]);

  // Initialize state from URL params
  useEffect(() => {
    const category = searchParams.get("category");
    const artworkSlug = searchParams.get("artwork");

    // Set filter from URL
    if (category && ["painting", "sculpture", "installation", "other"].includes(category)) {
      setSelectedFilter(category);
    }

    // Set selected artwork from URL
    if (artworkSlug) {
      const artwork = artworks.find(
        (artwork) => generateSlug(artwork.title) === artworkSlug
      );
      if (artwork) {
        setSelectedArtwork(artwork);
        setCurrentDetailIndex(0);
      }
    }
  }, [searchParams, artworks]);

  // Pre-process artworks with image URLs
  const processedArtworks = useMemo(() => {
    return artworks.map((artwork) => ({
      ...artwork,
      url: imageUrl(artwork.image),
    }));
  }, [artworks]);

  // Filter artworks based on selected category
  const filteredArtworks = useMemo(() => {
    if (!selectedFilter) return processedArtworks;
    return processedArtworks.filter(
      (artwork) => artwork.category === selectedFilter,
    );
  }, [processedArtworks, selectedFilter]);

  const handleFilter = (filterType: string | null) => {
    setSelectedFilter(filterType);
    
    // Update URL with filter
    const params = new URLSearchParams(searchParams);
    if (filterType) {
      params.set("category", filterType);
    } else {
      params.delete("category");
    }
    // Keep artwork param if it exists
    const newUrl = params.toString() ? `/artworks?${params.toString()}` : '/artworks';
    router.push(newUrl, { scroll: false });
  };

  const openModal = (artwork: Artwork & { url: string }) => {
    setSelectedArtwork(artwork);
    setCurrentDetailIndex(0);
    
    // Update URL with artwork
    const params = new URLSearchParams(searchParams);
    const artworkSlug = generateSlug(artwork.title);
    params.set("artwork", artworkSlug);
    router.push(`/artworks?${params.toString()}`, { scroll: false });
  };

  const closeModal = () => {
    setSelectedArtwork(null);
    
    // Remove artwork from URL, keep category
    const params = new URLSearchParams(searchParams);
    params.delete("artwork");
    const newUrl = params.toString() ? `/artworks?${params.toString()}` : '/artworks';
    router.push(newUrl, { scroll: false });
  };

  const goToPrevious = () => {
    setCurrentDetailIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : getDetailImageUrls().length - 1,
    );
  };

  const goToNext = () => {
    setCurrentDetailIndex((nextIndex) =>
      nextIndex < getDetailImageUrls().length - 1 ? nextIndex + 1 : 0,
    );
  };

  const getDetailImageUrls = () => {
    const urls: string[] = [];
    if (selectedArtwork) {
      urls.push(imageUrl(selectedArtwork.image));
      if (selectedArtwork.details && Array.isArray(selectedArtwork.details)) {
        selectedArtwork.details.forEach((detail) => {
          urls.push(imageUrl(detail));
        });
      }
    }
    return urls;
  };

  return (
    <div>
      <Filter onFilter={handleFilter} selectedFilter={selectedFilter} />

      <div className="artworkgallery-wrapper">
        {filteredArtworks.map((artwork, index) => (
          <div
            className="artworkgallery"
            key={artwork.id || index}
            onClick={() => openModal(artwork as Artwork & { url: string })}
          >
            <img
              src={(artwork as Artwork & { url: string }).url}
              alt={artwork.title}
              loading="lazy"
            />
            <div className="overlay">{artwork.title}</div>
          </div>
        ))}
      </div>

      {filteredArtworks.length === 0 && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#001125" }}>
          No artworks found for the selected category.
        </div>
      )}

      <Popup
        selectedArtwork={selectedArtwork}
        closeModal={closeModal}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
        getDetailImageUrls={getDetailImageUrls}
        currentDetailIndex={currentDetailIndex}
      />
    </div>
  );
}
