import { getProducts } from '@/lib/data';
import ProductMarquee from '@/components/shared/ProductMarquee';

const steps = [
  {
    icon: 'get-started-icon1.png',
    title: 'Gửi yêu cầu hoặc file thiết kế',
    text: 'Gửi kích thước, số lượng và mục đích sử dụng. Đã có file thiết kế hay mới chỉ có ý tưởng đều được — đội thiết kế dựng mẫu miễn phí cho đơn in tại xưởng.',
  },
  {
    icon: 'get-started-icon2.png',
    title: 'Duyệt mẫu và chốt báo giá',
    text: 'Chúng tôi gửi bản dựng kèm quy cách: chất liệu, sóng carton, kỹ thuật in và gia công. Duyệt test proof trên đúng chất liệu trước khi chạy sản lượng.',
  },
  {
    icon: 'get-started-icon3.png',
    title: 'Sản xuất tại xưởng và giao hàng',
    text: 'In, bế, cán màng và gấp dán đều làm tại xưởng nên kiểm soát được tiến độ. Giao hàng toàn quốc, nhận hàng kiểm tra rồi thanh toán.',
  },
];

export default async function GetStarted() {
  const products = await getProducts();
  // 5 dải ảnh chạy ngang, mỗi dải lấy ảnh đại diện của các sản phẩm thật
  const rows = Array.from({ length: 5 }, (_, r) =>
    products.map((p) => ({ src: p.images[0], alt: p.name, href: `/san-pham/${p.slug}` }))
      .slice(r % 3)
      .concat(products.slice(0, r % 3).map((p) => ({ src: p.images[0], alt: p.name, href: `/san-pham/${p.slug}` }))),
  );

  return (
    <section className="get-started-new come-from-right-item-section overflow-hidden">
      <div className="container max-w-1620-px">
        <div className="tw-rounded-3xl border border-neutral-100 position-relative overflow-hidden z-1 section-bg-gradient-two pt-120">
          <img src="/assets/images/shapes/boxed-shape.png" alt="" className="position-absolute tw-start-0 top-0 z-n1 d-md-block d-none" />
          <img src="/assets/images/shapes/boxed-shape.png" alt="" className="position-absolute tw-end-0 top-0 z-n1 d-md-block d-none" />
          <img src="/assets/images/shapes/curve-star-shape.png" alt="" className="position-absolute tw-end-0 top-0 z-n1 d-md-block d-none tw-mt-17 tw-me-17 animate__wobble__two" />
          <img src="/assets/images/shapes/testimonials-new-shape1.png" className="position-absolute tw-end-0 bottom-0 z-n1 d-md-block d-none tw-mb-12 tw-me-11 animation-rotate z-0" alt="" />

          <div className="position-relative">
            <div className="container">
              <div className="row flex-wrap-reverse gy-5">
                <div className="col-lg-6">
                  <div className="get-started-product-box bg-white overflow-hidden tw-pt-10 border border-neutral-100">
                    <div className="">
                      {rows.map((images, i) => (
                        <ProductMarquee
                          key={i}
                          images={images}
                          reverse={i % 2 === 1}
                          className={`get-started-product-slider-${['one', 'two', 'three', 'four', 'five'][i]} tw-mb-305`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="">
                    <div className="tw-mb-15">
                      <div className="bg-white rounded-pill border border-neutral-100 tw-py-105 tw-px-4 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                        <div className="d-flex align-items-center tw-gap-205">
                          <span className="text-primary-new d-sm-flex d-none tw-text-xl">
                            <i className="ph-fill ph-check-circle"></i>
                          </span>
                          <span className="text-primary-new tw-text-lg text-sm-res-14-px fw-semibold text-center">Quy trình đặt hàng</span>
                        </div>
                        <span className="border-end border-neutral-300 tw-h-5 tw-w-px"></span>
                        <span className="text-neutral-500 tw-text-lg text-sm-res-14-px fw-normal text-center">Ba bước từ ý tưởng tới thành phẩm</span>
                      </div>
                      <h2 className="fw-bold tw-mt-4 h1">
                        <span className="text-reveal d-inline">Đặt in tại Thời Đại đơn giản hơn bạn nghĩ</span>
                      </h2>
                    </div>

                    <div className="come-from-right-item-wrapper get-started-item-wrapper d-flex flex-column tw-gap-74-px scroll-sm scroll-style-main">
                      {steps.map((step) => (
                        <div className="come-from-right-item get-started-item border-bottom border-neutral-100 tw-pb-48-px" key={step.icon}>
                          <div className="d-flex align-items-center flex-sm-nowrap flex-wrap tw-gap-6 bg-white tw-p-4 tw-rounded-xl animation-item">
                            <span className="tw-w-88-px tw-h-88-px bg-primary-new tw-rounded-xl d-flex justify-content-center align-items-center">
                              <img src={`/assets/images/icons/${step.icon}`} alt="" className="animate__heartBeat" />
                            </span>
                            <h2 className="h3 text-capitalize">{step.title}</h2>
                          </div>
                          <div className="d-flex align-items-center tw-gap-74-px tw-mt-8">
                            <span className="d-flex">
                              <i className="ph-bold ph-caret-right"></i>
                            </span>
                            <p className="text-neutral-500">{step.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
