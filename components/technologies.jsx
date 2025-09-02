"use client";

import React, { useState } from "react";

import Image from "next/image";
import { analyzeWebsiteBasic, analyzeWebsiteEnhanced } from "@/lib/actions.js";

export default function Technologies() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysisMode, setAnalysisMode] = useState("basic"); // "basic" or "enhanced"
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [websiteInfo, setWebsiteInfo] = useState({
    website: "",
  });

  const handleUpdate = (event) => {
    setWebsiteInfo({ ...websiteInfo, [event.target.name]: event.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateUrl = (url) => {
    if (!url.trim()) {
      return "Please enter a website URL";
    }

    const urlPattern = /^https?:\/\/.+\..+/;
    if (!urlPattern.test(url)) {
      return "Please enter a valid URL (include http:// or https://)";
    }

    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateUrl(websiteInfo.website);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setData({});

    try {
      let result;

      // Use server actions instead of API calls
      if (analysisMode === "enhanced") {
        result = await analyzeWebsiteEnhanced(websiteInfo.website.trim());
      } else {
        result = await analyzeWebsiteBasic(websiteInfo.website.trim());
      }

      if (result.success) {
        setData(result.data);
        setSelectedCategories([]); // Reset category filters on new analysis
      } else {
        setError(result.error || "Failed to analyze website");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Failed to analyze website. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      <span className="ml-2">Analyzing...</span>
    </div>
  );

  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const getFilteredTechnologies = () => {
    if (!data.technologies) return [];

    if (selectedCategories.length === 0) {
      return data.technologies;
    }

    return data.technologies.filter((tech) =>
      tech.categories.some((category) =>
        selectedCategories.includes(category.name || category)
      )
    );
  };

  return (
    <div className="min-h-48 bg-gray-50 dark:bg-gray-900">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Identify Technologies on Your Website
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Discover the technology stack powering any website. Get insights
            into frameworks, libraries, and tools to inform your technical
            decisions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Website URL
              </label>
              <input
                type="text"
                id="website"
                name="website"
                placeholder="https://example.com"
                value={websiteInfo.website}
                onChange={handleUpdate}
                className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                disabled={isLoading}
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Enter a complete URL to discover its technology stack and get insights
              </p>
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Analysis Type
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="analysisMode"
                    value="basic"
                    checked={analysisMode === "basic"}
                    onChange={(e) => setAnalysisMode(e.target.value)}
                    className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Basic Analysis
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="analysisMode"
                    value="enhanced"
                    checked={analysisMode === "enhanced"}
                    onChange={(e) => setAnalysisMode(e.target.value)}
                    className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Enhanced with Insights
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading || !websiteInfo.website.trim()}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6m3-3v6"
                      />
                    </svg>
                    {websiteInfo.website.trim() ? "Analyze Website" : "Ready to Analyze"}
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      {data.technologies && !isLoading && (
        <section className="py-8 px-4">
          <div className="mx-auto max-w-screen-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Analysis Results for {data.url}
              </h3>
              {data.description && (
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
                  {data.description}
                </p>
              )}
              {data.analysisDate && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Analyzed on {new Date(data.analysisDate).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* AI Insights Section */}
            {data.insights &&
              Array.isArray(data.insights) &&
              data.insights.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Insights & Recommendations
                  </h4>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        AI Generated
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Based on {data.technologies.length} technologies across{" "}
                        {data.categories.length} categories
                      </span>
                      {data.categories && data.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1 ml-2">
                          {data.categories
                            .slice(0, 3)
                            .map((category, catIndex) => (
                              <span
                                key={catIndex}
                                className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-400"
                              >
                                {category}
                              </span>
                            ))}
                          {data.categories.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-full dark:bg-gray-800 dark:text-gray-500">
                              +{data.categories.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="space-y-8">
                      {data.insights.map((insight, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="h-2 w-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <h5 className="text-lg font-semibold leading-tight tracking-tight">
                                {insight.type}
                              </h5>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getImpactColor(
                                  insight.impact
                                )}`}
                              >
                                {insight.impact} Impact
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {insight.suggestion}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            <div className="mb-8">
              {data.categories && data.categories.length > 0 && (
                <div className="mt-12 text-center">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Technology Categories Found
                  </h4>

                  <div className="flex flex-wrap justify-center gap-2">
                    {data.categories.map((category) => {
                      const isSelected = selectedCategories.includes(category);
                      return (
                        <button
                          key={category}
                          onClick={() => toggleCategory(category)}
                          className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full cursor-pointer hover:scale-105 transform transition-all ${
                            isSelected
                              ? "bg-blue-600 text-white dark:bg-blue-500"
                              : "text-gray-800 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                          }`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Technologies count and grid */}
            <div className="mb-4">
              <div className="flex justify-center items-center gap-2 flex-wrap">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Showing {getFilteredTechnologies().length} of{" "}
                  {data.technologies?.length || 0} technologies
                  {selectedCategories.length > 0 && (
                    <span className="ml-1">
                      (filtered by: {selectedCategories.join(", ")})
                    </span>
                  )}
                </p>
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-full transition-colors ml-2 border border-gray-300 dark:border-gray-500"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gridAutoRows: "1fr",
              }}
            >
              {getFilteredTechnologies()
                .sort((a, b) => {
                  // Sort technologies with best practices first
                  const aHasBestPractices =
                    a.bestPractices && a.bestPractices.length > 0;
                  const bHasBestPractices =
                    b.bestPractices && b.bestPractices.length > 0;

                  if (aHasBestPractices && !bHasBestPractices) return -1;
                  if (!aHasBestPractices && bHasBestPractices) return 1;
                  return 0; // Keep original order for items in same category
                })
                .map((tech) => (
                  <div key={tech.slug} className="w-full h-full">
                    <div className="h-full flex flex-col w-full bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 mr-3 flex-shrink-0">
                          <Image
                            src={`https://raw.githubusercontent.com/enthec/webappanalyzer/main/src/images/icons/${tech.icon}`}
                            className="object-contain w-full h-full"
                            width={48}
                            height={48}
                            alt={`${tech.name} Logo`}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src = `/api/fallback-icon?text=${encodeURIComponent(
                                tech.name.charAt(0)
                              )}&size=48&bg=E5E7EB&color=6B7280`;
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-lg font-bold text-gray-900 dark:text-white">
                            {tech.name}
                          </h5>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Confidence: {tech.confidence}%
                            </span>
                            <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full"
                                style={{ width: `${tech.confidence}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow leading-relaxed">
                        {tech.description || "No description available"}
                      </p>

                      {/* Best Practices Section for this technology */}
                      {tech.bestPractices && tech.bestPractices.length > 0 && (
                        <div className="mb-4">
                          <h6 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                            Best Practices
                          </h6>
                          <div className="grid grid-cols-1 gap-3">
                            {tech.bestPractices.map(
                              (practice, practiceIndex) => (
                                <div
                                  key={practiceIndex}
                                  className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <h6 className="text-sm font-semibold text-gray-900 dark:text-white">
                                      {practice.title}
                                    </h6>
                                    <span
                                      className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(
                                        practice.priority
                                      )}`}
                                    >
                                      {practice.priority}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {practice.suggestion}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 mt-auto">
                        {tech.categories.map((category) => (
                          <span
                            key={`${tech.name}-${category.name}`}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {isLoading && !data.technologies && (
        <section className="py-8 px-4 text-center">
          <div className="mx-auto max-w-sm">
            <div className="space-y-4">
              <div className="w-12 h-12 mx-auto text-blue-600">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Analyzing Website
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Discovering technologies and frameworks...
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
