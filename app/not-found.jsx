import React from 'react';

export default function NotFound() {
  return (
    <div className="py-16 text-center" data-test="not-found">
      <h1 className="text-3xl font-bold mb-4">Page not found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-prose mx-auto">
        We couldn\'t locate that resource. It may have been removed, had its name changed, or is temporarily unavailable.
      </p>
  <a href="/" data-test="return-home" className="text-sm underline text-brand-accent">Return to homepage</a>
    </div>
  );
}
