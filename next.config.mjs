/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use export for production builds
  ...(process.env.NODE_ENV === "production" && { output: "export" }),
  images: { unoptimized: true },
};

export default nextConfig;
