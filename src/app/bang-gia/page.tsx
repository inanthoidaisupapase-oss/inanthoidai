import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { getCategories, getProducts } from '@/lib/data';
import { formatVnd } from '@/lib/format';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Bảng giá tham khảo',
  description:
    'Bảng giá tham khảo hộp giày, hộp nắp gài, thùng COD và lịch Tết tại In Ấn Thời Đại. Giá chính thức theo báo giá từng đơn.',
};

/** Giá lịch Tết — nguồn: bài "In lịch Tết 2026 theo yêu cầu" trên website */
const calendarPrices = [
  ['Lịch bloc nhỏ', '15.000 – 30.000', '100 cuốn'],
  ['Lịch treo tường', '20.000 – 30.000', '100 cuốn'],
  ['Lịch để bàn', '35.000 – 50.000', '100 cuốn'],
  ['Lịch sổ tay', '60.000 – 100.000', '100 cuốn'],
];

export default async function PricingPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <>
      <Breadcrumb title="Bảng giá" />
      <section className="py-120">
        <div className="container">
          <p className="text-neutral-500 tw-mb-10 max-w-800-px">
            Giá dưới đây là giá tham khảo cho các quy cách có sẵn, tính theo lô 100 đến 500 hộp.
            Giá chính thức phụ thuộc chất liệu, kỹ thuật in và gia công — nhân viên kinh doanh sẽ báo giá
            sau khi chốt quy cách.
          </p>

          {categories.map((category) => {
            const list = products.filter((p) => p.categorySlug === category.slug);
            if (list.length === 0) return null;
            return (
              <div className="tw-mb-15" key={category.slug}>
                <h2 className="h3 tw-mb-6">{category.name}</h2>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Kích thước</th>
                        <th className="text-end">Giá 100 hộp</th>
                        <th className="text-end">Giá 500 hộp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((p) => (
                        <tr key={p.slug}>
                          <td>
                            <Link href={`/san-pham/${p.slug}`} className="text-heading fw-medium hover-common-underline">
                              {p.name}
                            </Link>
                          </td>
                          <td className="text-neutral-600">{p.specs['Kích thước (D x R x C)']}</td>
                          <td className="text-end fw-semibold price-vnd">{formatVnd(p.priceMin)}</td>
                          <td className="text-end fw-semibold price-vnd">{formatVnd(p.priceMax)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          <div className="tw-mb-15">
            <h2 className="h3 tw-mb-6">Lịch Tết</h2>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Loại lịch</th>
                    <th className="text-end">Giá (VNĐ/cuốn)</th>
                    <th className="text-end">Số lượng tối thiểu</th>
                  </tr>
                </thead>
                <tbody>
                  {calendarPrices.map(([name, price, moq]) => (
                    <tr key={name}>
                      <td className="text-heading fw-medium">{name}</td>
                      <td className="text-end fw-semibold">{price}</td>
                      <td className="text-end text-neutral-600">{moq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-neutral-500 tw-text-sm tw-mt-3">
              Giá thay đổi theo chất liệu, thiết kế và số lượng.
            </p>
          </div>

          <div className="bg-neutral-50 tw-rounded-2xl tw-p-10 text-center">
            <h2 className="h3 tw-mb-4">Cần báo giá cho quy cách riêng?</h2>
            <p className="text-neutral-500 tw-mb-8 max-w-700-px mx-auto">
              Xưởng nhận sản xuất theo kích thước riêng. Gửi kích thước, số lượng và mục đích sử dụng,
              hoặc gọi hotline {site.hotline}.
            </p>
            <Link href="/bao-gia" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600">
              <span className="btn-text">Gửi yêu cầu báo giá</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
