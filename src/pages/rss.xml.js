import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = (await getCollection('blog')).filter((p) => !p.data.draft);

  const items = blog.map((p) => ({
    title: p.data.title,
    pubDate: p.data.date,
    description: p.data.description,
    link: `${context.site}${context.base}/blog/${p.slug}`
  })).sort((a,b)=>b.pubDate - a.pubDate);

  return rss({
    title: 'Logbook',
    description: 'Logbook RSS feed',
    site: context.site,
    items,
  });
}
