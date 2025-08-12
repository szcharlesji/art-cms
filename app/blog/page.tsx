import { Metadata } from "next";
import { getPosts } from "@/lib/actions/blogs";
import StaticBlogGallery from "@/components/StaticBlogGallery";

export const metadata: Metadata = {
  title: "Blog - Xuecong Wang",
  description: "Read the latest blog posts by artist Xuecong Wang",
  openGraph: {
    title: "Blog - Xuecong Wang",
    description: "Read the latest blog posts by artist Xuecong Wang",
  },
};

export const revalidate = 3600; // Revalidate every hour (ISR)
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="blog-header-wrapper">
        <div className="header">
          Blog <span className="headersc">博客</span>
        </div>
      </div>
      <StaticBlogGallery posts={posts} />
    </div>
  );
}
