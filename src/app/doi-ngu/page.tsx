import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Đội ngũ',
  description: 'Các bộ phận của Công Ty TNHH Công Nghiệp Thời Đại: thiết kế, kinh doanh, sản xuất và gia công sau in.',
};

/**
 * Trang này mô tả các bộ phận thay vì liệt kê từng nhân sự kèm ảnh.
 * Lý do: website gốc không công bố danh sách nhân sự, nên không dựng hồ sơ
 * cá nhân hay ảnh chân dung không có thật. Khi có ảnh và thông tin thật,
 * thay khối "departments" bên dưới bằng danh sách nhân sự.
 */
const departments = [
  {
    icon: 'ph-bold ph-pen-nib',
    name: 'Bộ phận thiết kế',
    text: 'Dựng bản thiết kế kèm dao bế, biên dán và nếp gấp đúng quy cách sản xuất. Miễn phí thiết kế cho đơn in tại xưởng.',
  },
  {
    icon: 'ph-bold ph-headset',
    name: 'Bộ phận kinh doanh',
    text: 'Tiếp nhận yêu cầu, tư vấn chất liệu và quy cách, báo giá trong ngày làm việc và theo sát đơn hàng tới khi giao.',
  },
  {
    icon: 'ph-bold ph-factory',
    name: 'Bộ phận sản xuất',
    text: 'Vận hành máy in offset và in flexo tại xưởng Tây Ninh. Sản xuất carton 3, 5, 7 lớp với các loại sóng B, C, E.',
  },
  {
    icon: 'ph-bold ph-sparkle',
    name: 'Bộ phận gia công sau in',
    text: 'Cán màng, ép kim, phủ UV định hình, bế nổi, dập chìm, bồi giấy và gấp dán — bước quyết định cảm giác cầm của thành phẩm.',
  },
];

export default function TeamPage() {
  return (
    <>
      <Breadcrumb title="Đội ngũ" />
      <section className="py-120">
        <div className="container">
          <div className="row justify-content-center tw-mb-15">
            <div className="col-lg-8 text-center">
              <h2 className="h1 fw-semibold tw-mb-5">Một quy trình khép kín, bốn bộ phận</h2>
              <p className="tw-text-lg text-neutral-500">
                {site.legalName} được thành lập ngày {site.foundedAt} bởi Tổng Giám Đốc Nguyễn Duy Chương.
                Từ thiết kế tới thành phẩm đều làm nội bộ nên kiểm soát được chất lượng và tiến độ.
              </p>
            </div>
          </div>

          <div className="row gy-4">
            {departments.map((d) => (
              <div className="col-lg-3 col-sm-6" key={d.name}>
                <div className="bg-neutral-50 tw-rounded-2xl tw-p-8 h-100 border border-neutral-100">
                  <span className="tw-w-16 tw-h-16 bg-main-600 text-white rounded-circle d-flex justify-content-center align-items-center tw-text-2xl tw-mb-5">
                    <i className={d.icon}></i>
                  </span>
                  <h3 className="h5 tw-mb-3">{d.name}</h3>
                  <p className="text-neutral-500 mb-0">{d.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-main-600 tw-rounded-2xl tw-p-10 text-center tw-mt-15">
            <h2 className="h3 text-white tw-mb-4">Muốn làm việc trực tiếp với đội ngũ?</h2>
            <p className="text-white opacity-75 tw-mb-8">Gọi {site.hotline} hoặc ghé văn phòng tại {site.office}.</p>
            <Link href="/lien-he" className="btn bg-white text-heading hover-bg-animation hover-bg-animation-white">
              <span className="btn-text">Liên hệ</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
