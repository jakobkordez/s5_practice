import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/licenca',
    '/klicni-znak',
    '/zbirka',
    '/priprave',
    '/izpit-sim',
  ].map((page, index) => ({
    url: `https://izpit.jkob.cc${page}`,
    lastModified: new Date().toISOString(),
    priority: index === 0 ? 1 : 0.8,
  }));
}
