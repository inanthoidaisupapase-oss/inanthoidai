'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart/CartContext';
import { formatVnd } from '@/lib/format';

export default function CartView() {
  const { items, setQuantity, remove, clear, total, ready } = useCart();

  if (!ready) return <p className="text-neutral-500">Đang tải danh sách...</p>;

  if (items.length === 0) {
    return (
      <div className="text-center py-80">
        <span className="d-flex justify-content-center tw-text-6xl text-neutral-300 tw-mb-6">
          <i className="ph ph-shopping-cart"></i>
        </span>
        <h2 className="h4 tw-mb-4">Danh sách của bạn đang trống</h2>
        <p className="text-neutral-500 tw-mb-8">Chọn sản phẩm để thêm vào yêu cầu báo giá.</p>
        <Link href="/san-pham" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600">
          <span className="btn-text">Xem sản phẩm</span>
        </Link>
      </div>
    );
  }

  const hasUnpriced = items.some((i) => i.price === 0);

  return (
    <>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Quy cách</th>
              <th>Số lô</th>
              <th className="text-end">Tạm tính</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={`${item.slug}-${item.packSize}`}>
                <td>
                  <div className="d-flex align-items-center tw-gap-4">
                    <img src={item.image} alt="" className="tw-w-20 tw-rounded-lg object-fit-cover" />
                    <Link href={`/san-pham/${item.slug}`} className="text-heading fw-medium hover-common-underline">
                      {item.name}
                    </Link>
                  </div>
                </td>
                <td className="text-neutral-600">
                  {item.packSize} hộp/lô
                  <br />
                  <span className="tw-text-sm text-neutral-500 price-vnd">
                    {item.price ? formatVnd(item.price) + '/lô' : 'Liên hệ báo giá'}
                  </span>
                </td>
                <td>
                  <div className="d-flex align-items-center tw-gap-2">
                    <button type="button" aria-label="Giảm" onClick={() => setQuantity(item.slug, item.packSize, item.quantity - 1)}
                      className="btn bg-neutral-100 text-heading p-0 tw-w-9 tw-h-9 d-flex justify-content-center align-items-center rounded-circle">
                      <i className="ph-bold ph-minus"></i>
                    </button>
                    <span className="tw-w-10 text-center fw-medium">{item.quantity}</span>
                    <button type="button" aria-label="Tăng" onClick={() => setQuantity(item.slug, item.packSize, item.quantity + 1)}
                      className="btn bg-neutral-100 text-heading p-0 tw-w-9 tw-h-9 d-flex justify-content-center align-items-center rounded-circle">
                      <i className="ph-bold ph-plus"></i>
                    </button>
                  </div>
                </td>
                <td className="text-end fw-semibold price-vnd">
                  {item.price ? formatVnd(item.price * item.quantity) : '—'}
                </td>
                <td className="text-end">
                  <button type="button" aria-label="Xoá" onClick={() => remove(item.slug, item.packSize)}
                    className="btn bg-transparent text-neutral-400 hover-text-danger p-0 tw-text-xl">
                    <i className="ph ph-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center tw-gap-6 flex-wrap tw-mt-8 border-top border-neutral-100 tw-pt-8">
        <button type="button" onClick={clear} className="btn bg-neutral-100 text-heading hover-bg-animation">
          <span className="btn-text">Xoá toàn bộ</span>
        </button>

        <div className="text-end">
          <span className="text-neutral-500 d-block tw-mb-1">Tạm tính</span>
          <span className="h3 text-main-600 price-vnd">{formatVnd(total)}</span>
          {hasUnpriced && (
            <p className="text-neutral-500 tw-text-sm tw-mt-2 mb-0 max-w-400-px">
              Một số bậc số lượng chưa có giá niêm yết nên chưa cộng vào tạm tính. Giá cuối cùng theo báo giá của nhân viên kinh doanh.
            </p>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-end tw-gap-4 tw-mt-8 flex-wrap">
        <Link href="/san-pham" className="btn bg-transparent border border-primary-new text-main-two-600 hover-bg-animation hover-bg-animation-main-two-600 hover-animate-text-white">
          <span className="btn-text">Chọn thêm sản phẩm</span>
        </Link>
        <Link href="/bao-gia" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-2 tw-pe-6 tw-py-3">
          <span className="btn-icon-animation d-flex align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-white rounded-circle">
            <i className="ph-bold ph-arrow-right text-gradient-main"></i>
          </span>
          <span className="btn-text">Gửi yêu cầu báo giá</span>
        </Link>
      </div>
    </>
  );
}
