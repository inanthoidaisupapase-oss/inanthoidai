'use client';

import { useEffect, useState } from 'react';

/**
 * Preloader của template. Phần ẩn nó nằm trong custom-gsap.js (timeline delay 2s
 * rồi yPercent -100 và display:none).
 *
 * Bẫy đã biết khi port template: nếu chỉ port markup mà quên phần JS ẩn nó thì
 * màn hình bị che vĩnh viễn. Ở đây có thêm chốt an toàn: sau 4 giây, dù vendor JS
 * có lỗi hay không tải được, component vẫn tự gỡ preloader.
 */
export default function Preloader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 4000);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="preloader">
      <div className="preloader__text text-white animated-title text-hover-animation-scale">
        IN ẤN THỜI ĐẠI
      </div>
      <div className="preloader__overlay">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className={`block block-${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
