# OG Image Generation System

This document describes the programmatic OG image generation system for blog posts.

## Overview

The system automatically generates custom Open Graph images for each blog post using:
- **Puppeteer** for rendering HTML to images
- **Sharp** for image optimization
- **Custom HTML template** with consistent branding
- **API endpoint** for dynamic serving
- **Build-time generation** for optimal performance

## Generated Files

```
├── templates/
│   └── og-image.html              # HTML template for OG images
├── scripts/
│   ├── generate-og-images.js      # Main OG image generation script
│   └── prebuild-og.js             # Pre-build hook for OG generation
├── src/pages/api/og/
│   └── [slug].ts                  # API endpoint for serving OG images
├── public/og/                     # Generated OG images (created at build time)
│   ├── {slug}.png                 # Individual blog post OG images
│   └── ...
```

## Usage

### Generate OG Images

```bash
# Generate OG images for all blog posts
pnpm run generate:og

# Force regenerate all OG images
pnpm run generate:og:force

# Build process automatically generates OG images
pnpm run build
```

### Template Customization

The OG image template (`templates/og-image.html`) uses these variables:
- `{{TITLE}}` - Blog post title
- `{{DESCRIPTION}}` - Blog post description
- `{{AUTHOR}}` - Author name
- `{{DATE}}` - Formatted publication date
- `{{TAGS}}` - Array of tags (rendered as styled tags)

### API Endpoint

Each blog post's OG image is served via:
```
/api/og/{slug}
```

The endpoint:
1. Checks for pre-generated static image
2. Falls back to default OG image if none exists
3. Implements caching for performance
4. Returns optimized PNG images

## Integration

### Layout Components

The `LogEntryLayout.astro` automatically:
- Generates the correct OG image URL based on the post slug
- Passes the dynamic OG image URL to `BaseLayout`
- Includes proper Open Graph meta tags

### Meta Tags

Each blog post includes these OG meta tags:
```html
<meta property="og:image" content="/api/og/{slug}">
<meta property="og:type" content="article">
<meta property="og:article:published_time" content="{date}">
<meta property="og:article:author" content="{author}">
<meta property="og:article:section" content="Technology">
<meta property="og:article:tag" content="{tag}">
```

## Performance

- **Build-time generation**: OG images are generated during the build process
- **Caching**: API endpoint includes caching headers and in-memory cache
- **Image optimization**: Sharp optimizes PNG output for size
- **Fallback mechanism**: Default OG image used if specific image unavailable

## Design Features

The OG image template includes:
- **Consistent branding** with nibzard logo and colors
- **Responsive typography** that adapts to content length
- **Tag visualization** showing post categories
- **Author attribution** with profile information
- **Modern gradient background** with accent elements
- **1200x630 dimensions** optimized for social platforms

## Social Media Support

Generated images are optimized for:
- **Twitter/X** - Proper dimensions and contrast
- **LinkedIn** - Professional appearance
- **Facebook** - Clear readability
- **Discord** - Good thumbnail rendering
- **Slack** - Clean preview display

## Troubleshooting

### Common Issues

1. **Missing OG images**: Run `pnpm run generate:og` manually
2. **Build failures**: Check Puppeteer installation and dependencies
3. **Image quality**: Adjust Sharp settings in generation script
4. **Template errors**: Validate HTML template syntax

### Debug Mode

Add `--debug` flag to generation script for verbose output:
```bash
node scripts/generate-og-images.js --debug
```

## Future Enhancements

- **On-demand generation** for new posts
- **Template variants** for different post types
- **A/B testing** for OG image effectiveness
- **Analytics integration** for social media performance
- **Automated testing** for image generation