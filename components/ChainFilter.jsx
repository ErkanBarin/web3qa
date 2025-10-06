"use client";
import React from 'react';

export default function ChainFilter({ value, chains = [], onChange }) {
  return (
    <label className="text-sm">Chain
      <select
        data-test="chain-filter"
        value={value || ''}
        onChange={e => onChange?.(e.target.value || null)}
        className="ml-2 border px-2 py-1 rounded"
      >
        <option value="">All</option>
        {chains.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </label>
  );
}