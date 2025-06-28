# Ghost CMS Integration

This project integrates with Ghost CMS to dynamically generate pages.

## Environment Variables

Add these environment variables to your `.env.local` file:

```bash
GHOST_URL=https://your-ghost-site.ghost.io
GHOST_CONTENT_API_KEY=your-content-api-key-here
```

## How to get your Ghost Content API Key

1. Go to your Ghost Admin panel
2. Navigate to Settings > Integrations
3. Click "Add custom integration"
4. Give it a name (e.g., "Next.js Website")
5. Copy the Content API Key

## Features

- Automatically creates dynamic routes for Ghost pages
- Skips pages with slugs that conflict with existing Next.js routes (`about`, `appointment`, `consulting`, `api`)
- Generates proper metadata for SEO
- Handles 404 cases gracefully
- Responsive design with Tailwind CSS

## Route Conflicts

The following routes are protected and Ghost pages with these slugs will be skipped:

- `/about`
- `/appointment`
- `/consulting`
- `/api`

## Usage

Once configured, Ghost pages will automatically be available at `/{page-slug}` unless they conflict with existing routes.
