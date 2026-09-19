'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * Thanh trượt khoảng giá — port đúng thuật toán ở shop-new.html/main.js (2 input
 * type=range đồng bộ với 2 ô nhập số, khoảng cách tối thiểu GAP, thanh ".progress"
 * định vị bằng inset-inline-start/end theo %). Khác bản gốc: đơn vị VNĐ (không phải
 * $), biên min/max lấy từ giá thật của sản phẩm (props `bounds`) thay vì hardcode
 * 0-10000, và có thêm bước debounce trước khi đẩy giá trị lên URL để lọc sản phẩm
 * thật — bản gốc chỉ là demo tĩnh, không lọc gì cả.
 */
const GAP = 100_000;

export default function PriceRangeFilter({ bounds }: { bounds: { min: number; max: number } }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fromUrlMin = Number(searchParams.get('gia-tu'));
  const fromUrlMax = Number(searchParams.get('gia-den'));

  const [minVal, setMinVal] = useState(
    Number.isFinite(fromUrlMin) && fromUrlMin > 0 ? Math.max(bounds.min, fromUrlMin) : bounds.min,
  );
  const [maxVal, setMaxVal] = useState(
    Number.isFinite(fromUrlMax) && fromUrlMax > 0 ? Math.min(bounds.max, fromUrlMax) : bounds.max,
  );

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (minVal <= bounds.min) params.delete('gia-tu');
      else params.set('gia-tu', String(minVal));
      if (maxVal >= bounds.max) params.delete('gia-den');
      else params.set('gia-den', String(maxVal));
      params.delete('trang');
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minVal, maxVal]);

  const onMinChange = (raw: number) => setMinVal(Math.min(raw, maxVal - GAP));
  const onMaxChange = (raw: number) => setMaxVal(Math.max(raw, minVal + GAP));

  const span = bounds.max - bounds.min || 1;
  const startPct = ((minVal - bounds.min) / span) * 100;
  const endPct = 100 - ((maxVal - bounds.min) / span) * 100;

  return (
    <>
      <div className="slider">
        <div className="progress" style={{ insetInlineStart: `${startPct}%`, insetInlineEnd: `${endPct}%` }}></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min={bounds.min}
          max={bounds.max}
          step={GAP}
          value={minVal}
          aria-label="Giá thấp nhất"
          onChange={(e) => onMinChange(Number(e.target.value))}
        />
        <input
          type="range"
          className="range-max"
          min={bounds.min}
          max={bounds.max}
          step={GAP}
          value={maxVal}
          aria-label="Giá cao nhất"
          onChange={(e) => onMaxChange(Number(e.target.value))}
        />
      </div>
      <div className="tw-mt-6 d-flex align-items-center justify-content-center">
        <div className="price-input d-flex align-items-center tw-gap-1">
          <div className="field">
            <input
              type="number"
              className="border-0 focus-outline-0 tw-w-100-px text-neutral-600 bg-transparent input-min"
              value={minVal}
              step={GAP}
              min={bounds.min}
              max={bounds.max}
              aria-label="Giá thấp nhất (VNĐ)"
              onChange={(e) => onMinChange(Number(e.target.value) || bounds.min)}
            />
          </div>
          <span>-</span>
          <div className="field">
            <input
              type="number"
              className="border-0 focus-outline-0 tw-w-100-px text-neutral-600 bg-transparent input-max"
              value={maxVal}
              step={GAP}
              min={bounds.min}
              max={bounds.max}
              aria-label="Giá cao nhất (VNĐ)"
              onChange={(e) => onMaxChange(Number(e.target.value) || bounds.max)}
            />
          </div>
          <span className="text-neutral-500 tw-text-sm">đ</span>
        </div>
      </div>
    </>
  );
}
