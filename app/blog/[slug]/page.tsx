import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSinglePost, getPosts, formatPostDate } from "@/lib/ghost";
import NewsletterSignup from "@/components/newsletter-signup";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for static builds
export async function generateStaticParams() {
  console.log("🚀 generateStaticParams called for blog posts");

  // Only generate static params for GitHub Pages deployment
  if (process.env.DEPLOY_TARGET === "github-pages") {
    console.log(
      "📦 Building for GitHub Pages - generating static params for blog posts"
    );
    try {
      const posts = await getPosts();
      const staticParams = posts.map((post) => ({
        slug: post.slug,
      }));

      console.log("✅ Generated static params for blog posts:", staticParams);
      return staticParams;
    } catch (error) {
      console.error("❌ Error generating static params for blog posts:", error);
      return [];
    }
  }

  // For Vercel deployment, return empty array to enable dynamic generation
  console.log(
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
  console.log(`🎯 generateMetadata called for blog post: "${slug}"`);

  try {
    const post = await getSinglePost(slug);

    if (!post) {
      console.log(
        `❌ Blog post with slug "${slug}" not found in Ghost CMS - returning 404 metadata`
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

    console.log(`✅ Generated metadata for blog post "${slug}":`, metadata);
    return metadata;
  } catch (error) {
    console.error(
      `❌ Error generating metadata for blog post "${slug}":`,
      error
    );
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  console.log(`🎯 BlogPostPage component called for slug: "${slug}"`);

  try {
    const post = await getSinglePost(slug);

    if (!post) {
      console.log(
        `❌ Blog post with slug "${slug}" not found in Ghost CMS - calling notFound()`
      );
      notFound();
    }

    console.log(`✅ Successfully rendering blog post "${slug}":`, {
      title: post.title,
      hasFeatureImage: !!post.feature_image,
      hasHtml: !!post.html,
      htmlLength: post.html?.length || 0,
    });

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
    console.error(`❌ Error rendering blog post "${slug}":`, error);
    notFound();
  }
}
