import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Business Acquisitions | M&A for SaaS, Apps & Tech Companies",
  description: "We acquire profitable SaaS platforms, mobile apps, and tech businesses. Get a confidential valuation and explore your exit options with experienced operators who understand your journey.",
  keywords: [
    "Tech Business Acquisition",
    "SaaS Acquisition", 
    "Mobile App Acquisition",
    "Tech M&A",
    "Business Valuation",
    "Sell SaaS Business",
    "Tech Exit Strategy",
    "Software Acquisition",
    "App Business Sale",
    "Tech Company Buyer"
  ],
  openGraph: {
    title: "Tech Business Acquisitions | M&A for SaaS, Apps & Tech Companies",
    description: "We acquire profitable SaaS platforms, mobile apps, and tech businesses. Get a confidential valuation and explore your exit options with experienced operators.",
    type: "website",
    url: "/ma",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
