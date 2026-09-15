import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CartView from '@/components/shared/CartView';

export const metadata: Metadata = {
  title: 'Giỏ hàng',
  description: 'Danh sách sản phẩm bạn đã chọn để gửi yêu cầu báo giá tới In Ấn Thời Đại.',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <Breadcrumb title="Giỏ hàng" />
      <section className="py-120">
        <div className="container">
          <p className="text-neutral-500 tw-mb-10 max-w-800-px">
            In ấn là mặt hàng báo giá theo yêu cầu nên trang này không thanh toán online.
            Bạn chọn sản phẩm và số lượng, chúng tôi báo giá chính thức trong ngày làm việc.
          </p>
          <CartView />
        </div>
      </section>
    </>
  );
}
