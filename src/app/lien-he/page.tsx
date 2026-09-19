import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import ContactForm from '@/components/shared/ContactForm';
import GallerySlider from '@/components/shared/GallerySlider';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: `Liên hệ In Ấn Thời Đại — ${site.office}. Hotline ${site.hotline}, email ${site.email}.`,
};

// TODO ảnh: ảnh thật nhà xưởng/thành phẩm — xem docs/IMAGE-GUIDE.md.
// Tạm dùng lại placeholder gốc của template (instagram-post-imgN.png), giống gioi-thieu/page.tsx.
const galleryImages = [1, 2, 3, 4, 5, 6].map((n) => `/assets/images/thumbs/instagram-post-img${n}.png`);

// Bản đồ nhúng không cần API key (kỹ thuật "?q=<địa chỉ>&output=embed" của Google Maps).
// Không dùng được tham số "pb=" chính xác như bản gốc contact.html vì đó là chuỗi riêng
// sinh ra khi bấm Chia sẻ > Nhúng bản đồ trên giao diện Google Maps — cần thao tác trình
// duyệt thủ công, môi trường build ở đây không truy cập được. "?q=" vẫn ghim đúng vị trí
// theo địa chỉ chữ, chỉ khác cách Google hiển thị khung viền khi nhúng.
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.office)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <Breadcrumb title="Liên hệ" />

      <section className="contact-section pt-120">
        <div className="container">
          <div className="section-heading tw-mb-10 text-center">
            <span className="subtitle border border-main-600 rounded-pill tw-px-5 tw-py-105 text-main-600 d-inline-flex align-items-center tw-gap-105 text-uppercase tw-leading-none bg-white">
              <i className="ph-fill ph-caret-double-right"></i>
              LIÊN HỆ
            </span>
            <h2 className="text-reveal fw-semibold tw-mt-4">Liên hệ để được hỗ trợ</h2>
          </div>

          <div className="row gy-4">
            <div className="col-xl-4 col-md-6">
              <div className="h-100 border border-neutral-100 hover-border-neutral-600 tw-duration-300 tw-px-40-px tw-py-11 tw-rounded-20-px d-flex align-items-center tw-gap-5 group group-item animation-item">
                <span className="tw-w-16 tw-h-16 bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center group-hover-bg-main-two-600 tw-duration-300 flex-shrink-0">
                  <img src="/assets/images/icons/icon-phone-msg.png" alt="Điện thoại"
                    className="group-hover-item-text-invert-white tw-duration-300 animate__heartBeat" />
                </span>
                <div className="">
                  <span className="text-body-11 tw-text-base">Gọi ngay</span>
                  <h2 className="tw-text-xl tw-mt-2">
                    <a href={`tel:${site.hotlineTel}`} className="text-heading hover-text-main-600">{site.hotline}</a>
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="h-100 border border-neutral-100 hover-border-neutral-600 tw-duration-300 tw-px-40-px tw-py-11 tw-rounded-20-px d-flex align-items-center tw-gap-5 group group-item animation-item">
                <span className="tw-w-16 tw-h-16 bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center group-hover-bg-main-two-600 tw-duration-300 flex-shrink-0">
                  <img src="/assets/images/icons/icon-location-circle.png" alt="Địa chỉ"
                    className="group-hover-item-text-invert-white tw-duration-300 animate__heartBeat" />
                </span>
                <div className="">
                  <span className="text-body-11 tw-text-base">Văn phòng giao dịch</span>
                  <h2 className="tw-text-xl tw-mt-2">{site.office}</h2>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="h-100 border border-neutral-100 hover-border-neutral-600 tw-duration-300 tw-px-40-px tw-py-11 tw-rounded-20-px d-flex align-items-center tw-gap-5 group group-item animation-item">
                <span className="tw-w-16 tw-h-16 bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center group-hover-bg-main-two-600 tw-duration-300 flex-shrink-0">
                  <img src="/assets/images/icons/icon-envelope-ad.png" alt="Email"
                    className="group-hover-item-text-invert-white tw-duration-300 animate__heartBeat" />
                </span>
                <div className="">
                  <span className="text-body-11 tw-text-base">Gửi email</span>
                  <h2 className="tw-text-xl tw-mt-2">
                    <a href={`mailto:${site.email}`} className="text-heading hover-text-main-600">{site.email}</a>
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="tw-mt-6">
            <div className="row gy-4">
              <div className="col-lg-6">
                <ContactForm
                  className="bg-white border border-neutral-100 tw-py-10 tw-px-40-px tw-rounded-xl form-submit h-100"
                  heading="Gửi yêu cầu tư vấn"
                  submitLabel="Gửi yêu cầu"
                />
              </div>
              <div className="col-lg-6">
                <div className="google-map tw-rounded-xl overflow-hidden h-100">
                  <iframe
                    src={mapEmbedUrl}
                    title={`Bản đồ ${site.office}`}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-100 h-100"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="instagram-post pt-120 pb-120 px-md-0 px-3">
        <div className="position-relative lg-pt-100-px">
          <h2 className="animated-title text-hover-animation-scale text-heading tw-leading-none text-uppercase text-center text-160-px position-absolute top-0 start-50 translate-middle-x d-lg-block d-none min-w-max">
            <span className="text-reveal">HÌNH ẢNH THỰC TẾ</span>
          </h2>

          <GallerySlider images={galleryImages} />
        </div>
      </section>
    </>
  );
}
