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

    // First get technology analysis
    const techResponse = await fetch("http://localhost:3000/api/wappalyzer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ website }),
    });

    if (!techResponse.ok) {
      throw new Error("Failed to analyze technologies");
    }

    const techData = await techResponse.json();

    // Enhance with AI insights (mock for now since we don't have Cohere setup)
    const categories = techData.categories || [];
    const aiDescription = generateTechInsights(
      website,
      categories,
      techData.technologies
    );

    return NextResponse.json({
      ...techData,
      description: aiDescription,
      insights: generateRecommendations(techData.technologies),
      analysisDate: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Analysis API error:", error);
    return NextResponse.json(
      { error: "Internal server error during analysis" },
      { status: 500 }
    );
  }
}

function generateTechInsights(website, categories, technologies) {
  const techNames = technologies.map((t) => t.name).slice(0, 4);
  const domain = new URL(website).hostname;

  const insights = [
    `${domain} appears to be built with modern web technologies`,
    `Key technologies include ${techNames.slice(0, 2).join(" and ")}`,
    categories.length > 0
      ? `Technology stack spans ${categories.length} different categories`
      : "",
    "This suggests a well-architected, scalable web application",
  ].filter(Boolean);

  return insights.join(". ") + ".";
}

function generateRecommendations(technologies) {
  const recommendations = [];

  const hasReact = technologies.some((t) =>
    t.name.toLowerCase().includes("react")
  );
  const hasNextjs = technologies.some((t) =>
    t.name.toLowerCase().includes("next")
  );
  const hasTailwind = technologies.some((t) =>
    t.name.toLowerCase().includes("tailwind")
  );

  if (hasReact && !hasNextjs) {
    recommendations.push({
      type: "Framework Enhancement",
      suggestion:
        "Consider upgrading to Next.js for better performance and SEO",
      impact: "High",
    });
  }

  if (!hasTailwind && hasReact) {
    recommendations.push({
      type: "Styling Optimization",
      suggestion:
        "Tailwind CSS could improve development speed and design consistency",
      impact: "Medium",
    });
  }

  recommendations.push({
    type: "Performance",
    suggestion: "Implement proper caching strategies and image optimization",
    impact: "High",
  });

  return recommendations;
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}
