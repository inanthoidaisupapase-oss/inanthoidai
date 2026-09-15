'use client';

import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { submitQuote, type FormState } from '@/lib/actions/forms';
import { useCart } from '@/lib/cart/CartContext';
import { formatVnd } from '@/lib/format';

const initial: FormState = { ok: false, message: '' };

export default function QuoteForm() {
  const { items, total, clear, ready } = useCart();
  const [state, action, pending] = useActionState(submitQuote, initial);
  // Gửi thành công thì dọn giỏ hàng, tránh khách bấm gửi lần hai với cùng nội dung.
  // clear() ghi vào localStorage rồi phát sự kiện — đây là đồng bộ với hệ thống
  // bên ngoài React, không phải setState của component này.
  useEffect(() => {
    if (state.ok) clear();
  }, [state.ok, clear]);

  if (state.ok) {
    return (
      <div className="bg-neutral-50 tw-rounded-2xl tw-p-10 text-center">
        <span className="d-flex justify-content-center tw-text-6xl text-main-600 tw-mb-5">
          <i className="ph-fill ph-check-circle"></i>
        </span>
        <h2 className="h3 tw-mb-4">{state.message}</h2>
        <p className="text-neutral-500 tw-mb-8">
          Nhân viên kinh doanh sẽ liên hệ lại theo số điện thoại bạn để lại.
        </p>
        <Link href="/san-pham" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600">
          <span className="btn-text">Tiếp tục xem sản phẩm</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="row gy-5">
      <div className="col-lg-7">
        <form action={action} className="row gy-4">
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <input
            type="hidden"
            name="items"
            value={JSON.stringify(items.map((i) => ({ name: i.name, packSize: i.packSize, quantity: i.quantity })))}
          />

          <div className="col-sm-6">
            <label className="fw-medium tw-mb-2 d-block" htmlFor="full_name">Họ và tên *</label>
            <input id="full_name" name="full_name" type="text" required
              className="form-control border border-neutral-100 focus-border-main-600 tw-rounded-lg tw-py-3 tw-px-4 shadow-none" />
            {state.fieldErrors?.full_name && <span className="text-danger tw-text-sm">{state.fieldErrors.full_name}</span>}
          </div>

          <div className="col-sm-6">
            <label className="fw-medium tw-mb-2 d-block" htmlFor="phone">Số điện thoại *</label>
            <input id="phone" name="phone" type="tel" required inputMode="tel" placeholder="0938676746"
              className="form-control border border-neutral-100 focus-border-main-600 tw-rounded-lg tw-py-3 tw-px-4 shadow-none" />
            {state.fieldErrors?.phone && <span className="text-danger tw-text-sm">{state.fieldErrors.phone}</span>}
          </div>

          <div className="col-sm-6">
            <label className="fw-medium tw-mb-2 d-block" htmlFor="email">Email</label>
            <input id="email" name="email" type="email"
              className="form-control border border-neutral-100 focus-border-main-600 tw-rounded-lg tw-py-3 tw-px-4 shadow-none" />
            {state.fieldErrors?.email && <span className="text-danger tw-text-sm">{state.fieldErrors.email}</span>}
          </div>

          <div className="col-sm-6">
            <label className="fw-medium tw-mb-2 d-block" htmlFor="company">Công ty</label>
            <input id="company" name="company" type="text"
              className="form-control border border-neutral-100 focus-border-main-600 tw-rounded-lg tw-py-3 tw-px-4 shadow-none" />
          </div>

          <div className="col-12">
            <label className="fw-medium tw-mb-2 d-block" htmlFor="note">
              Yêu cầu chi tiết {items.length === 0 && '*'}
            </label>
            <textarea id="note" name="note" rows={6}
              placeholder="Kích thước, số lượng, chất liệu, có in logo hay không, thời gian cần hàng..."
              className="form-control border border-neutral-100 focus-border-main-600 tw-rounded-lg tw-py-3 tw-px-4 shadow-none" />
            {state.fieldErrors?.note && <span className="text-danger tw-text-sm">{state.fieldErrors.note}</span>}
          </div>

          <div className="col-12">
            <button type="submit" disabled={pending} className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-2 tw-pe-6 tw-py-3">
              <span className="btn-icon-animation d-flex align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-white rounded-circle">
                <i className="ph-bold ph-paper-plane-tilt text-gradient-main"></i>
              </span>
              <span className="btn-text">{pending ? 'Đang gửi...' : 'Gửi yêu cầu báo giá'}</span>
            </button>
          </div>

          {state.message && !state.ok && (
            <div className="col-12">
              <div className="tw-rounded-lg tw-p-4 bg-danger-50 text-danger" role="alert">{state.message}</div>
            </div>
          )}
        </form>
      </div>

      <div className="col-lg-5">
        <div className="bg-neutral-50 tw-rounded-2xl tw-p-8">
          <h2 className="h4 tw-mb-6">Sản phẩm đã chọn</h2>
          {!ready ? (
            <p className="text-neutral-500">Đang tải...</p>
          ) : items.length === 0 ? (
            <p className="text-neutral-500">
              Bạn chưa chọn sản phẩm nào. Có thể{' '}
              <Link href="/san-pham" className="text-main-600 hover-common-underline">chọn từ danh sách sản phẩm</Link>{' '}
              hoặc mô tả yêu cầu trong ô bên trái.
            </p>
          ) : (
            <>
              <ul className="d-flex flex-column tw-gap-4">
                {items.map((item) => (
                  <li className="d-flex align-items-center tw-gap-4" key={`${item.slug}-${item.packSize}`}>
                    <img src={item.image} alt="" className="tw-w-16 tw-rounded-lg object-fit-cover flex-shrink-0" />
                    <div className="flex-grow-1">
                      <span className="text-heading fw-medium d-block">{item.name}</span>
                      <span className="text-neutral-500 tw-text-sm">
                        {item.packSize} hộp/lô × {item.quantity} lô
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-top border-neutral-200 tw-mt-6 tw-pt-6 d-flex justify-content-between align-items-center">
                <span className="text-neutral-600">Tạm tính</span>
                <span className="h5 text-main-600 mb-0 price-vnd">{formatVnd(total)}</span>
              </div>
              <p className="text-neutral-500 tw-text-sm tw-mt-3 mb-0">
                Đây là giá tham khảo. Giá chính thức theo báo giá của nhân viên kinh doanh sau khi chốt quy cách.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
