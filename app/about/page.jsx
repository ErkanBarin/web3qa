import React from 'react';
import { notFound } from 'next/navigation';
import { allArticles } from '../../.contentlayer/generated/index.mjs';
import { useMDXComponent } from 'next-contentlayer/hooks';

export default function AboutPage() {
  // Find the About article
  const aboutArticle = allArticles.find(article => 
    article.section === 'about' && article.slug === ''
  );

  if (!aboutArticle) return notFound();

  // Use the MDX component hook
  const MDXContent = useMDXComponent(aboutArticle.body.code);

  // Define custom components for MDX rendering
  const components = {
    a: ({ href, children, ...props }) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
        {...props}
      >
        {children}
      </a>
    ),
  };

  return (
    <div className="prose dark:prose-invert mx-auto px-4 py-10">
      <MDXContent components={components} />
    </div>
  );
}