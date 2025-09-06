// ABOUTME: This plugin adds anchor links to h2 headings in markdown content
// ABOUTME: It creates clickable hash links for better navigation and linking
import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export default function rehypeHeadingAnchors() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h2') {
        const headingText = toString(node);
        const id = slugify(headingText);
        
        // Add id to the heading
        node.properties.id = id;
        
        // Create the anchor link (only the hashtag is clickable)
        const anchorLink = {
          type: 'element',
          tagName: 'a',
          properties: {
            href: `#${id}`,
            className: ['heading-anchor'],
            ariaLabel: `Link to ${headingText}`,
            title: `Link to ${headingText}`
          },
          children: [
            {
              type: 'text',
              value: '#'
            }
          ]
        };
        
        // Add the anchor link as the first child, followed by spacing
        node.children.unshift(
          anchorLink,
          {
            type: 'text',
            value: ' '
          }
        );
      }
    });
  };
}