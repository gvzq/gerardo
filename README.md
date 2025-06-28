[![Deploy Next.js site to Pages](https://github.com/gvzq/gerardo/actions/workflows/nextjs-publish.yml/badge.svg?branch=main)](https://github.com/gvzq/gerardo/actions/workflows/nextjs-publish.yml)

# Gerardo's Portfolio

A modern portfolio website built with Next.js, featuring dynamic content management through Ghost CMS integration.

## Features

- 🏗️ Built with Next.js 14 and TypeScript
- 🎨 Styled with Tailwind CSS
- 📝 Dynamic content management with Ghost CMS
- 🚀 Optimized for both Vercel and GitHub Pages deployment
- 📱 Responsive design
- 🔍 SEO optimized with automatic sitemap generation

## Environment Variables

For Ghost CMS integration, you need to configure the following environment variables:

### Required Environment Variables

```bash
GHOST_URL=https://your-ghost-site.com
GHOST_CONTENT_API_KEY=your_content_api_key_here
```

### How to get your Ghost CMS credentials:

1. **GHOST_URL**: Your Ghost site URL (e.g., `https://yourblog.ghost.io`)
2. **GHOST_CONTENT_API_KEY**:
   - Go to your Ghost Admin panel
   - Navigate to Settings → Integrations
   - Click "Add custom integration"
   - Copy the "Content API Key"

### Vercel Deployment

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the above environment variables

### Local Development

Create a `.env.local` file in your project root:

```bash
GHOST_URL=https://your-ghost-site.com
GHOST_CONTENT_API_KEY=your_content_api_key_here
```

## Deployment

### Vercel (Recommended for Dynamic Content)

This configuration enables serverless functions to fetch Ghost CMS content on-demand:

```bash
npm run build
```

Vercel will automatically deploy with dynamic page generation enabled.

### GitHub Pages (Static Export)

For static deployment to GitHub Pages:

```bash
npm run build:github
```

This generates a static export of all Ghost CMS pages at build time.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## How It Works

- **Dynamic Routes**: The `[slug]` route dynamically fetches content from Ghost CMS
- **Conflict Resolution**: Built-in protection against route conflicts with existing Next.js pages
- **Serverless Functions**: On Vercel, pages are generated on-demand using serverless functions
- **Static Generation**: For GitHub Pages, all pages are pre-built at deployment time

## Ghost CMS Integration

The site automatically pulls pages from your Ghost CMS and makes them available at `yoursite.com/[slug]`. Pages that conflict with existing routes (like `/about`, `/consulting`) are automatically excluded.

# Deploying to GitHub Pages

This example supports deloying a static Next.js application (using `next export`) to GitHub Pages.

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example github-pages nextjs-github-pages
# or
yarn create next-app --example github-pages nextjs-github-pages
# or
pnpm create next-app --example github-pages nextjs-github-pages
```

### Deploy to GitHub Pages

1.  Create a new public GitHub repository.
1.  Edit `next.config.js` to match your GitHub repository name.
1.  Push the starter code to the `main` branch.
1.  Run the `deploy` script (e.g. `npm run deploy`) to create the `gh-pages` branch.
1.  On GitHub, go to **Settings** > **Pages** > **Source**, and choose `gh-pages` as the branch with the `/root` folder. Hit **Save**.
1.  Make a change.
1.  Run the `deploy` script again to push the changes to GitHub Pages.

Congratulations! You should have a URL like:

```bash
https://<github-user-name>.github.io/<github-project-name>/
```
