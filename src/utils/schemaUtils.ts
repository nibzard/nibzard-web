import { AUTHOR_INFO, ORGANIZATION_INFO } from '../config/author';

export interface BlogPostSchema {
  "@type": "BlogPosting";
  headline: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  author: typeof AUTHOR_INFO;
  publisher: typeof ORGANIZATION_INFO;
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  url: string;
  keywords?: string[];
  wordCount?: number;
  articleSection?: string[];
}

export function createBlogPostSchema(data: {
  title: string;
  description?: string;
  date?: Date; // Optional to avoid crashes on not-found pages
  url: string;
  tags?: string[];
  modifiedDate?: Date;
}): BlogPostSchema {
  const published = data.date ?? new Date();
  const modified = data.modifiedDate ?? data.date ?? published;
  return {
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    datePublished: published.toISOString(),
    dateModified: modified.toISOString(),
    author: AUTHOR_INFO,
    publisher: ORGANIZATION_INFO,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": data.url
    },
    url: data.url,
    keywords: data.tags,
    articleSection: data.tags
  };
}

export function createWebsiteSchema(): Record<string, any> {
  return {
    "@type": "WebSite",
    name: "nibzard",
    url: "https://nibzard.com",
    description: "Personal website and insights from Nikola Balić on AI, growth marketing, and innovation",
    author: AUTHOR_INFO,
    publisher: ORGANIZATION_INFO,
    potentialAction: {
      "@type": "SearchAction",
      target: "https://nibzard.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

export function createPersonSchema(): typeof AUTHOR_INFO {
  return AUTHOR_INFO;
}

export function createBreadcrumbSchema(items: { name: string; url: string }[]): Record<string, any> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
