"use client";
import React from 'react';

function getInitial(themeKey) {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(themeKey);
  if (stored === 'dark' || stored === 'light') return stored;
  const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return prefers;
}

export default function ThemeToggle({ storageKey = 'web3qa-theme' }) {
  const [theme, setTheme] = React.useState(() => getInitial(storageKey));

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    window.localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  function toggle() {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  }

  return (
    <button
      type="button"
      data-test="theme-toggle"
      onClick={toggle}
      className="border px-3 py-2 text-xs rounded hover:bg-gray-50 dark:hover:bg-gray-800"
      aria-pressed={theme === 'dark'}
      aria-label="Toggle theme"
    >{theme === 'dark' ? 'Light' : 'Dark'}</button>
  );
}