import React from 'react';
import Link from 'next/link';
import SectionCard from '../components/SectionCard.jsx';

const SECTIONS = [
  { id: 'guides', label: 'Guides', icon: '📚', description: 'Comprehensive testing methodologies' },
  { id: 'tools', label: 'Tools', icon: '🛠️', description: 'Essential testing toolkit' },
  { id: 'concepts', label: 'Concepts', icon: '💡', description: 'Foundational knowledge' },
  { id: 'patterns', label: 'Patterns', icon: '♟️', description: 'Strategic testing approaches' },
  { id: 'tutorials', label: 'Tutorials', icon: '🎯', description: 'Hands-on practice' },
  { id: 'glossary', label: 'Glossary', icon: '📖', description: 'Key terminology' },
  { id: 'references', label: 'References', icon: '🔗', description: 'Quick lookups' },
  { id: 'faq', label: 'FAQ', icon: '❓', description: 'Common questions' }
];

// Blockchain symbols component
const BlockchainBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10">
    <div className="absolute top-20 left-10 text-6xl transform rotate-12 text-blue-600">₿</div>
    <div className="absolute top-40 right-20 text-5xl transform -rotate-12 text-purple-600">Ξ</div>
    <div className="absolute bottom-40 left-20 text-4xl transform rotate-45 text-orange-600">◎</div>
    <div className="absolute bottom-20 right-10 text-5xl transform -rotate-45 text-green-600">₳</div>
    <div className="absolute top-60 left-1/2 text-4xl transform rotate-90 text-indigo-600">⊕</div>
    <div className="absolute top-32 left-1/3 text-3xl transform -rotate-12 text-pink-600">▲</div>
    <div className="absolute bottom-60 right-1/3 text-4xl transform rotate-12 text-teal-600">◆</div>
  </div>
);

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Blockchain Background */}
      <BlockchainBackground />
      
      {/* Hero Section */}
      <div className="relative z-10">
        {/* Main Hero */}
        <div className="text-center mb-16 px-4 py-12 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50 dark:from-gray-900/50 dark:via-blue-950/30 dark:to-purple-950/50 rounded-3xl mx-4 backdrop-blur-sm">
          {/* Primary page heading for accessibility */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Web3 Testing
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Master the art of testing <span className="font-semibold text-blue-600 dark:text-blue-400">blockchain technology</span> with practical guides, real-world examples, and proven strategies that actually work in production.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex justify-center mb-12">
            <Link 
              href="/guides" 
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center">
                Start Learning
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Multi-Chain Focus Section */}
        <div className="mb-16 px-4">
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 rounded-2xl p-8 max-w-5xl mx-auto border border-amber-200 dark:border-amber-800/30 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  Ξ
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                  🌟 Multi-Chain Focus
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  The world of Web3 is massive. I'm building the ultimate QA resource, one ecosystem at a time.
                </p>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span><strong>EVM Universe:</strong> The core content features in-depth guides and tutorials for the <strong>Ethereum Virtual Machine (EVM)</strong>, which covers Ethereum, Polygon, Base, Avalanche, and all compatible chains.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span><strong>Now Live - XRPL:</strong> It's expanded! Now there is a complete section dedicated to the <strong>XRP Ledger</strong>, covering both the Native Hooks (on Xahau) and the EVM Sidechain.</span>
                  </li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  As the site grows, I'll be rolling out dedicated content for other powerful ecosystems, including <strong>Solana</strong>, <strong>Avalanche</strong>, <strong>Sui</strong>, and <strong>Cardano</strong>. Stay tuned! 🚀
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Concepts Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 px-4">
          {/* What is Web3 */}
          <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800/30 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">What is Web3?</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Web3 is the <strong>decentralized internet</strong> powered by blockchain technology. Unlike traditional web apps, Web3 applications run on distributed networks, use smart contracts, and give users true ownership of their data and assets.
            </p>
          </div>

          {/* Why Test Web3 */}
          <div className="group bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 rounded-2xl p-8 border border-red-200 dark:border-red-800/30 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Why Test Web3?</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              In Web3, <strong>bugs can cost millions</strong>. Smart contracts are immutable, transactions are irreversible, and user funds are at stake. Rigorous testing isn't just good practice—it's essential for security and trust.
            </p>
          </div>

          {/* Mission */}
          <div className="group bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-8 border border-green-200 dark:border-green-800/30 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Why This Site Exists</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm <strong>Erkan</strong>, a QA engineer who noticed the gap between traditional testing and Web3 needs. This site bridges that gap with <strong>practical, real-world testing strategies</strong> that actually work.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Sections Grid */}
      <div className="relative z-10 mb-8 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Explore Knowledge Areas</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive resources covering every aspect of Web3 testing, from foundational concepts to advanced patterns.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto" data-test="section-grid">
          {SECTIONS.map(s => (
            <div key={s.id} className="group">
              <Link href={`/${s.id}`} className="block">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {s.label}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {s.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
