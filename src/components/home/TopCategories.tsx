'use client';
import Link from 'next/link';

export default function TopCategories() {
  return (
    <>
              
      <section className="top-categories-new py-120 section-bg-gradient-two position-relative overflow-hidden">
          <h2 className="text-220-px text-uppercase text-stroke d-lg-inline-block d-none writing-mode-lr position-absolute top-0 start-0 tw-me-13 tw-duration-300 tw-mb-12 z-0">
              Categories
          </h2>
      
          <img src="/assets/images/shapes/boxed-shape.png" alt="Shape" className="position-absolute tw-start-0 top-0 z-n1 d-md-block d-none" />
          <img src="/assets/images/shapes/boxed-shape.png" alt="Shape" className="position-absolute tw-end-0 top-0 z-n1 d-md-block d-none" />
          <img src="/assets/images/shapes/curve-star-shape.png" alt="Shape" className="position-absolute tw-end-0 top-0 z-n1 d-md-block d-none tw-mt-17 tw-me-17 animate__wobble__two" />
          <div className="position-absolute z-n1 end-0 bottom-0 tw-pb-15 tw-mb-5 tw-pe-15 tw-me-5 d-lg-block d-none">
              <img src="/assets/images/shapes/banner-element-img4.png" alt="Element Shape" className="animation-rotate-right" />
          </div>
      
          <div className="container">
              <div className="row gy-4 tw-mb-15">
                  <div className="col-lg-5">
                      <div className="">
                          <div className="bg-white rounded-pill border border-neutral-100 tw-py-105 tw-px-4 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                              <div className="d-flex align-items-center tw-gap-205">
                                  <span className="text-primary-new d-sm-flex d-none tw-text-xl">
                                      <i className="ph-fill ph-check-circle"></i>
                                  </span>
                                  <span className="text-primary-new tw-text-lg text-sm-res-14-px fw-semibold text-center">Explore</span>
                              </div>
                              <span className="border-end border-neutral-300 tw-h-5 tw-w-px"></span>
                              <span className="text-neutral-500 tw-text-lg text-sm-res-14-px fw-normal text-center">Our Top
                                  Categories</span>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-7">
                      <div className="">
                          <h2 className="text-reveal fw-semibold tw-mt-4 h1">Choose From a Wide Range of Printing Categories.</h2>
                      </div>
                  </div>
              </div>
      
              <div className="row gy-4">
                  <div className="col-lg-6">
                      <div className="row gy-4">
                          <div className="col-sm-6" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                              <div className="tw-rounded-2xl bg-white overflow-hidden border border-neutral-100 tw-p-4 image-double-animation h-100">
                                  <Link href="/san-pham" className="clip-animation overflow-hidden position-relative d-block tw-rounded-xl">
                                      <img src="/assets/images/thumbs/top-categories-new-img1.png" alt="Image" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                      <img src="/assets/images/thumbs/top-categories-new-img1.png" alt="Image" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                  </Link>
                                  <div className="tw-mt-4 d-flex align-items-center justify-content-between tw-gap-4 tw-px-2">
                                      <div className="">
                                          <h2 className="tw-text-lg tw-mb-205">
                                              <Link href="/san-pham" className="hover-common-underline hover-text-heading text-heading">Custom
                                                  Apparel</Link>
                                          </h2>
                                          <span className="text-neutral-500 tw-text-sm">2.5k+ Design Styles</span>
                                      </div>
                                      <div className="flex-shrink-0">
                                          <Link href="/san-pham" className="btn bg-main-600 gradient-outline-bg-white hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-8 tw-h-8 d-flex justify-content-center align-items-center tw-text-base text-white">
                                              <i className="ph-bold ph-caret-right z-1 text-gradient-main tw-duration-300"></i>
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-sm-6" data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">
                              <div className="tw-rounded-2xl bg-white overflow-hidden border border-neutral-100 tw-p-4 image-double-animation h-100">
                                  <Link href="/san-pham" className="clip-animation overflow-hidden position-relative d-block tw-rounded-xl">
                                      <img src="/assets/images/thumbs/top-categories-new-img2.png" alt="Image" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                      <img src="/assets/images/thumbs/top-categories-new-img2.png" alt="Image" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                  </Link>
                                  <div className="tw-mt-4 d-flex align-items-center justify-content-between tw-gap-4 tw-px-2">
                                      <div className="">
                                          <h2 className="tw-text-lg tw-mb-205">
                                              <Link href="/san-pham" className="hover-common-underline hover-text-heading text-heading">Marketing
                                                  Materials</Link>
                                          </h2>
                                          <span className="text-neutral-500 tw-text-sm">2.5k+ Design Styles</span>
                                      </div>
                                      <div className="flex-shrink-0">
                                          <Link href="/san-pham" className="btn bg-main-600 gradient-outline-bg-white hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-8 tw-h-8 d-flex justify-content-center align-items-center tw-text-base text-white">
                                              <i className="ph-bold ph-caret-right z-1 text-gradient-main tw-duration-300"></i>
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-sm-6" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                              <div className="tw-rounded-2xl bg-white overflow-hidden border border-neutral-100 tw-p-4 image-double-animation h-100">
                                  <Link href="/san-pham" className="clip-animation overflow-hidden position-relative d-block tw-rounded-xl">
                                      <img src="/assets/images/thumbs/top-categories-new-img3.png" alt="Image" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                      <img src="/assets/images/thumbs/top-categories-new-img3.png" alt="Image" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                  </Link>
                                  <div className="tw-mt-4 d-flex align-items-center justify-content-between tw-gap-4 tw-px-2">
                                      <div className="">
                                          <h2 className="tw-text-lg tw-mb-205">
                                              <Link href="/san-pham" className="hover-common-underline hover-text-heading text-heading">Product
                                                  Packaging</Link>
                                          </h2>
                                          <span className="text-neutral-500 tw-text-sm">2.5k+ Design Styles</span>
                                      </div>
                                      <div className="flex-shrink-0">
                                          <Link href="/san-pham" className="btn bg-main-600 gradient-outline-bg-white hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-8 tw-h-8 d-flex justify-content-center align-items-center tw-text-base text-white">
                                              <i className="ph-bold ph-caret-right z-1 text-gradient-main tw-duration-300"></i>
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-sm-6" data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">
                              <div className="tw-rounded-2xl bg-white overflow-hidden border border-neutral-100 tw-p-4 image-double-animation h-100">
                                  <Link href="/san-pham" className="clip-animation overflow-hidden position-relative d-block tw-rounded-xl">
                                      <img src="/assets/images/thumbs/top-categories-new-img4.png" alt="Image" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                      <img src="/assets/images/thumbs/top-categories-new-img4.png" alt="Image" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                  </Link>
                                  <div className="tw-mt-4 d-flex align-items-center justify-content-between tw-gap-4 tw-px-2">
                                      <div className="">
                                          <h2 className="tw-text-lg tw-mb-205">
                                              <Link href="/san-pham" className="hover-common-underline hover-text-heading text-heading">Label and
                                                  Sticker</Link>
                                          </h2>
                                          <span className="text-neutral-500 tw-text-sm">2.5k+ Design Styles</span>
                                      </div>
                                      <div className="flex-shrink-0">
                                          <Link href="/san-pham" className="btn bg-main-600 gradient-outline-bg-white hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-8 tw-h-8 d-flex justify-content-center align-items-center tw-text-base text-white">
                                              <i className="ph-bold ph-caret-right z-1 text-gradient-main tw-duration-300"></i>
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-sm-6" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                              <div className="tw-rounded-2xl bg-white overflow-hidden border border-neutral-100 tw-p-4 image-double-animation h-100">
                                  <Link href="/san-pham" className="clip-animation overflow-hidden position-relative d-block tw-rounded-xl">
                                      <img src="/assets/images/thumbs/top-categories-new-img5.png" alt="Image" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                      <img src="/assets/images/thumbs/top-categories-new-img5.png" alt="Image" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                  </Link>
                                  <div className="tw-mt-4 d-flex align-items-center justify-content-between tw-gap-4 tw-px-2">
                                      <div className="">
                                          <h2 className="tw-text-lg tw-mb-205">
                                              <Link href="/san-pham" className="hover-common-underline hover-text-heading text-heading">Large
                                                  Format</Link>
                                          </h2>
                                          <span className="text-neutral-500 tw-text-sm">2.5k+ Design Styles</span>
                                      </div>
                                      <div className="flex-shrink-0">
                                          <Link href="/san-pham" className="btn bg-main-600 gradient-outline-bg-white hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-8 tw-h-8 d-flex justify-content-center align-items-center tw-text-base text-white">
                                              <i className="ph-bold ph-caret-right z-1 text-gradient-main tw-duration-300"></i>
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-sm-6" data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">
                              <div className="tw-rounded-2xl bg-white overflow-hidden border border-neutral-100 tw-p-4 image-double-animation h-100">
                                  <Link href="/san-pham" className="clip-animation overflow-hidden position-relative d-block tw-rounded-xl">
                                      <img src="/assets/images/thumbs/top-categories-new-img6.png" alt="Image" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                      <img src="/assets/images/thumbs/top-categories-new-img6.png" alt="Image" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                  </Link>
                                  <div className="tw-mt-4 d-flex align-items-center justify-content-between tw-gap-4 tw-px-2">
                                      <div className="">
                                          <h2 className="tw-text-lg tw-mb-205">
                                              <Link href="/san-pham" className="hover-common-underline hover-text-heading text-heading">Promotional
                                                  Products</Link>
                                          </h2>
                                          <span className="text-neutral-500 tw-text-sm">2.5k+ Design Styles</span>
                                      </div>
                                      <div className="flex-shrink-0">
                                          <Link href="/san-pham" className="btn bg-main-600 gradient-outline-bg-white hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-8 tw-h-8 d-flex justify-content-center align-items-center tw-text-base text-white">
                                              <i className="ph-bold ph-caret-right z-1 text-gradient-main tw-duration-300"></i>
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-6">
                      <div className="h-100 position-relative">
                          <div className="clip-animation overflow-hidden position-relative d-block tw-rounded-2xl h-100 overflow-hidden">
                              <img src="/assets/images/thumbs/top-categories-new-main-img.png" alt="Image" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                              <img src="/assets/images/thumbs/top-categories-new-main-img.png" alt="Image" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                          </div>
                          <div className="position-absolute bottom-0 start-0 z-1 tw-ps-40-px tw-pe-4 tw-pb-48-px">
                              <div className="blur-bg-white rounded-pill tw-py-105 tw-px-4 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                                  <div className="d-flex align-items-center tw-gap-205">
                                      <span className="text-secondary-new d-sm-flex d-none tw-text-xl">
                                          <i className="ph-fill ph-check-circle"></i>
                                      </span>
                                      <span className="text-secondary-new tw-text-lg text-sm-res-14-px fw-semibold text-center">55%</span>
                                  </div>
                                  <span className="border-end border-neutral-300 tw-h-5 tw-w-px"></span>
                                  <span className="text-white tw-text-lg text-sm-res-14-px fw-normal text-center">Trending Hot
                                      Offers</span>
                              </div>
                              <h2 className="display-5 text-white tw-mb-10 tw-mt-4 text-reveal fw-semibold">Enjoy High-Quality Printing
                                  Services</h2>
                              <div className="custom-fade-animation" data-delay=".7" data-fade-from="bottom" data-ease="bounce">
                                  <Link href="/san-pham" className="btn bg-primary-new hover-bg-animation hover-bg-animation-main-600 hover-text-white">
                                      <span className="btn-text">Click & Order Now</span>
                                  </Link>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
      
              <div className="custom-fade-animation d-flex justify-content-center tw-mt-10" data-delay=".8" data-fade-from="bottom" data-ease="bounce">
                  <Link href="/lien-he" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-2 tw-pe-6 tw-py-3 py-sm-2">
                      <span className="btn-icon-animation d-flex align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-white rounded-circle">
                          <i className="ph-bold ph-arrow-right text-gradient-main"></i>
                      </span>
                      <span className="btn-text">See All Categories</span>
                  </Link>
              </div>
          </div>
      </section>
      
              
    </>
  );
}
