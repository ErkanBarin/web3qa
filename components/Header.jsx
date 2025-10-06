import React from 'react';
import ThemeToggle from './ThemeToggle.jsx';

export function Header() {
  return (
    <header className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between" data-test="site-header">
      <div className="flex items-center gap-6">
        <a href="/" className="font-semibold tracking-tight text-lg">Web3 QA</a>
        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex gap-4 text-sm">
            <li><a href="/guides" className="hover:underline">Guides</a></li>
            <li><a href="/glossary" className="hover:underline">Glossary</a></li>
          </ul>
        </nav>
      </div>
      <div><ThemeToggle /></div>
    </header>
  );
}

export default Header;