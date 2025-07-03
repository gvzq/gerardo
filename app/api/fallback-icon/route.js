import { ImageResponse } from "next/og";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text") || "?";
    const size = parseInt(searchParams.get("size")) || 48;
    const bgColor = searchParams.get("bg") || "E5E7EB";
    const textColor = searchParams.get("color") || "6B7280";

    // Convert hex colors to proper format
    const backgroundColor = `#${bgColor}`;
    const foregroundColor = `#${textColor}`;

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: backgroundColor,
            borderRadius: "8px",
            fontSize: Math.floor(size * 0.6),
            fontWeight: "bold",
            color: foregroundColor,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {text.charAt(0).toUpperCase()}
        </div>
      ),
      {
        width: size,
        height: size,
        headers: {
          // Cache for 1 year since these are static based on parameters
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      }
    );
  } catch (error) {
    console.error("Fallback icon generation error:", error);

    // Return a simple SVG as fallback
    const svgContent = `
      <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" fill="#E5E7EB" rx="8"/>
        <text x="24" y="32" text-anchor="middle" fill="#6B7280" font-family="system-ui, sans-serif" font-size="28" font-weight="bold">?</text>
      </svg>
    `;

    return new Response(svgContent, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }
}
