import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import GallerySlider from '@/components/shared/GallerySlider';
import { getServices } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Dịch vụ in ấn',
  description:
    'In offset, in flexo, thiết kế bao bì và gia công sau in — trọn gói tại xưởng In Ấn Thời Đại, TP.HCM.',
};

// TODO ảnh: ảnh sản phẩm thực tế đã giao cho khách — xem docs/IMAGE-GUIDE.md.
// Tạm dùng lại placeholder gốc của template (shop-product-imgN.png), chưa dùng ở trang nào khác.
const galleryImages = [1, 2, 3, 4, 5, 6].map((n) => `/assets/images/thumbs/shop-product-img${n}.png`);

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Breadcrumb title="Dịch vụ" />

      {/* ================= Grid danh mục dịch vụ (đối chiếu section.shop-product service.html) =================
          4 dịch vụ thật (không phải 6 như bản gốc) nên dùng col-lg-3 thay vì col-lg-4 để lấp đủ 1 hàng
          desktop thay vì để lẻ 1 ô hàng dưới — vẫn giữ nhịp bo góc tròn/vuông xen kẽ và col-sm-6 cho tablet. */}
      <section className="shop-product py-120 sticky-section">
        <div className="container">
          <div className="sticky-section-text section-heading tw-mb-10 text-center max-w-730-px mx-auto">
            <h2 className="text-heading fw-semibold tw-mt-4">Trọn bộ dịch vụ in ấn &amp; bao bì tại xưởng Thời Đại</h2>
          </div>

          <div className="row gy-4">
            {services.map((service, i) => (
              <div className="col-lg-3 col-sm-6" key={service.slug}>
                <div className="shop-product-item">
                  <Link
                    href={`/dich-vu/${service.slug}`}
                    className={`position-relative d-block overflow-hidden ${i % 2 === 0 ? 'rounded-circle' : 'tw-rounded-2xl'}`}
                  >
                    <div className="clip-animation image-double-animation tw-rounded-20-px overflow-hidden">
                      <div>
                        <img src={service.imageUrl} alt={service.name} data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                        <img src={service.imageUrl} alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                      </div>
                    </div>
                    <div className="position-absolute bottom-0 start-50 translate-middle-x tw-mb-12 min-w-max tw-px-2 z-1">
                      <span className="tw-py-3 tw-px-6 bg-white shadow rounded-pill fw-semibold tw-text-lg text-heading hover-bg-main-600 hover-text-white tw-duration-300">
                        {service.name}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Product Range: ưu đãi thiết kế + in ấn trọn gói (đồng nhất nội dung với Discount.tsx trang chủ) ================= */}
      <section className="product-range py-120 bg-main-two-600 position-relative overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="">
                <div className="section-heading tw-mb-10">
                  <span className="subtitle border border-main-600 rounded-pill tw-px-5 tw-py-105 text-main-600 d-inline-flex align-items-center tw-gap-105 text-uppercase tw-leading-none">
                    <i className="ph-fill ph-caret-double-right"></i>
                    Ưu đãi tháng này
                  </span>
                  <h2 className="text-reveal fw-semibold tw-mt-4 text-white">Giảm 20% chi phí thiết kế, in ấn và gia công trọn gói</h2>
                  <p className="tw-mt-6 text-white tw-text-lg max-w-580-px">
                    Gửi file thiết kế hoặc chỉ mới có ý tưởng, đội ngũ Thời Đại tư vấn quy cách và báo giá ngay trong ngày làm việc.
                  </p>
                </div>
                <div className="custom-fade-animation" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
                  <Link href="/bao-gia" className="btn bg-main-600 hover-bg-animation hover-bg-animation-white hover-text-heading">
                    <span className="btn-text">Nhận ưu đãi ngay </span>
                    <span className="btn-icon-animation d-flex">
                      <i className="ph-bold ph-arrow-down-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 d-xl-block d-none">
              <div className="position-absolute tw-start-45-percent top-50 translate-middle-y">
                {/* TODO ảnh: ảnh xưởng in / thành phẩm tiêu biểu — xem docs/IMAGE-GUIDE.md */}
                <img src="/assets/images/thumbs/product-range-img.png" alt="Dịch vụ in ấn và bao bì Thời Đại" />
                <div className="product-range-image position-absolute z-1">
                  <img src="/assets/images/shapes/cursor-shape.png" alt="" className="move-on-cursor-hover" data-value="10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Graphics: hỗ trợ thiết kế miễn phí + số liệu năng lực (đối chiếu section.graphics service.html) ================= */}
      <section className="graphics pt-120">
        <div className="container">
          <div className="row gy-4 align-items-center flex-wrap-reverse">
            <div className="col-lg-7">
              <div className="pe-xl-5" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="300">
                {/* TODO ảnh: ảnh đội ngũ thiết kế đang dựng mẫu / bản vẽ kỹ thuật dao bế — xem docs/IMAGE-GUIDE.md */}
                <img src="/assets/images/thumbs/graphics-img.png" alt="Đội ngũ thiết kế In Ấn Thời Đại" />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="">
                <div className="section-heading tw-mb-10">
                  <span className="subtitle border border-main-600 rounded-pill tw-px-5 tw-py-105 text-main-600 d-inline-flex align-items-center tw-gap-105 text-uppercase tw-leading-none">
                    <i className="ph-fill ph-caret-double-right"></i>
                    Hỗ trợ thiết kế miễn phí
                  </span>
                  <h2 className="text-reveal fw-semibold tw-mt-4">Đội ngũ thiết kế đồng hành từ file gốc đến sản phẩm in</h2>
                  <p className="tw-mt-6 text-body tw-text-lg">
                    Có file thiết kế sẵn hay chỉ mới có ý tưởng đều được — đội thiết kế dựng mẫu, tính sẵn dao bế và biên dán miễn phí cho đơn in tại xưởng.
                  </p>
                </div>
                <div className="">
                  <div className="custom-fade-animation" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
                    <Link href="/dich-vu/thiet-ke-bao-bi" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-two-600">
                      <span className="btn-text">Xem dịch vụ thiết kế </span>
                      <span className="btn-icon-animation d-flex">
                        <i className="ph-bold ph-arrow-down-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="tw-pt-100-px d-flex align-items-center tw-gap-130-px">
                  <div className="custom-fade-animation" data-delay=".6" data-fade-from="left" data-ease="bounce">
                    <h2 className="h1 counter">17+</h2>
                    <span className="tw-text-lg">Năm kinh nghiệm sản xuất</span>
                  </div>
                  <div className="custom-fade-animation" data-delay=".7" data-fade-from="right" data-ease="bounce">
                    <h2 className="h1 counter">300+</h2>
                    <span className="tw-text-lg">Khách hàng tin tưởng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Gallery: sản phẩm thực tế (đối chiếu section.instagram-post service.html) ================= */}
      <section className="instagram-post pt-120 pb-120 px-md-0 px-3">
        <div className="position-relative lg-pt-100-px">
          <h2 className="animated-title text-hover-animation-scale text-heading tw-leading-none text-uppercase text-center text-160-px position-absolute top-0 start-50 translate-middle-x d-lg-block d-none min-w-max">
            <span className="text-reveal">SẢN PHẨM THỰC TẾ</span>
          </h2>

          <GallerySlider images={galleryImages} />
        </div>
      </section>
    </>
  );
}
