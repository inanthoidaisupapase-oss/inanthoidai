'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

/**
 * Slider ảnh full-bleed kiểu ".product-slider" trong about.html gốc (mục
 * Instagram post). Tham số Swiper lấy nguyên từ printop/assets/js/main.js:
 * slidesPerView 1, spaceBetween 10, grabCursor, loop, autoplay true (mặc định
 * 3000ms), speed 1000, breakpoints 0:1 / 425:2 / 576:3 / 768:4 / 992:5 / 1200:6.
 *
 * slidesPerView tối đa 6 nhưng chỉ có 6 ảnh — Swiper cần nhiều hơn số slide
 * hiển thị cùng lúc mới loop mượt (nếu không sẽ log "Loop Warning" và tự tắt
 * loop). Lặp lại danh sách ảnh 2 lần cho đủ, ảnh trang trí nên lặp không có
 * vấn đề nhận diện thật/giả như logo đối tác hay ảnh khách hàng.
 */
export default function GallerySlider({ images }: { images: string[] }) {
  const slides = [...images, ...images];
  return (
    <>
      <div className="swiper product-slider">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={10}
          grabCursor
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={1000}
          pagination={{ el: '.gallery-slider-pagination', clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            425: { slidesPerView: 2 },
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 },
            1200: { slidesPerView: 6 },
          }}
        >
          {slides.map((src, i) => (
            <SwiperSlide className="h-unset d-flex" key={`${src}-${i}`}>
              <div className="d-flex align-items-end w-100">
                <div className="w-100">
                  <Link href="/san-pham" className="clip-animation image-double-animation overflow-hidden position-relative d-block tw-rounded-lg">
                    <img src={src} alt="" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                    <img src={src} alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="swiper-pagination gallery-slider-pagination position-relative tw-mt-8"></div>
    </>
  );
}
