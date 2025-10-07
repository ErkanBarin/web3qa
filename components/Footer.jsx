import React from 'react';

export default function Footer() {
  return (
    <footer className="p-4 text-sm border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-12" data-test="site-footer">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Web3 QA</p>
        <nav aria-label="Footer" className="text-xs text-gray-500 dark:text-gray-400 flex gap-4">
          <a href="/guides" className="hover:underline">Guides</a>
          <a href="/glossary" className="hover:underline">Glossary</a>
          <a href="/about" className="hover:underline">About Me</a>
          <span className="opacity-60">Sitemap (coming)</span>
        </nav>
      </div>
    </footer>
  );
}