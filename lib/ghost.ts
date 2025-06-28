import GhostContentAPI from "@tryghost/content-api";

// Type definitions for Ghost Content API
interface GhostPage {
  id: string;
  title?: string | null;
  slug: string;
  html?: string | null;
  published_at?: string | null;
  updated_at?: string | null;
  excerpt?: string | null;
  feature_image?: string | null;
}

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: process.env.GHOST_URL || "https://demo.ghost.io",
  key: process.env.GHOST_CONTENT_API_KEY || "22444f78447824223cefc48062",
  version: "v5.0",
});

// Get all pages from Ghost
export async function getPages(): Promise<GhostPage[]> {
  return await api.pages
    .browse({
      limit: "all",
    })
    .catch((err: any) => {
      console.error(err);
      return [];
    });
}

// Get a single page by slug
export async function getSinglePage(
  pageSlug: string
): Promise<GhostPage | null> {
  return await api.pages
    .read({
      slug: pageSlug,
    })
    .catch((err: any) => {
      console.error(err);
      return null;
    });
}

// Check if a slug conflicts with existing Next.js routes
export function isSlugConflict(slug: string) {
  const existingRoutes = ["about", "appointment", "consulting", "api"];

  return existingRoutes.includes(slug);
}

// Get pages that don't conflict with existing routes
export async function getNonConflictingPages(): Promise<GhostPage[]> {
  const pages = await getPages();

  const nonConflictingPages = pages.filter((page: GhostPage) => {
    const hasConflict = isSlugConflict(page.slug);
    return !hasConflict;
  });

  return nonConflictingPages;
}
