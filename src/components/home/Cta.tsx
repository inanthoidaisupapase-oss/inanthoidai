import Link from 'next/link';

export default function Cta() {
  return (
    <>
              
      <section className="cta-new section-bg overflow-hidden">
          <div className="d-flex">
      
              <div className="cta-new-left d-lg-flex d-none">
                  <div className="image-double-animation clip-animation overflow-hidden position-relative d-block h-100">
                      <img src="/assets/images/thumbs/cta-new-img1.png" alt="Image" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                      <img src="/assets/images/thumbs/cta-new-img1.png" alt="Image" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                  </div>
              </div>
      
              <div className="cta-new-right">
                  <div className="py-120 position-relative tw-px-4">
                      <img src="/assets/images/shapes/curve-star-shape.png" alt="Shape" className="position-absolute tw-end-0 top-0 z-n1 d-md-block d-none tw-mt-17 tw-me-17 animate__wobble__two z-0" />
                      <img src="/assets/images/shapes/testimonials-new-shape1.png" alt="Image" className="position-absolute tw-start-0 top-0 z-n1 d-md-block d-none tw-mt-12 tw-ms-11 animation-rotate z-0" />
                      <img src="/assets/images/shapes/testimonials-new-shape1.png" alt="Image" className="position-absolute tw-end-0 bottom-0 z-n1 d-md-block d-none tw-mb-12 tw-me-11 animation-scalation z-0" />
      
                      <div className="row">
                          <div className="col-xxl-2 col-sm-1"></div>
                          <div className="col-xxl-9 col-sm-10">
                              <div className="max-w-610-px">
                                  <div className="bg-white rounded-pill border border-neutral-100 tw-py-105 tw-px-4 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                                      <div className="d-flex align-items-center tw-gap-205">
                                          <span className="text-primary-new d-sm-flex d-none tw-text-xl">
                                              <i className="ph-fill ph-check-circle"></i>
                                          </span>
                                          <span className="text-primary-new tw-text-lg text-sm-res-14-px fw-semibold text-center">Call To Action</span>
                                      </div>
                                      <span className="border-end border-neutral-300 tw-h-5 tw-w-px"></span>
                                      <span className="text-neutral-500 tw-text-lg text-sm-res-14-px fw-normal text-center">Start Printing Today</span>
                                  </div>
                                  <h2 className="fw-bold tw-mt-4 h1"> <span className="text-reveal d-inline">Bringing Creativity And Quality Together </span> 
                                  </h2>
                                  <p className="border-start border-primary-new border-3 tw-mt-6 tw-ps-6">
                                      Take your printing to the next level with Printop. Whether you need business materials,
                                      custom
                                      products, or large-scale prints.
                                  </p>
                                  <div className="tw-mt-10 d-inline-flex tw-gap-6 button-responsive-class">
                                      <div className="custom-fade-animation" data-delay=".8" data-fade-from="bottom" data-ease="bounce">
                                          <Link href="/lien-he" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-2 tw-pe-6 tw-py-3 py-sm-2">
                                              <span className="btn-icon-animation d-sm-flex d-none align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-white rounded-circle">
                                                  <i className="ph-bold ph-arrow-right text-gradient-main"></i>
                                              </span>
                                              <span className="btn-text">Register Now </span>
                                          </Link>
                                      </div>
                                      <div className="custom-fade-animation" data-delay=".9" data-fade-from="bottom" data-ease="bounce">
                                          <Link href="/san-pham" className="btn bg-transparent border border-primary-new text-main-two-600 hover-bg-animation hover-bg-animation-main-two-600 tw-ps-2 tw-pe-6 tw-py-3 py-sm-2 hover-icon-white hover-animate-text-white">
                                              <span className="btn-icon-animation d-sm-flex d-none align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-main-600 rounded-circle">
                                                  <i className="ph-bold ph-arrow-right text-white"></i>
                                              </span>
                                              <span className="btn-text text-gradient-main">
                                                  Get In Touch
                                              </span>
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
      
                  <div className="d-flex flex-sm-row flex-column">
                      <div className="cta-content-left bg-white tw-p-60-px">
                          <div className="tw-pb-15 tw-mb-15 text-center animation-item border-bottom border-neutral-100">
                              <span className="d-inline-flex">
                                  <img src="/assets/images/icons/cta-new-icon1.png" alt="CTA Icon" className="animate__wobble" />
                              </span>
                              <h2 className="h4 tw-mt-9">Enjoy free shipping on all orders with no minimum required</h2>
                          </div>
                          <div className="tw-pb-15 tw-mb-15 text-center animation-item">
                              <span className="d-inline-flex">
                                  <img src="/assets/images/icons/cta-new-icon2.png" alt="CTA Icon" className="animate__wobble" />
                              </span>
                              <h2 className="h4 tw-mt-9">Secure Payments with fast, reliable, and easy processing</h2>
                          </div>
                      </div>
                      <div className="cta-content-right ">
                          <div className="image-double-animation clip-animation overflow-hidden position-relative d-block h-100">
                              <img src="/assets/images/thumbs/cta-new-img2.png" alt="Image" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                              <img src="/assets/images/thumbs/cta-new-img2.png" alt="Image" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                          </div>
                      </div>
                  </div>
              </div>
      
          </div>
      </section>
      
              
    </>
  );
}
