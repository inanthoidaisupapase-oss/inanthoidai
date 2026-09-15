'use client';
import Link from 'next/link';

export default function BlogSection() {
  return (
    <>
              
      <section className="blog-new py-120">
          <div className="container">
              <div className="d-flex align-items-center justify-content-between flex-lg-nowrap flex-wrap tw-gap-6">
                  <div className="max-w-650-px">
                      <div className="bg-white rounded-pill border border-neutral-100 tw-py-105 tw-px-4 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                          <div className="d-flex align-items-center tw-gap-205">
                              <span className="text-primary-new d-sm-flex d-none tw-text-xl">
                                  <i className="ph-fill ph-check-circle"></i>
                              </span>
                              <span className="text-primary-new tw-text-lg text-sm-res-14-px fw-semibold text-center">Our
                                  Blog</span>
                          </div>
                          <span className="border-end border-neutral-300 tw-h-5 tw-w-px"></span>
                          <span className="text-neutral-500 tw-text-lg text-sm-res-14-px fw-normal text-center">News &
                              Insights</span>
                      </div>
                      <h2 className="fw-bold tw-mt-4 h1"> <span className="text-reveal d-inline">Explore Expert Insights And Creative
                          </span> <span className="text-gradient-main text-decoration-underline">Ideas</span>
                      </h2>
                  </div>
                  <div className="max-w-400-px d-flex flex-column tw-gap-8">
                      <p className="text-neutral-500 text-lg-end">Our blog is designed to help businesses and individuals make
                          smarter printing decisions, improve design.</p>
                      <div className=" d-flex justify-content-lg-end">
                          <div className="custom-fade-animation" data-delay=".7" data-fade-from="bottom" data-ease="bounce">
                              <Link href="/lien-he" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-2 tw-pe-6 tw-py-3 py-sm-2">
                                  <span className="btn-icon-animation d-flex align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-white rounded-circle">
                                      <i className="ph-bold ph-arrow-right text-gradient-main"></i>
                                  </span>
                                  <span className="btn-text">See All Blogs</span>
                              </Link>
                          </div>
                      </div>
                  </div>
              </div>
      
              <div className="swiper blog-new-slider tw-pt-15">
                  <div className="swiper-wrapper">
                      <div className="swiper-slide" data-speed="1.14">
                          <div className="" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                              <div className="">
                                  <span className="bg-secondary-new text-heading tw-py-2 tw-px-5 rounded-top-4 tw-mx-6 tw-text-lg">Printing
                                      Trends</span>
                              </div>
                              <div className="tw-rounded-2xl bg-neutral-50 overflow-hidden border border-neutral-100 image-double-animation border border-neutral-100 border-top-0">
                                  <div className="position-relative">
                                      <Link href="/tin-tuc" className="clip-animation overflow-hidden position-relative d-block">
                                          <img src="/assets/images/thumbs/blog-new-img1.png" alt="Image" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                          <img src="/assets/images/thumbs/blog-new-img1.png" alt="Image" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                      </Link>
                                      <div className="bg-white d-inline-flex flex-column position-absolute top-0 tw-end-0 tw-mt-4 tw-me-4 tw-rounded-lg z- overflow-hidden">
                                          <span className="h2 text-white bg-primary-new tw-py-2 tw-px-4">25</span>
                                          <span className="text-heading tw-py-2 tw-px-4">May, 26</span>
                                      </div>
                                  </div>
                                  <div className="tw-pt-7 tw-px-7 tw-pb-8">
                                      <div className="d-flex align-items-center tw-gap-305">
                                          <div className="d-flex align-items-center tw-gap-2">
                                              <span className="d-flex text-primary-new tw-text-xl">
                                                  <i className="ph ph-user"></i>
                                              </span>
                                              <span className="text-neutral-700 fw-medium">Courtney Henry</span>
                                          </div>
                                          <span className="tw-w-1 tw-h-1 rounded-circle bg-danger d-xxl-inline-flex d-none"></span>
                                          <div className="d-flex align-items-center tw-gap-2">
                                              <span className="d-flex text-primary-new tw-text-xl">
                                                  <i className="ph-bold ph-arrow-up-right"></i>
                                              </span>
                                              <span className="text-neutral-500 fw-normal">
                                                  <span className="text-neutral-700 fw-medium">216</span>
                                                  Comments
                                              </span>
                                          </div>
                                      </div>
                                      <h2 className="tw-mt-4 h3">
                                          <Link href="/tin-tuc" className="text-heading hover-text-heading line-clamp-3 hover-common-underline">Top
                                              Trends
                                              in Modern Printing System</Link>
                                      </h2>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="swiper-slide">
                          <div className="" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                              <div className="">
                                  <span className="bg-secondary-new text-heading tw-py-2 tw-px-5 rounded-top-4 tw-mx-6 tw-text-lg">Design
                                      Tips</span>
                              </div>
                              <div className="tw-rounded-2xl bg-neutral-50 overflow-hidden border border-neutral-100 image-double-animation border border-neutral-100 border-top-0">
                                  <div className="position-relative">
                                      <Link href="/tin-tuc" className="clip-animation overflow-hidden position-relative d-block">
                                          <img src="/assets/images/thumbs/blog-new-img2.png" alt="Image" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                          <img src="/assets/images/thumbs/blog-new-img2.png" alt="Image" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                      </Link>
                                      <div className="bg-white d-inline-flex flex-column position-absolute top-0 tw-end-0 tw-mt-4 tw-me-4 tw-rounded-lg z- overflow-hidden">
                                          <span className="h2 text-white bg-primary-new tw-py-2 tw-px-4">25</span>
                                          <span className="text-heading tw-py-2 tw-px-4">May, 26</span>
                                      </div>
                                  </div>
                                  <div className="tw-pt-7 tw-px-7 tw-pb-8">
                                      <div className="d-flex align-items-center tw-gap-305">
                                          <div className="d-flex align-items-center tw-gap-2">
                                              <span className="d-flex text-primary-new tw-text-xl">
                                                  <i className="ph ph-user"></i>
                                              </span>
                                              <span className="text-neutral-700 fw-medium">Bessie Cooper</span>
                                          </div>
                                          <span className="tw-w-1 tw-h-1 rounded-circle bg-danger d-xxl-inline-flex d-none"></span>
                                          <div className="d-flex align-items-center tw-gap-2">
                                              <span className="d-flex text-primary-new tw-text-xl">
                                                  <i className="ph-bold ph-arrow-up-right"></i>
                                              </span>
                                              <span className="text-neutral-500 fw-normal">
                                                  <span className="text-neutral-700 fw-medium">216</span>
                                                  Comments
                                              </span>
                                          </div>
                                      </div>
                                      <h2 className="tw-mt-4 h3">
                                          <Link href="/tin-tuc" className="text-heading hover-text-heading line-clamp-3 hover-common-underline">How
                                              to Improve Print Quality System</Link>
                                      </h2>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="swiper-slide" data-speed="1.14">
                          <div className="" data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">
                              <div className="">
                                  <span className="bg-secondary-new text-heading tw-py-2 tw-px-5 rounded-top-4 tw-mx-6 tw-text-lg">Branding
                                      Ideas</span>
                              </div>
                              <div className="tw-rounded-2xl bg-neutral-50 overflow-hidden border border-neutral-100 image-double-animation border border-neutral-100 border-top-0">
                                  <div className="position-relative">
                                      <Link href="/tin-tuc" className="clip-animation overflow-hidden position-relative d-block">
                                          <img src="/assets/images/thumbs/blog-new-img3.png" alt="Image" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                          <img src="/assets/images/thumbs/blog-new-img3.png" alt="Image" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                      </Link>
                                      <div className="bg-white d-inline-flex flex-column position-absolute top-0 tw-end-0 tw-mt-4 tw-me-4 tw-rounded-lg z- overflow-hidden">
                                          <span className="h2 text-white bg-primary-new tw-py-2 tw-px-4">25</span>
                                          <span className="text-heading tw-py-2 tw-px-4">May, 26</span>
                                      </div>
                                  </div>
                                  <div className="tw-pt-7 tw-px-7 tw-pb-8">
                                      <div className="d-flex align-items-center tw-gap-305">
                                          <div className="d-flex align-items-center tw-gap-2">
                                              <span className="d-flex text-primary-new tw-text-xl">
                                                  <i className="ph ph-user"></i>
                                              </span>
                                              <span className="text-neutral-700 fw-medium">Jerome</span>
                                          </div>
                                          <span className="tw-w-1 tw-h-1 rounded-circle bg-danger d-xxl-inline-flex d-none"></span>
                                          <div className="d-flex align-items-center tw-gap-2">
                                              <span className="d-flex text-primary-new tw-text-xl">
                                                  <i className="ph-bold ph-arrow-up-right"></i>
                                              </span>
                                              <span className="text-neutral-500 fw-normal">
                                                  <span className="text-neutral-700 fw-medium">216</span>
                                                  Comments
                                              </span>
                                          </div>
                                      </div>
                                      <h2 className="tw-mt-4 h3">
                                          <Link href="/tin-tuc" className="text-heading hover-text-heading line-clamp-3 hover-common-underline">Best
                                              Materials for Product Packaging</Link>
                                      </h2>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="swiper-slide">
                          <div className="" data-aos="fade-up" data-aos-duration="800" data-aos-delay="800">
                              <div className="">
                                  <span className="bg-secondary-new text-heading tw-py-2 tw-px-5 rounded-top-4 tw-mx-6 tw-text-lg">Branding
                                      Ideas</span>
                              </div>
                              <div className="tw-rounded-2xl bg-neutral-50 overflow-hidden border border-neutral-100 image-double-animation border border-neutral-100 border-top-0">
                                  <div className="position-relative">
                                      <Link href="/tin-tuc" className="clip-animation overflow-hidden position-relative d-block">
                                          <img src="/assets/images/thumbs/blog-new-img2.png" alt="Image" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                          <img src="/assets/images/thumbs/blog-new-img2.png" alt="Image" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                                      </Link>
                                      <div className="bg-white d-inline-flex flex-column position-absolute top-0 tw-end-0 tw-mt-4 tw-me-4 tw-rounded-lg z- overflow-hidden">
                                          <span className="h2 text-white bg-primary-new tw-py-2 tw-px-4">25</span>
                                          <span className="text-heading tw-py-2 tw-px-4">May, 26</span>
                                      </div>
                                  </div>
                                  <div className="tw-pt-7 tw-px-7 tw-pb-8">
                                      <div className="d-flex align-items-center tw-gap-305">
                                          <div className="d-flex align-items-center tw-gap-2">
                                              <span className="d-flex text-primary-new tw-text-xl">
                                                  <i className="ph ph-user"></i>
                                              </span>
                                              <span className="text-neutral-700 fw-medium">Jerome</span>
                                          </div>
                                          <span className="tw-w-1 tw-h-1 rounded-circle bg-danger d-xxl-inline-flex d-none"></span>
                                          <div className="d-flex align-items-center tw-gap-2">
                                              <span className="d-flex text-primary-new tw-text-xl">
                                                  <i className="ph-bold ph-arrow-up-right"></i>
                                              </span>
                                              <span className="text-neutral-500 fw-normal">
                                                  <span className="text-neutral-700 fw-medium">216</span>
                                                  Comments
                                              </span>
                                          </div>
                                      </div>
                                      <h2 className="tw-mt-4 h3">
                                          <Link href="/tin-tuc" className="text-heading hover-text-heading line-clamp-3 hover-common-underline">Best
                                              Materials for Product Packaging</Link>
                                      </h2>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
      
                  <div className="d-flex align-items-center tw-gap-4 tw-mt-10 justify-content-center">
                      <button type="button" className="btn bg-main-600 gradient-outline-bg-white hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-11 tw-h-11 d-flex justify-content-center align-items-center tw-text-2xl text-white blog-new-btn-prev">
                          <i className="ph-bold ph-caret-left z-1 text-gradient-main tw-duration-300"></i>
                      </button>
                      <span className="">
                          <img src="/assets/images/icons/big-arrow-left-right.png" alt="Big Arrow" className="big-arrow-left-right-icon" />
                      </span>
                      <button type="button" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-11 tw-h-11 d-flex justify-content-center align-items-center tw-text-2xl text-white blog-new-btn-next">
                          <i className="ph-bold ph-caret-right z-1"></i>
                      </button>
                  </div>
              </div>
      
          </div>
      </section>
      
      
    </>
  );
}
