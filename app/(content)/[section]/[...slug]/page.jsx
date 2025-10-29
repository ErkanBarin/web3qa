import React from 'react';
import ArticleMeta from '../../../../components/ArticleMeta.jsx';
import ReadingProgress from '../../../../components/ReadingProgress.jsx';
import TableOfContents from '../../../../components/TableOfContents.jsx';
import Quiz from '../../../../components/Quiz.jsx';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '../../../../lib/contentlayer-helpers.js';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Link from 'next/link';
// Contentlayer generated imports via relative path (Next.js app directory)
import { allArticles } from '../../../../.contentlayer/generated';

// Function to generate heading IDs
const generateId = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Enhanced MDX components with better styling
const mdxComponents = {
  a: ({ href, ...props }) => {
    if (href?.startsWith('http')) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline decoration-blue-300 dark:decoration-blue-600 underline-offset-2 transition-colors"
          {...props} 
        />
      );
    }
    return (
      <Link 
        href={href || '#'} 
        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline decoration-blue-300 dark:decoration-blue-600 underline-offset-2 transition-colors"
        {...props} 
      />
    );
  },
  h1: ({ children, ...props }) => {
    const id = generateId(typeof children === 'string' ? children : '');
    return (
      <h1 id={id} className="text-4xl font-bold text-gray-900 dark:text-white mt-12 mb-6 first:mt-0 leading-tight scroll-mt-24" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    const id = generateId(typeof children === 'string' ? children : '');
    return (
      <h2 id={id} className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-5 leading-tight border-b border-gray-200 dark:border-gray-700 pb-3 scroll-mt-24" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = generateId(typeof children === 'string' ? children : '');
    return (
      <h3 id={id} className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 leading-tight scroll-mt-24" {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => {
    const id = generateId(typeof children === 'string' ? children : '');
    return (
      <h4 id={id} className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3 leading-tight scroll-mt-24" {...props}>
        {children}
      </h4>
    );
  },
  p: ({ children, ...props }) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-none space-y-2 mb-6 ml-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal space-y-2 mb-6 ml-6 marker:text-blue-500 marker:font-semibold" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-gray-700 dark:text-gray-300 leading-relaxed relative pl-6" {...props}>
      <span className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full"></span>
      {children}
    </li>
  ),
  pre: ({ children, ...props }) => (
    <div className="my-6">
      <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-6 rounded-xl overflow-x-auto border border-gray-200 dark:border-gray-700 shadow-lg" {...props}>
        {children}
      </pre>
    </div>
  ),
  code: ({ children, className, ...props }) => {
    if (className?.includes('language-')) {
      return <code className={className} {...props}>{children}</code>;
    }
    return (
      <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm font-mono border border-gray-200 dark:border-gray-600" {...props}>
        {children}
      </code>
    );
  },
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 pl-6 py-4 my-6 rounded-r-lg" {...props}>
      <div className="text-blue-900 dark:text-blue-100">
        {children}
      </div>
    </blockquote>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-gray-900 dark:text-white" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </em>
  ),
  Quiz: Quiz,
};

export default function ArticlePage({ params }) {
  const section = params.section?.toLowerCase();
  const slugSegments = params.slug || [];
  const slug = slugSegments.join('/');
  const article = getArticleBySlug(section, slug) || null;

  // Fallback: attempt to match glossary by slug if section === 'glossary'
  const glossaryHit = !article && section === 'glossary'
    ? allArticles.find(t => t.section?.toLowerCase() === 'glossary' && t.slug === slug)
    : null;
  const doc = article || glossaryHit;

  if (!doc) return notFound();

  const MDXContent = useMDXComponent(doc.body.code);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ReadingProgress />
      <TableOfContents />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ArticleMeta 
          title={doc.title} 
          lastUpdated={doc.lastUpdated} 
          chain={doc.chain} 
          tags={doc.normalizedTags || doc.tags} 
        />
        
        <article className="prose prose-lg prose-gray dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-200 dark:border-gray-700">
            <MDXContent components={mdxComponents} />
          </div>
        </article>

        {/* Back to section link */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link 
            href={`/${section}`}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to {section.charAt(0).toUpperCase() + section.slice(1)}
          </Link>
        </div>
      </div>
    </div>
  );
}
