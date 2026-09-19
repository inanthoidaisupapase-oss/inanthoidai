'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

/**
 * 2 hàng ảnh chạy ngang liên tục ở widget "Đăng ký nhận bản tin" — cuối
 * sidebar trang Tin tức (blog.html gốc: ".subscribe-slider-one/two").
 * Tham số Swiper lấy nguyên từ printop/assets/js/main.js: slidesPerView 3,
 * grabCursor, loop, centeredSlides, speed 6000, autoplay {delay:0,
 * disableOnInteraction:false} — delay 0 + speed cao là cách bản gốc dựng hiệu
 * ứng "marquee" từ Swiper thay vì animation CSS thuần (khác cơ chế marquee
 * CSS của BrandSlider.tsx trang chủ, vốn port từ 1 plugin jQuery khác hẳn).
 * Hàng 2 thêm reverseDirection:true để chạy ngược chiều hàng 1, đúng bản gốc.
 *
 * Bỏ các thuộc tính data-displacement/data-intensity/data-speedin/data-speedout
 * của template gốc — main.js không có đoạn JS nào đọc các thuộc tính này (grep
 * không ra kết quả), là markup chết còn sót lại từ 1 plugin distortion chưa
 * bao giờ được gắn, giữ lại chỉ gây rối không có tác dụng.
 *
 * Ảnh: dùng ảnh sản phẩm hộp giấy thật (shop-imgN.png đã dùng ở trang Sản
 * phẩm) thay ảnh mẫu 3D đồ chơi "subscribe-imgN.png" của template — offset
 * giữa 2 hàng lặp lại đúng kiểu bản gốc (hàng 2 lấy lại 2 ảnh cuối hàng 1).
 * Ảnh gốc subscribe-imgN.png xấp xỉ vuông (112×115px) nên không cần khung cắt;
 * ảnh sản phẩm thật của dự án là ảnh dọc (312×379px) nên thêm khung vuông cố
 * định + object-fit-cover (tw-w-90-px tw-h-92-px, đã dùng cho ảnh thu nhỏ
 * "Bài viết nổi bật" trong BlogSidebar) để tránh méo/lệch khi lặp ngang.
 */
const rowOneImages = [
  '/assets/images/thumbs/shop-img1.png',
  '/assets/images/thumbs/shop-img2.png',
  '/assets/images/thumbs/shop-img3.png',
  '/assets/images/thumbs/shop-img4.png',
  '/assets/images/thumbs/shop-img5.png',
];

const rowTwoImages = [
  '/assets/images/thumbs/shop-img4.png',
  '/assets/images/thumbs/shop-img5.png',
  '/assets/images/thumbs/shop-img6.png',
  '/assets/images/thumbs/shop-img7.png',
  '/assets/images/thumbs/shop-img2.png',
];

function SubscribeRow({ images, className, reverse }: { images: string[]; className: string; reverse?: boolean }) {
  return (
    <div className={`swiper overflow-hidden ${className}`}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={3}
        grabCursor
        loop
        centeredSlides
        speed={6000}
        autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: reverse }}
        wrapperClass="transition-timing-linear tw-gap-4"
      >
        {images.map((src, i) => (
          <SwiperSlide key={`${src}-${i}`}>
            <div className="position-relative d-block">
              <div className="tw-rounded-lg overflow-hidden tw-w-90-px tw-h-92-px">
                <img src={src} alt="Sản phẩm bao bì giấy Thời Đại" className="tw-rounded-md w-100 h-100 object-fit-cover" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default function SubscribeSlider() {
  return (
    <>
      <SubscribeRow images={rowOneImages} className="subscribe-slider-one" />
      <SubscribeRow images={rowTwoImages} className="subscribe-slider-two tw-mt-4" reverse />
    </>
  );
}
