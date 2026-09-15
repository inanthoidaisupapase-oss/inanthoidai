import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Quy trình làm việc',
  description: 'Từ tiếp nhận yêu cầu, dựng mẫu, duyệt test proof đến sản xuất và giao hàng tại In Ấn Thời Đại.',
};

const steps = [
  { n: '01', title: 'Tiếp nhận yêu cầu', text: 'Bạn gửi kích thước sản phẩm cần đóng gói, số lượng dự kiến và mục đích sử dụng. Chưa có file thiết kế cũng được.' },
  { n: '02', title: 'Tư vấn quy cách', text: 'Chúng tôi đề xuất chất liệu, loại sóng carton, định lượng giấy, kỹ thuật in và gia công phù hợp với ngân sách.' },
  { n: '03', title: 'Dựng mẫu thiết kế', text: 'Bản thiết kế kèm dao bế, biên dán tối thiểu 25mm và nếp gấp chuẩn. Miễn phí cho đơn in tại xưởng.' },
  { n: '04', title: 'Báo giá và chốt đơn', text: 'Báo giá chi tiết theo quy cách đã chốt, kèm thời gian sản xuất dự kiến.' },
  { n: '05', title: 'Duyệt test proof', text: 'Với đơn in offset, duyệt mẫu in thật trên đúng chất liệu — màu có thể lệch nhẹ giữa giấy thường và giấy cán màng.' },
  { n: '06', title: 'Sản xuất tại xưởng', text: 'In, bế, cán màng, ép kim và gấp dán đều làm tại xưởng Tây Ninh nên chủ động được tiến độ.' },
  { n: '07', title: 'Giao hàng và nghiệm thu', text: 'Giao hàng toàn quốc. Hàng giao ở dạng phôi phẳng để giảm chi phí vận chuyển và lưu kho.' },
];

export default function ProcessPage() {
  return (
    <>
      <Breadcrumb title="Quy trình làm việc" />
      <section className="py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="d-flex flex-column tw-gap-6">
                {steps.map((s) => (
                  <div className="d-flex align-items-start tw-gap-6 bg-neutral-50 tw-rounded-2xl tw-p-7 border border-neutral-100" key={s.n}>
                    <span className="h2 text-main-600 mb-0 flex-shrink-0">{s.n}</span>
                    <div>
                      <h2 className="h5 tw-mb-2">{s.title}</h2>
                      <p className="text-neutral-600 mb-0">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center tw-mt-15">
                <p className="text-neutral-500 tw-mb-6">Bắt đầu từ bước 01 — gọi {site.hotline} hoặc gửi yêu cầu.</p>
                <Link href="/bao-gia" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600">
                  <span className="btn-text">Gửi yêu cầu báo giá</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
