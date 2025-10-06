"use client";
import React from 'react';
import ChainFilter from './ChainFilter.jsx';
import TagFilter from './TagFilter.jsx';
import { serializeQuery } from '../lib/filters.js';

export default function ListingFilters({ section, chain, tag, q, chains, tags }) {
  function updateQuery(next) {
    // Always read fresh URL to ensure we preserve concurrent updates
    const url = new URL(window.location.href);
    Object.entries(next).forEach(([k, v]) => {
      if (!v) url.searchParams.delete(k); else url.searchParams.set(k, v);
    });
    // Use setTimeout to allow any pending updates to complete first
    setTimeout(() => {
      window.location.href = url.pathname + serializeQuery(Object.fromEntries(url.searchParams.entries()));
    }, 10);
  }

  return (
    <div className="flex flex-wrap gap-4 mb-6" aria-label="Filters">
      <ChainFilter value={chain} chains={chains} onChange={val => updateQuery({ chain: val, tag, q })} />
      <TagFilter value={tag} tags={tags} onChange={val => updateQuery({ chain, tag: val, q })} />
      <label className="text-sm">Search
        <input
          name="q"
          defaultValue={q || ''}
          onKeyDown={e => { if (e.key === 'Enter') updateQuery({ chain, tag, q: e.currentTarget.value }); }}
          className="ml-2 border px-2 py-1 rounded"
          placeholder="Search"
        />
      </label>
    </div>
  );
}
