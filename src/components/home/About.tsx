import Link from 'next/link';

export default function About() {
  return (
    <>
              
      <section className="about-new py-120 section-bg-gradient-two position-relative overflow-hidden position-relative">
          <img src="/assets/images/shapes/boxed-shape.png" alt="" className="position-absolute tw-start-0 top-0 z-n1 d-md-block d-none" />
          <img src="/assets/images/shapes/boxed-shape.png" alt="" className="position-absolute tw-end-0 top-0 z-n1 d-md-block d-none" />
      
          <div className="container">
              <div className="row gy-4">
                  <div className="col-xl-6">
                      <div className="">
                          <div className="bg-white rounded-pill border border-neutral-100 tw-py-105 tw-px-4 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                              <div className="d-flex align-items-center tw-gap-205">
                                  <span className="text-primary-new d-sm-flex d-none tw-text-xl">
                                      <i className="ph-fill ph-check-circle"></i>
                                  </span>
                                  <span className="text-primary-new tw-text-lg text-sm-res-14-px fw-semibold text-center">Về chúng tôi</span>
                              </div>
                              <span className="border-end border-neutral-300 tw-h-5 tw-w-px"></span>
                              <span className="text-neutral-500 tw-text-lg text-sm-res-14-px fw-normal text-center">Công Ty TNHH Công Nghiệp Thời Đại</span>
                          </div>
                          <h2 className="fw-semibold tw-mt-4 h1"> <span className="text-reveal d-inline">Thiết kế — In ấn — Bao bì giấy</span> <span className="text-gradient-main text-decoration-underline">từ năm 2009</span>
                          </h2>
                          <div className="d-flex align-items-start tw-gap-5 tw-mt-8 custom-fade-animation animation-item" data-delay=".7" data-fade-from="bottom" data-ease="bounce">
                              <span className="bg-white border border-neutral-100 rounded-circle tw-w-16 tw-h-16 d-flex justify-content-center align-items-center tw-text-3xl text-primary-new tw-mt-2">
                                  <i className="ph ph-pen animate__heartBeat"></i>
                              </span>
                              <div className="position-relative group group-item">
                                  <div className="flex-shrink-0">
                                      <h2 className="display-5 fw-bold"><span className="counter">12</span><span className="text-danger">+</span></h2>
                                      <span className="text-neutral-500 tw-text-lg tw-mt-2">Nhóm sản phẩm bao bì</span>
                                  </div>
                              </div>
                          </div>
                          <p className="text-neutral-500 max-w-650-px tw-mt-7 tw-mb-10" data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">Tiền thân là Cơ Sở Bao Bì Thời Đại (2005), công ty chính thức thành lập ngày 09/07/2009. Xưởng sản xuất tại Tây Ninh, văn phòng tại TP.HCM, nhận thiết kế và in trực tiếp không qua trung gian.</p>
                          <div className="d-inline-flex flex-column tw-gap-3">
                              <div className="bg-white rounded-pill border border-neutral-100 tw-py-305 tw-ps-4 tw-pe-5 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                                  <span className="text-primary-new d-sm-flex d-none tw-text-2xl">
                                      <i className="ph-fill ph-check-circle"></i>
                                  </span>
                                  <span className="text-neutral-500 tw-text-lg text-sm-res-14-px fw-normal text-center">In offset và in Flexo ngay tại xưởng</span>
                              </div>
                              <div className="bg-white rounded-pill border border-neutral-100 tw-py-305 tw-ps-4 tw-pe-5 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">
                                  <span className="text-primary-new d-sm-flex d-none tw-text-2xl">
                                      <i className="ph-fill ph-check-circle"></i>
                                  </span>
                                  <span className="text-neutral-500 tw-text-lg text-sm-res-14-px fw-normal text-center">Gia công sau in trọn gói</span>
                              </div>
                          </div>
                          <div className="tw-mt-10 d-flex align-items-center tw-gap-5">
                              <div className="custom-fade-animation" data-delay=".7" data-fade-from="bottom" data-ease="bounce">
                                  <Link href="/lien-he" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-2 tw-pe-6 tw-py-3 py-sm-2">
                                      <span className="btn-icon-animation d-flex align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-white rounded-circle">
                                          <i className="ph-bold ph-arrow-right text-gradient-main"></i>
                                      </span>
                                      <span className="btn-text">Tìm hiểu thêm </span>
                                  </Link>
                              </div>
                              <div className="custom-fade-animation d-flex align-items-center tw-gap-3" data-delay=".8" data-fade-from="bottom" data-ease="bounce">
                                  <a href="https://www.youtube.com/watch?v=MFLVmAE4cqg" className="tw-w-12 tw-h-12 bg-primary-new text-white rounded-circle d-flex align-items-center justify-content-center tw-text-2xl hover-scale-2 play-button">
                                      <i className="ph-fill ph-play"></i>
                                  </a>
                                  <span className="text-heading fw-bold">Xem video giới thiệu </span>
                              </div>
                          </div>
                      </div>
                  </div>
      
                  <div className="col-xl-6 d-xl-block d-none">
                      <div className="about-img-wrapper">
                          <div className="two-border-left">
                              <span className="line-border border-red border-first-style-two"></span>
                              <span className="line-border border-blue border-first-style-one"></span>
                          </div>
                          <div className="two-border-right">
                              <span className="line-border border-red border-second-style-one"></span>
                              <span className="line-border border-blue border-second-style-two"></span>
                          </div>
                          <div className="tw-pt-9 position-relative">
                              <div className="clip-animation image-double-animation overflow-hidden tw-rounded-xl overflow-x-hidden w-100 h-100 max-w-530-px">
                                  <img src="/assets/images/thumbs/about-new-img1.png" alt="" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                  <img src="/assets/images/thumbs/about-new-img1.png" alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                              </div>
                              <div className="position-absolute top-0 start-50 translate-middle-x z-1">
                                  <img src="/assets/images/shapes/badge.png" alt="Badge Image" className="left-right-animation" />
                              </div>
                          </div>
                          <div className="about-img-two move-on-cursor-hover" data-value="6">
                              <div className="clip-animation image-double-animation overflow-hidden tw-rounded-xl overflow-x-hidden w-100 h-100">
                                  <img src="/assets/images/thumbs/about-new-img2.png" alt="" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                  <img src="/assets/images/thumbs/about-new-img2.png" alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                              </div>
                          </div>
                          <div className="about-img-three move-on-cursor-hover" data-value="20">
                              <div className="clip-animation image-double-animation overflow-hidden tw-rounded-xl overflow-x-hidden w-100 h-100">
                                  <img src="/assets/images/thumbs/about-new-img3.png" alt="" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                  <img src="/assets/images/thumbs/about-new-img3.png" alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
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
