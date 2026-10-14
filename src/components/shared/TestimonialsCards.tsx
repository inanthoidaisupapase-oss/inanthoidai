'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Pagination, Autoplay } from 'swiper/modules';
import type { Testimonial } from '@/components/shared/TestimonialsSlider';

/**
 * Lưới thẻ đánh giá kiểu about.html gốc (khác TestimonialsSlider.tsx của
 * trang chủ, vốn dùng layout ảnh lớn 2 cột hiệu ứng "fade" — component đó vẫn
 * giữ nguyên, đây là bản Swiper multi-card riêng cho trang Giới thiệu).
 *
 * Tham số lấy nguyên từ `.testimonials-slider` trong printop/assets/js/main.js:
 * centeredSlides, loop, autoplay true (mặc định 3000ms), speed 1000,
 * effect "creative" với creativeEffect { limitProgress:5, prev/next translate
 * ±90%/5%/-50 + rotate [2,∓0,∓10] origin "bottom center" } — đây chính là hiệu
 * ứng "xoè bài" ở 2 thẻ bên cạnh. breakpoints 0:1 / 576:2 / 768:3 / 992:4 /
 * 1300:5. Thẻ active tô đỏ hoàn toàn nhờ CSS có sẵn của template
 * (`.testimonials-slider .swiper-slide.swiper-slide-active .testimonials-item`
 * → background-color: var(--main-600), main.css:6779) — không cần viết thêm
 * CSS, --main-600 đã là đỏ thương hiệu qua brand.css.
 *
 * pauseOnMouseEnter: true — bản gốc không có, thêm theo yêu cầu (dừng tự chạy
 * khi rê chuột vào để đọc nội dung).
 *
 * Ảnh tròn ở đầu thẻ dùng lại `item.image` — cùng ảnh sản phẩm đã giao cho
 * khách mà đánh giá ở trang chủ (TestimonialsSlider) đang hiển thị, lấy chung
 * từ testimonials.json (theo yêu cầu người dùng). Đây là ảnh sản phẩm chứ
 * không phải chân dung, nên alt để rỗng.
 *
 * loop=true + lặp lại danh sách 4 đánh giá thật 2 lần (8 thẻ, đủ cho
 * slidesPerView tối đa 5 loop mượt): theo yêu cầu rõ ràng của người dùng —
 * dùng lại đúng 4 đánh giá thật đã có (Thanh Rô, Minh Thư, Pha Nin, Thị Hiền),
 * không bịa thêm tên/nội dung mới.
 */
export default function TestimonialsCards({ items }: { items: Testimonial[] }) {
  const slides = [...items, ...items];
  return (
    <>
      <Swiper
        className="testimonials-slider"
        modules={[EffectCreative, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        centeredSlides
        grabCursor
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        speed={1000}
        effect="creative"
        creativeEffect={{
          limitProgress: 5,
          prev: { translate: ['-90%', '5%', -50], rotate: [2, -0, -10], origin: 'bottom center' },
          next: { translate: ['90%', '5%', -50], rotate: [2, 0, 10], origin: 'bottom center' },
        }}
        pagination={{ el: '.testimonials-cards-pagination', clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1300: { slidesPerView: 5 },
        }}
      >
        {slides.map((item, i) => (
          <SwiperSlide className="tw-p-3" key={`${item.name}-${i}`}>
            <div className="testimonials-item bg-white tw-rounded-20-px shadow-sm tw-px-6 tw-pt-9 tw-pb-15 tw-duration-300 h-100">
              <span className="d-block tw-w-16 tw-h-16">
                {/* TODO ảnh: dùng chung ảnh sản phẩm đã giao của đánh giá trang chủ — xem docs/IMAGE-GUIDE.md */}
                <img src={item.image} alt="" className="tw-w-16 tw-h-16 rounded-circle object-fit-cover" />
              </span>
              <div className="tw-mt-4">
                <h2 className="tw-text-base tw-mb-1 tw-duration-300">{item.name}</h2>
                <span className="d-block fw-medium tw-duration-300">{item.role}</span>
              </div>
              <ul className="tw-my-5 d-flex align-items-center tw-gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <li className="d-flex text-main-600 tw-text-lg tw-duration-300" key={i}>
                    <i className="ph-fill ph-star"></i>
                  </li>
                ))}
              </ul>
              <p className="tw-text-lg text-body-5 fw-medium tw-duration-300">&ldquo;{item.quote}&rdquo;</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination testimonials-cards-pagination style-one bottom-0 position-relative tw-mt-8"></div>
    </>
  );
}
