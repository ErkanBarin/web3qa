import React from 'react';
import SectionCard from '../components/SectionCard.jsx';

const SECTIONS = [
  { id: 'guides', label: 'Guides' },
  { id: 'tools', label: 'Tools' },
  { id: 'concepts', label: 'Concepts' },
  { id: 'patterns', label: 'Patterns' },
  { id: 'tutorials', label: 'Tutorials' },
  { id: 'glossary', label: 'Glossary' },
  { id: 'references', label: 'References' },
  { id: 'faq', label: 'FAQ' }
];

export default function HomePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          {/* Primary page heading for accessibility (single H1 expected by tests) */}
          <h1 className="text-2xl font-bold mb-2">Web3 Quality Knowledge Base</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-prose">Foundational content on testing, security, tooling, and best practices for Web3 ecosystems.</p>
        </div>
  {/* Theme toggle lives only in global Header now to avoid duplication for tests */}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-test="section-grid">
        {SECTIONS.map(s => (
          <SectionCard key={s.id} id={s.id} label={s.label} />
        ))}
      </div>
    </div>
  );
}
