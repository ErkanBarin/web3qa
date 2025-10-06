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

  return (
    <div className="prose dark:prose-invert mx-auto px-4 py-10">
      <MDXContent />
    </div>
  );
}