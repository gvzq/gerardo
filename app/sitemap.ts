import type { MetadataRoute } from "next";
import { getPages, getPosts, isSlugConflict } from "@/lib/ghost";
import { createLogger } from "@/lib/utils";

const log = createLogger("sitemap");

// Force dynamic evaluation - don't cache this sitemap
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || "https://www.fctolabs.com";

  // Static routes - only main domain
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/appointment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    // Dynamic Ghost CMS pages (excluding conflicting routes and blog posts)
    const ghostPages = await getPages();
    const pageRoutes: MetadataRoute.Sitemap = ghostPages
      .filter((page) => !isSlugConflict(page.slug)) // Exclude conflicting routes
      .map((page) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: page.updated_at ? new Date(page.updated_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));

    // Dynamic blog posts
    const ghostPosts = await getPosts();
    const blogRoutes: MetadataRoute.Sitemap = ghostPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...pageRoutes, ...blogRoutes];
  } catch (error) {
    log.error({ error }, "Error fetching Ghost content for sitemap");
    // Return only static routes if Ghost CMS is unavailable
    return staticRoutes;
  }
}
