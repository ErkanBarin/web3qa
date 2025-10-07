// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import crypto from "node:crypto";
var CHAINS = ["ethereum", "arbitrum", "optimism", "polygon", "base", "avalanche"];
var TAGS = ["testing", "security", "tooling", "guides", "glossary", "architecture", "best-practices", "performance", "about", "qa", "web3", "blockchain", "hardhat", "slither", "playwright", "foundry", "solhint", "openzeppelin"];
var SECTIONS = ["guides", "tools", "concepts", "patterns", "tutorials", "glossary", "references", "faq", "about"];
function slugify(str) {
  return str.toLowerCase().replace(/[_\s]+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-{2,}/g, "-").replace(/^-|-$/g, "");
}
var BaseFields = {
  title: { type: "string", required: true },
  description: { type: "string", required: true },
  section: { type: "string", required: true },
  chain: { type: "string", required: false },
  tags: { type: "list", of: { type: "string" }, required: false },
  lastUpdated: { type: "date", required: false },
  draft: { type: "boolean", required: false, default: false }
};
var Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: BaseFields,
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        const base = doc._raw.flattenedPath.split("/").slice(1).join("/");
        return slugify(base);
      }
    },
    normalizedSection: {
      type: "string",
      resolve: (doc) => doc.section?.toLowerCase()
    },
    normalizedTags: {
      type: "list",
      resolve: (doc) => {
        const tags = doc.tags;
        const tagArray = Array.isArray(tags) ? tags : tags?._array || [];
        if (!Array.isArray(tagArray))
          return [];
        return tagArray.map((t) => String(t).toLowerCase().trim()).filter((t) => TAGS.includes(t)).filter((v, i, a) => a.indexOf(v) === i).sort();
      }
    },
    isValid: {
      type: "boolean",
      resolve: (doc) => {
        if (!doc.title || doc.title.length < 3 || doc.title.length > 120)
          return false;
        if (!doc.description || doc.description.length < 30 || doc.description.length > 300)
          return false;
        if (!SECTIONS.includes(doc.section?.toLowerCase()))
          return false;
        if (doc.chain && !CHAINS.includes(doc.chain.toLowerCase()))
          return false;
        const tagArray = Array.isArray(doc.tags) ? doc.tags : doc.tags?._array || [];
        if (tagArray.length > 0 && tagArray.some((t) => !TAGS.includes(String(t).toLowerCase().trim())))
          return false;
        return true;
      }
    },
    contentHash: {
      type: "string",
      resolve: (doc) => crypto.createHash("sha256").update(doc.body.raw).digest("hex")
    }
  }
}));
var GlossaryTerm = defineDocumentType(() => ({
  name: "GlossaryTerm",
  filePathPattern: `glossary/**/*.mdx`,
  contentType: "mdx",
  fields: BaseFields,
  computedFields: {
    term: { type: "string", resolve: (doc) => doc.title },
    slug: { type: "string", resolve: (doc) => slugify(doc.title) },
    isGlossary: { type: "boolean", resolve: () => true }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Article, GlossaryTerm]
});
export {
  Article,
  GlossaryTerm,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-EA722JYE.mjs.map
