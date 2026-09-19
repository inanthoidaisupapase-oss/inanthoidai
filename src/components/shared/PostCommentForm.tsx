'use client';

import { useId, useState } from 'react';
import { site } from '@/lib/site';

/**
 * Form "Leave a Comment" — giữ nguyên cấu trúc/markup của blog-details.html
 * (Tên/Email/Bình luận + checkbox lưu thông tin). Spec (docs/spec.md) chưa có
 * bảng lưu bình luận (chỉ có posts/quote_requests/contact_messages), nên form
 * KHÔNG giả vờ lưu được — bấm gửi hiện thông báo trung thực thay vì bịa phản
 * hồi "đã đăng bình luận". Cùng tinh thần với tab "Đánh giá" ở ProductTabs.tsx
 * (không bịa dữ liệu/tính năng chưa có nguồn thật).
 */
export default function PostCommentForm() {
  const id = useId();
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="bg-neutral-100 tw-py-10 tw-px-40-px tw-mt-14 tw-rounded-xl form-submit"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <h2 className="h4 tw-mt-2 tw-pb-2 mb-0">Để lại bình luận</h2>
      <p className="text-body-11 tw-text-lg tw-pb-3">Email của bạn sẽ không được hiển thị công khai. Các trường bắt buộc được đánh dấu *</p>
      <span className="tw-w-100-px bg-main-600 tw-h-05 tw-mb-6"></span>
      <div className="row gy-4">
        <div className="col-sm-6">
          <div className="">
            <label htmlFor={`${id}-name`} className="fw-bold text-heading d-block tw-mb-2">Họ tên *</label>
            <input
              type="text"
              required
              className="border border-neutral-100 focus-border-main-600 tw-rounded-md tw-px-4 tw-py-205 w-100 focus-outline-0 text-body fw-medium"
              placeholder="Họ tên của bạn"
              id={`${id}-name`}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="">
            <label htmlFor={`${id}-email`} className="fw-bold text-heading d-block tw-mb-2">Email *</label>
            <input
              type="email"
              required
              className="border border-neutral-100 focus-border-main-600 tw-rounded-md tw-px-4 tw-py-205 w-100 focus-outline-0 text-body fw-medium"
              placeholder="Email của bạn"
              id={`${id}-email`}
            />
          </div>
        </div>
        <div className="col-sm-12">
          <div className="">
            <label htmlFor={`${id}-comment`} className="fw-bold text-heading d-block tw-mb-2">Bình luận *</label>
            <textarea
              required
              className="border border-neutral-100 focus-border-main-600 tw-rounded-md tw-px-4 tw-py-205 w-100 focus-outline-0 text-body fw-medium tw-h-160-px"
              placeholder="Nội dung bình luận"
              id={`${id}-comment`}
            ></textarea>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="form-check ps-0">
            <input className="form-check-input tw-me-2 tw-w-405 tw-h-405" type="checkbox" value="" id={`${id}-save`} />
            <label className="form-check-label tw-mt-05 tw-text-lg" htmlFor={`${id}-save`}>
              Lưu tên và email của tôi trên trình duyệt này cho lần bình luận sau.
            </label>
          </div>
        </div>
        <div className="col-12">
          <div className="tw-mt-6">
            <button type="submit" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-two-600 w-100 tw-rounded-xl">
              <span className="btn-text">Gửi bình luận </span>
              <span className="btn-icon-animation d-flex">
                <i className="ph ph-paper-plane-tilt"></i>
              </span>
            </button>
          </div>
          {submitted && (
            <p className="tw-mt-4 tw-mb-0 text-neutral-600" role="status">
              Cảm ơn bạn! Tính năng bình luận trực tuyến đang được hoàn thiện nên chưa lưu được nội dung này —
              cần trao đổi ngay, vui lòng gọi {site.hotline} hoặc gửi email {site.email}.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
