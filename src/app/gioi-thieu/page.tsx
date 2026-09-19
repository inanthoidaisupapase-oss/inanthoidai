import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import ContactForm from '@/components/shared/ContactForm';
import BrandLogoSlider from '@/components/shared/BrandLogoSlider';
import TestimonialsCards from '@/components/shared/TestimonialsCards';
import GallerySlider from '@/components/shared/GallerySlider';
import type { Testimonial } from '@/components/shared/TestimonialsSlider';
import { site } from '@/lib/site';
import { getServices } from '@/lib/data';
import testimonials from '@/lib/data/seed/testimonials.json';

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description:
    'Công Ty TNHH Công Nghiệp Thời Đại thành lập 09/07/2009, tiền thân là Cơ Sở Bao Bì Thời Đại (2005). Chuyên thiết kế, in ấn và sản xuất bao bì giấy tại TP.HCM.',
};

const milestones = [
  {
    year: '2005 – 2008',
    title: 'Cơ Sở Bao Bì Thời Đại',
    text: 'Thành lập tại Quận 6, TP.HCM, hoạt động trong lĩnh vực thiết kế, in ấn, quảng cáo và gia công sau in.',
  },
  {
    year: '2009',
    title: 'Chính thức thành lập công ty',
    text: 'Ngày 09/07/2009, Tổng Giám Đốc Nguyễn Duy Chương thành lập Công Ty TNHH Công Nghiệp Thời Đại tại 298/1 Lê Văn Quới, Bình Tân, TP.HCM — mở rộng sang in ấn bao bì, catalogue, thùng carton.',
  },
  {
    year: '2024',
    title: 'Kỷ niệm 15 năm',
    text: 'Đánh dấu 15 năm hoạt động, mở rộng quy mô sản xuất và đầu tư công nghệ để nâng chất lượng sản phẩm, dịch vụ.',
  },
  {
    year: 'Hiện nay',
    title: 'Hai cơ sở, một quy trình khép kín',
    text: `Văn phòng giao dịch tại TP.HCM và xưởng sản xuất tại Tây Ninh. Thiết kế, in và gia công sau in đều làm nội bộ.`,
  },
];

const values = [
  'Mang lại sự hài lòng tuyệt đối cho khách hàng',
  'Lấy “Thiết kế – In ấn – Bao bì giấy” làm sản phẩm chủ đạo',
  'Lấy con người là nguồn sức mạnh phát triển',
  'Lấy khách hàng làm trung tâm hoạt động',
  'Trở thành công ty thiết kế và in ấn hàng đầu được tin tưởng',
];

// Quy trình đặt hàng thực tế — cùng nội dung 3 bước đã dùng ở GetStarted.tsx (trang chủ),
// giữ nhất quán thông điệp giữa các trang.
const processSteps = [
  {
    icon: 'working-process-icon1.png',
    step: 'Bước 01',
    title: 'Gửi yêu cầu hoặc file thiết kế',
    text: 'Gửi kích thước, số lượng và mục đích sử dụng. Đã có file thiết kế hay mới chỉ có ý tưởng đều được — đội thiết kế dựng mẫu miễn phí cho đơn in tại xưởng.',
    href: '/dich-vu/thiet-ke-bao-bi',
    arrow: 'arrow-curve-img1.png',
  },
  {
    icon: 'working-process-icon2.png',
    step: 'Bước 02',
    title: 'Duyệt mẫu và chốt báo giá',
    text: 'Chúng tôi gửi bản dựng kèm quy cách: chất liệu, sóng carton, kỹ thuật in và gia công. Duyệt test proof trên đúng chất liệu trước khi chạy sản lượng.',
    href: '/bang-gia',
    arrow: 'arrow-curve-img2.png',
  },
  {
    icon: 'working-process-icon3.png',
    step: 'Bước 03',
    title: 'Sản xuất tại xưởng và giao hàng',
    text: 'In, bế, cán màng và gấp dán đều làm tại xưởng nên kiểm soát được tiến độ. Giao hàng toàn quốc, nhận hàng kiểm tra rồi thanh toán.',
    href: '/dich-vu/gia-cong-sau-in',
    arrow: null,
  },
];

