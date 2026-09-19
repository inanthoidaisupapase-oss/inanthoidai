'use client';

import { useState } from 'react';

/**
 * Ô "copy link chia sẻ" trong blog-details.html gốc — bản gốc chỉ có input readonly
 * + nút icon copy không gắn JS thật (main.js không có handler nào cho nút này).
 * Ở đây gắn thật navigator.clipboard, phản hồi bằng đổi icon tạm thời — cùng kiểu
 * phản hồi inline-state đã dùng ở AddToCart.tsx (setAdded), không dùng toast.
 */
export default function CopyPostLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Trình duyệt chặn clipboard (không phải HTTPS, hoặc thiếu quyền) — bỏ qua,
      // người dùng vẫn có thể tự bôi đen sao chép từ input.
    }
  };

  return (
    <div className="position-relative max-w-550-px">
      <input
        type="text"
        readOnly
        className="border border-neutral-100 rounded-pill tw-ps-5 tw-py-2 w-100 focus-outline-0 text-body fw-medium tw-pe-16"
        value={url}
        onFocus={(e) => e.currentTarget.select()}
      />
      <button
        type="button"
        onClick={onCopy}
        aria-label="Sao chép liên kết"
        className="text-main-600 tw-text-lg d-flex position-absolute top-50 tw-end-0 translate-middle-y tw-me-8"
      >
        <i className={copied ? 'ph-fill ph-check' : 'ph-fill ph-copy'}></i>
      </button>
      {copied && <span className="visually-hidden" role="status">Đã sao chép liên kết</span>}
    </div>
  );
}
