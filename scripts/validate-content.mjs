#!/usr/bin/env node
/**
 * Validation Script (T024)
 * - Loads contentlayer generated data (will be available after build)
 * - Performs additional validation & secret scanning
 * - Emits validation report JSON
 * - Exits non-zero on errors or secrets
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Secret regex patterns (align with research.md)
const SECRET_PATTERNS = [
  { name: 'Ethereum Private Key', regex: /0x[a-fA-F0-9]{64}/g },
  { name: 'Mnemonic 12 words', regex: /\b([a-z]+\s){11}[a-z]+\b/g }
];

function scanSecrets(raw, slug) {
  const issues = [];
  const allowMatches = /<!--\s*allow-secret:\s*([^>]+?)\s*-->/g;
  const allowed = new Set();
  let m;
  while ((m = allowMatches.exec(raw))) {
    allowed.add(m[1].trim());
  }
  for (const { name, regex } of SECRET_PATTERNS) {
    regex.lastIndex = 0;
    let match;
    while ((match = regex.exec(raw))) {
      if (allowed.has(name)) {
        issues.push({ code: 'SECRET_ALLOWED', slug, pattern: name });
      } else {
        issues.push({ code: 'SECRET_DETECTED', slug, pattern: name });
      }
    }
  }
  return issues;
}

function loadContentlayerData() {
  const dataDir = path.join(process.cwd(), '.contentlayer');
  const indexFile = path.join(dataDir, 'generated', 'Article', 'index.json');
  const glossaryFile = path.join(dataDir, 'generated', 'GlossaryTerm', 'index.json');
  let articles = [];
  let glossary = [];
  try { articles = JSON.parse(fs.readFileSync(indexFile, 'utf8')); } catch {}
  try { glossary = JSON.parse(fs.readFileSync(glossaryFile, 'utf8')); } catch {}
  return { articles, glossary };
}

function validateDocs(articles, glossary) {
  const errors = [];
  const warnings = [];
  const seenGlossary = new Set();
  const issues = [];

  for (const doc of articles) {
    // Draft content should not trigger validation errors; it is excluded.
    if (!doc.draft && !doc.isValid) {
      errors.push({ code: 'INVALID_ARTICLE', slug: doc.slug, message: 'Article failed basic validation' });
    }
    // secret scan raw body always (even drafts) so accidental secrets are caught
    issues.push(...scanSecrets(doc.body.raw || '', doc.slug));
  }

  for (const term of glossary) {
    const slug = term.slug;
    if (seenGlossary.has(slug)) {
      warnings.push({ code: 'GLOSSARY_DUPLICATE', slug, message: 'Duplicate glossary term' });
    } else {
      seenGlossary.add(slug);
    }
    issues.push(...scanSecrets(term.body.raw || '', slug));
  }

  const secretDetected = issues.filter(i => i.code === 'SECRET_DETECTED');
  const secretAllowed = issues.filter(i => i.code === 'SECRET_ALLOWED');

  const excluded = new Set();
  for (const e of errors) excluded.add(e.slug);
  for (const doc of articles) {
    if (doc.draft) excluded.add(doc.slug);
  }

  // Build totals
  const totals = {
    items: articles.length + glossary.length,
    published: (articles.filter(a => !excluded.has(a.slug)).length),
    excluded: excluded.size,
    errors: errors.length + secretDetected.length,
    warnings: warnings.length + secretAllowed.length
  };

  const contentHash = crypto.createHash('sha256')
    .update(articles.map(a => `${a.slug}:${a.lastUpdated || ''}`).sort().join('|'))
    .digest('hex');

  const report = {
    generatedAt: new Date().toISOString(),
    contentHash,
    totals,
    errors: [...errors, ...secretDetected],
    warnings: [...warnings, ...secretAllowed],
    excluded: Array.from(excluded),
    allowedSecrets: secretAllowed.map(s => ({ pattern: s.pattern, slug: s.slug }))
  };
  return { report, issues };
}

export async function generateValidationReport(items, secrets) {
  // Adapter function for unit test placeholder (T020)
  const errors = [];
  const warnings = [];
  const excluded = new Set();
  const secretDetected = secrets.filter(s => s.pattern && s.slug);
  for (const it of items) {
    if (it.draft || (it.errors && it.errors.length)) excluded.add(it.slug);
    if (it.errors) {
      for (const e of it.errors) errors.push({ code: e, slug: it.slug });
    }
    if (it.warnings) {
      for (const w of it.warnings) warnings.push({ code: w, slug: it.slug });
    }
  }
  const published = items.filter(i => !excluded.has(i.slug)).length;
  return {
    totals: { items: items.length, published, excluded: excluded.size, errors: errors.length + secretDetected.length, warnings: warnings.length },
    errors: [...errors, ...secretDetected.map(s => ({ code: 'SECRET_DETECTED', slug: s.slug }))],
    warnings,
    excluded: Array.from(excluded)
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { articles, glossary } = loadContentlayerData();
  const { report } = validateDocs(articles, glossary);
  const outPath = path.join(process.cwd(), 'validation-report.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
  const hasErrors = report.errors.length > 0;
  if (hasErrors) {
    console.error('Validation failed with errors:', report.errors.map(e => e.code));
    process.exit(1);
  } else {
    console.log('Validation passed. Report written to validation-report.json');
  }
}
