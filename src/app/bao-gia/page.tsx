import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import QuoteForm from '@/components/shared/QuoteForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Yêu cầu báo giá',
  description:
    'Gửi kích thước, số lượng và quy cách — In Ấn Thời Đại báo giá trong ngày làm việc. Thiết kế miễn phí cho đơn in tại xưởng.',
};

export default function QuotePage() {
  return (
    <>
      <Breadcrumb title="Yêu cầu báo giá" />

      <section className="py-120">
        <div className="container">
          <p className="text-neutral-500 tw-mb-10 max-w-800-px">
            Điền thông tin bên dưới, chúng tôi báo giá trong ngày làm việc. Cần gấp, gọi thẳng hotline{' '}
            <a href={`tel:${site.hotlineTel}`} className="text-main-600 hover-common-underline">{site.hotline}</a>{' '}
            hoặc nhắn Zalo{' '}
            <a href={`https://zalo.me/${site.zalo.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-main-600 hover-common-underline">{site.zalo}</a>.
          </p>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
