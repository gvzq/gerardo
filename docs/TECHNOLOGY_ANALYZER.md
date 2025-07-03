# Technology Analyzer

## Overview

The Technology Analyzer is a powerful tool that helps identify the technology stack powering any website. It provides insights into frameworks, libraries, and tools to inform technical decisions.

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

## API Endpoints

### `/api/fallback-icon` - Generate Fallback Icons

**Method**: GET

**Query Parameters**:

- `text` (optional): Character to display (default: "?")
- `size` (optional): Icon size in pixels (default: 48)
- `bg` (optional): Background color in hex without # (default: "E5E7EB")
- `color` (optional): Text color in hex without # (default: "6B7280")

**Example**: `/api/fallback-icon?text=R&size=48&bg=3B82F6&color=FFFFFF`

**Response**: PNG image generated using Vercel's OG image generation

### `/api/wappalyzer` - Basic Technology Detection

**Method**: POST

**Request Body**:

```json
{
  "website": "https://example.com"
}
```

**Response**:

```json
{
  "technologies": [
    {
      "name": "React",
      "slug": "react",
      "icon": "React.svg",
      "description": "A JavaScript library for building user interfaces",
      "categories": [{ "name": "JavaScript frameworks", "id": 12 }],
      "confidence": 100
    }
  ],
  "categories": ["JavaScript frameworks", "Web frameworks"],
  "description": "Generated description of the technology stack",
  "url": "https://example.com"
}
```

### `/api/analyze` - Enhanced Analysis with Insights

**Method**: POST

**Request Body**:

```json
{
  "website": "https://example.com"
}
```

**Response**:

```json
{
  "technologies": [...],
  "categories": [...],
  "description": "AI-generated insights about the technology stack",
  "insights": [
    {
      "type": "Framework Enhancement",
      "suggestion": "Consider upgrading to Next.js for better performance and SEO",
      "impact": "High"
    }
  ],
  "analysisDate": "2024-01-01T12:00:00.000Z",
  "url": "https://example.com"
}
```

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

- **Next.js API Routes**: Serverless functions
- **App Router**: Modern Next.js routing system

### External Dependencies

- **Technology Icons**: GitHub repository for brand icons
- **Vercel OG Image Generation**: Custom fallback icons using @vercel/og

## Development

### Local Setup

1. Ensure the development server is running:

   ```bash
   npm run dev
   ```

2. The API endpoints will be available at:
   - `http://localhost:3000/api/wappalyzer`
   - `http://localhost:3000/api/analyze`

### Customization

#### Adding New Technologies (Mock Data)

Edit `app/api/wappalyzer/route.js` and modify the `mockTechnologies` array:

```javascript
const mockTechnologies = [
  {
    name: "Your Technology",
    slug: "your-tech",
    icon: "YourTech.svg",
    description: "Description of your technology",
    categories: [{ name: "Your Category", id: 1 }],
    confidence: 90,
  },
];
```

#### Customizing Recommendations

Edit `app/api/analyze/route.js` and modify the `generateRecommendations` function:

```javascript
function generateRecommendations(technologies) {
  const recommendations = [];

  // Add your custom logic here

  return recommendations;
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

### Planned Features

1. **Real Wappalyzer Integration**: Replace mock data with actual technology detection
2. **AI Integration**: Connect with Cohere or OpenAI for real insights
3. **Historical Analysis**: Track technology changes over time
4. **Export Reports**: PDF/JSON export functionality
5. **Comparison Tool**: Compare multiple websites side-by-side

### Integration Ideas

1. **Puppeteer Setup**: For real browser-based analysis
2. **Database Storage**: Save analysis results
3. **User Accounts**: Personal analysis history
4. **Webhook Integration**: Automated monitoring
