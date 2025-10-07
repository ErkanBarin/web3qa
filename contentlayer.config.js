import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import crypto from 'node:crypto';

// Enumerations (align with research.md)
const CHAINS = ['ethereum','arbitrum','optimism','polygon','base','avalanche'];
const TAGS = ['testing','security','tooling','tools','guides','glossary','architecture','best-practices','performance','about','qa','web3','blockchain','hardhat','slither','playwright','foundry','solhint','openzeppelin','ethereum','resources','documentation','community','concepts'];
const SECTIONS = ['guides','tools','concepts','patterns','tutorials','glossary','references','faq','about'];

// Helpers
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[_\s]+/g,'-')
    .replace(/[^a-z0-9-]/g,'')
    .replace(/-{2,}/g,'-')
    .replace(/^-|-$/g,'');
}

const BaseFields = {
  title: { type: 'string', required: true },
  description: { type: 'string', required: true },
  section: { type: 'string', required: true },
  chain: { type: 'string', required: false },
  tags: { type: 'list', of: { type: 'string' }, required: false },
  lastUpdated: { type: 'date', required: false },
  draft: { type: 'boolean', required: false, default: false }
};

export const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: BaseFields,
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => {
        const base = doc._raw.flattenedPath.split('/').slice(1).join('/'); // remove leading section folder duplicate
        return slugify(base);
      }
    },
    normalizedSection: {
      type: 'string',
      resolve: doc => doc.section?.toLowerCase()
    },
    normalizedTags: {
      type: 'list',
      resolve: doc => {
        const tags = doc.tags;
        // Handle contentlayer's PlainArr type
        const tagArray = Array.isArray(tags) ? tags : tags?._array || [];
        if (!Array.isArray(tagArray)) return [];
        return tagArray
          .map(t => String(t).toLowerCase().trim())
          .filter(t => TAGS.includes(t))
          .filter((v,i,a) => a.indexOf(v) === i)
          .sort();
      }
    },
    isValid: {
      type: 'boolean',
      resolve: doc => {
        // Basic validation (more in external script):
        if (!doc.title || doc.title.length < 3 || doc.title.length > 120) return false;
        if (!doc.description || doc.description.length < 30 || doc.description.length > 300) return false;
        if (!SECTIONS.includes(doc.section?.toLowerCase())) return false;
        if (doc.chain && !CHAINS.includes(doc.chain.toLowerCase())) return false;
        const tagArray = Array.isArray(doc.tags) ? doc.tags : doc.tags?._array || [];
        if (tagArray.length > 0 && tagArray.some(t => !TAGS.includes(String(t).toLowerCase().trim()))) return false;
        return true;
      }
    },
    contentHash: {
      type: 'string',
      resolve: doc => crypto.createHash('sha256').update(doc.body.raw).digest('hex')
    }
  }
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Article]
});
