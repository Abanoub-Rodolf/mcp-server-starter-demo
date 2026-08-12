import { describe, expect, it } from 'vitest';
import { echo, textStats } from '../src/tools.js';

describe('demo tools', () => {
  it('returns echo input unchanged', () => {
    expect(echo('hello MCP')).toBe('hello MCP');
  });

  it('counts words and characters deterministically', () => {
    expect(textStats('hello secure world')).toEqual({ words: 3, characters: 18 });
  });

  it('handles blank text without inventing a word', () => {
    expect(textStats('   ')).toEqual({ words: 0, characters: 3 });
  });
});
