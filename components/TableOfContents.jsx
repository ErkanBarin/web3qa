'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const headingElements = document.querySelectorAll('h1, h2, h3, h4');
    const headingList = Array.from(headingElements).map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      if (!heading.id) {
        heading.id = id;
      }
      return {
        id,
        text: heading.textContent,
        level: parseInt(heading.tagName.charAt(1)),
      };
    });
    setHeadings(headingList);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="hidden xl:block fixed right-8 top-1/2 transform -translate-y-1/2 w-64 max-h-96 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Table of Contents
        </h3>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`block w-full text-left text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                activeId === heading.id
                  ? 'text-blue-600 dark:text-blue-400 font-medium border-l-2 border-blue-500 pl-3'
                  : 'text-gray-600 dark:text-gray-400 pl-3'
              } ${
                heading.level === 1 ? 'font-medium' :
                heading.level === 2 ? 'ml-2' :
                heading.level === 3 ? 'ml-4' :
                'ml-6'
              }`}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}