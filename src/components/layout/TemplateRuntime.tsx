'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { initTemplateBehaviors } from '@/lib/template-behaviors';

declare global {
  interface Window {
    AOS?: { init: (o: Record<string, unknown>) => void; refresh: () => void; refreshHard: () => void };
    ScrollTrigger?: { refresh: () => void };
    ScrollSmoother?: { get: () => { scrollTo: (target: number, smooth?: boolean) => void } | undefined };
    tp_scrollBg?: () => void;
    tp_clipAnimation?: () => void;
  }
}

/**
 * Nạp bundle JS của template và chạy lại các hành vi sau mỗi lần đổi route.
 * Template gốc là multi-page nên mọi script chạy 1 lần lúc load; với App Router
 * phải chủ động init lại, nếu không các trang sau sẽ mất animation.
 */
export default function TemplateRuntime() {
  const pathname = usePathname();
  const cleanupRef = useRef<() => void>(() => {});

  useEffect(() => {
    // custom-gsap.js bọc #smooth-wrapper/#smooth-content bằng ScrollSmoother.create() —
    // nó tự lấy vị trí cuộn qua transform riêng, tách khỏi window.scrollY, nên next/link
    // chuyển route xong mà không reset được: trang mới hiện ra vẫn giữ transform cuộn cũ
    // (trang trước dài, trang sau ngắn) → nhảy xuống gần cuối trang mới. Phải tự gọi API
    // reset của ScrollSmoother, tương đương lenis.scrollTo(0, { immediate: true }).
    window.ScrollSmoother?.get()?.scrollTo(0, false);

    cleanupRef.current = initTemplateBehaviors();
    // AOS.init({ once: false }) — đúng tham số trong main.js gốc
    window.AOS?.init({ once: false });
    window.AOS?.refreshHard();
    // custom-gsap.js: tp_scrollBg() gắn hiệu ứng .text-reveal (SplitText + ScrollTrigger
    // scrub). Bản gốc tự chạy qua listener "DOMContentLoaded", nhưng sự kiện đó đã bắn
    // xong trước khi vendor.bundle.js kịp tải (Script strategy="afterInteractive") nên
    // không bao giờ tự chạy — phải gọi tay, giống AOS/ScrollTrigger ở trên. Gọi lại mỗi
    // lần đổi route để bắt các phần tử .text-reveal mới của trang vừa vào.
    window.tp_scrollBg?.();
    // custom-gsap.js: tp_clipAnimation() tạo 9 div ".mask" (nền = ảnh
    // data-animate="true") rồi animate clip-path khi cuộn tới — không có bước
    // này thì ảnh trong mọi ".clip-animation" kẹt ở opacity:0 (main.css) vĩnh
    // viễn. Cùng vấn đề timing với tp_scrollBg ở trên nên cũng phải gọi tay.
    window.tp_clipAnimation?.();
    window.ScrollTrigger?.refresh();

    // Refresh() ở trên chạy trước khi ảnh/font tải xong, nên ScrollTrigger
    // cache vị trí pin/reveal (.custom-fade-animation, marquee...) theo chiều
    // cao trang CHƯA đủ — các section nằm sâu cuối trang dài (>10.000px) kẹt
    // sai vị trí trigger, có khi không bao giờ tự hiện ra. Đợi font + toàn bộ
    // ảnh trên trang tải xong (hoặc lỗi) rồi refresh lại một lần nữa cho khớp
    // chiều cao thật.
    let cancelled = false;
    const refreshAgain = () => {
      if (cancelled) return;
      window.AOS?.refreshHard();
      window.ScrollTrigger?.refresh();
    };
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const imagesReady = new Promise<void>((resolve) => {
      const pending = Array.from(document.images).filter((img) => !img.complete);
      if (pending.length === 0) { resolve(); return; }
      let remaining = pending.length;
      const onSettle = () => { remaining -= 1; if (remaining <= 0) resolve(); };
      pending.forEach((img) => {
        img.addEventListener('load', onSettle, { once: true });
        img.addEventListener('error', onSettle, { once: true });
      });
    });
    Promise.all([fontsReady, imagesReady]).then(refreshAgain);

    return () => {
      cancelled = true;
      cleanupRef.current();
    };
  }, [pathname]);

  return (
    <Script
      src="/assets/js/vendor.bundle.js"
      strategy="afterInteractive"
      onReady={() => {
        window.AOS?.init({ once: false });
        // vendor.bundle.js (chứa Typed.js, tp_scrollBg...) nạp "afterInteractive" nên
        // luôn tải xong SAU effect ở trên khi vào trang lần đầu — typedText() trong
        // initTemplateBehaviors() lúc đó chưa thấy window.Typed nên bỏ qua
        // vĩnh viễn. Khởi tạo lại một lần ở đây để chạy đúng khi script sẵn sàng.
        cleanupRef.current();
        cleanupRef.current = initTemplateBehaviors();
        // Cùng lý do: lần đầu vào trang, effect ở trên chạy tp_scrollBg?.() khi
        // window.tp_scrollBg chưa tồn tại nên bị bỏ qua — gọi lại ở đây.
        window.tp_scrollBg?.();
        window.tp_clipAnimation?.();
      }}
    />
  );
}
