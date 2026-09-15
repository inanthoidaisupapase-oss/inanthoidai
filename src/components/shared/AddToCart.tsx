'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart/CartContext';
import { formatVnd } from '@/lib/format';
import type { Product } from '@/types/content';

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [tierIndex, setTierIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const tier = product.priceTiers[tierIndex];

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
    <div className="tw-mt-8">
      <div className="d-flex align-items-center tw-gap-6 flex-wrap">
        <div>
          <label className="d-block fw-medium tw-mb-2" htmlFor="pack-size">Số lượng mỗi lô</label>
          <select
            id="pack-size"
            value={tierIndex}
            onChange={(e) => { setTierIndex(Number(e.target.value)); setAdded(false); }}
            className="form-control form-select border border-neutral-100 focus-border-main-600 rounded-pill tw-ps-4 tw-pe-10 tw-py-2 w-auto focus-outline-0 text-body fw-medium shadow-none"
          >
            {product.priceTiers.map((t, i) => (
              <option value={i} key={t.qty}>
                {t.qty} hộp {t.price ? `— ${formatVnd(t.price)}` : '— liên hệ báo giá'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="d-block fw-medium tw-mb-2" htmlFor="pack-count">Số lô</label>
          <div className="d-flex align-items-center tw-gap-2">
            <button type="button" aria-label="Giảm" onClick={() => { setQuantity((q) => Math.max(1, q - 1)); setAdded(false); }}
              className="btn bg-neutral-100 text-heading p-0 tw-w-10 tw-h-10 d-flex justify-content-center align-items-center rounded-circle">
              <i className="ph-bold ph-minus"></i>
            </button>
            <input
              id="pack-count"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => { setQuantity(Math.max(1, Number(e.target.value) || 1)); setAdded(false); }}
              className="form-control border border-neutral-100 text-center tw-w-20 focus-outline-0 shadow-none"
            />
            <button type="button" aria-label="Tăng" onClick={() => { setQuantity((q) => q + 1); setAdded(false); }}
              className="btn bg-neutral-100 text-heading p-0 tw-w-10 tw-h-10 d-flex justify-content-center align-items-center rounded-circle">
              <i className="ph-bold ph-plus"></i>
            </button>
          </div>
        </div>
      </div>

      {!tier.price && (
        <p className="text-neutral-500 tw-mt-4 tw-text-sm">
          Bậc {tier.qty} hộp chưa có giá niêm yết — thêm vào danh sách rồi gửi yêu cầu, chúng tôi báo giá trong ngày làm việc.
        </p>
      )}

      <div className="d-flex align-items-center tw-gap-4 tw-mt-8 flex-wrap">
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
