import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import ProductCard from '@/components/shared/ProductCard';
import ProductSidebar from '@/components/shared/ProductSidebar';
import ProductSortSelect from '@/components/shared/ProductSortSelect';
import { getCategories, getPriceBounds, getProducts, sortProducts } from '@/lib/data';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Sản phẩm bao bì giấy',
  description:
    'Hộp giày carton, hộp nắp gài, thùng COD — sản xuất trực tiếp tại xưởng In Ấn Thời Đại. Đặt từ 100 hộp, nhận in theo yêu cầu từ 500 hộp.',
};

// Số sản phẩm mỗi trang — khớp đúng "Showing 08 of ... results" của shop-new.html gốc.
const PAGE_SIZE = 8;

type SearchParams = {
  'danh-muc'?: string;
  tim?: string;
  'gia-tu'?: string;
  'gia-den'?: string;
  'sap-xep'?: string;
  trang?: string;
};

function buildPageHref(page: number, params: SearchParams): string {
  const qs = new URLSearchParams();
  if (params['danh-muc']) qs.set('danh-muc', params['danh-muc']);
  if (params.tim) qs.set('tim', params.tim);
  if (params['gia-tu']) qs.set('gia-tu', params['gia-tu']);
  if (params['gia-den']) qs.set('gia-den', params['gia-den']);
  if (params['sap-xep']) qs.set('sap-xep', params['sap-xep']);
  if (page > 1) qs.set('trang', String(page));
  const s = qs.toString();
  return `/san-pham${s ? `?${s}` : ''}`;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const categorySlug = params['danh-muc'];
  const search = params.tim;
  const priceFrom = params['gia-tu'] ? Number(params['gia-tu']) : undefined;
  const priceTo = params['gia-den'] ? Number(params['gia-den']) : undefined;

  const [categories, allProducts, filteredUnsorted] = await Promise.all([
    getCategories(),
    getProducts(),
    getProducts({ categorySlug, search, priceFrom, priceTo }),
  ]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);
  const priceBounds = getPriceBounds(allProducts);
  const filtered = sortProducts(filteredUnsorted, params['sap-xep']);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(Number(params.trang) || 1, 1), totalPages);
  const products = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);

  // Trang kết quả tìm kiếm: tiêu đề nêu rõ từ khoá + (nếu có) danh mục đang lọc + số sản
  // phẩm khớp — khác tiêu đề mặc định (tên danh mục hoặc "Sản phẩm") khi không tìm kiếm.
  const pageTitle = search
    ? `Kết quả tìm kiếm cho "${search}"${activeCategory ? ` trong "${activeCategory.name}"` : ''} (${filtered.length} sản phẩm)`
    : activeCategory
      ? activeCategory.name
      : 'Sản phẩm';

  return (
    <>
      <Breadcrumb
        title={pageTitle}
        items={activeCategory ? [{ label: 'Sản phẩm', href: '/san-pham' }] : []}
      />

      <section className="shop-new-section py-120">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-4">
              <ProductSidebar
                categories={categories}
                priceBounds={priceBounds}
                params={{
                  danhMuc: categorySlug,
                  tim: search,
                  giaTu: params['gia-tu'],
                  giaDen: params['gia-den'],
                  sapXep: params['sap-xep'],
                }}
              />
            </div>

            <div className="col-lg-8">
              {activeCategory && (
                <p className="text-neutral-500 tw-mb-6 max-w-800-px">{activeCategory.description}</p>
              )}

              <div className="d-flex align-items-center justify-content-between tw-gap-48-px tw-mb-10 flex-wrap">
                <span className="text-neutral-600 tw-text-lg">
                  {filtered.length === 0
                    ? 'Không có kết quả phù hợp'
                    : `Hiển thị ${rangeStart}–${rangeEnd} trên ${filtered.length} kết quả`}
                </span>
                {/* useSearchParams() trong ProductSortSelect bắt buộc có Suspense — xem ghi chú ở ProductSidebar.tsx */}
                <Suspense fallback={<span className="d-block" style={{ height: '2.5rem' }} />}>
                  <ProductSortSelect />
                </Suspense>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-80">
                  <p className="tw-text-xl text-neutral-600 tw-mb-6">
                    {search
                      ? `Không tìm thấy sản phẩm nào cho "${search}". Thử từ khóa khác hoặc liên hệ hotline ${site.hotline} để được tư vấn.`
                      : 'Không tìm thấy sản phẩm phù hợp.'}
                  </p>
                  <Link href="/san-pham" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600">
                    <span className="btn-text">Xem tất cả sản phẩm</span>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="row gy-4">
                    {products.map((product) => (
                      <div className="col-sm-6" key={product.slug}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="tw-mt-16 d-flex">
                      <ul className="d-flex flex-wrap tw-gap-4">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                          <li key={n}>
                            <Link
                              href={buildPageHref(n, params)}
                              aria-current={n === currentPage ? 'page' : undefined}
                              className={`tw-w-12 tw-h-12 fw-bold hover-bg-main-600 hover-text-white d-flex justify-content-center align-items-center tw-rounded-md ${
                                n === currentPage ? 'bg-main-600 text-white' : 'bg-neutral-100 text-heading'
                              }`}
                            >
                              {n}
                            </Link>
                          </li>
                        ))}
                        {currentPage < totalPages && (
                          <li>
                            <Link
                              href={buildPageHref(currentPage + 1, params)}
                              className="tw-px-4 tw-h-12 bg-neutral-100 text-heading fw-bold hover-bg-main-600 hover-text-white d-flex justify-content-center align-items-center tw-rounded-md"
                            >
                              Tiếp theo
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="tw-mt-20 bg-neutral-50 tw-rounded-2xl tw-p-10 text-center">
            <h2 className="h3 tw-mb-4">Không thấy kích thước bạn cần?</h2>
            <p className="text-neutral-500 tw-mb-8 max-w-700-px mx-auto">
              Xưởng nhận sản xuất carton 3 lớp, 5 lớp, 7 lớp với sóng B, C, E theo kích thước riêng.
              Gửi kích thước và số lượng, chúng tôi báo giá trong ngày làm việc.
            </p>
            <Link href="/bao-gia" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-2 tw-pe-6 tw-py-3">
              <span className="btn-icon-animation d-flex align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-white rounded-circle">
                <i className="ph-bold ph-arrow-right text-gradient-main"></i>
              </span>
              <span className="btn-text">Gửi yêu cầu báo giá</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
