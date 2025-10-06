/**
 * T012 secret-scan.spec.js
 * Tests: detect private key pattern, mnemonic phrase, ignore false positives with allow annotation.
 */
import { describe, it, expect } from 'vitest';
import * as Secret from '../../lib/secret-scan.js';

describe('secret scan (T012)', () => {
  it('detects ethereum private key pattern', () => {
    const content = 'Here is a key 0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    const matches = Secret.scanContent(content);
    expect(matches.some(m => m.code === 'SECRET_DETECTED')).toBe(true);
  });

  it('detects 12-word mnemonic', () => {
    const mnemonic = 'apple banana cat dog eagle frog guitar hat igloo jacket kite lemon';
    const matches = Secret.scanContent(mnemonic);
    expect(matches.some(m => m.code === 'SECRET_DETECTED')).toBe(true);
  });

  it('ignores allowed secret annotation', () => {
    const content = '<!-- allow-secret: Ethereum Private Key -->\n0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    const matches = Secret.scanContent(content);
    const detected = matches.filter(m => m.code === 'SECRET_DETECTED');
    expect(detected.length).toBe(0);
    const allowed = matches.filter(m => m.code === 'SECRET_ALLOWED');
    expect(allowed.length).toBe(1);
  });
});
