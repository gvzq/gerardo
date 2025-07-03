import WebAppAnalyzer from "./webappanalyzer.js";

// Initialize analyzer instance (singleton pattern)
let analyzer = null;

function getAnalyzer() {
  if (!analyzer) {
    analyzer = new WebAppAnalyzer();
  }
  return analyzer;
}

/**
 * Validates a website URL
 * @param {string} url - The URL to validate
 * @returns {string|null} - Error message if invalid, null if valid
 */
export function validateUrl(url) {
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
export async function performBasicAnalysis(website) {
  try {
    const analyzer = getAnalyzer();
    const result = await analyzer.analyzeWebsite(website);

    // Format the response to match the expected structure
    const technologies = result.technologies.map((tech) => ({
      name: tech.name,
      slug: tech.slug,
      icon: tech.icon,
      description: tech.description,
      categories: tech.categories,
      confidence: tech.confidence,
      website: tech.website,
    }));

    const categories = result.categories;

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
    if (error.message.includes("fetch")) {
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
 * Generates AI-powered tech insights based on analysis results
 * @param {string} website - The website URL
 * @param {Array} categories - Technology categories found
 * @param {Array} technologies - Technologies detected
 * @returns {string} - Generated insights description
 */
export function generateTechInsights(website, categories, technologies) {
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

/**
 * Generates recommendations based on detected technologies
 * @param {Array} technologies - Array of detected technologies
 * @returns {Array} - Array of recommendation objects
 */
export function generateRecommendations(technologies) {
  const recommendations = [];

  // TODO: EDIT TO HAVE A BANNER OF BEST PRACTICES FOR THE TECHNOLOGIES USED

  recommendations.push({
    type: "Performance",
    suggestion: "Implement proper caching strategies and image optimization",
    impact: "High",
  });

  return recommendations;
}

/**
 * Performs enhanced analysis with AI insights
 * @param {string} website - The website URL to analyze
 * @returns {Promise<Object>} - Enhanced analysis result with insights and recommendations
 */
export async function performEnhancedAnalysis(website) {
  try {
    // First get basic technology analysis
    const basicResult = await performBasicAnalysis(website);

    // Enhance with AI insights
    const aiDescription = generateTechInsights(
      website,
      basicResult.categories,
      basicResult.technologies
    );

    return {
      ...basicResult,
      description: aiDescription,
      insights: generateRecommendations(basicResult.technologies),
      analysisDate: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Enhanced analysis error:", error);
    throw error;
  }
}
