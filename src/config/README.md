# Tag Configuration System

This directory contains configuration files for the site's tag system, including standardized tags with predefined colors.

## Standardized Tags

The `tagColors.js` file defines a set of standardized tags with specific color schemes. These tags are displayed with their predefined colors throughout the site, making them visually distinct from regular tags.

### Current Standardized Tags

#### Learning/Knowledge Tags
- `TIL` (Today I Learned) - Cyan
- `TUTORIAL` - Green
- `QUOTE` - Purple
- `REVIEW` - Orange

#### Status Tags
- `NOW` - Red
- `WIP` (Work In Progress) - Amber
- `DONE` - Teal

#### Technology Tags
- `REACT` - Blue
- `ASTRO` - Lime
- `JS` - Yellow

### How to Add New Standardized Tags

To add a new standardized tag, edit the `tagColors.js` file and add a new entry to the `tagColors` object:

```javascript
'TAG_NAME': {
  backgroundColor: '#E0F7FA', // Light background color (pastel)
  textColor: '#00838F',       // Text color (darker shade)
  borderColor: '#26C6DA'      // Border color (medium shade)
}
```

Choose colors that are:
1. Pastel but vivid for the background
2. A darker shade of the same color for the text
3. A medium shade for the border

### Usage in Content

To use standardized tags in your content, simply add them to the `tags` array in your frontmatter:

```markdown
---
title: My Blog Post
date: 2023-06-15
tags: ['TIL', 'REACT', 'custom-tag']
---
```

Standardized tags will automatically be displayed in uppercase with their predefined colors, while custom tags will use the default styling.

## Utilities

The `tagUtils.js` file in the `utils` directory provides helper functions for working with tags:

- `formatTagForDisplay(tag)` - Formats a tag for display (uppercase for standardized tags)
- `sortTags(tags)` - Sorts tags with standardized tags first, then alphabetically
- `isStandardizedTag(tag)` - Checks if a tag is standardized
- `getTagColors(tag)` - Gets the color configuration for a standardized tag

## Styling

The styling for standardized tags is defined in `src/styles/components/standardized-tags.css`.
