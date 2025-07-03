import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getSinglePage,
  getNonConflictingPages,
  isSlugConflict,
} from "@/lib/ghost";
import { createLogger } from "@/lib/utils";
import NewsletterSignup from "@/components/newsletter-signup";

const log = createLogger("ghost-page");

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params only for static builds (GitHub Pages)
// For Vercel, allow dynamic generation
export async function generateStaticParams() {
  log.debug("🚀 generateStaticParams called");
  log.debug(
    {
      DEPLOY_TARGET: process.env.DEPLOY_TARGET,
      NODE_ENV: process.env.NODE_ENV,
      GHOST_URL: process.env.GHOST_URL,
      hasGhostKey: !!process.env.GHOST_CONTENT_API_KEY,
    },
    "Environment variables"
  );

  // Only generate static params for GitHub Pages deployment
  if (process.env.DEPLOY_TARGET === "github-pages") {
    log.info("📦 Building for GitHub Pages - generating static params");
    try {
      const pages = await getNonConflictingPages();
      const staticParams = pages.map((page) => ({
        slug: page.slug,
      }));

      log.info({ staticParams }, "✅ Generated static params for GitHub Pages");
      return staticParams;
    } catch (error) {
      log.error(
        { error },
        "❌ Error generating static params for GitHub Pages"
      );
      return [];
    }
  }

  // For Vercel deployment, return empty array to enable dynamic generation
  log.debug(
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
  const { slug } = await params;
  log.debug({ slug }, "🎯 generateMetadata called");

  // Skip if slug conflicts with existing routes
  if (isSlugConflict(slug)) {
    log.warn(
      { slug },
      "⚠️ Slug conflicts with existing routes - returning 404 metadata"
    );
    return {
      title: "Page Not Found",
    };
  }

  try {
    const page = await getSinglePage(slug);

    if (!page) {
      log.warn(
        { slug },
        "❌ Page not found in Ghost CMS - returning 404 metadata"
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

    log.info({ slug, metadata }, "✅ Generated metadata");
    return metadata;
  } catch (error) {
    log.error({ slug, error }, "❌ Error generating metadata");
    return {
      title: "Page Not Found",
    };
  }
}

export default async function GhostPage({ params }: PageProps) {
  const { slug } = await params;
  log.debug({ slug }, "🎯 GhostPage component called");

  // Skip if slug conflicts with existing routes
  if (isSlugConflict(slug)) {
    log.warn(
      { slug },
      "⚠️ Slug conflicts with existing routes - calling notFound()"
    );
    notFound();
  }

  try {
    const page = await getSinglePage(slug);

    if (!page) {
      log.warn({ slug }, "❌ Page not found in Ghost CMS - calling notFound()");
      notFound();
    }

    log.info(
      {
        slug,
        title: page.title,
        hasFeatureImage: !!page.feature_image,
        hasHtml: !!page.html,
        htmlLength: page.html?.length || 0,
      },
      "✅ Successfully rendering page"
    );

    return (
      <article className="gh-article post">
        {page.feature_image && (
          <div className="gh-article-image">
            <Image
              src={page.feature_image}
              alt={page.title || "Untitled"}
              width={800}
              height={256}
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
    log.error({ slug, error }, "❌ Error rendering Ghost page");
    notFound();
  }
}
