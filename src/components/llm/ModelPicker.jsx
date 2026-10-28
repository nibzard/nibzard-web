import { useEffect, useMemo, useRef, useState } from 'react';
import Fuse from 'fuse.js';
import { MODEL_CACHE_READ, MODEL_CONTEXT, MODEL_INPUT, MODEL_KEY, MODEL_OUTPUT, formatUSD } from '../../../scripts/lib/llm-prices.mjs';

const MAX_OPTIONS = 50;

function formatContext(context) {
  if (!context) return '';
  return context >= 1000000 ? `${(context / 1000000).toFixed(context % 1000000 === 0 ? 0 : 1)}M ctx` : `${Math.round(context / 1000)}k ctx`;
}

function optionMeta(model) {
  const parts = [`in ${formatUSD(model[MODEL_INPUT])} / out ${formatUSD(model[MODEL_OUTPUT])} per MTok`];
  if (model[MODEL_CACHE_READ] !== null) parts.push(`cached ${formatUSD(model[MODEL_CACHE_READ])}`);
  const context = formatContext(model[MODEL_CONTEXT]);
  if (context) parts.push(context);
  return parts.join(' · ');
}

export default function ModelPicker({ models, providerNames, modelKey, onSelect }) {
  const [query, setQuery] = useState(modelKey);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const blurTimer = useRef(null);

  const selected = models.find(model => model[MODEL_KEY] === modelKey) ?? null;
  // The input is driven by `query` alone. While closed it mirrors the
  // selection; a fresh selection from outside (shared URL, full-list fetch)
  // updates the display without reopening the list.
  useEffect(() => {
    if (!open) setQuery(selected ? selected[MODEL_KEY] : '');
  }, [selected, open]);
  const entries = useMemo(() => models.map(model => {
    const key = model[MODEL_KEY];
    const provider = key.slice(0, key.indexOf(':'));
    return {
      key,
      model,
      id: key.slice(key.indexOf(':') + 1),
      provider,
      providerName: providerNames[provider] || provider,
    };
  }), [models, providerNames]);

  const fuse = useMemo(() => new Fuse(entries, {
    keys: ['id', 'provider', 'providerName'],
    threshold: 0.35,
    ignoreLocation: true,
    minMatchCharLength: 2,
  }), [entries]);

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length === 0) return entries.slice(0, MAX_OPTIONS); // ranked: popular first
    return fuse.search(trimmed).slice(0, MAX_OPTIONS).map(result => result.item);
  }, [query, fuse, entries]);

  const visible = open && results.length > 0;

  function choose(entry) {
    onSelect(entry.key);
    setQuery(entry.key);
    setOpen(false);
  }

  function onKeyDown(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(index => {
        const next = event.key === 'ArrowDown' ? index + 1 : index - 1;
        return Math.max(0, Math.min(results.length - 1, next));
      });
    } else if (event.key === 'Enter' && visible) {
      event.preventDefault();
      if (results[activeIndex]) choose(results[activeIndex]);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className="llm-calc-picker">
      <label className="llm-calc-label" htmlFor="llm-model">Model</label>
      <input
        id="llm-model"
        type="text"
        role="combobox"
        autoComplete="off"
        aria-expanded={visible}
        aria-controls="llm-model-list"
        aria-autocomplete="list"
        aria-activedescendant={visible ? `llm-model-option-${activeIndex}` : undefined}
        placeholder="Search models…"
        value={query}
        onChange={event => { setQuery(event.target.value); setOpen(true); setActiveIndex(0); }}
        onFocus={event => { setOpen(true); event.target.select(); }}
        onBlur={() => { blurTimer.current = setTimeout(() => { setOpen(false); setQuery(selected ? selected[MODEL_KEY] : ''); }, 120); }}
        onKeyDown={onKeyDown}
      />
      {visible && (
        <ul className="llm-calc-listbox" id="llm-model-list" role="listbox" aria-label="Models">
          {results.map((entry, index) => (
            <li
              key={entry.key}
              id={`llm-model-option-${index}`}
              role="option"
              aria-selected={entry.key === modelKey}
              className="llm-calc-option"
              data-active={index === activeIndex || undefined}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={event => { event.preventDefault(); clearTimeout(blurTimer.current); choose(entry); }}
            >
              <span className="llm-calc-option-id">{entry.id}</span>
              <span className="llm-calc-option-meta">{entry.providerName} · {optionMeta(entry.model)}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="llm-calc-picker-hint">{selected ? `${optionMeta(selected)}` : 'Prices are USD per million tokens.'}</p>
    </div>
  );
}
