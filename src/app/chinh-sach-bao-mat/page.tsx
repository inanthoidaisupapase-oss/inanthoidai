import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Chính sách bảo mật',
  description: 'Cách In Ấn Thời Đại thu thập, sử dụng và bảo vệ thông tin cá nhân của khách hàng trên website.',
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumb title="Chính sách bảo mật" />
      <section className="py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 post-content tw-text-lg text-neutral-600 tw-leading-155">
              <p className="text-neutral-500">
                <em>
                  Bản nháp — cần bộ phận pháp chế hoặc luật sư rà soát trước khi công bố, đối chiếu với
                  Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.
                </em>
              </p>

              <h2>1. Thông tin chúng tôi thu thập</h2>
              <p>
                Khi bạn gửi form liên hệ hoặc yêu cầu báo giá, chúng tôi thu thập: họ tên, số điện thoại,
                email, tên công ty (nếu có) và nội dung yêu cầu. Website không yêu cầu tạo tài khoản và
                không thu thập thông tin thanh toán.
              </p>

              <h2>2. Mục đích sử dụng</h2>
              <p>
                Thông tin chỉ dùng để liên hệ lại, tư vấn và báo giá cho đúng yêu cầu bạn gửi.
                Chúng tôi không bán, trao đổi hay chia sẻ thông tin của bạn cho bên thứ ba vì mục đích quảng cáo.
              </p>

              <h2>3. Lưu trữ và bảo mật</h2>
              <p>
                Dữ liệu form được lưu trên hạ tầng cơ sở dữ liệu có mã hoá khi truyền và khi lưu trữ.
                Chỉ nhân sự phụ trách kinh doanh của công ty được truy cập.
              </p>

              <h2>4. Dữ liệu trên trình duyệt của bạn</h2>
              <p>
                Giỏ hàng được lưu trong bộ nhớ trình duyệt của bạn (localStorage), không gửi về máy chủ
                cho tới khi bạn bấm gửi yêu cầu báo giá. Bạn có thể xoá bất cứ lúc nào bằng nút
                “Xoá toàn bộ” trong trang giỏ hàng.
              </p>

              <h2>5. Quyền của bạn</h2>
              <p>
                Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xoá thông tin cá nhân đã gửi. Liên hệ{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a> hoặc hotline {site.hotline}.
              </p>

              <h2>6. Liên hệ</h2>
              <p>
                {site.legalName}<br />
                {site.office}<br />
                Điện thoại: {site.hotline} — Email: {site.email}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
