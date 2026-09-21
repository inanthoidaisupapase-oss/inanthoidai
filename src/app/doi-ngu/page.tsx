import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import TeamDepartments from '@/components/shared/TeamDepartments';
import { departments } from '@/lib/team-data';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Đội ngũ',
  description: 'Các bộ phận của Công Ty TNHH Công Nghiệp Thời Đại: thiết kế, kinh doanh, sản xuất và gia công sau in.',
};

/**
 * Bấm vào 1 trong 4 khối bộ phận (TeamDepartments.tsx) sẽ mở panel danh sách nhân sự của
 * bộ phận đó. Website gốc không công bố danh sách nhân sự nên hiện tại mọi bộ phận đều
 * chưa có dữ liệu thật (members: [] trong lib/team-data.ts) — panel tạm hiển thị "Đang cập
 * nhật". KHÔNG tự bịa ảnh/tên/chức danh; thêm dữ liệu thật trực tiếp vào lib/team-data.ts
 * khi có, phần hiển thị lưới nhân viên đã dựng sẵn.
 */

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

          <TeamDepartments departments={departments} />

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
