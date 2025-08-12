import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function imageUrl(key: string): string {
  const baseUrl = process.env.R2_BUCKET_URL || "https://images.xuecong.art";
  return `${baseUrl}/${encodeURIComponent(key)}`;
}

export function processImageUrls(content: string): string {
  if (!content) return content;
  
  const baseUrl = process.env.R2_BUCKET_URL || "https://images.xuecong.art";
  
  // Replace relative image URLs (just filenames) with full R2 URLs
  return content.replace(
    /<img([^>]*)\ssrc="([^"]*)"([^>]*)>/g,
    (match, beforeSrc, src, afterSrc) => {
      // If src is already a full URL (starts with http/https), leave it as is
      if (src.startsWith('http://') || src.startsWith('https://')) {
        return match;
      }
      
      // If it's a relative URL (just filename), convert to R2 URL
      const fullUrl = `${baseUrl}/${encodeURIComponent(src)}`;
      return `<img${beforeSrc} src="${fullUrl}"${afterSrc}>`;
    }
  );
}
