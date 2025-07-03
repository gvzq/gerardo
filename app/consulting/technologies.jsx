"use client";

import React, { useState } from "react";
import { Card } from "flowbite-react";
import Image from "next/image";
import { analyzeWebsiteBasic, analyzeWebsiteEnhanced } from "@/lib/actions.js";

export default function Technologies() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysisMode, setAnalysisMode] = useState("basic"); // "basic" or "enhanced"
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Identify Technologies on Your Website
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Discover the technology stack powering any website. Get insights
            into frameworks, libraries, and tools to inform your technical
            decisions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="website"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={isLoading}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Analysis Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="analysisMode"
                    value="basic"
                    checked={analysisMode === "basic"}
                    onChange={(e) => setAnalysisMode(e.target.value)}
                    className="mr-2"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Basic Analysis
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="analysisMode"
                    value="enhanced"
                    checked={analysisMode === "enhanced"}
                    onChange={(e) => setAnalysisMode(e.target.value)}
                    className="mr-2"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Enhanced with Insights
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !websiteInfo.website.trim()}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <LoadingSpinner /> : "Analyze Website"}
            </button>
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

            {/* Recommendations Section */}
            {data.insights && data.insights.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                  Recommendations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.insights.map((insight, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {insight.type}
                        </h5>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(
                            insight.impact
                          )}`}
                        >
                          {insight.impact} Impact
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {insight.suggestion}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.technologies.map((tech) => (
                <div key={tech.slug} className="h-full">
                  <Card className="h-full flex flex-col">
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

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                      {tech.description && tech.description.length > 100
                        ? `${tech.description.substring(0, 97)}...`
                        : tech.description || "No description available"}
                    </p>

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
                  </Card>
                </div>
              ))}
            </div>

            {data.categories && data.categories.length > 0 && (
              <div className="mt-12 text-center">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Technology Categories Found
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {data.categories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!isLoading && !data.technologies && !error && (
        <section className="py-16 px-4 text-center">
          <div className="mx-auto max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2v8h10V6H5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Ready to Analyze
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Enter a website URL above to discover its technology stack.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
