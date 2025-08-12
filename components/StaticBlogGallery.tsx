import React from "react";
import Link from "next/link";
import { generateSlug, formatDate } from "@/lib/utils";
import { imageUrl } from "@/lib/utils";
import type { Post } from "@/lib/db/schema";
import Image from "next/image";

interface StaticBlogGalleryProps {
  posts: Post[];
}

export default function StaticBlogGallery({ posts }: StaticBlogGalleryProps) {
  if (!posts || posts.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#001125" }}>
        No blog posts found.
      </div>
    );
  }

  return (
    <div className="blog-gallery-wrapper">
      {posts.map((post) => (
        <Link href={`/blog/${generateSlug(post.title)}`} key={post.id}>
          <div className="blog-gallery">
            <div className="blog-image-container">
              <Image
                src={imageUrl(post.bannerImage)}
                alt={post.title}
                loading="lazy"
              />
              <div className="blog-overlay">{post.title}</div>
            </div>
            <div className="blog-info">
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-date">{formatDate(post.publishedAt)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
