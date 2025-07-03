import fs from "fs";
import path from "path";

class WebAppAnalyzer {
  constructor() {
    this.technologies = {};
    this.categories = {};
    this.loadData();
  }

  loadData() {
    try {
      // Load categories
      const categoriesPath = path.join(
        process.cwd(),
        "lib/webappanalyzer-data/categories.json"
      );
      if (fs.existsSync(categoriesPath)) {
        this.categories = JSON.parse(fs.readFileSync(categoriesPath, "utf8"));
      }

      // Load all technology files
      const technologiesDir = path.join(
        process.cwd(),
        "lib/webappanalyzer-data/technologies"
      );
      if (fs.existsSync(technologiesDir)) {
        const files = fs
          .readdirSync(technologiesDir)
          .filter((file) => file.endsWith(".json"));

        for (const file of files) {
          const filePath = path.join(technologiesDir, file);
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          Object.assign(this.technologies, data);
        }
      }
    } catch (error) {
      console.error("Error loading webappanalyzer data:", error);
    }
  }

  async analyzeWebsite(url) {
    try {
      // Fetch website HTML and headers
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      const headers = Object.fromEntries(response.headers.entries());

      const detectedTechnologies = this.detectTechnologies(html, headers, url);

      return {
        technologies: detectedTechnologies,
        categories: this.getUniqueCategories(detectedTechnologies),
        url: url,
      };
    } catch (error) {
      console.error("Error analyzing website:", error);
      throw error;
    }
  }

  detectTechnologies(html, headers, url) {
    const detected = [];

    for (const [name, tech] of Object.entries(this.technologies)) {
      const confidence = this.analyzeTechnology(name, tech, html, headers, url);

      if (confidence > 0) {
        const categories = tech.cats
          ? tech.cats.map((catId) => ({
              id: catId,
              name: this.categories[catId]?.name || `Category ${catId}`,
            }))
          : [];

        detected.push({
          name,
          slug: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          icon: tech.icon || `${name}.svg`,
          description: tech.description || `${name} technology`,
          categories,
          confidence: Math.min(confidence, 100),
          website: tech.website,
        });
      }
    }

    return detected.sort((a, b) => b.confidence - a.confidence);
  }

  analyzeTechnology(name, tech, html, headers, url) {
    let confidence = 0;
    let matches = 0;

    // Check HTML patterns
    if (tech.html) {
      for (const pattern of tech.html) {
        if (this.testPattern(pattern, html)) {
          matches++;
          confidence += this.getPatternConfidence(pattern);
        }
      }
    }

    // Check meta tags
    if (tech.meta) {
      for (const [metaName, pattern] of Object.entries(tech.meta)) {
        const metaRegex = new RegExp(
          `<meta[^>]+name=['"]${metaName}['"][^>]+content=['"]([^'"]*?)['"]`,
          "i"
        );
        const metaMatch = html.match(metaRegex);
        if (metaMatch && this.testPattern(pattern, metaMatch[1])) {
          matches++;
          confidence += this.getPatternConfidence(pattern);
        }
      }
    }

    // Check headers
    if (tech.headers) {
      for (const [headerName, pattern] of Object.entries(tech.headers)) {
        const headerValue = headers[headerName.toLowerCase()];
        if (headerValue && this.testPattern(pattern, headerValue)) {
          matches++;
          confidence += this.getPatternConfidence(pattern);
        }
      }
    }

    // Check script sources
    if (tech.scriptSrc) {
      for (const pattern of tech.scriptSrc) {
        const scriptRegex = new RegExp(
          `<script[^>]+src=['"]([^'"]*?)['"]`,
          "gi"
        );
        let scriptMatch;
        while ((scriptMatch = scriptRegex.exec(html)) !== null) {
          if (this.testPattern(pattern, scriptMatch[1])) {
            matches++;
            confidence += this.getPatternConfidence(pattern);
          }
        }
      }
    }

    // Check JavaScript variables
    if (tech.js) {
      for (const [jsVar, pattern] of Object.entries(tech.js)) {
        // Simple check for JavaScript variables in script tags
        const jsRegex = new RegExp(`\\b${jsVar}\\b`, "i");
        if (jsRegex.test(html)) {
          matches++;
          confidence += this.getPatternConfidence(pattern);
        }
      }
    }

    // Check URL patterns
    if (tech.url) {
      for (const pattern of tech.url) {
        if (this.testPattern(pattern, url)) {
          matches++;
          confidence += this.getPatternConfidence(pattern);
        }
      }
    }

    // Check text patterns
    if (tech.text) {
      for (const pattern of tech.text) {
        if (this.testPattern(pattern, html)) {
          matches++;
          confidence += this.getPatternConfidence(pattern);
        }
      }
    }

    return matches > 0 ? Math.min(confidence, 100) : 0;
  }

  testPattern(pattern, text) {
    try {
      // Extract pattern and confidence from string like "pattern\\;confidence:50"
      const [actualPattern] = pattern.split("\\;");
      const regex = new RegExp(actualPattern, "i");
      return regex.test(text);
    } catch (error) {
      return false;
    }
  }

  getPatternConfidence(pattern) {
    // Extract confidence from pattern string
    const confidenceMatch = pattern.match(/\\;confidence:(\d+)/);
    return confidenceMatch ? parseInt(confidenceMatch[1]) : 100;
  }

  getUniqueCategories(technologies) {
    const categorySet = new Set();
    technologies.forEach((tech) => {
      tech.categories?.forEach((cat) => categorySet.add(cat.name));
    });
    return Array.from(categorySet);
  }
}

export default WebAppAnalyzer;
