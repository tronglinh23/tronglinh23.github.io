import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, statSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { formatDate, getEntryMtime } from '../src/lib/utils.ts';

test('frontmatter calendar dates do not shift back a day in Toronto', () => {
  const date = new Date('2026-07-22T00:00:00Z');
  const previous = process.env.TZ;
  process.env.TZ = 'America/Toronto';
  try {
    assert.equal(
      formatDate(date),
      date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        timeZone: 'UTC',
      })
    );
  } finally {
    if (previous === undefined) delete process.env.TZ;
    else process.env.TZ = previous;
  }
});

test('mtime sorting resolves Astro filePath even when its id omits the extension', () => {
  const directory = mkdtempSync(join(tmpdir(), 'logbook-mtime-'));
  try {
    const filePath = join(directory, 'a post.mdx');
    writeFileSync(filePath, 'A post');
    assert.equal(
      getEntryMtime({ id: 'a-post', collection: 'blog', filePath }),
      statSync(filePath).mtimeMs
    );
  } finally {
    rmSync(directory, { recursive: true });
  }
});
