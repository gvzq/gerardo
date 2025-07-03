/** @type {import('next').NextConfig} */
const nextConfig = {
  // Always unoptimize images for both GitHub Pages and Vercel
  images: { unoptimized: true },

  // Pino external packages configuration (moved from experimental in Next.js 15+)
  serverExternalPackages: ["pino", "pino-pretty"],

  // Enable static export only for GitHub Pages deployment
  ...(process.env.DEPLOY_TARGET === "github-pages" && {
    output: "export",
    trailingSlash: true,
    // Add basePath if deploying to a subdirectory (uncomment and modify if needed)
    // basePath: "/your-repo-name",
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
  }),
};

export default nextConfig;
