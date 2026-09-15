import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import ProductCard from '@/components/shared/ProductCard';
import ProductFilters from '@/components/shared/ProductFilters';
import { getCategories, getProducts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sản phẩm bao bì giấy',
  description:
    'Hộp giày carton, hộp nắp gài, thùng COD — sản xuất trực tiếp tại xưởng In Ấn Thời Đại. Đặt từ 100 hộp, nhận in theo yêu cầu từ 500 hộp.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ 'danh-muc'?: string; tim?: string }>;
}) {
  const params = await searchParams;
  const categorySlug = params['danh-muc'];
  const search = params.tim;

  const [categories, products, allProducts] = await Promise.all([
    getCategories(),
    getProducts({ categorySlug, search }),
    getProducts(),
  ]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <>
      <Breadcrumb title={activeCategory ? activeCategory.name : 'Sản phẩm'} items={activeCategory ? [{ label: 'Sản phẩm', href: '/san-pham' }] : []} />

      <div className="shop-page-section pt-120 pb-120">
        <div className="container">
          {activeCategory && (
            <p className="text-neutral-500 tw-mb-10 max-w-800-px">{activeCategory.description}</p>
          )}

          <div className="d-flex justify-content-between tw-gap-6 flex-wrap tw-pb-14">
            <ProductFilters categories={categories} activeCategory={categorySlug} search={search} />
            <div className="d-flex align-items-center tw-gap-48-px">
              <span className="text-body-11 tw-text-lg">
                Hiển thị {products.length} / {allProducts.length} sản phẩm
              </span>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-80">
              <p className="tw-text-xl text-neutral-600 tw-mb-6">
                Không tìm thấy sản phẩm phù hợp.
              </p>
              <Link href="/san-pham" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600">
                <span className="btn-text">Xem tất cả sản phẩm</span>
              </Link>
            </div>
          ) : (
            <div className="row gy-5">
              {products.map((product) => (
                <div className="col-xl-3 col-lg-4 col-sm-6" key={product.slug}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

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
      </div>
    </>
  );
}
