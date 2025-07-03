"use server";

import { headers } from "next/headers";
import {
  validateUrl,
  performBasicAnalysis,
  performEnhancedAnalysis,
} from "./technology-analysis";

/**
 * Validates that the request is coming from the allowed domain
 * @returns {boolean} - True if request is from allowed domain, false otherwise
 */
function validateRequestDomain() {
  const allowedDomain = process.env.NEXT_PUBLIC_DOMAIN;

  if (!allowedDomain) {
    console.error("NEXT_PUBLIC_DOMAIN environment variable is not set");
    return false;
  }

  try {
    const headersList = headers();
    const origin = headersList.get("origin") || headersList.get("referer");

    if (!origin) {
      console.error("No origin or referer header found");
      return false;
    }

    const originUrl = new URL(origin);
    const allowedUrl = new URL(allowedDomain);

    const isValid = originUrl.hostname === allowedUrl.hostname;

    if (!isValid) {
      console.error(
        `Unauthorized domain access attempt: ${originUrl.hostname} (allowed: ${allowedUrl.hostname})`
      );
    }

    return isValid;
  } catch (error) {
    console.error("Error validating request domain:", error);
    return false;
  }
}

/**
 * Server action for basic website technology analysis
 * @param {string} website - The website URL to analyze
 * @returns {Promise<Object>} - Analysis result or error
 */
export async function analyzeWebsiteBasic(website) {
  // Validate domain access first
  if (!validateRequestDomain()) {
    return {
      success: false,
      error: "Unauthorized: Access denied from this domain",
    };
  }

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
  // Validate domain access first
  if (!validateRequestDomain()) {
    return {
      success: false,
      error: "Unauthorized: Access denied from this domain",
    };
  }

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
