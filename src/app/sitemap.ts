import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { PROJECTS } from '@/content/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/work', '/services', '/about', '/contact', ...PROJECTS.map((p) => `/work/${p.slug}`)];
  return pages.map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date(), changeFrequency: 'monthly', priority: p === '' ? 1 : 0.7 }));
}
