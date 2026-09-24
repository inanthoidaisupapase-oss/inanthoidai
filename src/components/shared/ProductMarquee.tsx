'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

/**
 * Dải ảnh sản phẩm chạy ngang liên tục ở khối "Quy trình đặt hàng".
 * Tham số lấy nguyên từ getStartedProductSliderOne..Five trong main.js:
 * slidesPerView 2, spaceBetween 14, centeredSlides, loop, speed 6000,
 * autoplay delay 0 (chạy liên tục), breakpoints 0:1 / 425:1 / 576:2 trở lên,
 * và các dải xen kẽ đổi chiều (reverseDirection).
 */
export default function ProductMarquee({
  images,
  reverse = false,
  className = '',
}: {
  images: { src: string; alt: string; href: string }[];
  reverse?: boolean;
  className?: string;
}) {
  return (
    <Swiper
      className={className}
      modules={[Autoplay]}
      slidesPerView={2}
      spaceBetween={14}
      grabCursor
      centeredSlides
      loop
      speed={6000}
      autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: reverse }}
      breakpoints={{ 0: { slidesPerView: 1 }, 425: { slidesPerView: 1 }, 576: { slidesPerView: 2 } }}
    >
      {images.map((img, i) => (
        <SwiperSlide className="min-w-max" key={`${img.src}-${i}`}>
          <Link href={img.href} className="d-block">
            {/* TODO ảnh: ảnh sản phẩm thật — xem docs/IMAGE-GUIDE.md */}
            <img src={img.src} alt={img.alt} className="get-started-marquee-img" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
