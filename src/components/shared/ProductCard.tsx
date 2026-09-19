import Link from 'next/link';
import type { Product } from '@/types/content';
import { formatVnd } from '@/lib/format';

/**
 * Thẻ sản phẩm theo đúng cấu trúc/animation shop-new.html của template Printop
 * (clip-animation + image-double-animation, nút hiện khi hover ở giữa-dưới ảnh).
 * Khác bản gốc: không có giá gạch ngang/% giảm giá/sao đánh giá số (không có dữ liệu
 * thật) — giữ khoảng giá tham khảo thật (priceMin–priceMax) đã dùng trên toàn site,
 * badge "Nổi bật" thay cho "-24%"/"Pre-Order" (dựa trên field isFeatured thật, không
 * bịa số liệu khuyến mãi), và nút hover "Yêu cầu báo giá" dẫn tới trang chi tiết —
 * nơi có sẵn luồng "Thêm vào yêu cầu báo giá" theo đúng bậc số lượng (xem AddToCart.tsx).
 */
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="tw-rounded-2xl bg-neutral-50 overflow-hidden border border-neutral-100 tw-p-3 image-double-animation h-100 group group-item">
      <div className="position-relative d-block">
        <Link href={`/san-pham/${product.slug}`} className="position-relative d-block">
          <div className="clip-animation overflow-hidden position-relative d-block tw-rounded-xl">
            {/* TODO ảnh: ảnh thật sản phẩm — xem docs/IMAGE-GUIDE.md */}
            <img
              src={product.images[0]}
              alt={product.name}
              data-animate="true"
              className="image-double-animation__element w-100 tw-h-340-px object-fit-cover clip-animation-img"
            />
            <img
              src={product.images[0]}
              alt=""
              className="image-double-animation__element w-100 tw-h-340-px object-fit-cover clip-animation-img"
            />
          </div>
          {product.isFeatured && (
            <div className="d-flex flex-column align-items-start tw-gap-1 position-absolute top-0 tw-start-0 tw-mt-6 z-1">
              <span className="bg-primary-new text-white tw-py-1 tw-px-3 rounded-end-2 tw-text-sm">Nổi bật</span>
            </div>
          )}
        </Link>

        <div className="position-absolute start-50 translate-middle-x bottom-0 z-1 tw-invisible opacity-0 group-hover-item-visible group-hover-item-opacity-1 group-hover-item-mb-6 tw-duration-400 tw-transition-delay-03">
          <Link
            href={`/san-pham/${product.slug}`}
            className="btn bg-white text-main-two-600 hover-bg-animation hover-bg-animation-main-two-600 tw-ps-2 tw-pe-6 tw-py-3 py-sm-2 hover-icon-white hover-animate-text-white justify-content-between"
          >
            <span className="btn-icon-animation d-sm-flex d-none align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-main-600 rounded-circle">
              <i className="ph ph-shopping-cart-simple text-white"></i>
            </span>
            <span className="btn-text text-gradient-main">Yêu cầu báo giá</span>
          </Link>
        </div>
      </div>

      <div className="tw-mt-4 tw-px-2">
        <div className="tw-mb-3 d-flex align-items-center justify-content-between tw-gap-1">
          <h2 className="tw-text-lg line-clamp-1">
            <Link href={`/san-pham/${product.slug}`} className="hover-common-underline hover-text-heading text-heading">
              {product.name}
            </Link>
          </h2>
          <button
            type="button"
            aria-label="Lưu sản phẩm quan tâm"
            className="toggle-btn wishlist-btn tw-w-8 tw-h-8 rounded-circle d-flex justify-content-center align-items-center text-primary-new bg-white hover-bg-primary-new hover-text-white tw-text-xl tw-duration-300 common-shadow-two flex-shrink-0"
          >
            <i className="ph ph-heart-straight"></i>
          </button>
        </div>
        <span className="text-main-600 d-block fw-semibold tw-text-lg price-vnd">
          {formatVnd(product.priceMin)} – {formatVnd(product.priceMax)}
        </span>
      </div>
    </div>
  );
}
