import fs from 'node:fs';
import path from 'node:path';
import readingTime from 'reading-time';

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  });
}

export function readingMinutes(body = '') {
  return Math.max(1, Math.ceil(readingTime(body).minutes));
}

export function categoryLabel(category: string) {
  return (
    (
      {
        web: 'Web',
        pwn: 'Pwn',
        crypto: 'Crypto',
        rev: 'Reversing',
        for: 'Forensics',
        forensics: 'Forensics',
        misc: 'Misc',
        research: 'Research',
        general: 'General',
      } as Record<string, string>
    )[category] ?? category
  );
}

export function slugifyTag(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

type SlugLike = { id: string; slug?: string | null };

// Normalize content entry slug for both file-based and explicit slugs.
export function entrySlug(entry: SlugLike) {
  if (entry.slug && entry.slug.trim() !== '') return entry.slug;
  return entry.id.replace(/\.[^/.]+$/, '');
}

// Build a consistent blog URL path from a content entry.
export function blogPath(entry: SlugLike, basePath = '') {
  return `${basePath}/blog/${entrySlug(entry)}`;
}

export function getEntryMtime(entry: { id: string; collection: string; filePath?: string }) {
  try {
    const filePath = entry.filePath
      ? path.resolve(process.cwd(), entry.filePath)
      : path.join(process.cwd(), 'src', 'content', entry.collection, entry.id);
    return fs.statSync(filePath).mtimeMs;
  } catch {
    return 0;
  }
}
