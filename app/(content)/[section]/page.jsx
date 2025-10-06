import React from 'react';
import { notFound } from 'next/navigation';
import EmptyState from '../../../components/EmptyState.jsx';
import { normalizeChain, normalizeTag } from '../../../lib/filters.js';
import { getAllBySection } from '../../../lib/contentlayer-helpers.js';
import ListingFilters from '../../../components/ListingFilters.jsx';

const SECTIONS = ['guides','tools','concepts','patterns','tutorials','glossary','references','faq'];
const CHAINS = ['ethereum','arbitrum','optimism','polygon','base','avalanche'];
const TAGS = ['testing','security','tooling','guides','glossary','architecture','best-practices','performance'];

function normalize(value, list) {
  if (!value) return null;
  const v = value.toLowerCase();
  return list.includes(v) ? v : null;
}

export default function SectionListing({ params, searchParams }) {
  const section = params.section?.toLowerCase();
  if (!SECTIONS.includes(section)) return notFound();

  const chain = normalizeChain(searchParams.chain);
  const tag = normalizeTag(searchParams.tag);
  const qRaw = (searchParams.q || '').trim();
  const q = qRaw.length >= 2 ? qRaw : null;

  const sectionItems = getAllBySection(section);
  const allItems = sectionItems.map(a => ({
    title: a.title,
    description: a.description,
    chain: a.chain?.toLowerCase() || null,
    tags: a.normalizedTags || a.tags || [],
    slug: a.slug
  }));
  const filtered = allItems.filter(item => {
    if (chain && item.chain !== chain) return false;
    if (tag && !item.tags.includes(tag)) return false;
    if (q && !(`${item.title} ${item.description}`.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 capitalize">{section}</h2>
      <ListingFilters section={section} chain={chain} tag={tag} q={q} chains={CHAINS} tags={TAGS} />
      {filtered.length === 0 && (
        <EmptyState resetHref={`/${section}`}>No matching items yet for these filters.</EmptyState>
      )}
      {filtered.length > 0 && (
        <ul className="space-y-4" data-test="listing-results">
          {filtered.map(item => (
            <li key={item.slug} className="border rounded p-4 hover:border-brand-accent transition-colors">
              <a href={`/${section}/${item.slug}`} className="block">
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">{item.description}</p>
                <div className="flex gap-2 flex-wrap text-[10px] text-gray-500 dark:text-gray-400">
                  {item.chain && <span className="px-2 py-0.5 border rounded">{item.chain}</span>}
                  {item.tags.slice(0,4).map(t => <span key={t} className="px-2 py-0.5 border rounded">{t}</span>)}
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
