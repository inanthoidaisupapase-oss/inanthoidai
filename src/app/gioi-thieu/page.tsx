import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { site } from '@/lib/site';
import { getServices } from '@/lib/data';

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

export default async function AboutPage() {
  const services = await getServices();

  return (
    <>
      <Breadcrumb title="Giới thiệu" />

      <section className="py-120">
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-6">
              <div className="tw-rounded-2xl overflow-hidden">
                {/* TODO ảnh: ảnh xưởng sản xuất hoặc tập thể công ty — xem docs/IMAGE-GUIDE.md */}
                <img src="/assets/images/thumbs/about-new-img1.png" alt="Xưởng sản xuất In Ấn Thời Đại" className="w-100 h-100 object-fit-cover" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-white rounded-pill border border-neutral-100 tw-py-105 tw-px-4 d-inline-flex align-items-center tw-gap-3">
                <div className="d-flex align-items-center tw-gap-205">
                  <span className="text-primary-new d-sm-flex d-none tw-text-xl"><i className="ph-fill ph-check-circle"></i></span>
                  <span className="text-primary-new tw-text-lg fw-semibold text-center">Về chúng tôi</span>
                </div>
                <span className="border-end border-neutral-300 tw-h-5 tw-w-px"></span>
                <span className="text-neutral-500 tw-text-lg fw-normal text-center">Từ năm 2009</span>
              </div>

              <h2 className="fw-semibold tw-mt-4 h1">{site.legalName}</h2>
              <p className="text-neutral-600 tw-mt-5 tw-text-lg tw-leading-155">
                Chuyên <strong>Thiết kế – In ấn – Sản xuất</strong> hộp giấy, túi xách giấy, hộp giày nam nữ, thùng carton,
                tem nhãn giấy, ấn phẩm văn phòng, catalogue, brochure và danh thiếp.
              </p>
              <p className="text-neutral-600 tw-mt-4 tw-text-lg tw-leading-155">
                Công ty sản xuất trực tiếp tại xưởng, không qua trung gian — nhờ vậy kiểm soát được chất lượng,
                tiến độ và giữ giá ở mức giá xưởng cho khách hàng.
              </p>

              <div className="row gy-4 tw-mt-8">
                <div className="col-sm-4">
                  <h3 className="display-6 fw-bold text-main-600 mb-1">17+</h3>
                  <span className="text-neutral-500">Năm kinh nghiệm</span>
                </div>
                <div className="col-sm-4">
                  <h3 className="display-6 fw-bold text-main-600 mb-1">300+</h3>
                  <span className="text-neutral-500">Khách hàng tin tưởng</span>
                </div>
                <div className="col-sm-4">
                  <h3 className="display-6 fw-bold text-main-600 mb-1">2</h3>
                  <span className="text-neutral-500">Cơ sở: văn phòng &amp; xưởng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-120 section-bg-gradient-two">
        <div className="container">
          <h2 className="h1 fw-semibold text-center tw-mb-15">Chặng đường phát triển</h2>
          <div className="row gy-4">
            {milestones.map((m) => (
              <div className="col-lg-3 col-sm-6" key={m.year}>
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

      <section className="py-120">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-6">
              <h2 className="h1 fw-semibold tw-mb-8">Tầm nhìn &amp; giá trị cốt lõi</h2>
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
              <h2 className="h1 fw-semibold tw-mb-8">Năng lực sản xuất</h2>
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
    </>
  );
}