// 4 thế mạnh thực tế — dùng icon choose-us-icon1..4.png (bộ icon riêng của about.html,
// khác choose-us-new-icon1..3.png đã dùng ở ChooseUs.tsx trang chủ).
const strengths = [
  {
    icon: 'choose-us-icon1.png',
    title: 'In offset và in Flexo tại xưởng',
    text: 'Chủ động khuôn in, mực và máy móc tại xưởng nên kiểm soát được màu sắc và tiến độ sản xuất.',
    href: '/dich-vu',
  },
  {
    icon: 'choose-us-icon2.png',
    title: 'Giá xưởng, không qua trung gian',
    text: 'Sản xuất trực tiếp, không qua đơn vị trung gian nên giữ được mức giá tốt cho khách hàng.',
    href: '/bang-gia',
  },
  {
    icon: 'choose-us-icon3.png',
    title: 'Giao hàng đúng tiến độ',
    text: 'Quy trình khép kín từ in tới gia công giúp kiểm soát thời gian, giao hàng toàn quốc đúng hẹn.',
    href: '/cau-hoi-thuong-gap',
  },
  {
    icon: 'choose-us-icon4.png',
    title: 'Hỗ trợ thiết kế miễn phí',
    text: 'Đội thiết kế dựng mẫu miễn phí, tính sẵn dao bế và biên dán cho đơn in tại xưởng.',
    href: '/dich-vu/thiet-ke-bao-bi',
  },
];

// TODO ảnh: ảnh thật nhà xưởng/dây chuyền sản xuất — xem docs/IMAGE-GUIDE.md.
// Tạm dùng lại placeholder gốc của template (instagram-post-imgN.png).
const galleryImages = [1, 2, 3, 4, 5, 6].map((n) => `/assets/images/thumbs/instagram-post-img${n}.png`);

