import React from 'react';
import { notFound } from 'next/navigation';
import { allArticles } from '../../.contentlayer/generated/index.mjs';
import { useMDXComponent } from 'next-contentlayer/hooks';

// Modern blockchain background component
const AboutBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10">
    <div className="absolute top-10 left-10 text-4xl transform rotate-12 text-blue-600">⚡</div>
    <div className="absolute top-20 right-20 text-3xl transform -rotate-12 text-purple-600">🔧</div>
    <div className="absolute bottom-20 left-20 text-4xl transform rotate-45 text-green-600">✅</div>
    <div className="absolute bottom-10 right-10 text-3xl transform -rotate-45 text-orange-600">🛡️</div>
    <div className="absolute top-1/2 left-1/4 text-2xl transform rotate-90 text-indigo-600">🔍</div>
    <div className="absolute top-1/3 right-1/3 text-3xl transform -rotate-12 text-pink-600">⚙️</div>
  </div>
);

export default function AboutPage() {
  // Find the About article
  const aboutArticle = allArticles.find(article => 
    article.section === 'about' && article.slug === ''
  );

  if (!aboutArticle) return notFound();

  // Use the MDX component hook
  const MDXContent = useMDXComponent(aboutArticle.body.code);

  // Define enhanced custom components for MDX rendering
  const components = {
    h3: ({ children, ...props }) => (
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6" {...props}>
        {children}
      </p>
    ),
    a: ({ href, children, ...props }) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        {...props}
      >
        {children}
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    ),
    hr: () => (
      <div className="my-12 flex items-center">
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
        <div className="mx-4 text-2xl">⚡</div>
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
      </div>
    ),
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Background elements */}
      <AboutBackground />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 px-4 py-16 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50 dark:from-gray-900/50 dark:via-blue-950/30 dark:to-purple-950/50 rounded-3xl mx-4 backdrop-blur-sm">
          {/* Profile Avatar */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
              E
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Meet Erkan
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            QA Engineer bridging <span className="font-semibold text-blue-600 dark:text-blue-400">Web2 and Web3</span> testing worlds with practical insights and real-world expertise.
          </p>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">QA Engineering</h3>
              <p className="text-gray-600 dark:text-gray-400">Years of testing experience across traditional and blockchain systems</p>
            </div>
            
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-3">⛓️</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Blockchain Focus</h3>
              <p className="text-gray-600 dark:text-gray-400">Specialized in smart contracts, dApps, and Web3 security testing</p>
            </div>
            
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Knowledge Sharing</h3>
              <p className="text-gray-600 dark:text-gray-400">Creating practical resources for the Web3 testing community</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4">
          {/* Main story card */}
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700 mb-12">
            <MDXContent components={components} />
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-8 border border-green-200 dark:border-green-800/30 shadow-lg mb-12">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  🎯
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  My Mission
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  To make Web3 technology <strong>more secure, reliable, and transparent</strong> by sharing practical testing strategies that actually work in production. I believe in clarity over hype, reproducible results over promises, and building trust through verified test cases.
                </p>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800/30 shadow-lg">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Security First</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                In Web3, security isn't optional. Every testing strategy I share prioritizes identifying vulnerabilities before they can cause real-world damage.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800/30 shadow-lg">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Practical Approach</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Theory is important, but I focus on strategies that work in the real world. Every guide includes hands-on examples you can actually use.
              </p>
            </div>
          </div>

          {/* Connect Section */}
          <div className="text-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Let's Connect
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Always happy to connect with other QA engineers, blockchain enthusiasts, and anyone passionate about making Web3 better.
            </p>
            <a 
              href="https://www.linkedin.com/in/erkan-barin/"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}