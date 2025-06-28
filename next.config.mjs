/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages deployment
  ...(process.env.DEPLOY_TARGET === "github-pages" && {
    output: "export",
    trailingSlash: true,
    // Add basePath if deploying to a subdirectory (uncomment and modify if needed)
    // basePath: "/your-repo-name",
  }),

  // Keep existing production export for backward compatibility
  ...(process.env.NODE_ENV === "production" &&
    process.env.DEPLOY_TARGET !== "github-pages" && {
      output: "export",
    }),

  images: { unoptimized: true },

  // Disable server-side features when building for GitHub Pages
  ...(process.env.DEPLOY_TARGET === "github-pages" && {
    // Ensure no server-side features are used in static export
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
  }),
};

export default nextConfig;
