import React from 'react';

export default function EmptyState({ title = 'No results', children, resetHref = '' }) {
  return (
    <div data-test="empty-state" className="border rounded p-6 text-sm text-gray-600 dark:text-gray-400">
      <p className="font-medium mb-1">{title}</p>
      <div className="mb-3">{children || <p>Try adjusting your filters or clearing them.</p>}</div>
      {resetHref !== null && (
        <a href={resetHref} className="inline-block text-xs underline text-brand-accent">Clear filters</a>
      )}
    </div>
  );
}