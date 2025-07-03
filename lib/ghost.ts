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

// Use the same interface for posts since Ghost returns the same structure
export type GhostPost = {
  id: string;
  title?: string | null;
  slug: string;
  html?: string | null;
  published_at?: string | null;
  updated_at?: string | null;
  excerpt?: string | null;
  feature_image?: string | null;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
    description?: string | null;
  }>;
  authors?: Array<{
    id: string;
    name: string;
    slug: string;
    bio?: string | null;
    profile_image?: string | null;
  }>;
};

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
  const existingRoutes = ["about", "appointment", "consulting", "api", "blog"];

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

// Get all posts from Ghost
export async function getPosts(): Promise<GhostPost[]> {
  return (await api.posts
    .browse({
      limit: "all",
    })
    .catch((err: any) => {
      console.error(err);
      return [];
    })) as GhostPost[];
}

// Get a single post by slug
export async function getSinglePost(
  postSlug: string
): Promise<GhostPost | null> {
  return (await api.posts
    .read({
      slug: postSlug,
    })
    .catch((err: any) => {
      console.error(err);
      return null;
    })) as GhostPost | null;
}

// Format post date
export function formatPostDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
}
