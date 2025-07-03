import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || "https://www.fctolabs.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/ghost/", "/_next/", "/private/"],
      },
      // Block all subdomains - only allow main domain
      {
        userAgent: "*",
        disallow: "/",
        // This will apply to subdomains when they serve this robots.txt
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    // Additional directive to explicitly block common admin interfaces
    host: baseUrl,
  };
}
