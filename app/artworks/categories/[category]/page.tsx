import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb, artworks } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getCloudflareContext } from "@opennextjs/cloudflare";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export const revalidate = 3600; // Revalidate every hour (ISR)

const validCategories = ["painting", "sculpture", "installation", "other"];

export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = resolvedParams.category;
  
  if (!validCategories.includes(category)) {
    return {
      title: "Category Not Found",
    };
  }

  const categoryDisplayName = category.charAt(0).toUpperCase() + category.slice(1);
  
  return {
    title: `${categoryDisplayName} Artworks - Xuecong Wang`,
    description: `Browse ${categoryDisplayName.toLowerCase()} artworks by artist Xuecong Wang`,
    openGraph: {
      title: `${categoryDisplayName} Artworks - Xuecong Wang`,
      description: `Browse ${categoryDisplayName.toLowerCase()} artworks by artist Xuecong Wang`,
    },
  };
}

async function getArtworksByCategory(category: string) {
  try {
    const { env } = getCloudflareContext();
    const db = getDb(env.DB);
    
    const categoryArtworks = await db
      .select()
      .from(artworks)
      .where(eq(artworks.category, category as "painting" | "sculpture" | "installation" | "other"))
      .all();
      
    return categoryArtworks;
  } catch (error) {
    console.error("Error fetching artworks by category:", error);
    return [];
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = resolvedParams.category;

  if (!validCategories.includes(category)) {
    notFound();
  }

  const categoryArtworks = await getArtworksByCategory(category);
  const categoryDisplayName = category.charAt(0).toUpperCase() + category.slice(1);
  
  const getCategoryNameInChinese = (cat: string) => {
    switch (cat) {
      case "painting": return "绘画";
      case "sculpture": return "雕塑"; 
      case "installation": return "装置";
      case "other": return "其他";
      default: return "";
    }
  };

  return (
    <div className="category-page">
      <div className="blog-header-wrapper">
        <div className="header">
          {categoryDisplayName} <span className="headersc">{getCategoryNameInChinese(category)}</span>
        </div>
      </div>
      
      <div className="artworkgallery-wrapper">
        {categoryArtworks.map((artwork, index) => {
          const imageCdnBaseUrl = "https://images.xuecong.art/";
          const imageUrl = `${imageCdnBaseUrl}${encodeURIComponent(artwork.image)}`;
          
          return (
            <div
              className="artworkgallery"
              key={index}
            >
              <img src={imageUrl} alt={artwork.title} loading="lazy" />
              <div className="overlay">{artwork.title}</div>
            </div>
          );
        })}
      </div>
      
      {categoryArtworks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#001125' }}>
          No {category} artworks found.
        </div>
      )}
    </div>
  );
}