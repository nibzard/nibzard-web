import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function SearchFeed({ feedEntries }) {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => new Fuse(feedEntries, {
    keys: [
      'entry.data.title',
      'entry.data.tldr',
      'entry.data.tags',
      'entry.data.description',
      'entry.data.text',
      'entry.data.content',
      'entry.data.caption',
      'entry.data.body',
      'entry.slug',
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
    <>
      <div className="search-bar-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          autoComplete="off"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <div className="feed-timeline">
        {results.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
            No results found.
          </div>
        )}
        {results.map((item, index) => {
          if (item.type === 'log') {
            const log = item.entry;
            const title = log.data.title || 'Log Entry';
            const tldr = log.data.tldr;
            const date = formatDate(log.data.date);
            return (
              <article className="log-entry" key={index}>
                <div className="entry-meta">
                  <time>{date}</time>
                </div>
                <div className="log-entry-content">
                  <h2>{title}</h2>
                  {tldr && <p className="log-entry-tldr">{tldr}</p>}
                </div>
              </article>
            );
          } else if (item.type === 'thought') {
            const thought = item.entry;
            const date = formatDate(thought.data.date);
            return (
              <div className="thought-entry" key={index}>
                <div className="entry-meta">
                  <time>{date}</time> Thought
                </div>
                <blockquote>{thought.data.text || ''}</blockquote>
              </div>
            );
          } else if (item.type === 'now') {
            const now = item.entry;
            const date = formatDate(now.data.date);
            return (
              <div className="now-entry" key={index}>
                <div className="entry-meta">
                  <time>{date}</time> Now
                </div>
                <div>{now.data.title || ''}</div>
              </div>
            );
          } else if (item.type === 'image') {
            const img = item.entry;
            const date = formatDate(img.data.date);
            return (
              <div className="image-entry" key={index}>
                <div className="entry-meta">
                  <time>{date}</time> Image
                </div>
                <div>{img.data.caption || ''}</div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
}