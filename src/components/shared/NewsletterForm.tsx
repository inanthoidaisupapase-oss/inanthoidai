'use client';

import { useActionState, useId } from 'react';
import { submitNewsletter, type FormState } from '@/lib/actions/forms';

const initial: FormState = { ok: false, message: '' };

/**
 * Form đăng ký bản tin — dùng chung cho Footer.tsx và widget sidebar trang
 * Tin tức (2 nơi cùng gọi tới `submitNewsletter`, lưu bảng `newsletter_subscribers`
 * thật, không còn form trang trí như trước). `source` phân biệt 2 nơi đăng ký
 * để thống kê. `variant="footer"` giữ đúng markup gốc của template (input
 * dạng pill, nút icon đè lên bằng position-absolute); `variant="sidebar"` dùng
 * cho widget "Cùng Thời Đại khám phá thêm" (input + nút full-width bên dưới).
 */
export default function NewsletterForm({
  source,
  variant,
}: {
  source: 'footer' | 'blog-sidebar';
  variant: 'footer' | 'sidebar';
}) {
  const [state, action, pending] = useActionState(submitNewsletter, initial);
  const id = useId();

  const honeypot = (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
      <label htmlFor={`${id}-website`}>Website</label>
      <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );

  if (variant === 'footer') {
    return (
      <form action={action} className="position-relative">
        {honeypot}
        <input type="hidden" name="source" value={source} />
        <label className="visually-hidden" htmlFor={`${id}-email`}>Email</label>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          placeholder="Địa chỉ email của bạn"
          className="border border-white-16 tw-py-405 tw-ps-6 tw-pe-100-px bg-white-08 rounded-pill tw-placeholder-text-neutral-300 text-white focus-border-neutral-100 w-100"
        />
        <button
          type="submit"
          disabled={pending}
          className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-6 tw-pe-405 tw-py-3 flex-shrink-0 position-absolute tw-end-0 top-50 translate-middle-y tw-me-4"
        >
          <span className="btn-icon d-flex z-1">
            <span className="btn-icon-animation">
              <i className="ph-bold ph-paper-plane-tilt"></i>
            </span>
          </span>
        </button>
        {state.message && (
          <p className={`tw-mt-3 tw-mb-0 tw-text-sm ${state.ok ? 'text-white' : 'text-danger'}`} role="status">
            {state.message}
          </p>
        )}
      </form>
    );
  }

  return (
    <form action={action}>
      {honeypot}
      <input type="hidden" name="source" value={source} />
      <label className="visually-hidden" htmlFor={`${id}-email`}>Email</label>
      <input
        id={`${id}-email`}
        type="email"
        name="email"
        required
        placeholder="Email của bạn"
        className="form-control border border-neutral-100 focus-border-main-600 tw-rounded-lg tw-py-3 tw-px-4 shadow-none"
      />
      <div className="custom-fade-animation tw-mt-4" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
        <button type="submit" disabled={pending} className="btn bg-main-two-600 hover-bg-animation hover-bg-animation-main-600 tw-rounded-xl tw-py-4 w-100">
          <span className="btn-text">{pending ? 'Đang gửi...' : 'Đăng ký ngay'} </span>
          <span className="btn-icon-animation d-flex">
            <i className="ph-bold ph-arrow-down-right"></i>
          </span>
        </button>
      </div>
      {state.message && (
        <p className={`tw-mt-3 tw-mb-0 tw-text-sm ${state.ok ? 'text-success' : 'text-danger'}`} role="status">
          {state.message}
        </p>
      )}
    </form>
  );
}
