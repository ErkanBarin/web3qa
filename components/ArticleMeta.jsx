import React from 'react';

export default function ArticleMeta({ title, lastUpdated, chain, tags = [] }) {
  return (
    <header className="mb-6" data-test="article-meta">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
      {lastUpdated && (
        <p data-test="last-updated" className="text-xs text-gray-500">Last updated: {new Date(lastUpdated).toISOString().split('T')[0]}</p>
      )}
      <div className="flex flex-wrap gap-2 mt-3 text-xs">
        {chain && <span className="inline-block px-2 py-1 border rounded bg-gray-50 dark:bg-gray-900">{chain}</span>}
        {tags.map(t => (
          <span key={t} className="inline-block px-2 py-1 border rounded">{t}</span>
        ))}
      </div>
    </header>
  );
}