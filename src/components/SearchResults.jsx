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
    <ul className="search-results-list">
      {results.length === 0 && (
        <li className="search-result empty">No results found.</li>
      )}
      {results.map((item, index) => {
        const date = item.date ? formatDate(item.date) : '';

        if (item.type === 'log') {
          return (
            <li className="search-result" key={index}>
              <a href={`/${item.slug}`}>{item.title}</a>
              <div className="search-result-meta">
                {date} · Log{item.tldr ? ` · ${item.tldr}` : ''}
              </div>
            </li>
          );
        } else if (item.type === 'thought') {
          return (
            <li className="search-result" key={index}>
              <a href={`/${item.slug}`}>{item.text || 'Thought'}</a>
              <div className="search-result-meta">{date} · Thought</div>
            </li>
          );
        } else if (item.type === 'now') {
          return (
            <li className="search-result" key={index}>
              <a href={`/${item.slug}`}>{item.title || item.text || 'Now'}</a>
              <div className="search-result-meta">{date} · Now</div>
            </li>
          );
        } else if (item.type === 'image') {
          return (
            <li className="search-result" key={index}>
              <a href={`/${item.slug}`}>{item.caption || 'Image'}</a>
              <div className="search-result-meta">{date} · Image</div>
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
}
