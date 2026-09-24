import Link from 'next/link';
import { site } from '@/lib/site';
import NewsletterForm from '@/components/shared/NewsletterForm';

export default function Footer() {
  return (
    <>
              
      <footer className="footer-new position-relative z-1 mt-auto">
          <img src="/assets/images/bg/gradient-bg.png" alt="" className="position-absolute start-0 top-0 w-100 h-100 object-fit-cover z-n1" />
          <img src="/assets/images/shapes/testimonials-new-shape1.png" className="position-absolute tw-end-0 bottom-0 z-n1 d-md-block d-none tw-mb-12 tw-me-11 animation-rotate z-0" alt="" />
      
          <div className="position-absolute tw-start-0 bottom-0 z-n1 d-md-block d-none tw-mb-16 tw-pb-14 tw-ms-15 tw-ps-6 animation-rotate-right z-0">
              <img src="/assets/images/shapes/banner-element-img7.png" alt="" className="animation-rotate-right" />
          </div>
      
          <div className="py-120">
              <div className="container pb-120">
                  <div className="border-bottom border-white-16 tw-pb-15">
                      <div className="row gy-4">
                          <div className="col-xl-6">
                              <div className="">
                                  <h2 className="fw-medium text-white text-reveal">Đăng ký nhận bản tin để cập nhật mẫu bao bì và ưu đãi mới nhất</h2>
                              </div>
                          </div>
                          <div className="col-xl-1 d-xl-block d-none">
                              <div className="">
      
                              </div>
                          </div>
                          <div className="col-xl-5">
                              <NewsletterForm source="footer" variant="footer" />
                          </div>
                      </div>
                  </div>
              </div>
      
              <div className="container container-two">
                  <div className="footer-item-wrapper">
                      <div className="" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                          <div className="">
                              
                              <div className="logo">
                                  <Link href="/" className="link">
                                      <img src="/assets/images/logo/logo-new.png" alt={site.name} className="max-w-200-px" />
                                  </Link>
                              </div>
                              
                              <p className="tw-mt-6 text-neutral-300 max-w-250-px">{site.legalName} — hơn 15 năm thiết kế, in ấn và sản xuất bao bì giấy: hộp giấy, túi xách giấy, hộp giày, thùng carton, tem nhãn decal và ấn phẩm văn phòng.</p>
                          </div>
                      </div>
                      <div className="" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                          <div className="">
                              <h2 className="h4 fw-semibold text-white tw-mb-8">Liên kết nhanh</h2>
                              <ul className="d-flex flex-column tw-gap-4">
                                  <li>
                                      <Link href="/" className="text-neutral-300 hover-text-white hover-common-underline">Trang chủ</Link>
                                  </li>
                                  <li>
                                      <Link href="/gioi-thieu" className="text-neutral-300 hover-text-white hover-common-underline">Giới thiệu</Link>
                                  </li>
                                  <li>
                                      <Link href="/dich-vu" className="text-neutral-300 hover-text-white hover-common-underline">Dịch vụ</Link>
                                  </li>
                                  <li>
                                      <Link href="/san-pham" className="text-neutral-300 hover-text-white hover-common-underline">Sản phẩm</Link>
                                  </li>
                                  <li className="mb-0">
                                      <Link href="/tin-tuc" className="text-neutral-300 hover-text-white hover-common-underline">Tin tức</Link>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div className="" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                          <div className="">
                              <h2 className="h4 fw-semibold text-white tw-mb-8">Thông tin khác</h2>
                              <ul className="d-flex flex-column tw-gap-4">
                                  <li>
                                      <Link href="/cau-hoi-thuong-gap" className="text-neutral-300 hover-text-white hover-common-underline">Câu hỏi thường gặp</Link>
                                  </li>
                                  <li>
                                      <Link href="/chinh-sach-bao-mat" className="text-neutral-300 hover-text-white hover-common-underline">Chính sách bảo mật</Link>
                                  </li>
                                  <li>
                                      <Link href="/quy-trinh-lam-viec" className="text-neutral-300 hover-text-white hover-common-underline">Quy trình làm việc</Link>
                                  </li>
                                  <li>
                                      <Link href="/lien-he" className="text-neutral-300 hover-text-white hover-common-underline">Liên hệ</Link>
                                  </li>
                                  <li>
                                      <Link href="/bang-gia" className="text-neutral-300 hover-text-white hover-common-underline">Bảng giá</Link>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div className="" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                          <div className="d-flex flex-column tw-gap-8">
                              <div className="">
                                  <span className="text-white">Gửi email cho chúng tôi</span>
                                  <h2 className="h4 tw-mt-2">
                                      <a href={`mailto:${site.email}`} className="text-white hover-common-underline fw-medium">{site.email}</a>
                                  </h2>
                              </div>
                              <div className="">
                                  <span className="text-white">Hotline tư vấn &amp; báo giá</span>
                                  <h2 className="h4 tw-mt-2">
                                      <a href={`tel:${site.hotlineTel}`} className="text-white hover-common-underline fw-medium">{site.hotline}</a>
                                  </h2>
                              </div>
                          </div>
                      </div>
                      <div className="" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                          <div className="">
                              <div className="">
                                  <span className="text-white">Văn phòng giao dịch</span>
                                  <h2 className="h4 tw-mt-2 text-white fw-medium tw-leading-155"> {site.office} </h2>
                              </div>
                              <div className="tw-mt-8">
                                  <ul className="d-flex align-items-center tw-gap-3 animation-item">
                                      <li>
                                          <a href="https://www.facebook.com" className="tw-w-8 tw-h-8 rounded-circle border border-white-39 hover-bg-white hover-text-heading tw-text-base d-flex justify-content-center align-items-center text-white">
                                              <i className="ph-fill ph-facebook-logo"></i>
                                          </a>
                                      </li>
                                      <li>
                                          <a href="https://www.dribbble.com" className="tw-w-8 tw-h-8 rounded-circle border border-white-39 hover-bg-white hover-text-heading tw-text-base d-flex justify-content-center align-items-center text-white">
                                              <i className="ph-bold ph-dribbble-logo"></i>
                                          </a>
                                      </li>
                                      <li>
                                          <a href="https://www.instagram.com" className="tw-w-8 tw-h-8 rounded-circle border border-white-39 hover-bg-white hover-text-heading tw-text-base d-flex justify-content-center align-items-center text-white">
                                              <i className="ph-bold ph-instagram-logo"></i>
                                          </a>
                                      </li>
                                      <li>
                                          <a href="https://www.twitter.com" className="tw-w-8 tw-h-8 rounded-circle border border-white-39 hover-bg-white hover-text-heading tw-text-base d-flex justify-content-center align-items-center text-white">
                                              <i className="ph-bold ph-twitter-logo"></i>
                                          </a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      
          
          <div className="container">
              <div className="border-top border-white-16 tw-py-8 custom-fade-animation position-relative" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
                  <div className="position-absolute d-xl-block d-none start-50 translate-middle-x top-0 tw--mt-40-px z-1">
                      <img src="/assets/images/logo/logo-xoay-tron.png" className="animation-rotate-right" alt="" />
                  </div>
                  <div className="">
                      <div className="d-flex align-items-center justify-content-between tw-gap-4 flex-wrap">
                          <p className="text-neutral-300 text-line-1 fw-normal">
                              Bản quyền &copy; {new Date().getFullYear()}
                              <Link href="/" className="fw-semibold text-secondary-new hover-common-underline hover-text-white">{site.legalName}</Link>.
                              Đã đăng ký bản quyền.
                          </p>
                           <div className="mb-0">
                              <div className="">
                                  <span className="text-neutral-300 fw-normal">Xưởng sản xuất: {site.factory}</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </footer>
      
    </>
  );
}
