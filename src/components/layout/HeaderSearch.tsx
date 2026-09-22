'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { headerCategories } from '@/lib/nav-data';
import { formatVnd, normalize } from '@/lib/format';
import type { ProductSuggestion } from '@/app/api/products/search/route';

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 250;

/** In đậm đúng phần chữ khớp từ khoá (không phân biệt hoa/thường, không dấu vẫn khớp có dấu) */
function highlightMatch(text: string, rawQuery: string): ReactNode {
  const q = normalize(rawQuery.trim());
  if (!q) return text;
  const chars = Array.from(text);
  const normalizedChars = chars.map((c) => normalize(c)).join('');
  const start = normalizedChars.indexOf(q);
  if (start === -1) return text;
  const end = start + q.length;
  return (
    <Fragment>
      {chars.slice(0, start).join('')}
      <strong>{chars.slice(start, end).join('')}</strong>
      {chars.slice(end).join('')}
    </Fragment>
  );
}

/**
 * Form tìm kiếm ở middle-header (đúng markup/class gốc, xem Header.tsx) + dropdown gợi ý
 * tự động, tách riêng khỏi Header vì cần state/effect debounce + fetch — Header còn lại
 * vẫn là client component đơn giản chỉ vì useCart(), không phải vì tầng tìm kiếm này.
 *
 * Dữ liệu gợi ý lấy qua /api/products/search, route này gọi thẳng getProducts() — đúng
 * nguồn dữ liệu sản phẩm của trang /san-pham (seed + fallback Supabase), không tạo danh
 * sách riêng. Khi chọn 1 danh mục cụ thể ở dropdown bên trái, cả gợi ý tự động lẫn khi
 * bấm Enter/nút Tìm kiếm chỉ quét trong đúng danh mục đó (giống Shopee/Amazon).
 */