export default async function AboutPage() {
  const services = await getServices();

  return (
    <>
      <Breadcrumb title="Giới thiệu" />

      {/* ================= About Home Demand: giới thiệu công ty ================= */}
      <section className="py-120">
        <div className="container">
          <div className="row gy-4 flex-wrap-reverse">
            <div className="col-xl-6">
              <div className="me-xl-5 me-xl-4 position-relative">
                <div className="position-absolute z-1 top-0 start-50 translate-middle-x tw-mt-8 move-on-cursor-hover">
                  <img src="/assets/images/shapes/design-your-own.png" alt="" />
                </div>
                <div className="position-absolute z-1 bottom-0 end-0 tw-me-15 tw-pe-5 tw-mb-4">
                  <img src="/assets/images/shapes/cursor-shape.png" alt="" className="move-on-cursor-hover" data-value="10" />
                </div>

                <div className="row gy-4 align-items-center">
                  <div className="col-6">
                    <div className="d-flex flex-column tw-gap-6">
                      <div className="clip-animation image-double-animation tw-rounded-20-px overflow-hidden">
                        <div>
                          {/* TODO ảnh: ảnh xưởng sản xuất — xem docs/IMAGE-GUIDE.md */}
                          <img src="/assets/images/thumbs/about-home-demand-img1.png" alt="Xưởng sản xuất In Ấn Thời Đại" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                          <img src="/assets/images/thumbs/about-home-demand-img1.png" alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                        </div>
                      </div>
                      <div className="clip-animation image-double-animation tw-rounded-20-px overflow-hidden">
                        <div>
                          {/* TODO ảnh: ảnh máy in offset/flexo tại xưởng — xem docs/IMAGE-GUIDE.md */}
                          <img src="/assets/images/thumbs/about-home-demand-img2.png" alt="Máy in tại xưởng Thời Đại" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                          <img src="/assets/images/thumbs/about-home-demand-img2.png" alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="clip-animation image-double-animation tw-rounded-20-px overflow-hidden">
                      <div>
                        {/* TODO ảnh: ảnh thành phẩm hộp giấy/thùng carton — xem docs/IMAGE-GUIDE.md */}
                        <img src="/assets/images/thumbs/about-home-demand-img3.png" alt="Thành phẩm bao bì giấy Thời Đại" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                        <img src="/assets/images/thumbs/about-home-demand-img3.png" alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6">
              <div className="ps-xxl-5">
                <div className="section-heading tw-mb-10">
                  <span className="subtitle border border-main-600 rounded-pill tw-px-5 tw-py-105 text-main-600 d-inline-flex align-items-center tw-gap-105 text-uppercase tw-leading-none">
                    <i className="ph-fill ph-caret-double-right"></i>
                    Về Thời Đại
                  </span>
                  <h2 className="text-reveal fw-semibold tw-mt-4">{site.legalName}</h2>
                  <p className="tw-mt-6 text-body tw-text-lg">
                    Chuyên <strong>Thiết kế – In ấn – Sản xuất</strong> hộp giấy, túi xách giấy, hộp giày nam nữ, thùng
                    carton, tem nhãn giấy, ấn phẩm văn phòng, catalogue, brochure và danh thiếp.
                  </p>
                </div>
                <div className="tw-mt-10 d-flex flex-column tw-gap-5">
                  <div className="d-flex align-items-center tw-gap-105">
                    <span className="tw-w-7 tw-h-7 tw-rounded-md bg-white text-main-600 d-flex align-items-center justify-content-center shadow-sm">
                      <i className="ph-bold ph-check"></i>
                    </span>
                    <span className="tw-text-xl text-body-6">Sản xuất trực tiếp tại xưởng, không qua trung gian</span>
                  </div>
                  <div className="d-flex align-items-center tw-gap-105">
                    <span className="tw-w-7 tw-h-7 tw-rounded-md bg-white text-main-600 d-flex align-items-center justify-content-center shadow-sm">
                      <i className="ph-bold ph-check"></i>
                    </span>
                    <span className="tw-text-xl text-body-6">In offset và in Flexo ngay tại xưởng</span>
                  </div>
                  <div className="d-flex align-items-center tw-gap-105">
                    <span className="tw-w-7 tw-h-7 tw-rounded-md bg-white text-main-600 d-flex align-items-center justify-content-center shadow-sm">
                      <i className="ph-bold ph-check"></i>
                    </span>
                    <span className="tw-text-xl text-body-6">Giữ giá xưởng cho khách hàng</span>
                  </div>
                </div>
                <div className="tw-my-12 d-flex align-items-center tw-gap-6 justify-content-between flex-sm-nowrap flex-wrap max-w-580-px">
                  <div className="d-flex align-items-center tw-gap-6 animation-item custom-fade-animation" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
                    <span>
                      <img src="/assets/images/icons/choose-us-icon2.png" alt="" className="text-invert-black tw-w-13 animate__bounce" />
                    </span>
                    <span className="text-heading tw-text-lg fw-semibold max-w-180-px">Thiết kế miễn phí cho đơn tại xưởng</span>
                  </div>
                  <div className="d-flex align-items-center tw-gap-6 animation-item custom-fade-animation" data-delay=".8" data-fade-from="bottom" data-ease="bounce">
                    <span>
                      <img src="/assets/images/icons/choose-us-icon3.png" alt="" className="text-invert-black tw-w-13 animate__bounce" />
                    </span>
                    <span className="text-heading tw-text-lg fw-semibold max-w-180-px">Giao hàng đúng tiến độ cam kết</span>
                  </div>
                </div>
                <div className="tw-mt-12 d-flex tw-gap-7 align-items-center flex-wrap">
                  <div className="custom-fade-animation" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
                    <Link href="/lien-he" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-two-600">
                      <span className="btn-text">Liên hệ ngay </span>
                      <span className="btn-icon-animation d-flex">
                        <i className="ph-bold ph-arrow-down-right"></i>
                      </span>
                    </Link>
                  </div>
                  <div className="d-flex align-items-center tw-gap-4 flex-sm-nowrap flex-wrap custom-fade-animation" data-delay=".8" data-fade-from="bottom" data-ease="bounce">
                    <div className="d-flex align-items-center pointer-events-auto">
                      <div className="pointer-events-auto tw-w-17 tw-h-17 rounded-circle tw-duration-300 hover-scale-14 tw-hover-z-4 border border-white border-2 position-relative z-0 bg-main-600 text-white d-flex align-items-center justify-content-center fw-bold">
                        17+
                      </div>
                      <div className="pointer-events-auto tw-w-17 tw-h-17 rounded-circle tw-duration-300 hover-scale-14 tw-hover-z-4 border border-white border-2 position-relative tw--ms-20-px z-1 bg-primary-new text-white d-flex align-items-center justify-content-center fw-bold tw-text-sm text-center">
                        2 cơ sở
                      </div>
                    </div>
                    <p className="fw-normal text-body max-w-200-px text-balance">
                      <span className="d-block tw-text-2xl fw-bold counter text-heading">300</span>+ Khách hàng tin tưởng
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Chặng đường phát triển (giữ nguyên nội dung) ================= */}
      <section className="py-120 section-bg-gradient-two">
        <div className="container">
          <h2 className="h1 fw-semibold text-center tw-mb-15">
            <span className="text-reveal d-inline">Chặng đường phát triển</span>
          </h2>
          <div className="row gy-4">
            {milestones.map((m, i) => (
              <div className="col-lg-3 col-sm-6 custom-fade-animation" data-delay={`.${6 + i}`} data-fade-from="bottom" data-ease="bounce" key={m.year}>
                <div className="bg-white tw-rounded-2xl border border-neutral-100 tw-p-7 h-100">
                  <span className="text-main-600 fw-semibold tw-text-lg d-block tw-mb-3">{m.year}</span>
                  <h3 className="h5 tw-mb-3">{m.title}</h3>
                  <p className="text-neutral-500">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Tầm nhìn & giá trị cốt lõi + Năng lực sản xuất (giữ nguyên nội dung) ================= */}
      <section className="py-120">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-6">
              <h2 className="h1 fw-semibold tw-mb-8">
                <span className="text-reveal d-inline">Tầm nhìn &amp; giá trị cốt lõi</span>
              </h2>
              <ul className="d-flex flex-column tw-gap-4">
                {values.map((v) => (
                  <li className="d-flex align-items-start tw-gap-3" key={v}>
                    <span className="d-flex tw-text-2xl text-primary-new flex-shrink-0"><i className="ph-fill ph-check-circle"></i></span>
                    <span className="tw-text-lg text-neutral-600">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <h2 className="h1 fw-semibold tw-mb-8">
                <span className="text-reveal d-inline">Năng lực sản xuất</span>
              </h2>
              <div className="row gy-4">
                {services.map((s) => (
                  <div className="col-sm-6" key={s.slug}>
                    <div className="bg-neutral-50 tw-rounded-xl tw-p-6 h-100">
                      <span className="d-flex tw-text-3xl text-main-600 tw-mb-4"><i className={s.icon}></i></span>
                      <h3 className="h5 tw-mb-2">
                        <Link href={`/dich-vu/${s.slug}`} className="text-heading hover-common-underline">{s.name}</Link>
                      </h3>
                      <p className="text-neutral-500 tw-text-sm line-clamp-3">{s.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Brand marquee: khách hàng doanh nghiệp ================= */}
      <div className="brand pb-120">
        <div className="container">
          <div className="text-center tw-mb-10">
            <span className="tw-text-lg text-heading fw-semibold font-heading text-reveal d-inline-block">
              Hơn 300 doanh nghiệp đã tin tưởng đặt bao bì tại Thời Đại
            </span>
          </div>
          <BrandLogoSlider />
        </div>
      </div>

      {/* ================= Contact section: form liên hệ + điểm mạnh ================= */}
      <section className="contact-section py-120">
        <div className="container">
          <div className="tw-rounded-36-px section-bg">
            <div className="bg-navy-black tw-p-5 tw-rounded-36-px">
              <div className="row gy-4 flex-wrap-reverse">
                <div className="col-lg-5">
                  <div className="position-relative d-block h-100">
                    <div className="clip-animation image-double-animation overflow-hidden position-relative d-block tw-rounded-lg tw-rounded-36-px h-100">
                      {/* TODO ảnh: ảnh văn phòng/xưởng Thời Đại — xem docs/IMAGE-GUIDE.md */}
                      <img src="/assets/images/thumbs/contact-section-img.png" alt="Văn phòng In Ấn Thời Đại" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                      <img src="/assets/images/thumbs/contact-section-img.png" alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 align-self-center">
                  <div className="px-xl-5 px-lg-4 py-xl-0 py-4">
                    <div className="section-heading tw-mb-10">
                      <span className="subtitle border border-main-600 rounded-pill tw-px-5 tw-py-105 text-main-600 d-inline-flex align-items-center tw-gap-105 text-uppercase tw-leading-none">
                        <i className="ph-fill ph-caret-double-right"></i>
                        Liên hệ
                      </span>
                      <h2 className="text-reveal fw-semibold tw-mt-4 text-white">Gửi yêu cầu báo giá cho Thời Đại</h2>
                    </div>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-120">
              <div className="section-heading tw-mb-10 tw-ps-80-px">
                <span className="subtitle border border-main-600 rounded-pill tw-px-5 tw-py-105 text-main-600 d-inline-flex align-items-center tw-gap-105 text-uppercase tw-leading-none">
                  <i className="ph-fill ph-caret-double-right"></i>
                  Điểm mạnh
                </span>
                <h2 className="text-reveal fw-semibold tw-mt-4">Vì sao khách hàng chọn Thời Đại</h2>
              </div>
            </div>
            <div className="tw-mt-13 tw-px-44-px">
              <div className="row card-animation-wrapper contact-features-wrapper">
                {strengths.map((s) => (
                  <div className="col-xl-3 col-sm-6 card-animation" key={s.title}>
                    <div className="tw-pt-9 tw-px-36-px tw-pb-14 hover-bg-white tw-duration-200 tw-rounded-top-20-px group group-item hover-shadow-one h-100 animation-item section-bg d-flex flex-column">
                      <div className="max-w-230-px d-flex flex-column h-100">
                        <span className="d-flex">
                          <img src={`/assets/images/icons/${s.icon}`} alt="" className="text-invert-black group-hover-item-text-invert-main-600 tw-duration-200 animate__bounce" />
                        </span>
                        <div className="tw-mt-12 d-flex flex-column flex-grow-1">
                          <h2 className="tw-text-xl tw-leading-155 text-capitalize">{s.title}</h2>
                          <p className="tw-mt-6 text-body-3">{s.text}</p>
                          <Link href={s.href} className="text-heading fw-semibold d-inline-flex align-items-center tw-gap-3 hover-text-heading tw-mt-10 hover-common-underline mt-auto">
                            Xem dịch vụ
                            <span className="btn-down-arrow"><i className="ph-bold ph-arrow-down-right"></i></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="scale-littlebit-onscroll max-w-810-px border border-neutral-100 md-rounded-pill tw-rounded-lg md-ps-10 tw-ps-6 tw-py-205 tw-pe-3 d-flex align-items-md-center justify-content-between tw-gap-3 flex-md-row flex-column tw-mt-15 mx-auto">
            <p className="text-body max-w-400-px">Cần báo giá nhanh? Gọi hotline hoặc để lại yêu cầu, Thời Đại phản hồi trong ngày làm việc.</p>
            <div className="custom-fade-animation" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
              <a href={`tel:${site.hotlineTel}`} className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-two-600">
                <span className="btn-text">Liên hệ ngay </span>
                <span className="btn-icon-animation d-flex">
                  <i className="ph-bold ph-arrow-down-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Working Process: quy trình đặt hàng ================= */}
      <section className="working-process py-120">
        <div className="container">
          <div className="section-heading tw-mb-10 text-center">
            <span className="subtitle border border-main-600 rounded-pill tw-px-5 tw-py-105 text-main-600 d-inline-flex align-items-center tw-gap-105 text-uppercase tw-leading-none bg-white">
              <i className="ph-fill ph-caret-double-right"></i>
              Quy trình
            </span>
            <h2 className="text-reveal fw-semibold tw-mt-4">Quy trình đặt in tại Thời Đại</h2>
          </div>

          <div className="row gy-4">
            {processSteps.map((step) => (
              <div className="col-lg-4 col-sm-6" key={step.step}>
                <div className="working-process text-center group group-item position-relative animation-item h-100 d-flex flex-column">
                  {step.arrow && (
                    <div className="position-absolute tw-start-75-percent top-0 tw-mt-10 min-w-max d-xl-block d-none">
                      <img src={`/assets/images/shapes/${step.arrow}`} alt="" className="left-right-animation" />
                    </div>
                  )}
                  <div className="tw-w-116-px tw-h-116-px mx-auto">
                    <span className="tw-w-116-px tw-h-116-px bg-neutral-50 d-flex justify-content-center align-items-center rounded-circle tw-duration-300 group-hover-bg-main-two-600">
                      <img src={`/assets/images/icons/${step.icon}`} alt="" className="group-hover-item-text-invert-white tw-duration-300 animate__heartBeat" />
                    </span>
                    <span className="bg-main-600 rounded-pill tw-px-4 tw-py-1 text-white tw-text-sm fw-medium translate-y--8-px">{step.step}</span>
                  </div>
                  <h2 className="h4 tw-mt-5 tw-mb-6 tw-pt-8">{step.title}</h2>
                  <p className="text-body max-w-380-px mx-auto">{step.text}</p>
                  <Link href={step.href} className="text-heading fw-semibold d-inline-flex align-items-center tw-gap-3 hover-text-heading tw-mt-10 hover-common-underline mt-auto">
                    Xem thêm
                    <span className="btn-down-arrow"><i className="ph-bold ph-arrow-down-right"></i></span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Product Range: sản phẩm nổi bật ================= */}
      <section className="product-range py-120 bg-main-two-600 position-relative overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div>
                <div className="section-heading tw-mb-10">
                  <span className="subtitle border border-main-600 rounded-pill tw-px-5 tw-py-105 text-main-600 d-inline-flex align-items-center tw-gap-105 text-uppercase tw-leading-none">
                    <i className="ph-fill ph-caret-double-right"></i>
                    Sản phẩm nổi bật
                  </span>
                  <h2 className="text-reveal fw-semibold tw-mt-4 text-white">Hộp giấy đóng gói theo yêu cầu</h2>
                  <p className="tw-mt-6 text-white tw-text-lg max-w-580-px">
                    Từ hộp giày, hộp nắp gài đến thùng COD — sản xuất trực tiếp tại xưởng, nhận đơn từ 100 hộp.
                  </p>
                </div>
                <div className="custom-fade-animation" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
                  <Link href="/san-pham?danh-muc=hop-giay" className="btn bg-main-600 hover-bg-animation hover-bg-animation-white hover-text-heading">
                    <span className="btn-text">Xem sản phẩm </span>
                    <span className="btn-icon-animation d-flex">
                      <i className="ph-bold ph-arrow-down-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 d-xl-block d-none">
              <div className="position-absolute tw-start-45-percent top-50 translate-middle-y">
                {/* TODO ảnh: ảnh sản phẩm tiêu biểu (hộp giày/hộp nắp gài) — xem docs/IMAGE-GUIDE.md */}
                <img src="/assets/images/thumbs/product-range-img.png" alt="Sản phẩm bao bì giấy Thời Đại" />
                <div className="product-range-image position-absolute z-1">
                  <img src="/assets/images/shapes/cursor-shape.png" alt="" className="move-on-cursor-hover" data-value="10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Testimonials: đánh giá khách hàng ================= */}
      <section className="py-120 testimonials section-bg">
        <div className="container max-w-1620-px">
          <div className="section-heading tw-mb-10 text-center">
            <span className="subtitle border border-main-600 rounded-pill tw-px-5 tw-py-105 text-main-600 d-inline-flex align-items-center tw-gap-105 text-uppercase tw-leading-none bg-white">
              <i className="ph-fill ph-caret-double-right"></i>
              Khách hàng nói gì
            </span>
            <h2 className="text-reveal fw-semibold tw-mt-4">Chất lượng ổn định, tiến độ đúng hẹn</h2>
            <div className="d-inline-flex align-items-center tw-gap-6 tw-mt-6">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-main-600 hover-common-underline fw-semibold d-inline-flex align-items-center tw-gap-2">
                Xem thêm đánh giá trên Facebook <i className="ph-bold ph-arrow-up-right"></i>
              </a>
            </div>
          </div>

          <TestimonialsCards items={testimonials as Testimonial[]} />

          <div className="d-flex justify-content-center tw-mt-10">
            <div className="custom-fade-animation" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-two-600">
                <span className="btn-text">Xem tất cả đánh giá </span>
                <span className="btn-icon-animation d-flex">
                  <i className="ph-bold ph-arrow-down-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Đặt hàng nhanh qua Zalo / Hotline (thay cho "Download app") ================= */}
      <section className="download-app pt-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="text-center">
                <span className="subtitle border border-main-600 rounded-pill tw-px-5 tw-py-105 text-main-600 d-inline-flex align-items-center tw-gap-105 text-uppercase tw-leading-none">
                  <i className="ph-fill ph-caret-double-right"></i>
                  Đặt hàng nhanh
                </span>
                <h2 className="text-reveal fw-semibold tw-mt-4">Đặt hàng qua Zalo hoặc gọi hotline</h2>
                <p className="tw-mt-6 text-body tw-text-lg mx-auto max-w-580-px">
                  Gửi kích thước, số lượng và mẫu thiết kế qua Zalo — Thời Đại báo giá và tư vấn quy cách ngay trong
                  ngày làm việc.
                </p>
                <div className="d-flex tw-mt-6 tw-gap-5 flex-sm-nowrap flex-wrap justify-content-center">
                  <div className="custom-fade-animation" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
                    <a href={`https://zalo.me/${site.zalo.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn bg-main-two-600 hover-bg-animation hover-bg-animation-main-600">
                      <span className="btn-text">Nhắn Zalo {site.zalo}</span>
                      <span className="btn-icon-animation d-flex">
                        <i className="ph-fill ph-chat-circle-text"></i>
                      </span>
                    </a>
                  </div>
                  <div className="custom-fade-animation" data-delay=".7" data-fade-from="bottom" data-ease="bounce">
                    <a href={`tel:${site.hotlineTel}`} className="btn bg-transparent border border-main-two-600 text-main-two-600 hover-bg-animation hover-bg-animation-main-two-600">
                      <span className="btn-text">Gọi {site.hotline}</span>
                      <span className="btn-icon-animation d-flex">
                        <i className="ph-fill ph-phone"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Promo banner: ưu đãi + cam kết chất lượng ================= */}
      <section className="promo-banner pt-120 scale-section-wrapper tw-h-screen overflow-hidden">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6 z-2">
              <div className="tw-pt-12 tw-ps-40-px position-relative bg-pink-50 tw-rounded-20-px z-2 h-100 d-flex flex-column justify-content-between">
                <div className="max-w-330-px">
                  <div className="d-inline-flex align-items-center tw-gap-105">
                    <span className="text-body d-flex"><i className="ph-fill ph-caret-double-right"></i></span>
                    <span className="text-body text-uppercase">Ưu đãi tháng này</span>
                  </div>
                  <h2 className="h3 tw-mt-4 text-reveal">Giảm 20% chi phí thiết kế, in ấn và gia công trọn gói.</h2>
                  <Link href="/lien-he" className="text-heading fw-semibold d-inline-flex align-items-center tw-gap-3 hover-text-heading tw-mt-10 hover-common-underline">
                    Nhận ưu đãi
                    <span className="btn-down-arrow"><i className="ph-bold ph-arrow-down-right"></i></span>
                  </Link>
                </div>

                <div className="overflow-hidden">
                  <div className="tw-mt-9 w-100 min-w-max custom-fade-animation" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
                    <img src="/assets/images/thumbs/promo-banner-img1.png" alt="" className="move-on-cursor-hover" data-value="10" />
                  </div>
                  <div className="position-absolute bottom-0 tw-end-0 z-n1 custom-fade-animation" data-delay=".8" data-fade-from="right" data-ease="bounce">
                    <img src="/assets/images/thumbs/promo-banner-img2.png" alt="" />
                  </div>
                </div>

                <div className="position-absolute tw-end-0 bottom-0 tw-pe-16 me-xl-5 tw-pb-12 mb-xl-5 z-1">
                  <div className="position-relative">
                    <div className="area-bg scale-item"></div>
                    <div className="tw-w-160-px tw-h-160-px d-flex align-items-center justify-content-center min-w-max">
                      <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 z-n1">
                        <img src="/assets/images/shapes/rounded-star.png" alt="" className="animation-rotate-right" />
                      </div>
                      <div className="text-center scale-text">
                        <h2 className="text-white text-uppercase fw-normal h5">GIẢM</h2>
                        <h2 className="text-white text-uppercase text-34-px tw-my-1">20%</h2>
                        <h2 className="text-white text-uppercase fw-normal tw-text-lg">NGAY</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="tw-pt-12 tw-px-40-px position-relative bg-slate-100 tw-rounded-20-px overflow-hidden z-1 h-100 d-flex flex-column justify-content-between">
                <div className="max-w-330-px mx-auto text-center">
                  <div className="d-inline-flex align-items-center tw-gap-105">
                    <span className="text-body d-flex"><i className="ph-fill ph-caret-double-right"></i></span>
                    <span className="text-body text-uppercase">Cam kết chất lượng</span>
                  </div>
                  <h2 className="h3 tw-mt-4 text-reveal">Chất lượng ổn định, tiến độ đúng hẹn, giá xưởng</h2>
                </div>
                <div className="tw-mt-9 w-100 min-w-max d-flex justify-content-center custom-fade-animation" data-delay=".99" data-fade-from="bottom" data-ease="bounce">
                  <img src="/assets/images/thumbs/promo-banner-img3.png" alt="" className="move-on-cursor-hover" data-value="6" />
                </div>

                <div className="position-absolute bottom-0 tw-start-0 w-100 tw-mb-15 tw-pb-5 tw-px-40-px d-sm-block d-none">
                  <div className="d-flex align-items-center justify-content-between tw-gap-6 tw-px-9">
                    <div className="bg-white tw-rounded-md d-inline-flex tw-p-105 tw-pe-5 align-items-center tw-gap-2">
                      <span className="bg-main-600 text-white tw-w-6 tw-h-6 tw-rounded d-inline-flex justify-content-center align-items-center flex-shrink-0"><i className="ph ph-check"></i></span>
                      <span className="text-body-6">Không qua trung gian</span>
                    </div>
                    <div className="bg-white tw-rounded-md d-inline-flex tw-p-105 tw-pe-5 align-items-center tw-gap-2">
                      <span className="bg-main-600 text-white tw-w-6 tw-h-6 tw-rounded d-inline-flex justify-content-center align-items-center flex-shrink-0"><i className="ph ph-check"></i></span>
                      <span className="text-body-6">Giá xưởng</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between tw-gap-6 tw-pt-48-px">
                    <div className="bg-white tw-rounded-md d-inline-flex tw-p-105 tw-pe-5 align-items-center tw-gap-2">
                      <span className="bg-main-600 text-white tw-w-6 tw-h-6 tw-rounded d-inline-flex justify-content-center align-items-center flex-shrink-0"><i className="ph ph-check"></i></span>
                      <span className="text-body-6">Đúng tiến độ</span>
                    </div>
                    <div className="bg-white tw-rounded-md d-inline-flex tw-p-105 tw-pe-5 align-items-center tw-gap-2">
                      <span className="bg-main-600 text-white tw-w-6 tw-h-6 tw-rounded d-inline-flex justify-content-center align-items-center flex-shrink-0"><i className="ph ph-check"></i></span>
                      <span className="text-body-6">Hỗ trợ thiết kế</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Hình ảnh xưởng sản xuất (thay cho "Instagram post") ================= */}
      <section className="instagram-post pt-120 pb-120 px-md-0 px-3">
        <div className="position-relative lg-pt-100-px">
          <h2 className="animated-title text-hover-animation-scale text-heading tw-leading-none text-uppercase text-center text-160-px position-absolute top-0 start-50 translate-middle-x d-lg-block d-none min-w-max">
            <span className="text-reveal">HÌNH ẢNH XƯỞNG SẢN XUẤT</span>
          </h2>

          <GallerySlider images={galleryImages} />
        </div>
      </section>
    </>
  );
}
