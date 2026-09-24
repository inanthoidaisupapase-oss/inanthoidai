'use client';
import Link from 'next/link';

export default function Banner() {
  return (
    <>
              
      <section className="banner-new section-bg-gradient pt-80-px scroll-scale-item-wrapper position-relative overflow-hidden z-1 section-animation-onload">
          <div className="">
              <div className="text-center max-w-1050-px mx-auto tw-px-6">
                  <div className="bg-white rounded-pill common-shadow-two tw-py-2 tw-px-4 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                      <div className="d-flex align-items-center tw-gap-205">
                          <span className="text-primary-new d-sm-flex d-none tw-text-xl">
                              <i className="ph-fill ph-check-circle"></i>
                          </span>
                          <span className="text-primary-new tw-text-lg text-sm-res-14-px fw-semibold text-capitalize">In ấn không giới hạn</span>
                      </div>
                      <span className="border-end border-neutral-300 tw-h-7 tw-w-px"></span>
                      <span className="text-neutral-500 tw-text-lg text-sm-res-14-px fw-normal text-capitalize">Hơn 300 khách hàng tin tưởng</span>
                  </div>
                  <h1 className="tw-mt-4 banner-title fw-bold splitTextStyleOne text-uppercase">
                      Bao bì giấy{' '}
                      <span className="typed-text-wrapper text-start">
                          <span className="typed-text text-gradient-main text-decoration-underline"></span>
                      </span>{' '}
                      chuẩn xưởng{' '}
                      <span className="custom-fade-animation max-width-img" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
                          <img src="/assets/images/shapes/products-badge.png" alt="Hộp giấy, túi giấy, thùng carton" className="move-on-cursor-hover" data-value="1" />
                      </span>{' '}
                      cho thương hiệu Việt{' '}
                      <span className="custom-fade-animation d-lg-inline-flex d-none" data-delay=".7" data-fade-from="bottom" data-ease="bounce">
                          <img src="/assets/images/shapes/rounded-element.png" alt="" className="move-on-cursor-hover" data-value="1" />
                      </span>
                  </h1>
      
                  <p className="tw-text-xl tw-mt-6 max-w-650-px mx-auto" data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">Xưởng sản xuất trực tiếp hộp giấy, túi xách giấy, hộp giày, thùng carton và tem nhãn decal. Thiết kế miễn phí, giá xưởng, giao hàng toàn quốc.</p>
                  <div className="tw-mt-10 d-inline-flex tw-gap-6 button-responsive-class">
                      <div className="custom-fade-animation" data-delay=".8" data-fade-from="bottom" data-ease="bounce">
                          <Link href="/lien-he" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-2 tw-pe-6 tw-py-3 py-sm-2">
                              <span className="btn-icon-animation d-sm-flex d-none align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-white rounded-circle">
                                  <i className="ph-bold ph-arrow-right text-gradient-main"></i>
                              </span>
                              <span className="btn-text">Yêu cầu báo giá </span>
                          </Link>
                      </div>
                      <div className="custom-fade-animation" data-delay=".9" data-fade-from="bottom" data-ease="bounce">
                          <Link href="/san-pham" className="btn bg-transparent border border-primary-new text-main-two-600 hover-bg-animation hover-bg-animation-main-two-600 tw-ps-2 tw-pe-6 tw-py-3 py-sm-2 hover-icon-white hover-animate-text-white">
                              <span className="btn-icon-animation d-sm-flex d-none align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-main-600 rounded-circle">
                                  <i className="ph-bold ph-arrow-right text-white"></i>
                              </span>
                              <span className="btn-text text-gradient-main">
                                  Xem sản phẩm
                              </span>
                          </Link>
                      </div>
                  </div>
                  <div className="tw-mt-8 d-inline-flex tw-gap-8 flex-wrap align-items-center">
                      <div className="d-flex align-items-center tw-gap-205 animation-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                          <span className="text-primary-new d-flex tw-text-xl animate__heartBeat">
                              <i className="ph-bold ph-check-circle"></i>
                          </span>
                          <span className="tw-text-xl text-neutral-700">Hơn 300 khách hàng doanh nghiệp</span>
                      </div>
                      <div className="d-flex align-items-center tw-gap-205 animation-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                          <span className="text-primary-new d-flex tw-text-xl animate__heartBeat">
                              <i className="ph-bold ph-check-circle"></i>
                          </span>
                          <span className="tw-text-xl text-neutral-700">Xưởng sản xuất trực tiếp, không qua trung gian</span>
                      </div>
                      <div className="d-flex align-items-center tw-gap-205 animation-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">
                          <span className="text-primary-new d-flex tw-text-xl animate__heartBeat">
                              <i className="ph-bold ph-check-circle"></i>
                          </span>
                          <span className="tw-text-xl text-neutral-700">Hơn 15 năm kinh nghiệm</span>
                      </div>
                  </div>
              </div>
              <h2 className="text-220-px text-uppercase text-stroke d-lg-inline-block d-none writing-mode-lr position-absolute top-0 end-0 tw-me-13 tw-duration-300 tw-mb-12 z-0">
                  • Thời Đại
              </h2>
      
              <div className="d-xxl-block d-none">
                  <div className="position-absolute z-n1 banner-element-1">
                      <img src="/assets/images/shapes/banner-element-img1.png" alt="" className="animation-rotate-scale" />
                  </div>
                  <div className="position-absolute z-n1 banner-element-2">
                      <img src="/assets/images/shapes/banner-element-img2.png" alt="" className="animated-upDown" />
                  </div>
                  <div className="position-absolute z-n1 banner-element-3">
                      <img src="/assets/images/shapes/banner-element-img3.png" alt="" className="animate__wobble__two" />
                  </div>
                  <div className="position-absolute z-n1 banner-element-4">
                      <img src="/assets/images/shapes/banner-element-img4.png" alt="" className="animation-rotate-right" />
                  </div>
                  <div className="position-absolute z-n1 banner-element-5">
                      <img src="/assets/images/shapes/banner-element-img5.png" alt="" className="animation-scalation" />
                  </div>
                  <div className="position-absolute z-n1 banner-element-6">
                      <img src="/assets/images/shapes/banner-element-img6.png" alt="" className="animated-upDown" />
                  </div>
                  <div className="position-absolute z-n1 banner-element-7">
                      <img src="/assets/images/shapes/banner-element-img7.png" alt="" className="animation-rotate-right" />
                  </div>
              </div>
      
              <div className="pt-80-px tw-px-4">
                  {/* width/height = kích thước gốc file (3776×1160px, gấp đôi khung 1888×580 cho màn retina) — chỉ cho trình duyệt biết tỉ
                      lệ khung hình để tính layout sớm hơn, w-100/h-100 vẫn quyết định kích thước
                      hiển thị thật như cũ, không đổi giao diện. Đây là ảnh LCP của trang chủ —
                      fetchPriority="high" khiến React/Next.js 19 tự chèn <link rel="preload"> cho
                      đúng ảnh này vào <head> (đã kiểm chứng trong HTML build ra), không cần viết
                      tay thẻ preload riêng (thử ban đầu bị trùng preload — đã bỏ). */}
                  <img src="/assets/images/thumbs/banner-all-products.webp" alt="Sản phẩm bao bì giấy của In Ấn Thời Đại" className="w-100 h-100 scroll-scale-item" width={3776} height={1160} fetchPriority="high" />
              </div>
      
          </div>
      </section>
      
      
    </>
  );
}
