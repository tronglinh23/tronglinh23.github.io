import rss from '@astrojs/rss';
import { getBlogPosts } from '@/lib/collections';
import { blogPath } from '@/lib/utils';
import { site } from '@/config/site';

export async function GET(context) {
  const blog = await getBlogPosts();
  const items = blog.map((p) => ({
    title: p.data.title,
    pubDate: p.data.date,
    description: p.data.description,
    link: blogPath(p),
  }));

  return rss({
    title: site.title,
    description: `${site.title} RSS feed`,
    site: context.site,
    items,
  });
}
