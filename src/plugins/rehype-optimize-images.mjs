import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to optimize images with lazy loading and responsive attributes
 */
export default function rehypeOptimizeImages() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        const src = node.properties.src;
        
        // Add lazy loading
        node.properties.loading = 'lazy';
        
        // Add decoding optimization
        node.properties.decoding = 'async';
        
        // Add modern image optimization attributes
        node.properties.fetchpriority = 'auto';
        
        // Add sizes attribute for responsive images
        if (!node.properties.sizes) {
          node.properties.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 800px, 800px';
        }
        
        // If the image doesn't have width/height, add reasonable defaults
        // This prevents layout shift (CLS improvement)
        if (!node.properties.width && !node.properties.height) {
          // Determine dimensions based on image type
          if (src && src.includes('berghain_billboard')) {
            node.properties.width = '800';
            node.properties.height = '400'; // Billboard aspect ratio
          } else if (src && src.includes('berghain_TUI')) {
            node.properties.width = '800';
            node.properties.height = '500'; // Dashboard aspect ratio
          } else {
            // Default for other images
            node.properties.width = '800';
            node.properties.height = '600';
          }
          node.properties.style = 'height: auto; max-width: 100%;'; // Maintain aspect ratio and responsiveness
        }
        
        // Add fetchpriority for above-the-fold images (LCP optimization)
        if (src && src.includes('berghain_billboard')) {
          node.properties.fetchpriority = 'high';
          node.properties.loading = 'eager'; // Override lazy for first image
        }
        
        // Add alt text improvements if missing
        if (!node.properties.alt || node.properties.alt.trim() === '') {
          if (src && src.includes('berghain_billboard')) {
            node.properties.alt = 'Listen Labs mysterious billboard with cryptic numbers';
          } else if (src && src.includes('berghain_sitedown')) {
            node.properties.alt = 'Berghain Challenge website showing server error during viral load';
          } else if (src && src.includes('berghain_TUI')) {
            node.properties.alt = 'Real-time TUI dashboard monitoring RBCR performance';
          }
        }
      }
    });
  };
}