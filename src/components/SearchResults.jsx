import React, { useEffect, useState, useMemo } from 'react';
import Fuse from 'fuse.js';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function SearchResults({ feedEntries, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);

  // Update query when initialQuery changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const fuse = useMemo(() => new Fuse(feedEntries, {
    keys: [
      'title', 'tldr', 'tags', 'text', 'caption', 'slug', 'imageUrl'
    ],
    threshold: 0.4,
    ignoreLocation: true,
    minMatchCharLength: 2,
  }), [feedEntries]);

  const results = useMemo(() => {
    if (!query) return feedEntries;
    return fuse.search(query).map(r => r.item);
  }, [query, fuse, feedEntries]);

  return (
    <div className="feed-timeline">
      {results.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
          No results found.
        </div>
      )}
      {results.map((item, index) => {
        const date = item.date ? formatDate(item.date) : 'Date N/A';
        
        if (item.type === 'log') {
          return (
            <article className="log-entry" key={index}>
              <div className="entry-meta">
                <time>{date}</time>
              </div>
              <div className="log-entry-content">
                <h2>
                  <a href={`/${item.slug}`}>{item.title}</a>
                </h2>
                {item.tldr && <p className="log-entry-tldr">{item.tldr}</p>}
              </div>
            </article>
          );
        } else if (item.type === 'thought') {
          return (
            <div className="thought-entry" key={index}>
              <div className="entry-meta">
                <time>{date}</time> Thought
              </div>
              <blockquote>{item.text || ''}</blockquote>
            </div>
          );
        } else if (item.type === 'now') {
          return (
            <div className="now-entry" key={index}>
              <div className="entry-meta">
                <time>{date}</time> Now
              </div>
              <div>{item.title || ''}</div>
            </div>
          );
        } else if (item.type === 'image') {
          return (
            <div className="image-entry" key={index}>
              <div className="entry-meta">
                <time>{date}</time> Image
              </div>
              <div>{item.caption || ''}</div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}