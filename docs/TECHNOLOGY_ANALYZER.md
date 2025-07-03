# Technology Analyzer

## Overview

The Technology Analyzer is a powerful tool that helps identify the technology stack powering any website. It provides insights into frameworks, libraries, and tools to inform technical decisions.

### Recent Architecture Improvements

- **Server Actions**: Migrated from API routes to Next.js Server Actions for better performance and developer experience
- **Centralized Logic**: All analysis functions moved to reusable lib functions (`lib/technology-analysis.js` and `lib/actions.js`)
- **Real Technology Detection**: Uses actual WebAppAnalyzer patterns instead of mock data
- **Cleaner Codebase**: Removed duplicate code and unused API endpoints (`/api/wappalyzer`, `/api/analyze`)
- **Better Error Handling**: Improved validation and error messages throughout the system

## Features

### Basic Analysis

- **Technology Detection**: Identifies web technologies, frameworks, and libraries
- **Confidence Scores**: Shows reliability percentage for each detected technology
- **Category Classification**: Groups technologies by type (frameworks, databases, etc.)
- **Visual Interface**: Clean, responsive UI with technology icons and descriptions

### Enhanced Analysis (with AI Insights)

- **All Basic Features** plus:
- **AI-Generated Insights**: Contextual analysis of the technology stack
- **Recommendations**: Actionable suggestions for improvements
- **Impact Assessment**: Priority levels for each recommendation

## Server Actions & API Endpoints

### Server Actions (Primary Interface)

The Technology Analyzer uses Next.js Server Actions for optimal performance:

#### `analyzeWebsiteBasic(website)`

**Parameters**:

- `website` (string): The website URL to analyze

**Returns**:

```javascript
{
  success: true,
  data: {
    technologies: [...],
    categories: [...],
    description: "Generated description of the technology stack",
    url: "https://example.com"
  }
}
```

#### `analyzeWebsiteEnhanced(website)`

**Parameters**:

- `website` (string): The website URL to analyze

**Returns**:

```javascript
{
  success: true,
  data: {
    technologies: [...],
    categories: [...],
    description: "AI-generated insights about the technology stack",
    insights: [
      {
        type: "Framework Enhancement",
        suggestion: "Consider upgrading to Next.js for better performance and SEO",
        impact: "High"
      }
    ],
    analysisDate: "2024-01-01T12:00:00.000Z",
    url: "https://example.com"
  }
}
```

### `/api/fallback-icon` - Generate Fallback Icons

**Method**: GET

**Query Parameters**:

- `text` (optional): Character to display (default: "?")
- `size` (optional): Icon size in pixels (default: 48)
- `bg` (optional): Background color in hex without # (default: "E5E7EB")
- `color` (optional): Text color in hex without # (default: "6B7280")

**Example**: `/api/fallback-icon?text=R&size=48&bg=3B82F6&color=FFFFFF`

**Response**: PNG image generated using Vercel's OG image generation

## Usage

### Accessing the Interface

