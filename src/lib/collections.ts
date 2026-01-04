import { getCollection, type CollectionEntry } from 'astro:content';
import { formatDate, getEntryMtime } from '@/lib/utils';

type BlogEntry = CollectionEntry<'blog'>;
type LinkEntry = CollectionEntry<'links'>;

const isPublished = (entry: { data: { draft?: boolean } }) => !entry.data.draft;

// Newest first, fall back to file mtime for consistent ordering.
export function sortByDateAndMtime(a: { data: { date: Date }; id: string; collection: string }, b: { data: { date: Date }; id: string; collection: string }) {
  const dateDiff = b.data.date.getTime() - a.data.date.getTime();
  return dateDiff !== 0 ? dateDiff : getEntryMtime(b) - getEntryMtime(a);
}

export async function getBlogPosts(): Promise<BlogEntry[]> {
  const posts = await getCollection('blog');
  return posts.filter(isPublished).sort(sortByDateAndMtime);
}

export async function getLinkPosts(): Promise<LinkEntry[]> {
  const links = await getCollection('links');
  return links.filter(isPublished).sort(sortByDateAndMtime);
}

// Shape posts for the client-side search UI.
export function buildSearchItems(posts: BlogEntry[], basePath: string) {
  return posts.map((p) => ({
    title: p.data.title,
    description: p.data.description,
    date: p.data.date.toISOString(),
    dateLabel: formatDate(p.data.date),
    href: `${basePath}/blog/${p.slug}`,
    tags: p.data.tags ?? [],
    category: p.data.category,
    difficulty: p.data.difficulty,
    ctf_event: p.data.ctf_event,
  }));
}
