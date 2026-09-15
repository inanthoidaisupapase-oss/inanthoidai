import Link from 'next/link';
import type { Product } from '@/types/content';
import { formatVnd } from '@/lib/format';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="shop-item">
      <div className="">
        <div className="">
          <Link href={`/san-pham/${product.slug}`} className="clip-animation image-double-animation overflow-hidden position-relative d-block tw-rounded-lg">
            {/* TODO ảnh: ảnh thật sản phẩm — xem docs/IMAGE-GUIDE.md */}
            <img src={product.images[0]} alt={product.name} data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
            <img src={product.images[0]} alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
          </Link>
          <div className="tw-mt-6 text-center">
            <span className="text-main-600 d-block fw-semibold tw-mb-2 price-vnd">
              {formatVnd(product.priceMin)} – {formatVnd(product.priceMax)}
            </span>
            <Link href={`/san-pham/${product.slug}`} className="text-body-7 hover-text-heading hover-common-underline fw-semibold h4">
              {product.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
