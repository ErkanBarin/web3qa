import React from 'react';
import Link from 'next/link';
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
      {/* Hero Section */}
      <div className="text-center mb-16 px-4">
        {/* Primary page heading for accessibility (single H1 expected by tests) */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Web3 Testing
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Master the art of testing <span className="font-semibold text-blue-600 dark:text-blue-400">blockchain technology</span> with practical guides, real-world examples, and proven strategies.
        </p>
        
        {/* What is Web3 - Brief explanation */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 mb-8 max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">🌐 What is Web3?</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Web3 is the <strong>decentralized internet</strong> powered by blockchain technology. Unlike traditional web apps, Web3 applications run on distributed networks, use smart contracts, and give users true ownership of their data and assets.
          </p>
        </div>

        {/* Why Web3 Testing Matters */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 mb-8 max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">🔒 Why Test Web3?</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            In Web3, <strong>bugs can cost millions</strong>. Smart contracts are immutable, transactions are irreversible, and user funds are at stake. Rigorous testing isn't just good practice—it's essential for security and trust.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 mb-12 max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">🎯 Why This Site Exists</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I'm <strong>Erkan</strong>, a QA engineer who noticed the gap between traditional testing and Web3 needs. This site bridges that gap with <strong>practical, real-world testing strategies</strong> that actually work in the blockchain ecosystem.
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            href="/guides" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start Learning
          </Link>
          <Link 
            href="/about" 
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            About Erkan
          </Link>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Explore Knowledge Areas</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-test="section-grid">
          {SECTIONS.map(s => (
            <SectionCard key={s.id} id={s.id} label={s.label} />
          ))}
        </div>
      </div>
    </div>
  );
}
