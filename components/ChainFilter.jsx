"use client";
import React from 'react';

export default function ChainFilter({ value, chains = [], onChange }) {
  return (
    <label className="text-sm text-gray-700 dark:text-gray-300">Chain
      <select
        data-test="chain-filter"
        value={value || ''}
        onChange={e => onChange?.(e.target.value || null)}
        className="ml-2 border border-gray-300 dark:border-gray-600 px-2 py-1 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        <option value="">All</option>
        {chains.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </label>
  );
}