// lib/secret-scan.js
// Reusable secret scanning utility (mirrors patterns in validation script)

const SECRET_PATTERNS = [
  { name: 'Ethereum Private Key', regex: /0x[a-fA-F0-9]{64}/g },
  { name: 'Mnemonic 12 words', regex: /\b([a-z]+\s){11}[a-z]+\b/g }
];

export function scanContent(text) {
  const results = [];
  if (!text || typeof text !== 'string') return results;
  // collect allowed pattern annotations from HTML comments (MDX safe)
  const allowRe = /<!--\s*allow-secret:\s*([^>]+?)\s*-->/g;
  const allowed = new Set();
  let m;
  while ((m = allowRe.exec(text))) {
    allowed.add(m[1].trim());
  }

  for (const { name, regex } of SECRET_PATTERNS) {
    regex.lastIndex = 0;
    let match;
    while ((match = regex.exec(text))) {
      const entry = {
        code: allowed.has(name) ? 'SECRET_ALLOWED' : 'SECRET_DETECTED',
        pattern: name,
        index: match.index,
        match: match[0]
      };
      results.push(entry);
    }
  }
  return results;
}

export default { scanContent };
