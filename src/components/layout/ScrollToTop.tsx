'use client';

import { useEffect, useRef } from 'react';

/**
 * Nút cuộn lên đầu trang, port từ main.js:
 * - hiện class .active-progress khi scrollTop > 50
 * - vòng tròn SVG chạy theo % đã cuộn (strokeDashoffset)
 * - click cuộn lên đầu trong 550ms
 */
export default function ScrollToTop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap) return;

    const length = path.getTotalLength();
    path.style.transition = 'none';
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = String(length);
    path.getBoundingClientRect();
    path.style.transition = 'stroke-dashoffset 10ms linear';

    const onScroll = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      path.style.strokeDashoffset = String(height > 0 ? length - (scroll * length) / height : length);
      wrap.classList.toggle('active-progress', scroll > 50);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="progress-wrap"
      ref={wrapRef}
      role="button"
      tabIndex={0}
      aria-label="Lên đầu trang"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path ref={pathRef} d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </div>
  );
}
