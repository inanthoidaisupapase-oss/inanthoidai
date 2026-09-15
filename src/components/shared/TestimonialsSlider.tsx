'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

export type Testimonial = {
  name: string;
  role: string;
  heading: string;
  quote: string;
  image: string;
};

/**
 * Slider đánh giá khách hàng.
 * Tham số lấy nguyên từ `testimonialsNewSlider` trong main.js:
 * slidesPerView 1, spaceBetween 0, centeredSlides false, grabCursor, loop,
 * autoplay false, speed 1000, effect "fade".
 *
 * Lược bỏ so với bản gốc: nút play video trên ảnh — trang gốc không có video
 * cảm nhận khách hàng nên không dựng nút mở lightbox rỗng.
 */
export default function TestimonialsSlider({ items }: { items: Testimonial[] }) {
  return (
    <Swiper
      className="testimonials-new-slider animated-slider-wrapper"
      modules={[EffectFade, Navigation, Pagination]}
      slidesPerView={1}
      spaceBetween={0}
      centeredSlides={false}
      grabCursor
      loop
      autoplay={false}
      speed={1000}
      effect="fade"
      pagination={{ el: '.swiper-pagination', clickable: true }}
      navigation={{ prevEl: '.testimonials-new-btn-prev', nextEl: '.testimonials-new-btn-next' }}
    >
      {items.map((item) => (
        <SwiperSlide className="tw-p-6" key={item.name}>
          <div className="testimonials-new-item">
            <div className="row gy-4">
              <div className="col-lg-6">
                <div className="position-relative d-flex justify-content-center h-100">
                  <div className="h-100 w-100">
                    <div className="active-slider-animate-updown transition-bounce tw-duration-600 transition-delay-1 h-100">
                      <div className="testimonials-new-img d-flex justify-content-center h-100 w-100">
                        {/* TODO ảnh: ảnh sản phẩm thật đã giao cho khách — xem docs/IMAGE-GUIDE.md */}
                        <img src={item.image} alt="" className="h-100 object-fit-cover" />
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between tw-gap-4 position-absolute bottom-0 start-0 w-100 tw-mb-4 tw-px-4 z-1 active-slider-animate-updown transition-bounce tw-duration-700 transition-delay-105">
                      <div className="">
                        <h2 className="text-white h3 shadow-text">{item.name}</h2>
                        <span className="tw-mt-3 text-white">{item.role}</span>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="position-absolute testimonials-new-shape1">
                      <img src="/assets/images/shapes/testimonials-new-shape1.png" alt="" className="animation-scalation" />
                    </div>
                    <div className="position-absolute testimonials-new-shape2">
                      <img src="/assets/images/shapes/testimonials-new-shape2.png" alt="" className="animation-scalation" />
                    </div>
                    <div className="position-absolute d-sm-block d-none testimonials-new-shape3">
                      <img src="/assets/images/shapes/testimonials-new-shape3.png" alt="" className="animation-rotate-right" />
                    </div>
                    <div className="position-absolute d-sm-block d-none testimonials-new-shape4">
                      <img src="/assets/images/shapes/testimonials-new-shape4.png" alt="" className="animation-rotate-right" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="bg-white tw-rounded-3xl tw-p-40-px position-relative h-100 active-slider-animate-little-updown tw-duration-700 transition-delay-05">
                  <ul className="d-flex align-items-center tw-gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <li className="d-flex text-warning tw-text-xl tw-duration-300" key={i}>
                        <i className="ph-fill ph-star"></i>
                      </li>
                    ))}
                  </ul>
                  <h2 className="tw-mt-3 h4">{item.heading}</h2>
                  <p className="tw-text-lg text-neutral-600 tw-mt-5 max-w-500-px tw-leading-155">“{item.quote}”</p>
                  <ul className="d-flex flex-column tw-gap-2 tw-mt-705">
                    <li className="d-flex align-items-center tw-gap-205">
                      <span className="d-flex tw-text-xl text-primary-new"><i className="ph-fill ph-check-circle"></i></span>
                      <span className="tw-text-base text-neutral-600">Đánh giá từ khách hàng đã đặt hàng</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-205">
                      <span className="d-flex tw-text-xl text-primary-new"><i className="ph-fill ph-check-circle"></i></span>
                      <span className="tw-text-base text-neutral-600">Sản xuất trực tiếp tại xưởng</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-205">
                      <span className="d-flex tw-text-xl text-primary-new"><i className="ph-fill ph-check-circle"></i></span>
                      <span className="tw-text-base text-neutral-600">Thiết kế miễn phí cho đơn in tại xưởng</span>
                    </li>
                  </ul>
                  <span className="tw-h-px w-100 bg-neutral-100 d-block tw-mt-10 tw-mb-6"></span>
                  <span className="quate-new-icon position-absolute tw-end-0 bottom-0 tw-me-12 tw-mb-13 opacity-25">
                    <img src="/assets/images/icons/quate-new-icon.png" alt="" />
                  </span>
                  <div className="d-flex align-items-center tw-gap-4">
                    <button type="button" aria-label="Đánh giá trước" className="btn bg-main-600 gradient-outline-bg-white hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-11 tw-h-11 d-flex justify-content-center align-items-center tw-text-2xl text-white testimonials-new-btn-prev">
                      <i className="ph-bold ph-caret-left z-1 text-gradient-main tw-duration-300"></i>
                    </button>
                    <button type="button" aria-label="Đánh giá sau" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-11 tw-h-11 d-flex justify-content-center align-items-center tw-text-2xl text-white testimonials-new-btn-next">
                      <i className="ph-bold ph-caret-right z-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
