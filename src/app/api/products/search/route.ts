import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/data';

export type ProductSuggestion = {
  slug: string;
  name: string;
  priceMin: number;
  priceMax: number;
  image: string;
};

const MAX_SUGGESTIONS = 8;

/**
 * Gợi ý tự động cho ô tìm kiếm header — dùng đúng getProducts() (nguồn dữ liệu thật của
 * trang /san-pham, có fallback seed khi thiếu Supabase), không tạo danh sách sản phẩm riêng.
 * Nhận `q` (từ khoá) và `danh-muc` (slug danh mục, rỗng = quét toàn bộ sản phẩm).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() ?? '';
  const categorySlug = searchParams.get('danh-muc')?.trim() || undefined;

  if (q.length < 2) {
    return NextResponse.json({ products: [] satisfies ProductSuggestion[] });
  }

  const products = await getProducts({ categorySlug, search: q, limit: MAX_SUGGESTIONS });
  const suggestions: ProductSuggestion[] = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    priceMin: p.priceMin,
    priceMax: p.priceMax,
    image: p.images[0],
  }));

  return NextResponse.json({ products: suggestions });
}
