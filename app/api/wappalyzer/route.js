import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    let { website } = body;

    if (!website) {
      return NextResponse.json(
        { error: "Website URL is required" },
        { status: 400 }
      );
    }

    if (typeof website === "string") {
      website = website.trim();
    }

    // Basic URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(website)) {
      return NextResponse.json(
        {
          error: `'${website}' is not a valid URL. Please include http:// or https://`,
        },
        { status: 400 }
      );
    }

    // For demo purposes, return mock data since wappalyzer requires puppeteer setup
    const mockTechnologies = [
      {
        name: "React",
        slug: "react",
        icon: "React.svg",
        description: "A JavaScript library for building user interfaces",
        categories: [{ name: "JavaScript frameworks", id: 12 }],
        confidence: 100,
      },
      {
        name: "Next.js",
        slug: "nextjs",
        icon: "Next.js.svg",
        description: "The React framework for production",
        categories: [{ name: "Web frameworks", id: 18 }],
        confidence: 95,
      },
      {
        name: "Tailwind CSS",
        slug: "tailwind-css",
        icon: "Tailwind CSS.svg",
        description: "A utility-first CSS framework",
        categories: [{ name: "UI frameworks", id: 66 }],
        confidence: 90,
      },
      {
        name: "Vercel",
        slug: "vercel",
        icon: "Vercel.svg",
        description: "Cloud platform for static sites and serverless functions",
        categories: [{ name: "PaaS", id: 73 }],
        confidence: 85,
      },
      {
        name: "TypeScript",
        slug: "typescript",
        icon: "TypeScript.svg",
        description:
          "Typed superset of JavaScript that compiles to plain JavaScript",
        categories: [{ name: "Programming languages", id: 27 }],
        confidence: 88,
      },
      {
        name: "Custom Framework",
        slug: "custom-framework",
        icon: "NonExistent.svg", // This will trigger our fallback
        description: "A custom framework that will show fallback icon",
        categories: [{ name: "Custom solutions", id: 99 }],
        confidence: 75,
      },
    ];

    const categories = Array.from(
      new Set(
        mockTechnologies.flatMap((t) => t.categories.map((cat) => cat.name))
      )
    );

    const description = `This website leverages modern web technologies including ${categories
      .slice(0, 3)
      .join(
        ", "
      )}, providing a robust and scalable foundation for web applications.`;

    return NextResponse.json({
      technologies: mockTechnologies,
      categories,
      description,
      url: website,
    });
  } catch (error) {
    console.error("Wappalyzer API error:", error);
    return NextResponse.json(
      { error: "Internal server error during analysis" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}
