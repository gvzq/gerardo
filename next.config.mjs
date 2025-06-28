/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export only for GitHub Pages deployment
  ...(process.env.DEPLOY_TARGET === "github-pages" && {
    output: "export",
    trailingSlash: true,
    // Add basePath if deploying to a subdirectory (uncomment and modify if needed)
    // basePath: "/your-repo-name",
  }),

  // Remove static export for production builds on Vercel
  // This allows serverless functions to work for dynamic page generation
  images: { unoptimized: true },

  // Disable server-side features only when building for GitHub Pages
  ...(process.env.DEPLOY_TARGET === "github-pages" && {
    // Ensure no server-side features are used in static export
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
  }),
};

export default nextConfig;
