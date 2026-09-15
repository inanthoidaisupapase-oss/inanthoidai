'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { initTemplateBehaviors } from '@/lib/template-behaviors';

declare global {
  interface Window {
    AOS?: { init: (o: Record<string, unknown>) => void; refresh: () => void; refreshHard: () => void };
    ScrollTrigger?: { refresh: () => void };
  }
}

/**
 * Nạp bundle JS của template và chạy lại các hành vi sau mỗi lần đổi route.
 * Template gốc là multi-page nên mọi script chạy 1 lần lúc load; với App Router
 * phải chủ động init lại, nếu không các trang sau sẽ mất animation.
 */
export default function TemplateRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanup = initTemplateBehaviors();
    // AOS.init({ once: false }) — đúng tham số trong main.js gốc
    window.AOS?.init({ once: false });
    window.AOS?.refreshHard();
    window.ScrollTrigger?.refresh();
    return cleanup;
  }, [pathname]);

  return (
    <Script
      src="/assets/js/vendor.bundle.js"
      strategy="afterInteractive"
      onReady={() => {
        window.AOS?.init({ once: false });
      }}
    />
  );
}
