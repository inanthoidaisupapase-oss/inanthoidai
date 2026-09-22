import type { Category, Post, Product, Service } from '@/types/content';
import { normalize } from '../format';
import { getSupabase } from './supabase';
import categoriesSeed from './seed/categories.json';
import productsSeed from './seed/products.json';
import postsSeed from './seed/posts.json';
import servicesSeed from './seed/services.json';

const seed = {
  categories: categoriesSeed as Category[],
  // Mỗi sản phẩm có bộ khoá "specs" khác nhau (hộp giấy vs. túi giấy, tem nhãn...) nên
  // TS suy ra kiểu literal không đồng nhất cho mảng JSON — ép qua unknown trước khi cast
  // sang Product (specs: Record<string, string> vẫn đúng ở runtime, chỉ khác ở type literal).
  products: productsSeed as unknown as Product[],
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
  /** Khoảng giá tham khảo (VNĐ) — giữ sản phẩm có [priceMin, priceMax] giao với khoảng lọc */
  priceFrom?: number;
  priceTo?: number;
  limit?: number;
} = {}): Promise<Product[]> {
  let rows = await fromTable<Product>('products', seed.products);
  if (options.categorySlug) rows = rows.filter((p) => p.categorySlug === options.categorySlug);
  if (options.search) {
    // Chỉ khớp theo TÊN sản phẩm (đúng phạm vi tìm kiếm của ô tìm kiếm header) — không
    // khớp thêm shortDescription để tránh gợi ý ra sản phẩm không thật sự "tên trùng từ khoá".
    const q = normalize(options.search);
    rows = rows.filter((p) => normalize(p.name).includes(q));
  }
  if (options.priceFrom !== undefined) rows = rows.filter((p) => p.priceMax >= options.priceFrom!);
  if (options.priceTo !== undefined) rows = rows.filter((p) => p.priceMin <= options.priceTo!);
  return options.limit ? rows.slice(0, options.limit) : rows;
}

/** Khoảng giá thấp nhất/cao nhất trong toàn bộ sản phẩm, làm biên cho thanh trượt lọc giá */
export function getPriceBounds(products: Product[]): { min: number; max: number } {
  const step = 100_000;
  const prices = products.flatMap((p) => [p.priceMin, p.priceMax]);
  if (prices.length === 0) return { min: 0, max: step };
  return {
    min: Math.floor(Math.min(...prices) / step) * step,
    max: Math.ceil(Math.max(...prices) / step) * step,
  };
}

export type ProductSort = 'gia-tang' | 'gia-giam' | 'ten-az' | 'danh-muc';

/** Sắp xếp danh sách sản phẩm theo lựa chọn của dropdown "Sắp xếp" — không đổi thứ tự nếu không truyền */
export function sortProducts(products: Product[], sort?: string): Product[] {
  const rows = [...products];
  switch (sort as ProductSort) {
    case 'gia-tang':
      return rows.sort((a, b) => a.priceMin - b.priceMin);
    case 'gia-giam':
      return rows.sort((a, b) => b.priceMin - a.priceMin);
    case 'ten-az':
      return rows.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    case 'danh-muc':
      return rows.sort((a, b) => a.categorySlug.localeCompare(b.categorySlug, 'vi') || a.name.localeCompare(b.name, 'vi'));
    default:
      return rows;
  }
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

export { formatDateVi, formatVnd, normalize, toHashtag } from '../format';
