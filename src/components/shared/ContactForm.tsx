'use client';

import { useActionState } from 'react';
import { submitContact, type FormState } from '@/lib/actions/forms';

const initial: FormState = { ok: false, message: '' };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  return (
    <form action={action} className="row gy-4">
      {/* Bẫy bot — ẩn với người dùng, bot tự điền */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="col-sm-6">
        <label className="fw-medium tw-mb-2 d-block" htmlFor="full_name">Họ và tên *</label>
        <input id="full_name" name="full_name" type="text" required
          className="form-control border border-neutral-100 focus-border-main-600 tw-rounded-lg tw-py-3 tw-px-4 shadow-none" />
        {state.fieldErrors?.full_name && <span className="text-danger tw-text-sm">{state.fieldErrors.full_name}</span>}
      </div>

      <div className="col-sm-6">
        <label className="fw-medium tw-mb-2 d-block" htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" required
          className="form-control border border-neutral-100 focus-border-main-600 tw-rounded-lg tw-py-3 tw-px-4 shadow-none" />
        {state.fieldErrors?.email && <span className="text-danger tw-text-sm">{state.fieldErrors.email}</span>}
      </div>

      <div className="col-12">
        <label className="fw-medium tw-mb-2 d-block" htmlFor="subject">Tiêu đề</label>
        <input id="subject" name="subject" type="text"
          className="form-control border border-neutral-100 focus-border-main-600 tw-rounded-lg tw-py-3 tw-px-4 shadow-none" />
      </div>

      <div className="col-12">
        <label className="fw-medium tw-mb-2 d-block" htmlFor="message">Nội dung *</label>
        <textarea id="message" name="message" rows={6} required
          className="form-control border border-neutral-100 focus-border-main-600 tw-rounded-lg tw-py-3 tw-px-4 shadow-none" />
        {state.fieldErrors?.message && <span className="text-danger tw-text-sm">{state.fieldErrors.message}</span>}
      </div>

      <div className="col-12">
        <button type="submit" disabled={pending} className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-2 tw-pe-6 tw-py-3">
          <span className="btn-icon-animation d-flex align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-white rounded-circle">
            <i className="ph-bold ph-paper-plane-tilt text-gradient-main"></i>
          </span>
          <span className="btn-text">{pending ? 'Đang gửi...' : 'Gửi liên hệ'}</span>
        </button>
      </div>

      {state.message && (
        <div className="col-12">
          <div className={`tw-rounded-lg tw-p-4 ${state.ok ? 'bg-success-50 text-success' : 'bg-danger-50 text-danger'}`} role="status">
            {state.message}
          </div>
        </div>
      )}
    </form>
  );
}
