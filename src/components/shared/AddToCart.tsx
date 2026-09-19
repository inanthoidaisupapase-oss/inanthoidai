'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart/CartContext';
import { formatVnd } from '@/lib/format';
import type { Product } from '@/types/content';

/**
 * Card "Chọn thông số sản phẩm" — đối chiếu section.shop-details-new (shop-details-new.html,
 * template Printop). Mẫu gốc có 4 select (Stock/Size/Print Side/Quantity) tự tính tổng tiền
 * theo tổ hợp chọn — không khớp mô hình sản phẩm hiện tại (mỗi kích thước đã là 1 sản phẩm
 * riêng với chất liệu/kiểu hộp cố định, xem specs; biến số thật duy nhất khách tự chọn được
 * là SỐ LƯỢNG, qua product.priceTiers). Giữ đúng CƠ CHẾ "chọn thông số → tự tính tạm tính"
 * của mẫu gốc, chỉ áp vào đúng biến số thật (bậc số lượng + số lô) thay vì bịa thêm select
 * định lượng giấy/kích thước/số mặt in không có dữ liệu thật đứng sau.
 */
export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [tierIndex, setTierIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const tier = product.priceTiers[tierIndex];
  const subtotal = tier.price ? tier.price * quantity : null;
  const colors = product.specs['Màu sắc'];

  const onAdd = () => {
    add({
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      packSize: tier.qty,
      price: tier.price ?? 0,
      quantity,
    });
    setAdded(true);
  };

  return (
    <div className="bg-neutral-50 border border-neutral-100 tw-p-8 tw-rounded-2xl tw-mt-8">
      <h2 className="tw-pb-8 tw-mb-8 border-bottom border-neutral-100 h3">Chọn thông số sản phẩm</h2>

      <div className="d-flex flex-column tw-gap-6">
        <div className="">
          <label className="tw-text-lg fw-semibold text-heading tw-mb-3 d-block" htmlFor="pack-size">Số lượng đặt</label>
          <select
            id="pack-size"
            value={tierIndex}
            onChange={(e) => { setTierIndex(Number(e.target.value)); setAdded(false); }}
            className="border border-neutral-100 bg-white rounded-pill tw-py-205 tw-px-7 form-select shadow-none focus-border-main-600 w-100"
          >
            {product.priceTiers.map((t, i) => (
              <option value={i} key={t.qty}>
                {t.qty} hộp {t.price ? `— ${formatVnd(t.price)}/lô` : '— liên hệ báo giá'}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <label className="tw-text-lg fw-semibold text-heading tw-mb-3 d-block" htmlFor="pack-count">Số lô đặt</label>
          <div className="d-flex align-items-center tw-gap-2">
            <button type="button" aria-label="Giảm" onClick={() => { setQuantity((q) => Math.max(1, q - 1)); setAdded(false); }}
              className="btn bg-white border border-neutral-100 text-heading p-0 tw-w-10 tw-h-10 d-flex justify-content-center align-items-center rounded-circle flex-shrink-0">
              <i className="ph-bold ph-minus"></i>
            </button>
            <input
              id="pack-count"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => { setQuantity(Math.max(1, Number(e.target.value) || 1)); setAdded(false); }}
              className="form-control border border-neutral-100 bg-white text-center rounded-pill focus-outline-0 shadow-none"
            />
            <button type="button" aria-label="Tăng" onClick={() => { setQuantity((q) => q + 1); setAdded(false); }}
              className="btn bg-white border border-neutral-100 text-heading p-0 tw-w-10 tw-h-10 d-flex justify-content-center align-items-center rounded-circle flex-shrink-0">
              <i className="ph-bold ph-plus"></i>
            </button>
          </div>
          <span className="text-neutral-500 tw-text-sm d-block tw-mt-2">
            {tier.qty} hộp/lô × {quantity} lô = {(tier.qty * quantity).toLocaleString('vi-VN')} hộp
          </span>
        </div>

        {colors && (
          <p className="text-neutral-500 tw-text-sm mb-0">
            Màu sắc có sẵn: <span className="text-heading fw-medium">{colors}</span> — ghi rõ màu chọn khi gửi yêu cầu báo giá.
          </p>
        )}
      </div>

      <div className="tw-my-8 border-top border-neutral-100 tw-pt-8">
        <h2 className="h5 fw-semibold tw-mb-2">
          Tạm tính:{' '}
          {subtotal ? (
            <span className="text-main-600 price-vnd">{formatVnd(subtotal)}</span>
          ) : (
            <span className="text-neutral-500 tw-text-lg">liên hệ để nhận báo giá cho mức số lượng này</span>
          )}
        </h2>
        <p className="text-neutral-500 tw-leading-155 mb-0">
          Giá tham khảo, chưa gồm VAT. Giá chính thức theo báo giá của nhân viên kinh doanh sau khi chốt quy cách và số lượng.
        </p>
      </div>

      <div className="d-flex align-items-center tw-gap-4 flex-wrap">
        <button type="button" onClick={onAdd} className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-2 tw-pe-6 tw-py-3">
          <span className="btn-icon-animation d-flex align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-white rounded-circle">
            <i className="ph-bold ph-shopping-cart text-gradient-main"></i>
          </span>
          <span className="btn-text">Thêm vào yêu cầu báo giá</span>
        </button>
        {added && (
          <Link href="/gio-hang" className="btn bg-transparent border border-primary-new text-main-two-600 hover-bg-animation hover-bg-animation-main-two-600 hover-animate-text-white">
            <span className="btn-text">Đã thêm — xem danh sách</span>
          </Link>
        )}
      </div>
    </div>
  );
}
