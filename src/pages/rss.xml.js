import rss from '@astrojs/rss';
import { getBlogPosts } from '@/lib/collections';
import { blogPath } from '@/lib/utils';

export async function GET(context) {
  const blog = await getBlogPosts();
  const items = blog.map((p) => ({
    title: p.data.title,
    pubDate: p.data.date,
    description: p.data.description,
    link: blogPath(p),
  }));

  return rss({
    title: 'Logbook',
    description: 'Logbook RSS feed',
    site: context.site,
    items,
  });
}
