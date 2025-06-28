import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getSinglePage,
  getNonConflictingPages,
  isSlugConflict,
} from "@/lib/ghost";
import NewsletterSignup from "@/components/newsletter-signup";

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params only for static builds (GitHub Pages)
// For Vercel, allow dynamic generation
export async function generateStaticParams() {
  console.log("🚀 generateStaticParams called");
  console.log("Environment variables:", {
    DEPLOY_TARGET: process.env.DEPLOY_TARGET,
    NODE_ENV: process.env.NODE_ENV,
    GHOST_URL: process.env.GHOST_URL,
    hasGhostKey: !!process.env.GHOST_CONTENT_API_KEY,
  });

  // Only generate static params for GitHub Pages deployment
  if (process.env.DEPLOY_TARGET === "github-pages") {
    console.log("📦 Building for GitHub Pages - generating static params");
    try {
      const pages = await getNonConflictingPages();
      const staticParams = pages.map((page) => ({
        slug: page.slug,
      }));

      console.log("✅ Generated static params for GitHub Pages:", staticParams);
      return staticParams;
    } catch (error) {
      console.error(
        "❌ Error generating static params for GitHub Pages:",
        error
      );
      return [];
    }
  }

  // For Vercel deployment, return empty array to enable dynamic generation
  console.log(
    "⚡ Building for Vercel - enabling dynamic generation (no static params)"
  );
  return [];
}

// Enable dynamic params for Vercel deployment
export const dynamicParams = true;

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  console.log(`🎯 generateMetadata called for slug: "${params.slug}"`);

  const { slug } = params;

  // Skip if slug conflicts with existing routes
  if (isSlugConflict(slug)) {
    console.log(
      `⚠️ Slug "${slug}" conflicts with existing routes - returning 404 metadata`
    );
    return {
      title: "Page Not Found",
    };
  }

  try {
    const page = await getSinglePage(slug);

    if (!page) {
      console.log(
        `❌ Page with slug "${slug}" not found in Ghost CMS - returning 404 metadata`
      );
      return {
        title: "Page Not Found",
      };
    }

    const metadata = {
      title: page.title || "Ghost Page",
      description: page.excerpt || `${page.title || "Ghost Page"} - Ghost Page`,
      openGraph: {
        title: page.title || "Ghost Page",
        description:
          page.excerpt || `${page.title || "Ghost Page"} - Ghost Page`,
        images: page.feature_image ? [page.feature_image] : [],
      },
    };

    console.log(`✅ Generated metadata for "${slug}":`, metadata);
    return metadata;
  } catch (error) {
    console.error(`❌ Error generating metadata for "${slug}":`, error);
    return {
      title: "Page Not Found",
    };
  }
}

export default async function GhostPage({ params }: PageProps) {
  console.log(`🎯 GhostPage component called for slug: "${params.slug}"`);

  const { slug } = params;

  // Skip if slug conflicts with existing routes
  if (isSlugConflict(slug)) {
    console.log(
      `⚠️ Slug "${slug}" conflicts with existing routes - calling notFound()`
    );
    notFound();
  }

  try {
    const page = await getSinglePage(slug);

    if (!page) {
      console.log(
        `❌ Page with slug "${slug}" not found in Ghost CMS - calling notFound()`
      );
      notFound();
    }

    console.log(`✅ Successfully rendering page "${slug}":`, {
      title: page.title,
      hasFeatureImage: !!page.feature_image,
      hasHtml: !!page.html,
      htmlLength: page.html?.length || 0,
    });

    return (
      <article className="gh-article post">
        {page.feature_image && (
          <div className="gh-article-image">
            <img
              src={page.feature_image}
              alt={page.title || "Untitled"}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        <header className="gh-article-header gh-canvas">
          <h1 className="gh-article-title">{page.title || "Untitled"}</h1>
        </header>

        <div className="gh-content gh-canvas">
          <div dangerouslySetInnerHTML={{ __html: page.html || "" }} />
          <NewsletterSignup />
        </div>
      </article>
    );
  } catch (error) {
    console.error(`❌ Error rendering Ghost page "${slug}":`, error);
    notFound();
  }
}
