import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/actions/blogs";
import { generateSlug, formatDate } from "@/lib/utils";
import type { Post } from "@/lib/db/schema";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // Revalidate every hour (ISR)

export async function generateStaticParams() {
  const posts = await getPosts();
  
  return posts.map((post) => ({
    slug: generateSlug(post.title),
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const imageCdnBaseUrl = "https://images.xuecong.art/";
  const imageUrl = `${imageCdnBaseUrl}${encodeURIComponent(post.bannerImage)}`;

  // Extract first 160 characters for description
  const description = post.content.replace(/<[^>]*>/g, '').substring(0, 160) + "...";

  return {
    title: `${post.title} - Xuecong Wang Blog`,
    description,
    openGraph: {
      title: `${post.title} - Xuecong Wang Blog`,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 800,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - Xuecong Wang Blog`,
      description,
      images: [imageUrl],
    },
  };
}

async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((post) => generateSlug(post.title) === slug) || null;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const imageCdnBaseUrl = "https://images.xuecong.art/";
  const bannerImageUrl = `${imageCdnBaseUrl}${encodeURIComponent(post.bannerImage)}`;

  return (
    <div className="blog-post-page">
      <article className="blog-post-container">
        <header className="blog-post-header">
          <img 
            src={bannerImageUrl} 
            alt={post.title} 
            className="blog-post-banner"
          />
          <div className="blog-post-meta">
            <h1 className="blog-post-title">{post.title}</h1>
            <p className="blog-post-date">{formatDate(post.publishedAt)}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="blog-post-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="blog-post-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>
        
        <div 
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}