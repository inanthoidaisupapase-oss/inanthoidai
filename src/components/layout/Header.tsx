'use client';

import Link from 'next/link';
import { site } from '@/lib/site';
import { useCart } from '@/lib/cart/CartContext';
import HeaderSearch from './HeaderSearch';

/**
 * Top-header-new + middle-header. Đặt NGOÀI #smooth-wrapper, đứng TRƯỚC HeaderNav (thanh
 * nav, class .header) — xem comment thứ tự trong layout.tsx. Hai khối này không dùng
 * position sticky/fixed, cuộn trôi bằng scroll gốc của trình duyệt (không qua transform
 * mượt của ScrollSmoother) — đúng ý đồ hiển thị gốc: chỉ thanh nav dính lại, top-header +
 * middle-header cuộn mất như bình thường.
 *
 * position-relative + tw-z-99 (utility có sẵn, không thêm CSS mới): #smooth-wrapper được
 * GSAP set position: fixed lúc runtime và đứng SAU trong DOM — nếu 2 khối này vẫn
 * position: static (mặc định) thì theo thứ tự stacking CSS2.1, #smooth-wrapper (positioned)
 * vẽ đè lên trên dù trong suốt, khiến ô tìm kiếm/nút giỏ hàng/link zalo... không bấm được.
 * Xem lý giải đầy đủ hơn trong HeaderNav.tsx (cùng vấn đề, đã gặp và sửa ở đó trước).
 */
export default function Header() {
  const { count } = useCart();

  return (
    <>
        {/* ============================ Top header ============================ */}
        <div className="top-header-new bg-main-600 tw-py-4 position-relative tw-z-99">
          <div className="container max-w-1760-px">
            <div className="d-flex align-items-center justify-content-between tw-gap-4">
              <div className="d-sm-flex align-items-center tw-gap-4 d-none">
                <div className="d-flex align-items-center tw-gap-2">
                  <span className="d-sm-flex d-none text-white tw-text-lg">
                    <i className="ph-fill ph-phone-call"></i>
                  </span>
                  <a href={`tel:${site.hotlineTel}`} className="d-flex text-white hover-common-underline">
                    {site.hotline}
                  </a>
                </div>
                <div className="d-flex align-items-center tw-gap-2">
                  <span className="d-sm-flex d-none text-white tw-text-lg">
                    <i className="ph-fill ph-envelope-open"></i>
                  </span>
                  <a href={`mailto:${site.email}`} className="d-flex text-white hover-common-underline">
                    {site.email}
                  </a>
                </div>
              </div>

              <div className="d-lg-flex align-items-center tw-gap-6 d-none">
                <span className="text-white">Theo dõi chúng tôi -</span>
                <div className="d-flex align-items-center tw-gap-3">
                  <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="tw-text-xl d-flex text-white hover-scale-2 tw-duration-100">
                    <i className="ph-fill ph-facebook-logo"></i>
                  </a>
                  <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="tw-text-xl d-flex text-white hover-scale-2 tw-duration-100">
                    <i className="ph-fill ph-youtube-logo"></i>
                  </a>
                  <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="tw-text-xl d-flex text-white hover-scale-2 tw-duration-100">
                    <i className="ph-fill ph-tiktok-logo"></i>
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-sm-end justify-content-between flex-sm-grow-0 flex-grow-1">
                <div className="d-flex align-items-center tw-gap-2 flex-shrink-0">
                  <span className="d-flex text-white tw-text-lg">
                    <i className="ph ph-clock"></i>
                  </span>
                  <span className="d-flex text-white">{site.workingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================ Middle header ============================ */}
        <div className="middle-header tw-py-5 section-bg border-bottom border-neutral-100 position-relative tw-z-99">
          <div className="container max-w-1760-px">
            <div className="d-flex align-items-center justify-content-md-start justify-content-between tw-gap-8">
              <div className="logo">
                <Link href="/" className="link">
                  {/* TODO ảnh: logo In Ấn Thời Đại — xem docs/IMAGE-GUIDE.md */}
                  <img src="/assets/images/logo/logo-new.png" alt={site.name} className="max-w-200-px" />
                </Link>
              </div>

              <HeaderSearch />

              <div className="d-xl-flex d-none align-items-center tw-gap-4 animation-item">
                <span className="tw-w-13 tw-h-13 border border-neutral-100 d-lg-flex d-none justify-content-center align-items-center text-main-600 rounded-circle flex-shrink-0 flex-grow-1 bg-white">
                  <img src="/assets/images/icons/icon-phone.png" alt="" className="animate__heartBeat" />
                </span>
                <div className="flex-grow-1">
                  <span className="text-neutral-600 tw-text-base fw-semibold d-block">Hotline: {site.hotline}</span>
                  <span className="text-body-3 tw-text-base tw-text-sm">Tư vấn &amp; báo giá miễn phí</span>
                </div>
              </div>

              <div className="d-flex align-items-center tw-gap-4">
                <Link
                  href="/bao-gia"
                  aria-label="Yêu cầu báo giá"
                  className="d-flex align-items-center justify-content-center gap-4 tw-text-3xl text-heading tw-leading-none position-relative hover-text-main-600 hover--translate-y-1 active--translate-y-scale-9 tw-me-4"
                >
                  <i className="ph ph-note-pencil"></i>
                </Link>
                <Link
                  href="/gio-hang"
                  aria-label="Giỏ hàng"
                  className="d-flex align-items-center justify-content-center gap-4 tw-text-3xl text-heading tw-leading-none position-relative hover-text-main-600 hover--translate-y-1 active--translate-y-scale-9 tw-me-4"
                >
                  <i className="ph ph-shopping-cart"></i>
                  <span className="tw-w-6 tw-h-6 d-flex align-items-center justify-content-center rounded-circle bg-primary-new text-white tw-text-xs position-absolute top-0 tw-end-0 tw--me-16-px tw--mt-10-px">
                    {count}
                  </span>
                </Link>
                <a
                  href={`https://zalo.me/${site.zalo.replace(/\s/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Zalo ${site.zalo}`}
                  className="d-flex align-items-center justify-content-center gap-4 tw-text-3xl text-heading tw-leading-none position-relative hover-text-main-600 hover--translate-y-1 active--translate-y-scale-9"
                >
                  <i className="ph ph-chat-circle-dots"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
