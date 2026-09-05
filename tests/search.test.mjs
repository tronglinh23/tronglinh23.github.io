import assert from 'node:assert/strict';
import test from 'node:test';
import { isSearchActive, readSearchState, selectSearchItems } from '../src/lib/search.ts';

const entries = [
  {
    slug: 'aws',
    title: 'CloudTrail investigation',
    description: 'AWS incident response',
    date: '2026-07-22',
    tags: ['cloud-security', 'aws'],
    category: 'for',
    difficulty: 'medium',
    ctf_event: 'HTB Sherlock',
  },
  {
    slug: 'web',
    title: 'A web challenge',
    description: 'An AWS metadata SSRF chain',
    date: '2026-06-01',
    tags: ['ssrf', 'aws'],
    category: 'web',
    difficulty: 'hard',
    ctf_event: 'CTF',
  },
  {
    slug: 'notes',
    title: 'Notes on web security',
    description: 'Browser research',
    date: '2026-06-01',
    tags: ['web-security'],
    category: 'research',
  },
];
const defaults = readSearchState(new URLSearchParams());

test('combines case-insensitive search terms across metadata fields', () => {
  assert.deepEqual(
    selectSearchItems(entries, { ...defaults, q: 'AWS   response' }).map((item) => item.slug),
    ['aws']
  );
});
test('combines exact category, tag, difficulty, and event filters', () => {
  assert.deepEqual(
    selectSearchItems(entries, {
      ...defaults,
      category: 'for',
      tag: 'aws',
      difficulty: 'medium',
      event: 'HTB Sherlock',
    }).map((item) => item.slug),
    ['aws']
  );
  assert.deepEqual(selectSearchItems(entries, { ...defaults, tag: 'web' }), []);
});
test('sorts without mutating input and preserves ties', () => {
  const snapshot = structuredClone(entries);
  assert.deepEqual(
    selectSearchItems(entries, { ...defaults, sort: 'oldest' }).map((item) => item.slug),
    ['web', 'notes', 'aws']
  );
  assert.deepEqual(
    selectSearchItems(entries, { ...defaults, sort: 'title' }).map((item) => item.slug),
    ['web', 'aws', 'notes']
  );
  assert.deepEqual(entries, snapshot);
});
test('restores encoded filters and normalizes an unsupported sort from a URL', () => {
  const restored = readSearchState(
    new URLSearchParams('q=AWS+response&event=HTB+Sherlock&tag=cloud-security&sort=invalid')
  );
  assert.equal(restored.event, 'HTB Sherlock');
  assert.equal(restored.tag, 'cloud-security');
  assert.equal(restored.sort, 'newest');
  assert.equal(selectSearchItems(entries, restored).length, 1);
});
test('default and whitespace-only searches preserve archive pagination', () => {
  assert.equal(isSearchActive(defaults), false);
  assert.equal(isSearchActive({ ...defaults, q: '  ' }), false);
  assert.equal(isSearchActive({ ...defaults, tag: 'aws' }), true);
  assert.equal(isSearchActive({ ...defaults, sort: 'title' }), true);
});
test('empty results stay empty for combined filters', () => {
  assert.deepEqual(selectSearchItems(entries, { ...defaults, category: 'pwn', q: 'aws' }), []);
});
