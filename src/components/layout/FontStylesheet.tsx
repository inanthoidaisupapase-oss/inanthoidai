'use client';

import { useEffect, useRef } from 'react';

// Kỹ thuật loadCSS (Filament Group): nạp CSS font với media="print" (không chặn
// render màn hình) rồi đổi media="all" khi tải xong. Bản HTML thuần dùng thuộc
// tính onload="this.media='all'" (chuỗi JS), nhưng React không eval chuỗi làm
// event handler — phải là onLoad camelCase nhận một hàm, và onLoad chỉ gắn được
// trong Client Component (Server Component không serialize được hàm qua RSC
// payload). Vì vậy tách riêng component 'use client' này thay vì xử lý trực
// tiếp trong layout.tsx.
//
// onLoad chỉ bắt được sự kiện load xảy ra SAU khi React hydrate. File CSS cùng
// origin (fonts.css tự host) thường tải xong TRƯỚC đó → onLoad không bao giờ chạy,
// media kẹt ở "print" và font không bao giờ được dùng. useEffect bù trường hợp
// này: link.sheet khác null nghĩa là stylesheet đã tải xong.
export default function FontStylesheet({ href }: { href: string }) {
  const ref = useRef<HTMLLinkElement>(null);

  useEffect(() => {
    if (ref.current?.sheet) ref.current.media = 'all';
  }, []);

  return (
    <link
      ref={ref}
      rel="stylesheet"
      href={href}
      media="print"
      onLoad={(e) => {
        e.currentTarget.media = 'all';
      }}
    />
  );
}
