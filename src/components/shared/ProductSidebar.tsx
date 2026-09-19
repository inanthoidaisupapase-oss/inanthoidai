import Link from 'next/link';
import { Suspense } from 'react';
import type { Category } from '@/types/content';
import PriceRangeFilter from './PriceRangeFilter';
import { formatVnd } from '@/lib/format';

export type ProductQuery = {
  danhMuc?: string;
  tim?: string;
  giaTu?: string;
  giaDen?: string;
  sapXep?: string;
};

/**
 * Icon Phosphor cho từng danh mục thật của Thời Đại — thay 15 danh mục mẫu tiếng Anh
 * (Business Cards, Banners...) của shop-new.html. Không thêm cột "icon" vào bảng
 * categories (ngoài kế hoạch docs/spec.md) nên map cứng theo slug ở đây; danh mục
 * mới thêm sau mà chưa có trong map sẽ dùng icon mặc định, không vỡ giao diện.
 */
const CATEGORY_ICONS: Record<string, string> = {
  'hop-giay': 'ph-fill ph-sneaker',
  'hop-nap-gai': 'ph-fill ph-package',
  'thung-cod': 'ph-fill ph-truck',
};
const DEFAULT_CATEGORY_ICON = 'ph-fill ph-cube';

function buildCategoryHref(slug: string | undefined, params: ProductQuery): string {
  const qs = new URLSearchParams();
  if (slug) qs.set('danh-muc', slug);
  if (params.tim) qs.set('tim', params.tim);
  if (params.giaTu) qs.set('gia-tu', params.giaTu);
  if (params.giaDen) qs.set('gia-den', params.giaDen);
  if (params.sapXep) qs.set('sap-xep', params.sapXep);
  const s = qs.toString();
  return `/san-pham${s ? `?${s}` : ''}`;
}

/** Cột lọc bên trái trang sản phẩm — đúng khung sidebar shop-new.html (border/bg-neutral-50/tw-rounded-20-px) */
export default function ProductSidebar({
  categories,
  priceBounds,
  params,
}: {
  categories: Category[];
  priceBounds: { min: number; max: number };
  params: ProductQuery;
}) {
  return (
    <div className="border border-neutral-100 bg-neutral-50 tw-rounded-20-px tw-p-6">
      <h2 className="fw-semibold">Bộ lọc</h2>
      <span className="w-100 d-block tw-my-8 border-bottom border-neutral-100"></span>

      <form action="/san-pham" method="get" className="max-w-580-px w-100 position-relative d-md-flex d-none mx-auto">
        {params.danhMuc && <input type="hidden" name="danh-muc" value={params.danhMuc} />}
        {params.giaTu && <input type="hidden" name="gia-tu" value={params.giaTu} />}
        {params.giaDen && <input type="hidden" name="gia-den" value={params.giaDen} />}
        {params.sapXep && <input type="hidden" name="sap-xep" value={params.sapXep} />}
        <input
          type="text"
          name="tim"
          defaultValue={params.tim ?? ''}
          className="tw-py-305 tw-ps-8 tw-pe-15 bg-white border border-neutral-100 rounded-pill focus-outline-0 focus-border-main-600 w-100"
          placeholder="Tìm sản phẩm..."
          aria-label="Tìm sản phẩm"
        />
        <button
          type="submit"
          className="position-absolute tw-end-0 top-50 translate-middle-y tw-me-4 text-heading hover-text-main-600 tw-text-3xl d-flex"
        >
          <i className="ph ph-magnifying-glass"></i>
        </button>
      </form>

      <div className="tw-mt-8">
        <h2 className="h4 tw-mb-4 text-neutral-600 fw-semibold">Chọn danh mục</h2>
        <div className="d-flex flex-column tw-gap-3">
          <Link
            href={buildCategoryHref(undefined, params)}
            className={`bg-white tw-py-305 tw-px-6 rounded-pill d-flex align-items-center tw-gap-3 group group-item common-shadow-one tw-duration-300 hover-bg-neutral-100 category-sidebar-btn active-scale-094${!params.danhMuc ? ' active' : ''}`}
          >
            <span className="category-sidebar-btn__text d-flex text-primary-new tw-duration-300 tw-text-2xl">
              <i className="ph-fill ph-squares-four"></i>
            </span>
            <span className="category-sidebar-btn__icon text-neutral-600 fw-medium tw-duration-300 text-start">
              Tất cả sản phẩm
            </span>
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={buildCategoryHref(c.slug, params)}
              className={`bg-white tw-py-305 tw-px-6 rounded-pill d-flex align-items-center tw-gap-3 group group-item common-shadow-one tw-duration-300 hover-bg-neutral-100 category-sidebar-btn active-scale-094${params.danhMuc === c.slug ? ' active' : ''}`}
            >
              <span className="category-sidebar-btn__text d-flex text-primary-new tw-duration-300 tw-text-2xl">
                <i className={CATEGORY_ICONS[c.slug] ?? DEFAULT_CATEGORY_ICON}></i>
              </span>
              <span className="category-sidebar-btn__icon text-neutral-600 fw-medium tw-duration-300 text-start">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="tw-mt-8">
        <h2 className="h4 tw-mb-4 text-neutral-600 fw-semibold">Khoảng giá tham khảo (VNĐ)</h2>
        {/* useSearchParams() bên trong PriceRangeFilter bắt buộc phải có Suspense
            (yêu cầu của Next.js App Router) — thiếu boundary này khiến cả route bị
            đẩy sang render nặng phía client, từng gây hydrate chậm và mất sự kiện
            click đầu tiên trên trang. Fallback giữ đúng khung slider tĩnh ở biên
            min–max để không giật layout trong lúc chờ hydrate. */}
        <Suspense
          fallback={
            <>
              <div className="slider">
                <div className="progress" style={{ insetInlineStart: 0, insetInlineEnd: 0 }}></div>
              </div>
              <div className="tw-mt-6 d-flex align-items-center justify-content-center">
                <span className="text-neutral-600 tw-text-sm">
                  {formatVnd(priceBounds.min)} - {formatVnd(priceBounds.max)}
                </span>
              </div>
            </>
          }
        >
          <PriceRangeFilter bounds={priceBounds} />
        </Suspense>
      </div>

      <span className="w-100 d-block tw-my-8 border-bottom border-neutral-100"></span>
      <div className="custom-fade-animation" data-delay=".9" data-fade-from="bottom" data-ease="bounce">
        <Link
          href="/san-pham"
          className="btn bg-transparent border border-primary-new text-main-two-600 hover-bg-animation hover-bg-animation-main-two-600 tw-ps-2 tw-pe-6 tw-py-3 py-sm-2 hover-icon-white hover-animate-text-white w-100 justify-content-between"
        >
          <span className="btn-icon-animation d-sm-flex d-none align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-main-600 rounded-circle">
            <i className="ph-bold ph-arrow-clockwise text-white"></i>
          </span>
          <span className="btn-text text-gradient-main flex-grow-1">Đặt lại bộ lọc</span>
        </Link>
      </div>
    </div>
  );
}
