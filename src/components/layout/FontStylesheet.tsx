'use client';

// Kỹ thuật loadCSS (Filament Group): nạp CSS font với media="print" (không chặn
// render màn hình) rồi đổi media="all" khi tải xong. Bản HTML thuần dùng thuộc
// tính onload="this.media='all'" (chuỗi JS), nhưng React không eval chuỗi làm
// event handler — phải là onLoad camelCase nhận một hàm, và onLoad chỉ gắn được
// trong Client Component (Server Component không serialize được hàm qua RSC
// payload). Vì vậy tách riêng component 'use client' này thay vì xử lý trực
// tiếp trong layout.tsx.
export default function FontStylesheet({ href }: { href: string }) {
  return (
    <link
      rel="stylesheet"
      href={href}
      media="print"
      onLoad={(e) => {
        e.currentTarget.media = 'all';
      }}
    />
  );
}
