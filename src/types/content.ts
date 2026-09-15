export type Category = {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
};

export type PriceTier = {
  /** Số hộp trong một bậc giá */
  qty: number;
  /** Giá của bậc, VND. null = chưa có bảng giá chính thức, hiển thị "Liên hệ". */
  price: number | null;
};

export type Product = {
  slug: string;
  name: string;
  sku: string | null;
  categorySlug: string;
  priceMin: number;
  priceMax: number;
  priceTiers: PriceTier[];
  shortDescription: string;
  description: string;
  /** Thông số kỹ thuật: nhãn -> giá trị */
  specs: Record<string, string>;
  images: string[];
  isFeatured: boolean;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** Nội dung HTML đơn giản (h3/p/ul/table) */
  content: string;
  category: string;
  coverImageUrl: string;
  publishedAt: string;
  author: string;
};

export type Service = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  icon: string;
  imageUrl: string;
  sortOrder: number;
};
