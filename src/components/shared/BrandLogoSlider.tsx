'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// TODO: thay bằng logo thật của khách hàng doanh nghiệp (xem docs/IMAGE-GUIDE.md).
// Dùng lại đúng 6 ảnh placeholder brand-new-imgN.png đã có trong dự án (xem
// components/home/BrandSlider.tsx) — không tự sinh ảnh mới.
const logos = [
  '/assets/images/thumbs/brand-new-img1.png',
  '/assets/images/thumbs/brand-new-img2.png',
  '/assets/images/thumbs/brand-new-img3.png',
  '/assets/images/thumbs/brand-new-img4.png',
  '/assets/images/thumbs/brand-new-img5.png',
  '/assets/images/thumbs/brand-new-img6.png',
];

/**
 * Slider logo đối tác kiểu about.html gốc (khác BrandSlider.tsx của trang chủ,
 * vốn dùng marquee CSS 2 hàng ngược chiều — xem ghi chú trong brand.css).
 * Tham số Swiper lấy nguyên từ `.brand-slider` trong printop/assets/js/main.js:
 * loop true, grabCursor, speed 1500, slidesPerView 6 desktop với breakpoints
 * 300:2 / 575:3 / 768:4 / 992:5 / 1200:6. Bản gốc gọi `autoplay: {delay:2000,...}`
 * rồi ngay dòng dưới ghi đè bằng `autoplay: true` (bug của template, giá trị sau
 * thắng) — Swiper mặc định autoplay delay 3000ms khi truyền `true`, giữ nguyên
 * hành vi thật đó thay vì đoán lại số 2000.
 *
 * Chỉ có 6 logo placeholder trong khi slidesPerView tối đa là 6 — Swiper cần
 * nhiều hơn số slide hiển thị cùng lúc mới loop mượt được (nếu không sẽ log
 * "Loop Warning" và tự tắt loop). Lặp lại danh sách 2 lần (12 slide) để đủ,
 * giống cách BrandSlider.tsx (marquee trang chủ) đã lặp logo cho đủ vị trí.
 */
const loopSlides = [...logos, ...logos];

export default function BrandLogoSlider() {
  return (
    <div className="swiper brand-slider left-right-gradient gradient-width-200">
      <Swiper
        modules={[Autoplay]}
        loop
        grabCursor
        speed={1500}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={2}
        breakpoints={{
          300: { slidesPerView: 2 },
          575: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          992: { slidesPerView: 5 },
          1200: { slidesPerView: 6 },
        }}
      >
        {loopSlides.map((src, i) => (
          <SwiperSlide key={`${src}-${i}`}>
            <div className="d-flex justify-content-center tw-duration-300">
              <img src={src} alt="Logo khách hàng doanh nghiệp" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
