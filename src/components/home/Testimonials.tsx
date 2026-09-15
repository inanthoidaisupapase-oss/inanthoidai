import Link from 'next/link';
import TestimonialsSlider, { type Testimonial } from '@/components/shared/TestimonialsSlider';
import testimonials from '@/lib/data/seed/testimonials.json';

export default function Testimonials() {
  return (
    <section className="testimonials-new py-120">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between flex-lg-nowrap flex-wrap tw-gap-6 tw-mb-15">
          <div className="max-w-650-px">
            <div className="bg-white rounded-pill border border-neutral-100 tw-py-105 tw-px-4 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
              <div className="d-flex align-items-center tw-gap-205">
                <span className="text-primary-new d-sm-flex d-none tw-text-xl">
                  <i className="ph-fill ph-check-circle"></i>
                </span>
                <span className="text-primary-new tw-text-lg text-sm-res-14-px fw-semibold text-center">Đánh giá</span>
              </div>
              <span className="border-end border-neutral-300 tw-h-5 tw-w-px"></span>
              <span className="text-neutral-500 tw-text-lg text-sm-res-14-px fw-normal text-center">Khách hàng nói gì</span>
            </div>
            <h2 className="fw-bold tw-mt-4 h1"> <span className="text-reveal d-inline">Chất lượng ổn định, tiến độ </span>{' '}
              <span className="text-gradient-main text-decoration-underline">đúng hẹn</span>
            </h2>
          </div>
          <div className="max-w-400-px d-flex flex-column tw-gap-8">
            <p className="text-neutral-500 text-lg-end">
              Phần lớn khách hàng đến với Thời Đại qua giới thiệu và quay lại cho các đơn hàng sau.
            </p>
            <div className=" d-flex justify-content-lg-end">
              <div className="custom-fade-animation" data-delay=".7" data-fade-from="bottom" data-ease="bounce">
                <Link href="/lien-he" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-2 tw-pe-6 tw-py-3 py-sm-2">
                  <span className="btn-icon-animation d-flex align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-white rounded-circle">
                    <i className="ph-bold ph-arrow-right text-gradient-main"></i>
                  </span>
                  <span className="btn-text">Liên hệ tư vấn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="background-img bg-img tw-rounded-3xl overflow-hidden" data-background-image="/assets/images/bg/testimonials-new-bg.png">
          <TestimonialsSlider items={testimonials as Testimonial[]} />
        </div>
      </div>
    </section>
  );
}
