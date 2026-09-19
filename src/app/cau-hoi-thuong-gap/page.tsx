import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import ContactForm from '@/components/shared/ContactForm';
import FaqAccordion from '@/components/shared/FaqAccordion';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Câu hỏi thường gặp',
  description: 'Số lượng đặt tối thiểu, thời gian sản xuất, phí thiết kế, chất liệu và cách đặt hàng tại In Ấn Thời Đại.',
};

const faqs = [
  {
    q: 'Số lượng đặt tối thiểu là bao nhiêu?',
    a: 'Với hộp có sẵn quy cách, đơn tối thiểu là 100 hộp. Với hàng in theo yêu cầu (in logo, in nhận diện thương hiệu), tối thiểu 500 hộp vì phải làm khuôn in riêng.',
  },
  {
    q: 'Phí thiết kế tính thế nào?',
    a: 'Miễn phí thiết kế cho đơn in tại xưởng. Bạn gửi kích thước, số lượng và mục đích sử dụng — đội thiết kế dựng mẫu kèm dao bế, biên dán và nếp gấp đúng quy cách sản xuất.',
  },
  {
    q: 'Tôi chưa có file thiết kế thì sao?',
    a: 'Không sao. Bạn chỉ cần mô tả ý tưởng, kích thước sản phẩm cần đóng gói và tham khảo mẫu bạn thích. Chúng tôi dựng bản thiết kế để bạn duyệt trước khi in.',
  },
  {
    q: 'Có được xem mẫu trước khi in số lượng lớn không?',
    a: 'Có. Với đơn in offset, chúng tôi khuyến nghị duyệt test proof trên đúng chất liệu sẽ dùng, vì màu in có thể lệch nhẹ giữa giấy thường và giấy đã cán màng.',
  },
  {
    q: 'Xưởng làm được những loại carton nào?',
    a: 'Carton 3 lớp, 5 lớp và 7 lớp với các loại sóng B, C, E. Sóng E mịn, định hình tốt cho hộp mỹ phẩm và hàng nhẹ; sóng B cao hơn, chịu lực tốt cho thực phẩm và linh kiện; tổ hợp E-VX dùng cho hàng cao cấp và hàng xuất khẩu.',
  },
  {
    q: 'Có nhận in tem nhãn, catalogue, lịch Tết không?',
    a: 'Có. Ngoài bao bì giấy, xưởng nhận in tem nhãn decal, catalogue, brochure, tờ rơi, poster, danh thiếp, bao lì xì, lịch Tết và ấn phẩm văn phòng.',
  },
  {
    q: 'Giao hàng và thanh toán ra sao?',
    a: `Giao hàng toàn quốc. Đơn trên 500 hộp liên hệ Zalo ${site.zalo} (Ms. Tuyền) để nhận giá ưu đãi. Website không thanh toán online — mọi đơn đều được nhân viên kinh doanh báo giá và xác nhận trước.`,
  },
  {
    q: 'Bao lâu thì có hàng?',
    a: 'Thời gian phụ thuộc quy cách và số lượng. Vì in, bế, cán màng và gấp dán đều làm tại xưởng nên chúng tôi chủ động được tiến độ — thời gian cụ thể sẽ có trong báo giá.',
  },
];

// Khối "Contact section" (form liên hệ + grid 4 card Choose Us) tái sử dụng đúng cấu trúc
// đã port ở gioi-thieu/page.tsx — không phải component dùng chung toàn site (mỗi trang tự
// có bản của mình theo đúng quy ước hiện tại của dự án), nên copy nguyên khối ở đây, chỉ đổi
// 1 href (mục "Giao hàng đúng tiến độ") từ /cau-hoi-thuong-gap sang /bao-gia để tránh link
// trỏ về chính trang đang đứng.
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
    href: '/bao-gia',
  },
  {
    icon: 'choose-us-icon4.png',
    title: 'Hỗ trợ thiết kế miễn phí',
    text: 'Đội thiết kế dựng mẫu miễn phí, tính sẵn dao bế và biên dán cho đơn in tại xưởng.',
    href: '/dich-vu/thiet-ke-bao-bi',
  },
];

export default function FaqPage() {
  return (
    <>
      <Breadcrumb title="Câu hỏi thường gặp" />

      {/* ============================ FAQ section — accordion + sidebar hỗ trợ ============================ */}
      <section className="py-120">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-8">
              <div className="">
                <div className="section-heading tw-mb-10">
                  <span className="subtitle border border-main-600 rounded-pill tw-px-5 tw-py-105 text-main-600 d-inline-flex align-items-center tw-gap-105 text-uppercase tw-leading-none">
                    <i className="ph-fill ph-caret-double-right"></i>
                    CÂU HỎI THƯỜNG GẶP
                  </span>
                  <h2 className="text-reveal fw-semibold tw-mt-4">Giải đáp thắc mắc thường gặp</h2>
                </div>
                <FaqAccordion items={faqs} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="h-100">
                <div className="tw-rounded-20-px overflow-hidden bg-neutral-100">
                  <div className="tw-py-12 tw-px-40-px">
                    <h2 className="tw-text-xl tw-mb-8">Cần hỗ trợ thêm?</h2>
                    <div className="d-flex align-items-center tw-gap-52-px flex-wrap">
                      <div className="d-flex align-items-center tw-gap-3 animation-item">
                        <span className="tw-w-12 tw-h-12 border border-white d-lg-flex d-none justify-content-center align-items-center text-main-600 rounded-circle flex-shrink-0 flex-grow-1 bg-white">
                          <img src="/assets/images/icons/icon-phone.png" alt="" className="animate__heartBeat" />
                        </span>
                        <div className="flex-grow-1">
                          <span className="text-neutral-600 tw-text-sm d-block">Gọi ngay</span>
                          <a href={`tel:${site.hotlineTel}`}
                            className="text-heading tw-text-base tw-sm-text-sm hover-text-main-600 fw-semibold">{site.hotline}</a>
                        </div>
                      </div>
                      <div className="d-flex align-items-center tw-gap-3 animation-item">
                        <span className="tw-w-12 tw-h-12 border border-white d-lg-flex d-none justify-content-center align-items-center text-main-600 rounded-circle flex-shrink-0 flex-grow-1 bg-white">
                          <img src="/assets/images/icons/icon-envelope.png" alt="" className="animate__heartBeat" />
                        </span>
                        <div className="flex-grow-1">
                          <span className="text-neutral-600 tw-text-sm d-block">Gửi email</span>
                          <a href={`mailto:${site.email}`}
                            className="text-heading tw-text-base tw-sm-text-sm hover-text-main-600 fw-semibold">{site.email}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link href="/lien-he"
                    className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-two-600 rounded-0 tw-py-605 d-flex tw-text-xl">
                    <span className="btn-text">Liên hệ ngay </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============================ FAQ section end ============================ */}

      {/* ========================== Contact Section — form liên hệ + Choose Us (khối đã port ở gioi-thieu/page.tsx) ========================== */}
      {/* pb-120: faq.html gốc không cần padding riêng vì có section "Instagram post pt-120" nối
          tiếp ngay sau tạo khoảng cách trước footer — trang này không dùng section đó (ngoài
          phạm vi yêu cầu), nên thêm pb-120 để giữ đúng nhịp khoảng cách 120px trước footer như
          các trang khác trong site. */}
      <section className="contact-section pb-120">
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
      {/* ========================== Contact Section end ========================== */}
    </>
  );
}
