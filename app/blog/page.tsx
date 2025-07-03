import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPosts, formatPostDate, type GhostPost } from "@/lib/ghost";
import { createLogger } from "@/lib/utils";

const log = createLogger("blog-listing");

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest blog posts and articles",
  openGraph: {
    title: "Blog",
    description: "Latest blog posts and articles",
  },
};

export default async function BlogPage() {
  log.debug("🎯 BlogPage component called");

  try {
    const posts = await getPosts();
    log.info(
      { postCount: posts.length },
      "✅ Successfully fetched posts from Ghost CMS"
    );

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600">
            Latest insights, thoughts, and updates
          </p>
        </header>

        <div className="space-y-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blog posts found.</p>
            </div>
          ) : (
            posts.map((post: GhostPost) => (
              <article
                key={post.id}
                className="border-b border-gray-200 pb-8 last:border-b-0"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {post.feature_image && (
                    <div className="md:w-1/3">
                      <Link href={`/blog/${post.slug}`}>
                        <Image
                          src={post.feature_image}
                          alt={post.title || "Blog post"}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
                        />
                      </Link>
                    </div>
                  )}

                  <div className={post.feature_image ? "md:w-2/3" : "w-full"}>
                    <div className="mb-3">
                      {post.published_at && (
                        <time className="text-sm text-gray-500">
                          {formatPostDate(post.published_at)}
                        </time>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title || "Untitled"}
                      </Link>
                    </h2>

                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      Read more
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    );
  } catch (error) {
    log.error({ error }, "❌ Error fetching posts");

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        </header>

        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Unable to load blog posts. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
