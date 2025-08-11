"use client";

import React, { useState, useMemo, useEffect } from "react";
import Popup from "./Popup";
import Filter from "./Filter";
import type { Artwork } from "@/lib/db/schema";

interface StaticArtworkGalleryProps {
  artworks: Artwork[];
}

export default function StaticArtworkGallery({ artworks }: StaticArtworkGalleryProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentDetailIndex, setCurrentDetailIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  
  const imageCdnBaseUrl = "https://images.xuecong.art/";

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

  // Pre-process artworks with image URLs
  const processedArtworks = useMemo(() => {
    return artworks.map((artwork) => ({
      ...artwork,
      url: `${imageCdnBaseUrl}${encodeURIComponent(artwork.image)}`,
    }));
  }, [artworks, imageCdnBaseUrl]);

  // Filter artworks based on selected category
  const filteredArtworks = useMemo(() => {
    if (!selectedFilter) return processedArtworks;
    return processedArtworks.filter(artwork => artwork.category === selectedFilter);
  }, [processedArtworks, selectedFilter]);

  const handleFilter = (filterType: string | null) => {
    setSelectedFilter(filterType);
  };

  const openModal = (artwork: Artwork & { url: string }) => {
    setSelectedArtwork(artwork);
    setCurrentDetailIndex(0);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
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
      urls.push((selectedArtwork as Artwork & { url: string }).url);
      if (selectedArtwork.details && Array.isArray(selectedArtwork.details)) {
        selectedArtwork.details.forEach((detail) => {
          urls.push(`${imageCdnBaseUrl}${encodeURIComponent(detail)}`);
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
            <img src={(artwork as Artwork & { url: string }).url} alt={artwork.title} loading="lazy" />
            <div className="overlay">{artwork.title}</div>
          </div>
        ))}
      </div>

      {filteredArtworks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#001125' }}>
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