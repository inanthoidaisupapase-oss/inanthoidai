'use client';
import Link from 'next/link';

export default function BrandSlider() {
  return (
    <>
              
      <section className="brand-new py-120">
          <div className="container">
              <div className="row gy-4">
                  <div className="col-lg-4">
                      <div className="">
                          <div className="bg-white rounded-pill border border-neutral-100 tw-py-105 tw-px-4 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                              <div className="d-flex align-items-center tw-gap-205">
                                  <span className="text-primary-new d-sm-flex d-none tw-text-xl">
                                      <i className="ph-fill ph-check-circle"></i>
                                  </span>
                                  <span className="text-primary-new tw-text-lg text-sm-res-14-px fw-semibold text-center">Đối tác</span>
                              </div>
                              <span className="border-end border-neutral-300 tw-h-5 tw-w-px"></span>
                              <span className="text-neutral-500 tw-text-lg text-sm-res-14-px fw-normal text-center">Khách hàng doanh nghiệp</span>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-8">
                      <div className="tw-pb-15 sm-style-none border-start border-neutral-100 tw-ps-15">
                          <h2 className="text-reveal fw-semibold tw-mt-4 h1">Hơn 300 doanh nghiệp đã tin tưởng đặt bao bì tại Thời Đại
                          </h2>
                      </div>
                  </div>
              </div>
      
              <div className="border-top border-neutral-100">
                  <div className="row gy-5">
                      <div className="col-lg-4">
                          <div className="tw-pt-15">
                              <div className="max-w-380-px d-flex flex-column tw-gap-8">
                                  <p className="text-neutral-500">Khách hàng của chúng tôi trải rộng từ thời trang, mỹ phẩm, thực phẩm tới thương mại điện tử — mỗi ngành một yêu cầu bao bì khác nhau.</p>
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
                      <div className="col-lg-8 ">
                          <div className="border-start border-neutral-100 ps-sm-0">
                              <div className="brand-new-item-wrapper">
                                  <div className="brand-new-item tw-px-4 d-flex justify-content-center align-items-center animation-item custom-fade-animation" data-delay=".5" data-fade-from="bottom" data-ease="bounce">
                                      <img src="/assets/images/thumbs/brand-new-img1.png" alt="Logo Image" className="animate__wobble" />
                                  </div>
                                  <div className="brand-new-item tw-px-4 d-flex justify-content-center align-items-center animation-item custom-fade-animation" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
                                      <img src="/assets/images/thumbs/brand-new-img2.png" alt="Logo Image" className="animate__wobble" />
                                  </div>
                                  <div className="brand-new-item tw-px-4 d-flex justify-content-center align-items-center animation-item custom-fade-animation" data-delay=".7" data-fade-from="bottom" data-ease="bounce">
                                      <img src="/assets/images/thumbs/brand-new-img3.png" alt="Logo Image" className="animate__wobble" />
                                  </div>
                                  <div className="brand-new-item tw-px-4 d-flex justify-content-center align-items-center animation-item custom-fade-animation" data-delay=".8" data-fade-from="bottom" data-ease="bounce">
                                      <img src="/assets/images/thumbs/brand-new-img4.png" alt="Logo Image" className="animate__wobble" />
                                  </div>
                                  <div className="brand-new-item tw-px-4 d-flex justify-content-center align-items-center animation-item custom-fade-animation" data-delay=".9" data-fade-from="bottom" data-ease="bounce">
                                      <img src="/assets/images/thumbs/brand-new-img5.png" alt="Logo Image" className="animate__wobble" />
                                  </div>
                                  <div className="brand-new-item tw-px-4 d-flex justify-content-center align-items-center animation-item custom-fade-animation" data-delay=".99" data-fade-from="bottom" data-ease="bounce">
                                      <img src="/assets/images/thumbs/brand-new-img6.png" alt="Logo Image" className="animate__wobble" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
      
          </div>
      </section>
      
              
    </>
  );
}
