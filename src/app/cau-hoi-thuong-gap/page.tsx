import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
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

export default function FaqPage() {
  return (
    <>
      <Breadcrumb title="Câu hỏi thường gặp" />
      <section className="py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="d-flex flex-column tw-gap-5">
                {faqs.map((item) => (
                  <details className="bg-neutral-50 tw-rounded-2xl tw-p-7 border border-neutral-100" key={item.q}>
                    <summary className="h5 mb-0 cursor-pointer">{item.q}</summary>
                    <p className="text-neutral-600 tw-mt-4 tw-text-lg tw-leading-155 mb-0">{item.a}</p>
                  </details>
                ))}
              </div>

              <div className="bg-main-600 tw-rounded-2xl tw-p-10 text-center tw-mt-15">
                <h2 className="h3 text-white tw-mb-4">Câu hỏi của bạn chưa có ở đây?</h2>
                <p className="text-white opacity-75 tw-mb-8">Gọi {site.hotline} hoặc gửi câu hỏi, chúng tôi trả lời trong giờ làm việc.</p>
                <Link href="/lien-he" className="btn bg-white text-heading hover-bg-animation hover-bg-animation-white">
                  <span className="btn-text">Liên hệ với chúng tôi</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
