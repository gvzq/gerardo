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

// Generate static params for all non-conflicting Ghost pages
export async function generateStaticParams() {
  try {
    const pages = await getNonConflictingPages();
    console.log(
      "Generated static params for pages:",
      pages.map((p) => p.slug)
    );
    return pages.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;

  // Skip if slug conflicts with existing routes
  if (isSlugConflict(slug)) {
    return {
      title: "Page Not Found",
    };
  }

  try {
    const page = await getSinglePage(slug);

    if (!page) {
      return {
        title: "Page Not Found",
      };
    }

    return {
      title: page.title || "Ghost Page",
      description: page.excerpt || `${page.title || "Ghost Page"} - Ghost Page`,
      openGraph: {
        title: page.title || "Ghost Page",
        description:
          page.excerpt || `${page.title || "Ghost Page"} - Ghost Page`,
        images: page.feature_image ? [page.feature_image] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Page Not Found",
    };
  }
}

export default async function GhostPage({ params }: PageProps) {
  const { slug } = params;

  // Skip if slug conflicts with existing routes
  if (isSlugConflict(slug)) {
    console.log(`Slug "${slug}" conflicts with existing routes`);
    notFound();
  }

  try {
    const page = await getSinglePage(slug);

    if (!page) {
      console.log(`Page with slug "${slug}" not found in Ghost CMS`);
      notFound();
    }

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
    console.error("Error fetching Ghost page:", error);
    notFound();
  }
}
