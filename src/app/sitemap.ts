import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getPosts, getTags } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');
  const posts = getPosts();
  const paths = ['', '/archive', ...(posts.length > 0 ? ['/diario', '/diario/tags'] : [])];
  const routes = paths.map((path) => ({ url: `${base}${path}` }));
  const postUrls = posts.map((post) => ({
    url: `${base}/diario/${post.slug}`,
    lastModified: post.date,
  }));
  const tags = getTags().map((tag) => ({ url: `${base}/diario/tags/${tag.slug}` }));
  return [...routes, ...postUrls, ...tags];
}
