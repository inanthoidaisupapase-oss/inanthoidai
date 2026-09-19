import type { Category, Post, Product, Service } from '@/types/content';
import { getSupabase } from './supabase';
import categoriesSeed from './seed/categories.json';
import productsSeed from './seed/products.json';
import postsSeed from './seed/posts.json';
import servicesSeed from './seed/services.json';

const seed = {
  categories: categoriesSeed as Category[],
  products: productsSeed as Product[],
  posts: postsSeed as Post[],
  services: servicesSeed as Service[],
};

/** Đổi tên cột snake_case của Postgres sang camelCase dùng trong giao diện */
type Row = Record<string, unknown>;
const toCamel = <T,>(row: Row): T => {
  const out: Row = {};
  for (const [k, v] of Object.entries(row)) {
    out[k.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase())] = v;
  }
  return out as T;
};

/**
 * Đọc một bảng từ Supabase; nếu chưa cấu hình Supabase hoặc truy vấn lỗi thì
 * rơi về dữ liệu seed. Lỗi được ghi log nhưng không làm sập trang — trang giới
 * thiệu vẫn phải hiển thị được kể cả khi database tạm thời không truy cập được.
 */
async function fromTable<T>(table: string, fallback: T[], orderBy?: string): Promise<T[]> {
  const sb = getSupabase();
  if (!sb) return fallback;
  try {
    const query = sb.from(table).select('*');
    const { data, error } = orderBy ? await query.order(orderBy) : await query;
    if (error || !data) {
      console.error(`[data] Không đọc được bảng ${table}:`, error?.message);
      return fallback;
    }
    return (data as Row[]).map((r) => toCamel<T>(r));
  } catch (err) {
    console.error(`[data] Lỗi kết nối Supabase khi đọc ${table}:`, err);
    return fallback;
  }
}

/* ----------------------------- Danh mục ----------------------------- */

export async function getCategories(): Promise<Category[]> {
  const rows = await fromTable<Category>('categories', seed.categories, 'sort_order');
  return [...rows].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getCategory(slug: string): Promise<Category | null> {
  return (await getCategories()).find((c) => c.slug === slug) ?? null;
}

/* ----------------------------- Sản phẩm ----------------------------- */

export async function getProducts(options: {
  categorySlug?: string;
  search?: string;
  limit?: number;
} = {}): Promise<Product[]> {
  let rows = await fromTable<Product>('products', seed.products);
  if (options.categorySlug) rows = rows.filter((p) => p.categorySlug === options.categorySlug);
  if (options.search) {
    const q = normalize(options.search);
    rows = rows.filter(
      (p) => normalize(p.name).includes(q) || normalize(p.shortDescription).includes(q),
    );
  }
  return options.limit ? rows.slice(0, options.limit) : rows;
}

export async function getProduct(slug: string): Promise<Product | null> {
  const rows = await fromTable<Product>('products', seed.products);
  return rows.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const rows = await fromTable<Product>('products', seed.products);
  return rows.filter((p) => p.isFeatured).slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const rows = await getProducts({ categorySlug: product.categorySlug });
  return rows.filter((p) => p.slug !== product.slug).slice(0, limit);
}

/* ------------------------------ Tin tức ----------------------------- */

export async function getPosts(options: { category?: string; limit?: number } = {}): Promise<Post[]> {
  let rows = await fromTable<Post>('posts', seed.posts);
  rows = [...rows].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  if (options.category) rows = rows.filter((p) => p.category === options.category);
  return options.limit ? rows.slice(0, options.limit) : rows;
}

export async function getPost(slug: string): Promise<Post | null> {
  const rows = await fromTable<Post>('posts', seed.posts);
  return rows.find((p) => p.slug === slug) ?? null;
}

export async function getPostCategories(): Promise<{ name: string; count: number }[]> {
  const rows = await getPosts();
  const map = new Map<string, number>();
  for (const p of rows) map.set(p.category, (map.get(p.category) ?? 0) + 1);
  return [...map.entries()].map(([name, count]) => ({ name, count }));
}

/* ------------------------------ Dịch vụ ----------------------------- */

export async function getServices(): Promise<Service[]> {
  const rows = await fromTable<Service>('services', seed.services, 'sort_order');
  return [...rows].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getService(slug: string): Promise<Service | null> {
  return (await getServices()).find((s) => s.slug === slug) ?? null;
}

/* ------------------------------- Tiện ích --------------------------- */

/** Bỏ dấu tiếng Việt để tìm kiếm không phụ thuộc dấu */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd');
}

export { formatDateVi, formatVnd, toHashtag } from '../format';
