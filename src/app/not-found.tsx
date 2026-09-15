import Link from 'next/link';
import { site } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="py-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 text-center">
            <h1 className="display-1 fw-bold text-main-600">404</h1>
            <h2 className="h2 tw-mt-4 tw-mb-5">Không tìm thấy trang này</h2>
            <p className="tw-text-lg text-neutral-500 tw-mb-10">
              Trang bạn tìm có thể đã được đổi đường dẫn hoặc không còn tồn tại.
              Bạn thử quay lại trang chủ hoặc xem danh sách sản phẩm.
            </p>
            <div className="d-flex justify-content-center tw-gap-4 flex-wrap">
              <Link href="/" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600">
                <span className="btn-text">Về trang chủ</span>
              </Link>
              <Link href="/san-pham" className="btn bg-transparent border border-primary-new text-main-two-600 hover-bg-animation hover-bg-animation-main-two-600 hover-animate-text-white">
                <span className="btn-text">Xem sản phẩm</span>
              </Link>
            </div>
            <p className="text-neutral-500 tw-mt-10">
              Cần hỗ trợ gấp? Gọi <a href={`tel:${site.hotlineTel}`} className="text-main-600 hover-common-underline">{site.hotline}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
