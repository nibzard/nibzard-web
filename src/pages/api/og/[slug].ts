import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple in-memory cache for image stats
const imageCache = new Map<string, { exists: boolean; lastChecked: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function checkImageExists(imagePath: string): boolean {
  const cacheKey = imagePath;
  const cached = imageCache.get(cacheKey);
  const now = Date.now();
  
  if (cached && (now - cached.lastChecked) < CACHE_TTL) {
    return cached.exists;
  }
  
  const exists = fs.existsSync(imagePath);
  imageCache.set(cacheKey, { exists, lastChecked: now });
  return exists;
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  
  if (!slug) {
    return new Response('Slug is required', { status: 400 });
  }
  
  try {
    // Check if static OG image exists - use process.cwd() for more reliable path resolution
    const ogImagePath = path.resolve(process.cwd(), 'public/og', `${slug}.png`);
    
    if (checkImageExists(ogImagePath)) {
      // Serve existing OG image
      const imageBuffer = fs.readFileSync(ogImagePath);
      return new Response(imageBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      });
    }
    
    // If no static image exists, get the blog entry and generate one
    const logEntries = await getCollection('log');
    const entry = logEntries.find(e => e.slug === slug);
    
    if (!entry) {
      return new Response('Blog entry not found', { status: 404 });
    }
    
    // Return fallback to default OG image for now
    // In a production environment, you might want to generate the image on-demand
    // or redirect to a background job that generates it
    const fallbackPath = path.resolve(process.cwd(), 'public/og-nibzard.jpeg');
    
    if (checkImageExists(fallbackPath)) {
      const imageBuffer = fs.readFileSync(fallbackPath);
      return new Response(imageBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=3600' // Shorter cache for fallback
        }
      });
    }
    
    return new Response('OG image not found', { status: 404 });
    
  } catch (error) {
    console.error('Error serving OG image:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const prerender = false;