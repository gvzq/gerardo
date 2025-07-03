"use server";

import {
  validateUrl,
  performBasicAnalysis,
  performEnhancedAnalysis,
} from "./technology-analysis.js";

/**
 * Server action for basic website technology analysis
 * @param {string} website - The website URL to analyze
 * @returns {Promise<Object>} - Analysis result or error
 */
export async function analyzeWebsiteBasic(website) {
  try {
    // Validate URL
    const validationError = validateUrl(website);
    if (validationError) {
      return {
        success: false,
        error: validationError,
      };
    }

    // Perform basic analysis
    const result = await performBasicAnalysis(website.trim());

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Basic analysis server action error:", error);
    return {
      success: false,
      error: error.message || "Failed to analyze website. Please try again.",
    };
  }
}

/**
 * Server action for enhanced website technology analysis with insights
 * @param {string} website - The website URL to analyze
 * @returns {Promise<Object>} - Enhanced analysis result or error
 */
export async function analyzeWebsiteEnhanced(website) {
  try {
    // Validate URL
    const validationError = validateUrl(website);
    if (validationError) {
      return {
        success: false,
        error: validationError,
      };
    }

    // Perform enhanced analysis
    const result = await performEnhancedAnalysis(website.trim());

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Enhanced analysis server action error:", error);
    return {
      success: false,
      error: error.message || "Failed to analyze website. Please try again.",
    };
  }
}
