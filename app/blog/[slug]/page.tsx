import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSinglePost, getPosts, formatPostDate } from "@/lib/ghost";
import { createLogger } from "@/lib/utils";

const log = createLogger("blog-post");
import NewsletterSignup from "@/components/newsletter-signup";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for static builds
export async function generateStaticParams() {
  log.debug("🚀 generateStaticParams called for blog posts");

  // Only generate static params for GitHub Pages deployment
  if (process.env.DEPLOY_TARGET === "github-pages") {
    log.info(
      "📦 Building for GitHub Pages - generating static params for blog posts"
    );
    try {
      const posts = await getPosts();
      const staticParams = posts.map((post) => ({
        slug: post.slug,
      }));

      log.info({ staticParams }, "✅ Generated static params for blog posts");
      return staticParams;
    } catch (error) {
      log.error({ error }, "❌ Error generating static params for blog posts");
      return [];
    }
  }

  // For Vercel deployment, return empty array to enable dynamic generation
  log.debug(
    "⚡ Building for Vercel - enabling dynamic generation for blog posts"
  );
  return [];
}

// Enable dynamic params for Vercel deployment
export const dynamicParams = true;

// Generate metadata for the blog post
export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  log.debug({ slug }, "🎯 generateMetadata called for blog post");

  try {
    const post = await getSinglePost(slug);

    if (!post) {
      log.warn(
        { slug },
        "❌ Blog post not found in Ghost CMS - returning 404 metadata"
      );
      return {
        title: "Post Not Found",
      };
    }

    const metadata = {
      title: post.title || "Blog Post",
      description: post.excerpt || `${post.title || "Blog Post"} - Blog`,
      openGraph: {
        title: post.title || "Blog Post",
        description: post.excerpt || `${post.title || "Blog Post"} - Blog`,
        images: post.feature_image ? [post.feature_image] : [],
        type: "article",
        publishedTime: post.published_at || undefined,
      },
    };

    log.info({ slug, metadata }, "✅ Generated metadata for blog post");
    return metadata;
  } catch (error) {
    log.error({ slug, error }, "❌ Error generating metadata for blog post");
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  log.debug({ slug }, "🎯 BlogPostPage component called");

  try {
    const post = await getSinglePost(slug);

    if (!post) {
      log.warn(
        { slug },
        "❌ Blog post not found in Ghost CMS - calling notFound()"
      );
      notFound();
    }

    log.info(
      {
        slug,
        title: post.title,
        hasFeatureImage: !!post.feature_image,
        hasHtml: !!post.html,
        htmlLength: post.html?.length || 0,
      },
      "✅ Successfully rendering blog post"
    );

    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Back to blog link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg
              className="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Feature image */}
        {post.feature_image && (
          <div className="mb-8">
            <Image
              src={post.feature_image}
              alt={post.title || "Blog post"}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Article header */}
        <header className="mb-8">
          <div className="mb-4">
            {post.published_at && (
              <time className="text-sm text-gray-500">
                {formatPostDate(post.published_at)}
              </time>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title || "Untitled"}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Article content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="gh-content"
            dangerouslySetInnerHTML={{ __html: post.html || "" }}
          />
        </div>

        {/* Newsletter signup */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <NewsletterSignup />
        </div>

        {/* Back to blog link at bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg
              className="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>
    );
  } catch (error) {
    log.error({ slug, error }, "❌ Error rendering blog post");
    notFound();
  }
}
