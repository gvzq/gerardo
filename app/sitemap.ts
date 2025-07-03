import type { MetadataRoute } from "next";
import { getPages, isSlugConflict } from "@/lib/ghost";

// Force dynamic evaluation - don't cache this sitemap
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || "https://www.fctolabs.com";

  // Static routes
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
      url: `${baseUrl}/consulting`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/appointment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic Ghost CMS pages
  try {
    const ghostPages = await getPages();

    const dynamicRoutes: MetadataRoute.Sitemap = ghostPages
      .filter((page) => !isSlugConflict(page.slug)) // Exclude conflicting routes
      .map((page) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: page.updated_at ? new Date(page.updated_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error("Error fetching Ghost pages for sitemap:", error);
    // Return only static routes if Ghost CMS is unavailable
    return staticRoutes;
  }
}
