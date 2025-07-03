import { createAnthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";
import WebAppAnalyzer from "./webappanalyzer.js";

// Configure Anthropic client with custom environment variable
const anthropic = createAnthropic({
  apiKey: process.env.CLAUDE_KEY || process.env.ANTHROPIC_API_KEY,
});

// Type definitions
export interface Technology {
  name: string;
  slug: string;
  icon: string;
  description: string;
  categories: string[];
  confidence: number;
  website: string;
  bestPractices?: BestPractice[];
}

export interface BasicAnalysisResult {
  technologies: Technology[];
  categories: string[];
  description: string;
  url: string;
}

export interface BestPractice {
  title: string;
  suggestion: string;
  priority: "High" | "Medium" | "Low";
}

export interface TechnologyRecommendation {
  technology: string;
  practices: BestPractice[];
}

export interface Insight {
  type: string;
  suggestion: string;
  impact: "High" | "Medium" | "Low";
}

export interface EnhancedAnalysisResult extends BasicAnalysisResult {
  insights: Insight[];
  bestPractices: TechnologyRecommendation[];
  analysisDate: string;
}

// Simplified Zod schemas for AI generation - optimized for token efficiency
const SimpleBestPracticeSchema = z.object({
  title: z.string().min(1).describe("Brief practice title"),
  suggestion: z.string().min(1).describe("Concise actionable advice"),
  priority: z.enum(["High", "Medium", "Low"]).describe("Priority level"),
});

const SimpleTechnologyRecommendationSchema = z.object({
  technology: z.string().min(1).describe("Technology name"),
  practices: z
    .array(SimpleBestPracticeSchema)
    .min(1)
    .max(2)
    .describe("1-2 key practices for this technology"),
});

const SimpleBestPracticesResponseSchema = z.object({
  recommendations: z
    .array(SimpleTechnologyRecommendationSchema)
    .min(1)
    .describe("Best practices for detected technologies"),
});

const InsightSchema = z.object({
  type: z
    .string()
    .min(1)
    .describe("Type of insight (e.g., Performance, Security, SEO)"),
  suggestion: z
    .string()
    .min(1)
    .describe("Actionable suggestion or recommendation"),
  impact: z
    .enum(["High", "Medium", "Low"])
    .describe("Impact level of implementing this suggestion"),
});

const InsightsResponseSchema = z.object({
  insights: z
    .array(InsightSchema)
    .min(1)
    .max(3)
    .describe("Key insights and recommendations for the website"),
});

// Initialize analyzer instance (singleton pattern)
let analyzer: WebAppAnalyzer | null = null;

function getAnalyzer(): WebAppAnalyzer {
  if (!analyzer) {
    analyzer = new WebAppAnalyzer();
  }
  return analyzer;
}

/**
 * Validates that the request is coming from the allowed domain
 * @returns {boolean} - True if request is from allowed domain, false otherwise
 */
function validateDomain(): boolean {
  const allowedDomain = process.env.NEXT_PUBLIC_DOMAIN;

  if (!allowedDomain) {
    console.error("NEXT_PUBLIC_DOMAIN environment variable is not set");
    return false;
  }

  // In server-side context, we need to check headers
  // This will be used in conjunction with server actions
  if (typeof window === "undefined") {
    // Server-side: Check if we're in a Next.js server context
    try {
      const { headers } = require("next/headers");
      const headersList = headers();
      const origin = headersList.get("origin") || headersList.get("referer");

      if (!origin) {
        return false;
      }

      const originUrl = new URL(origin);
      const allowedUrl = new URL(allowedDomain);

      return originUrl.hostname === allowedUrl.hostname;
    } catch (error) {
      // If headers() is not available, we'll rely on the server action validation
      return true;
    }
  }

  // Client-side: Check current domain
  return window.location.hostname === new URL(allowedDomain).hostname;
}

/**
 * Validates a website URL
 * @param {string} url - The URL to validate
 * @returns {string|null} - Error message if invalid, null if valid
 */
export function validateUrl(url: string): string | null {
  if (!url || typeof url !== "string") {
    return "Website URL is required";
  }

  const trimmedUrl = url.trim();
  if (!trimmedUrl) {
    return "Please enter a website URL";
  }

  const urlPattern = /^https?:\/\/.+\..+/;
  if (!urlPattern.test(trimmedUrl)) {
    return "Please enter a valid URL (include http:// or https://)";
  }

  return null;
}

/**
 * Performs basic technology analysis using WebAppAnalyzer
 * @param {string} website - The website URL to analyze
 * @returns {Promise<Object>} - Analysis result with technologies and categories
 */
export async function performBasicAnalysis(
  website: string
): Promise<BasicAnalysisResult> {
  // Validate domain access
  if (!validateDomain()) {
    throw new Error("Unauthorized: Access denied from this domain");
  }

  try {
    const analyzer = getAnalyzer();
    const result = await analyzer.analyzeWebsite(website);

    // Format the response to match the expected structure
    const technologies: Technology[] = result.technologies.map((tech: any) => ({
      name: tech.name,
      slug: tech.slug,
      icon: tech.icon,
      description: tech.description,
      categories: tech.categories,
      confidence: tech.confidence,
      website: tech.website,
    }));

    const categories: string[] = result.categories;

    const description =
      technologies.length > 0
        ? `This website uses ${
            technologies.length
          } detected technologies including ${categories
            .slice(0, 3)
            .join(", ")}, providing insights into its technical architecture.`
        : "No specific technologies were detected for this website.";

    return {
      technologies,
      categories,
      description,
      url: website,
    };
  } catch (error) {
    console.error("Basic analysis error:", error);

    // Return a more user-friendly error for common issues
    if (error instanceof Error && error.message.includes("fetch")) {
      throw new Error(
        "Unable to access the website. Please check if the URL is correct and accessible."
      );
    }

    throw new Error(
      "Error analyzing website. Please try again or check if the website is accessible."
    );
  }
}

/**
 * Generates structured AI-powered insights based on analysis results
 */
export async function generateStructuredInsights(
  website: string,
  categories: string[],
  technologies: Technology[]
): Promise<Insight[]> {
  if (technologies.length === 0) {
    return [];
  }

  try {
    const domain = new URL(website).hostname;

    // Group technologies by category for better context
    const techByCategory: Record<string, Technology[]> = {};

    technologies.forEach((tech) => {
      tech.categories.forEach((category) => {
        if (!techByCategory[category]) {
          techByCategory[category] = [];
        }
        techByCategory[category].push(tech);
      });
    });

    // Create formatted category breakdown
    const categoryBreakdown = Object.entries(techByCategory)
      .map(
        ([category, techs]) =>
          `${category}:\n${techs
            .map((t) => `  - ${t.name}: ${t.description || "No description"}`)
            .join("\n")}`
      )
      .join("\n\n");

    const result = await generateObject({
      model: anthropic("claude-3-haiku-20240307"),
      schema: InsightsResponseSchema,

      prompt: `Provide 2-3 key insights for ${domain}.

Technology breakdown by category:
${categoryBreakdown}

Give actionable recommendations about:
- Most relevant categories from: ${categories.join(", ")}
- Specific optimization opportunities for the detected technologies and name the technology in the suggestion

Each insight needs: type, suggestion, impact level (High/Medium/Low).
Focus on practical improvements specific to the technologies and their descriptions.`,
    });

    return result.object.insights as Insight[];
  } catch (error) {
    console.error("Error generating structured insights:", error);
    // Fallback to basic insights using category information
    const topTechs = technologies.slice(0, 3);

    //TODO sort by most technologies in a category
    //TODO add insights for each category that was top 3

    const fallbackInsights: Insight[] = [
      {
        type: "Technology Overview",
        suggestion: `Website uses ${topTechs
          .map((t) => t.name)
          .join(", ")} spanning ${
          categories.length
        } technology categories, indicating a ${
          categories.length > 3 ? "diverse" : "focused"
        } technical approach`,
        impact: "Medium",
      },
    ];

    // Add category-specific insights
    if (
      categories.some(
        (cat) =>
          cat.toLowerCase().includes("javascript") ||
          cat.toLowerCase().includes("framework")
      )
    ) {
      fallbackInsights.push({
        type: "Performance",
        suggestion:
          "Consider implementing code splitting and lazy loading for JavaScript frameworks to improve page load times",
        impact: "High",
      });
    }

    if (
      categories.some(
        (cat) =>
          cat.toLowerCase().includes("server") ||
          cat.toLowerCase().includes("hosting")
      )
    ) {
      fallbackInsights.push({
        type: "Security",
        suggestion:
          "Ensure server configurations follow security best practices and keep software updated",
        impact: "High",
      });
    }

    if (
      categories.some(
        (cat) =>
          cat.toLowerCase().includes("analytics") ||
          cat.toLowerCase().includes("tracking")
      )
    ) {
      fallbackInsights.push({
        type: "Privacy",
        suggestion:
          "Review analytics and tracking implementations to ensure GDPR compliance and user privacy protection",
        impact: "Medium",
      });
    }

    return fallbackInsights.slice(0, 3);
  }
}

/**
 * Generates AI-powered best practices using Claude Haiku
 */
export async function generateBestPractices(
  technologies: Technology[]
): Promise<TechnologyRecommendation[]> {
  if (technologies.length === 0) {
    return [];
  }

  try {
    // Process all detected technologies
    const techList = technologies.map((tech) => `${tech.name}`).join(", ");

    const result = await generateObject({
      model: anthropic("claude-3-haiku-20240307"),
      schema: SimpleBestPracticesResponseSchema,
      prompt: `Give 1-2 practices for the most important technologies from: ${techList}

Select only the key technologies that would benefit most from optimization. Use this JSON format:
{
  "recommendations": [
    {
      "technology": "React", 
      "practices": [
        {"title": "Optimize rendering", "suggestion": "Use memo for components", "priority": "High"}
      ]
    }
  ]
}

Focus on actionable, high-impact recommendations.`,
    });

    // Type assertion and data transformation
    const response = result.object as {
      recommendations: Array<{
        technology: string;
        practices: Array<{
          title: string;
          suggestion: string;
          priority: "High" | "Medium" | "Low";
        }>;
      }>;
    };
    return response.recommendations.map((tech) => ({
      technology: tech.technology,
      practices: tech.practices,
    }));
  } catch (error) {
    console.error("Error generating best practices:", error);
    return [];
  }
}

/**
 * Performs enhanced analysis with AI insights and best practices
 * @param {string} website - The website URL to analyze
 * @returns {Promise<Object>} - Enhanced analysis result with insights and recommendations
 */
export async function performEnhancedAnalysis(
  website: string
): Promise<EnhancedAnalysisResult> {
  // Validate domain access
  if (!validateDomain()) {
    throw new Error("Unauthorized: Access denied from this domain");
  }

  try {
    // First get basic technology analysis
    const basicResult = await performBasicAnalysis(website);

    // Generate AI-powered insights and best practices in parallel
    // If either fails, we'll use fallbacks instead of throwing
    let insights: Insight[] = [];
    let bestPractices: TechnologyRecommendation[] = [];

    const results = await Promise.allSettled([
      generateStructuredInsights(
        website,
        basicResult.categories,
        basicResult.technologies
      ),
      generateBestPractices(basicResult.technologies),
    ]);

    // Extract insights result
    if (results[0].status === "fulfilled") {
      insights = results[0].value;
    } else {
      console.error("Insights generation failed:", results[0].reason);
      // Provide basic fallback insights
      insights = [
        {
          type: "Analysis",
          suggestion: `This website uses ${basicResult.technologies.length} technologies across ${basicResult.categories.length} categories`,
          impact: "Medium",
        },
      ];
    }

    // Extract best practices result
    if (results[1].status === "fulfilled") {
      bestPractices = results[1].value;
    } else {
      console.error("Best practices generation failed:", results[1].reason);
      // Best practices will remain empty array
    }

    // Embed best practices into each technology object
    const enhancedTechnologies = basicResult.technologies.map((tech) => {
      // Find best practices for this technology
      const techBestPractices = bestPractices.find(
        (bp) => bp.technology.toLowerCase() === tech.name.toLowerCase()
      );

      return {
        ...tech,
        bestPractices: techBestPractices ? techBestPractices.practices : [],
      };
    });

    return {
      ...basicResult,
      technologies: enhancedTechnologies,
      insights,
      bestPractices,
      analysisDate: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Enhanced analysis error:", error);
    throw error;
  }
}
