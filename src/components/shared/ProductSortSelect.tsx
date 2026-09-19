'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Mặc định' },
  { value: 'gia-tang', label: 'Giá tăng dần' },
  { value: 'gia-giam', label: 'Giá giảm dần' },
  { value: 'ten-az', label: 'Tên A-Z' },
  { value: 'danh-muc', label: 'Theo danh mục' },
];

/** Dropdown sắp xếp ở đầu cột sản phẩm (shop-new.html) — điều hướng bằng query string thật */
export default function ProductSortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <select
      aria-label="Sắp xếp sản phẩm"
      value={searchParams.get('sap-xep') ?? ''}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        if (e.target.value) params.set('sap-xep', e.target.value);
        else params.delete('sap-xep');
        params.delete('trang');
        const qs = params.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname);
      }}
      className="form-control form-select border border-neutral-100 focus-border-main-600 rounded-pill tw-ps-4 tw-pe-10 tw-py-2 w-auto focus-outline-0 text-body fw-medium shadow-none"
    >
      {OPTIONS.map((o) => (
        <option value={o.value} key={o.value || 'mac-dinh'}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
