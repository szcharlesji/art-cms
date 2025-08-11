"use server"

import { getCloudflareContext } from "@opennextjs/cloudflare";

export type FileItem = {
  key: string;
  size: number;
  lastModified: Date;
  type: 'image' | 'other';
};

export async function getFiles(): Promise<FileItem[]> {
  try {
    const { env } = getCloudflareContext();
    
    // List objects in R2 bucket
    const objects = await env.BUCKET.list();
    
    return objects.objects.map(obj => ({
      key: obj.key,
      size: obj.size,
      lastModified: obj.uploaded,
      type: isImageFile(obj.key) ? 'image' : 'other'
    }));
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
}

function isImageFile(filename: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return imageExtensions.includes(extension);
}