1. Navigate to `/consulting` in your browser
2. Scroll to the "Identify Technologies on Your Website" section
3. Enter a website URL (must include http:// or https://)
4. Choose analysis type:
   - **Basic**: Quick technology detection
   - **Enhanced**: Includes AI insights and recommendations
5. Click "Analyze Website"

### URL Requirements

- Must be a valid URL with protocol (http:// or https://)
- Must include a domain with TLD (e.g., .com, .org)
- Examples:
  - ✅ `https://example.com`
  - ✅ `http://subdomain.example.org`
  - ❌ `example.com` (missing protocol)
  - ❌ `https://localhost` (local development)

## Technology Stack

### Frontend

- **React 18**: Component-based UI library
- **Next.js 15**: React framework with SSR/SSG
- **Tailwind CSS**: Utility-first CSS framework
- **Flowbite React**: Pre-built components

### Backend

- **Next.js Server Actions**: Primary interface for technology analysis
- **App Router**: Modern Next.js routing system
- **WebAppAnalyzer**: Technology detection engine using patterns from [webappanalyzer](https://github.com/enthec/webappanalyzer)

### External Dependencies

- **Technology Icons**: GitHub repository for brand icons
- **Vercel OG Image Generation**: Custom fallback icons using @vercel/og
- **WebAppAnalyzer Data**: Real-time technology detection patterns from [enthec/webappanalyzer](https://github.com/enthec/webappanalyzer)

## Development

### Local Setup

1. **Initialize WebAppAnalyzer Data**: The technology patterns are automatically fetched using the provided script:

   ```bash
   ./pull-webappanalyzer-data.sh
   ```

   This script:

   - Clones the latest [webappanalyzer](https://github.com/enthec/webappanalyzer) repository
   - Copies technology patterns to `lib/webappanalyzer-data/`
   - Sets up categories and technology detection rules
   - Cleans up temporary files

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. Navigate to `/consulting` to access the Technology Analyzer interface

**Note**: The webappanalyzer data is automatically included in the project and provides real technology detection patterns for accurate analysis.

### Project Structure

```
lib/
├── technology-analysis.js    # Core analysis functions
├── actions.js               # Next.js Server Actions
├── webappanalyzer.js       # WebAppAnalyzer implementation
└── webappanalyzer-data/    # Technology detection patterns
    ├── categories.json     # Technology categories
    └── technologies/       # Detection patterns by letter
        ├── a.json
        ├── b.json
        └── ...

app/
├── consulting/
│   ├── page.tsx           # Main consulting page
│   └── technologies.jsx   # Technology analyzer component
└── api/
    └── fallback-icon/     # Icon generation endpoint
        └── route.js

docs/
└── TECHNOLOGY_ANALYZER.md # This documentation

pull-webappanalyzer-data.sh # Data update script
```

### Customization

#### Adding New Technologies

**Option 1: Update WebAppAnalyzer Data**
Re-run the data update script to get the latest technology patterns:

```bash
./pull-webappanalyzer-data.sh
```

**Option 2: Manual Technology Patterns**
Edit `lib/webappanalyzer-data/technologies/` files to add custom technology detection patterns:

```json
{
  "Your Technology": {
    "cats": [12],
    "description": "Description of your technology",
    "icon": "YourTech.svg",
    "html": ["<pattern>"],
    "meta": { "generator": "^YourTech" },
    "js": { "YourTechVar": "" },
    "website": "https://yourtech.com"
  }
}
```

**Option 3: Custom Analysis Logic**
Modify `lib/technology-analysis.js` to customize the analysis logic directly.

#### Customizing Recommendations

Edit `lib/technology-analysis.js` and modify the `generateRecommendations` function:

```javascript
export function generateRecommendations(technologies) {
  const recommendations = [];

  // Add your custom logic here
  // Example: Check for specific technologies and suggest improvements

  return recommendations;
}
```

#### Customizing AI Insights

Edit `lib/technology-analysis.js` and modify the `generateTechInsights` function:

```javascript
export function generateTechInsights(website, categories, technologies) {
  // Add your custom insight generation logic here
  return "Your custom insights...";
}
```

#### Customizing Fallback Icons

The fallback icon API at `/api/fallback-icon/route.js` uses Vercel's OG image generation. You can customize:

- **Colors**: Modify default background and text colors
- **Typography**: Change font family, size, or weight
- **Shape**: Adjust border radius or add additional styling
- **Fallback Logic**: Add additional fallback options or SVG generation

Example customization:

```javascript
// Change default colors
const backgroundColor = `#${bgColor}` || "#1F2937"; // Dark background
const foregroundColor = `#${textColor}` || "#F9FAFB"; // Light text
```

## Error Handling

### Common Errors

1. **Invalid URL**: Displays user-friendly error message
2. **Network Issues**: Shows generic error with retry option
3. **Server Errors**: Logs error details for debugging

### Validation

- Client-side URL validation before submission
- Server-side validation with detailed error messages
- Proper HTTP status codes for different error types

## Future Enhancements

### Completed ✅

1. **Real WebAppAnalyzer Integration**: ✅ Implemented with actual technology detection patterns
2. **Server Actions**: ✅ Migrated from API routes to Next.js Server Actions
3. **Centralized Logic**: ✅ Moved all functions to reusable lib modules
4. **Real-time Data**: ✅ Automated script to pull latest technology patterns

### Planned Features

1. **AI Integration**: Connect with Cohere or OpenAI for real insights (currently using rule-based insights)
2. **Historical Analysis**: Track technology changes over time
3. **Export Reports**: PDF/JSON export functionality
4. **Comparison Tool**: Compare multiple websites side-by-side
5. **Browser Extension**: Direct analysis from any webpage

### Integration Ideas

1. **Puppeteer Setup**: For real browser-based analysis
2. **Database Storage**: Save analysis results
3. **User Accounts**: Personal analysis history
4. **Webhook Integration**: Automated monitoring
