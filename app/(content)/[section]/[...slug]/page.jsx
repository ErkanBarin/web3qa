import React from 'react';
import ArticleMeta from '../../../../components/ArticleMeta.jsx';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '../../../../lib/contentlayer-helpers.js';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Link from 'next/link';
// Contentlayer generated imports via relative path (Next.js app directory)
import { allArticles, allGlossaryTerms } from '../../../../.contentlayer/generated';

// Custom MDX components
const mdxComponents = {
  a: ({ href, ...props }) => {
    if (href?.startsWith('http')) {
      return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
    }
    return <Link href={href || '#'} {...props} />;
  },
};

export default function ArticlePage({ params }) {
  const section = params.section?.toLowerCase();
  const slugSegments = params.slug || [];
  const slug = slugSegments.join('/');
  const article = getArticleBySlug(section, slug) || null;

  // Fallback: attempt to match glossary by slug if section === 'glossary'
  const glossaryHit = !article && section === 'glossary'
    ? allGlossaryTerms.find(t => t.slug === slug)
    : null;
  const doc = article || glossaryHit;

  if (!doc) return notFound();

  const MDXContent = useMDXComponent(doc.body.code);

  return (
    <article className="prose dark:prose-invert max-w-none">
      <ArticleMeta title={doc.title} lastUpdated={doc.lastUpdated} chain={doc.chain} tags={doc.normalizedTags || doc.tags} />
      <MDXContent components={mdxComponents} />
    </article>
  );
}
