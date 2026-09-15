import type { MetadataRoute } from 'next';
import { getPosts, getProducts, getServices } from '@/lib/data';
import { site } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts, services] = await Promise.all([getProducts(), getPosts(), getServices()]);

  const staticPages = [
    '', '/gioi-thieu', '/san-pham', '/dich-vu', '/tin-tuc', '/lien-he',
    '/bang-gia', '/doi-ngu', '/cau-hoi-thuong-gap', '/quy-trinh-lam-viec',
    '/chinh-sach-bao-mat', '/bao-gia',
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      priority: path === '' ? 1 : 0.8,
    })),
    ...products.map((p) => ({ url: `${site.url}/san-pham/${p.slug}`, lastModified: new Date(), priority: 0.7 })),
    ...services.map((s) => ({ url: `${site.url}/dich-vu/${s.slug}`, lastModified: new Date(), priority: 0.7 })),
    ...posts.map((p) => ({ url: `${site.url}/tin-tuc/${p.slug}`, lastModified: new Date(p.publishedAt), priority: 0.6 })),
  ];
}
