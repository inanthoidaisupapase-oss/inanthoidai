'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

/**
 * Gallery ảnh sản phẩm.
 * Tham số lấy nguyên từ shopThumbs / shopSmallThumbs trong main.js:
 * - shopThumbs: loop, spaceBetween 0, effect "fade", navigation .swiper-button-next/prev
 * - shopSmallThumbs: loop, spaceBetween 0, slidesPerView 4, freeMode, watchSlidesProgress
 * Tắt loop khi số ảnh ít hơn slidesPerView để Swiper không nhân bản slide.
 */
export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [thumbs, setThumbs] = useState<SwiperClass | null>(null);
  const perView = Math.min(4, images.length);

  return (
    <>
      <Swiper
        className="shop-thumbs tw-rounded-xl overflow-hidden border border-neutral-100"
        modules={[EffectFade, Navigation, Thumbs]}
        loop={images.length > 1}
        spaceBetween={0}
        effect="fade"
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
      >
        {images.map((src, i) => (
          <SwiperSlide key={src + i}>
            {/* TODO ảnh: ảnh thật sản phẩm — xem docs/IMAGE-GUIDE.md */}
            <img src={src} alt={alt} className="w-100 h-100 object-fit-cover" />
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>

      <Swiper
        className="shop-small-thumbs tw-mt-4"
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbs}
        loop={false}
        spaceBetween={12}
        slidesPerView={perView}
        freeMode
        watchSlidesProgress
      >
        {images.map((src, i) => (
          <SwiperSlide key={`thumb-${src}-${i}`}>
            <img src={src} alt="" className="w-100 tw-rounded-lg border border-neutral-100 object-fit-cover cursor-pointer" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
