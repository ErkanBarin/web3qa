import React from 'react';

export default function SectionCard({ id, label, description }) {
  return (
    <a
      data-test="section-card"
      href={`/${id}`}
      className="block border border-gray-200 dark:border-gray-800 rounded p-4 hover:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors group"
    >
      <h3 className="font-semibold mb-1 text-lg flex items-center gap-2">
        {label}
        <span className="text-xs font-normal text-gray-400 group-hover:text-brand-accent transition-colors">→</span>
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{description || `Explore ${label.toLowerCase()} resources`}</p>
    </a>
  );
}