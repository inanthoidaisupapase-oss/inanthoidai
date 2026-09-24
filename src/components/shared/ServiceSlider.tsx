'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';
import type { Service } from '@/types/content';

/**
 * Cặp slider dịch vụ: slider lớn + dải thumbnail dọc bên phải.
 *
 * Tham số lấy nguyên từ main.js:
 * - serviceNewSlider: slidesPerView 1, spaceBetween 0, grabCursor, loop,
 *   autoplay delay 4000, speed 1000, effect "fade", thumbs = slider nhỏ
 * - serviceNewSmallSlider: slidesPerView 5, spaceBetween 0, freeMode,
 *   watchSlidesProgress, direction "vertical", loop
 *
 * Khác bản gốc (có ghi chú vì là thay đổi có chủ đích): template có 6 slide,
 * site này có 4 dịch vụ thật nên slider nhỏ để slidesPerView 4 và tắt loop —
 * loop với số slide ít hơn slidesPerView khiến Swiper nhân bản slide và lệch
 * đồng bộ với slider lớn.
 */
export default function ServiceSlider({ services }: { services: Service[] }) {
  const [thumbs, setThumbs] = useState<SwiperClass | null>(null);

  return (
    <>
      <div className="col-xl-6">
        <Swiper
          className="service-new-slider animated-slider-wrapper"
          modules={[EffectFade, Navigation, Thumbs]}
          slidesPerView={1}
          spaceBetween={0}
          grabCursor
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={1000}
          effect="fade"
          navigation={{ prevEl: '.service-new-btn-prev', nextEl: '.service-new-btn-next' }}
          thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
        >
          {services.map((service) => (
            <SwiperSlide key={service.slug}>
              <div className="service-new-item">
                <div className="overflow-hidden tw-pb-605">
                  <div className="position-relative">
                    <div className="overflow-hidden tw-rounded-xl bg-neutral-50">
                      {/* TODO ảnh: ảnh thật của dịch vụ {service.name} — xem docs/IMAGE-GUIDE.md */}
                      <img src={service.imageUrl} alt={service.name} className="tw-rounded-xl overflow-hidden position-relative active-slider-animate-updown transition-bounce tw-duration-600 transition-delay-05 h-100 w-100 object-fit-cover" />
                    </div>
                    <div className="position-absolute start-50 translate-middle-x bottom-0 tw--mt-45-px">
                      <div className="d-inline-flex bg-white tw-p-5 rounded-circle active-slider-animate-updown tw-duration-600 transition-delay-07 rounded-left-right-shape ">
                        <Link href={`/dich-vu/${service.slug}`} aria-label={service.name} className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-14 tw-h-14 d-flex justify-content-center align-items-center tw-text-2xl text-white">
                          <i className="ph-bold ph-arrow-up-right z-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-sm-row flex-column align-items-lg-center justify-content-between tw-gap-6 tw-mt-2 active-slider-animate-updown transition-bounce tw-duration-700 transition-delay-1">
                  <h2 className="tw-text-2xl fw-medium max-w-330-px">
                    <Link href={`/dich-vu/${service.slug}`} className="hover-common-underline hover-text-heading">
                      {service.name}
                    </Link>
                  </h2>
                  <p className="text-neutral-500 text-sm-end max-w-330-px tw-leading-155">{service.summary}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="col-xl-6">
        <div className="d-flex align-items-center tw-gap-6">
          <div className="d-flex align-items-center tw-gap-4">
            <button type="button" aria-label="Dịch vụ trước" className="btn bg-main-600 gradient-outline-bg-white hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-11 tw-h-11 d-flex justify-content-center align-items-center tw-text-2xl text-white service-new-btn-prev">
              <i className="ph-bold ph-caret-left z-1 text-gradient-main tw-duration-300"></i>
            </button>
            <button type="button" aria-label="Dịch vụ sau" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-11 tw-h-11 d-flex justify-content-center align-items-center tw-text-2xl text-white service-new-btn-next">
              <i className="ph-bold ph-caret-right z-1"></i>
            </button>
          </div>
          <span className="">
            <img src="/assets/images/icons/long-arrow-right.png" alt="" />
          </span>
        </div>

        <div className="service-small-image-wrapper d-xl-block d-none">
          <Swiper
            className="service-new-small-slider overflow-visible"
            modules={[FreeMode, Thumbs]}
            onSwiper={setThumbs}
            slidesPerView={services.length}
            spaceBetween={0}
            freeMode
            watchSlidesProgress
            grabCursor
            direction="vertical"
          >
            {services.map((service) => (
              <SwiperSlide className="overflow-hidden" key={service.slug}>
                <div className="service-small-image-item tw-rounded-xl overflow-hidden border border-white">
                  {/* Ảnh @2x (618×398) — width/height giữ khung hiển thị 309×199 như placeholder của template */}
                  <img src={`/assets/images/thumbs/service-${service.slug}-small.webp`} alt={service.name} width={309} height={199} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
