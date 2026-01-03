import fs from 'node:fs';
import path from 'node:path';

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: '2-digit' });
}

export function slugifyTag(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

export function getEntryMtime(entry: { id: string; collection: string }) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', entry.collection, entry.id);
    return fs.statSync(filePath).mtimeMs;
  } catch {
    return 0;
  }
}
