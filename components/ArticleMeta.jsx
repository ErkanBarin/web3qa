import React from 'react';

export default function ArticleMeta({ title, lastUpdated, chain, tags = [] }) {
  return (
    <header className="relative mb-12 pb-8 border-b border-gray-200 dark:border-gray-700" data-test="article-meta">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl -mx-4 -my-4"></div>
      
      <div className="relative z-10 px-4 py-6">
        {/* Chain badge */}
        {chain && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-700">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              {chain.charAt(0).toUpperCase() + chain.slice(1)}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">
          {title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-300">
          {lastUpdated && (
            <div className="flex items-center" data-test="last-updated">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          )}
          
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Comprehensive Guide
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}