export default function HeaderSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Đóng dropdown khi bấm ra ngoài — không dùng onBlur vì sẽ đóng trước khi kịp bắt sự
  // kiện click vào 1 gợi ý (blur luôn chạy trước click). Xem thêm onMouseDown={preventDefault}
  // trên từng gợi ý bên dưới, chặn luôn cả việc input mất focus khi bấm vào đó.
  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, []);

  // Huỷ debounce/fetch còn treo khi component unmount (đổi trang) — không setState ở đây,
  // chỉ dọn dẹp, nên không phạm quy tắc "không setState đồng bộ trong effect".
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, []);

  /**
   * Debounce 250ms sau khi khách ngừng gõ, chỉ tìm khi đủ 2 ký tự trở lên. Gọi trực tiếp
   * từ onChange của ô nhập và của dropdown danh mục (đổi danh mục lúc đang gõ cũng tìm lại
   * ngay theo danh mục mới) — không đặt trong effect vì phần lớn nhánh setState ngay lập
   * tức (đóng dropdown khi keyword ngắn) nên dễ dính lỗi "setState đồng bộ trong effect".
   */
  const scheduleSearch = (rawKeyword: string, catSlug: string) => {
    const trimmed = rawKeyword.trim();

    if (debounceRef.current) clearTimeout(debounceRef.current);
    abortRef.current?.abort();

    if (trimmed.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setLoading(false);
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(() => {
      const controller = new AbortController();
      abortRef.current = controller;
      const qs = new URLSearchParams({ q: trimmed });
      if (catSlug) qs.set('danh-muc', catSlug);

      fetch(`/api/products/search?${qs.toString()}`, { signal: controller.signal })
        .then((res) => (res.ok ? res.json() : { products: [] }))
        .then((data: { products: ProductSuggestion[] }) => {
          setSuggestions(data.products ?? []);
          setActiveIndex(-1);
          setIsOpen(true);
        })
        .catch((err) => {
          if (err?.name === 'AbortError') return;
          setSuggestions([]);
          setIsOpen(true);
        })
        .finally(() => setLoading(false));
    }, DEBOUNCE_MS);
  };

  // Select có cả option value="" ("Tất cả danh mục") lẫn option value="tat-ca-san-pham"
  // ("Tất cả sản phẩm" — mục đầu tiên của headerCategories, khớp mega menu) — cả hai đều
  // nghĩa là không lọc danh mục, giữ đúng cách xử lý onSearch gốc trước khi tách component.
  const toEffectiveCategorySlug = (v: string) => (v && v !== 'tat-ca-san-pham' ? v : '');
  const effectiveCategorySlug = toEffectiveCategorySlug(categorySlug);

  const onKeywordChange = (value: string) => {
    setKeyword(value);
    scheduleSearch(value, effectiveCategorySlug);
  };

  const onCategoryChange = (value: string) => {
    setCategorySlug(value);
    scheduleSearch(keyword, toEffectiveCategorySlug(value));
  };

  const goToSearchResults = () => {
    const qs = new URLSearchParams();
    if (effectiveCategorySlug) qs.set('danh-muc', effectiveCategorySlug);
    const q = keyword.trim();
    if (q) qs.set('tim', q);
    const query = qs.toString();
    setIsOpen(false);
    router.push(query ? `/san-pham?${query}` : '/san-pham');
  };

  const goToProduct = (slug: string) => {
    setIsOpen(false);
    router.push(`/san-pham/${slug}`);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToSearchResults();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      if (suggestions.length === 0) return;
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      if (suggestions.length === 0) return;
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      if (isOpen && activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        goToProduct(suggestions[activeIndex].slug);
      }
      // Không highlight gợi ý nào -> để submit form chạy bình thường (goToSearchResults)
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const clearKeyword = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    abortRef.current?.abort();
    setKeyword('');
    setSuggestions([]);
    setLoading(false);
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const trimmedKeyword = keyword.trim();
  const showEmpty = isOpen && !loading && trimmedKeyword.length >= MIN_QUERY_LENGTH && suggestions.length === 0;

  return (
    <form
      ref={containerRef}
      onSubmit={onSubmit}
      role="search"
      className="border border-neutral-100 bg-white rounded-pill tw-py-2 tw-px-2 d-md-flex d-none align-items-center tw-gap-4 flex-grow-1 position-relative"
    >
      <div className="flex-shrink-0">
        <select
          aria-label="Danh mục sản phẩm"
          className="form-select form-control pb-0 pt-0 bg-transparent border-0 text-neutral-500 bg-blue-600 option-bg-white shadow-none tw-pe-105  tw-ps-4"
          value={categorySlug}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Tất cả danh mục</option>
          {headerCategories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>
      <span className="border-end border-neutral-300 tw-h-9 tw-w-px"></span>
      <div className="position-relative flex-grow-1 d-flex align-items-center">
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => {
            if (suggestions.length > 0 || showEmpty) setIsOpen(true);
          }}
          className="text-neutral-500 form-control border-0 shadow-none"
          placeholder="Tìm hộp giấy, thùng carton, tem nhãn..."
          aria-label="Từ khoá tìm kiếm"
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="header-search-suggestions"
          aria-activedescendant={activeIndex >= 0 ? `header-search-option-${activeIndex}` : undefined}
        />
        {keyword && (
          <button
            type="button"
            onClick={clearKeyword}
            aria-label="Xoá từ khoá"
            className="flex-shrink-0 d-flex align-items-center justify-content-center text-neutral-500 hover-text-main-600 tw-text-lg bg-transparent border-0 p-0 tw-me-2"
          >
            <i className="ph ph-x"></i>
          </button>
        )}
      </div>
      <button type="submit" className="btn bg-main-600 header-search-btn hover-bg-animation hover-bg-animation-main-600 tw-ps-6 tw-pe-405 tw-py-3 flex-shrink-0">
        <span className="btn-text">Tìm kiếm </span>
      </button>

      {isOpen && (
        <div
          id="header-search-suggestions"
          role="listbox"
          className="position-absolute start-0 top-100 w-100 bg-white border border-neutral-100 tw-rounded-md common-shadow-two overflow-hidden tw-z-99 tw-mt-2"
        >
          {suggestions.length > 0 ? (
            <ul className="tw-max-h-670-px overflow-y-auto scroll-sm m-0 p-0" style={{ listStyle: 'none' }}>
              {suggestions.map((p, i) => (
                <li key={p.slug}>
                  <Link
                    href={`/san-pham/${p.slug}`}
                    id={`header-search-option-${i}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => setIsOpen(false)}
                    className={`d-flex align-items-center tw-gap-3 tw-py-3 tw-px-4 text-decoration-none border-bottom border-neutral-100 hover-bg-neutral-100 ${
                      i === activeIndex ? 'bg-neutral-100' : ''
                    }`}
                  >
                    <img src={p.image} alt="" className="tw-w-14 tw-h-14 tw-rounded-lg object-fit-cover flex-shrink-0" />
                    <span className="flex-grow-1" style={{ minWidth: 0 }}>
                      <span className="d-block text-heading fw-medium line-clamp-1">
                        {highlightMatch(p.name, trimmedKeyword)}
                      </span>
                      <span className="d-block text-main-600 tw-text-sm fw-semibold price-vnd">
                        {formatVnd(p.priceMin)} – {formatVnd(p.priceMax)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : showEmpty ? (
            <div className="tw-py-4 tw-px-6 text-neutral-500 tw-text-sm">Không tìm thấy sản phẩm phù hợp</div>
          ) : loading ? (
            <div className="tw-py-4 tw-px-6 text-neutral-500 tw-text-sm">Đang tìm...</div>
          ) : null}
        </div>
      )}
    </form>
  );
}
