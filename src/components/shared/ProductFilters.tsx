'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Category } from '@/types/content';

/** Ô tìm kiếm + lọc danh mục của trang sản phẩm (giữ markup form của template) */
export default function ProductFilters({
  categories,
  activeCategory,
  search,
}: {
  categories: Category[];
  activeCategory?: string;
  search?: string;
}) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(search ?? '');

  const go = (nextCategory: string | undefined, nextSearch: string) => {
    const qs = new URLSearchParams();
    if (nextCategory) qs.set('danh-muc', nextCategory);
    if (nextSearch.trim()) qs.set('tim', nextSearch.trim());
    router.push(qs.toString() ? `/san-pham?${qs}` : '/san-pham');
  };

  return (
    <div className="d-flex align-items-center tw-gap-6 flex-wrap">
      <form
        onSubmit={(e) => { e.preventDefault(); go(activeCategory, keyword); }}
        className="max-w-330-px w-100 position-relative"
      >
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-100 border-bottom border-neutral-200 focus-outline-0 border-top-0 border-start-0 border-end-0 tw-py-2 focus-border-main-two-600 tw-ps-7 bg-transparent"
          placeholder="Tìm sản phẩm..."
          aria-label="Tìm sản phẩm"
        />
        <span className="position-absolute tw-start-0 top-50 translate-middle-y text-body-11 tw-text-xl">
          <i className="ph ph-magnifying-glass"></i>
        </span>
      </form>

      <select
        aria-label="Lọc theo danh mục"
        value={activeCategory ?? ''}
        onChange={(e) => go(e.target.value || undefined, keyword)}
        className="form-control form-select border border-neutral-100 focus-border-main-600 rounded-pill tw-ps-4 tw-pe-10 tw-py-2 w-auto focus-outline-0 text-body fw-medium shadow-none"
      >
        <option value="">Tất cả danh mục</option>
        {categories.map((c) => (
          <option value={c.slug} key={c.slug}>{c.name}</option>
        ))}
      </select>
    </div>
  );
}
