import rss from '@astrojs/rss';
import { getBlogPosts } from '@/lib/collections';

export async function GET(context) {
  const blog = await getBlogPosts();
  const items = blog.map((p) => ({
    title: p.data.title,
    pubDate: p.data.date,
    description: p.data.description,
    link: `${context.site}${context.base}/blog/${p.slug}`
  }));

  return rss({
    title: 'Logbook',
    description: 'Logbook RSS feed',
    site: context.site,
    items,
  });
}
