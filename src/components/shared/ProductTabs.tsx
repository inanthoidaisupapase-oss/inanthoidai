'use client';

import { useState } from 'react';
import type { Product } from '@/types/content';

const TAB_LABELS = ['Mô tả', 'Thông tin thêm', 'Đánh giá'] as const;

/**
 * Nội dung tab "Thông tin thêm" — chỉ dùng dữ kiện THẬT đã có sẵn ở nơi khác trong site
 * (products.json, cau-hoi-thuong-gap/page.tsx, lib/service-details.ts, WorkingProcess),
 * không bịa quy trình đổi trả/thời gian cụ thể chưa được xác nhận.
 */
function additionalInfo(product: Product): { label: string; value: string }[] {
  const items: { label: string; value: string }[] = [];
  if (product.specs['Số lượng đặt tối thiểu']) {
    items.push({ label: 'Số lượng đặt tối thiểu', value: product.specs['Số lượng đặt tối thiểu'] });
  }
  if (product.specs['Nhận in theo yêu cầu']) {
    items.push({ label: 'Nhận in theo yêu cầu', value: product.specs['Nhận in theo yêu cầu'] });
  }
  items.push(
    { label: 'Quy cách giao hàng', value: 'Hộp giao ở dạng phôi phẳng, khách tự gấp khi đóng hàng — giảm chi phí lưu kho và cước vận chuyển.' },
    { label: 'Thời gian sản xuất', value: 'Phụ thuộc quy cách và số lượng đặt; thời gian cụ thể được nêu rõ trong báo giá.' },
    { label: 'Thanh toán & giao hàng', value: 'Giao hàng toàn quốc, nhận hàng kiểm tra rồi thanh toán — website không thu thanh toán trực tuyến.' },
    { label: 'Nếu có lỗi từ nhà sản xuất', value: 'Được hỗ trợ xử lý khi có lỗi từ nhà sản xuất.' },
  );
  return items;
}

/**
 * section#pills-tabContent trong shop-details-new.html — mẫu gốc dùng data-bs-toggle="pill"
 * (cần bootstrap.bundle.min.js). Dự án này chỉ nạp bootstrap.min.css, không nạp JS của
 * Bootstrap (xem FaqAccordion.tsx), nên tự dựng lại đúng cơ chế chuyển tab bằng React state,
 * giữ nguyên class .nav-pills/.tab-pane/.fade/.show/.active để ăn theo đúng CSS gốc
 * (bootstrap.min.css: .fade{transition:opacity .15s linear}, .fade:not(.show){opacity:0},
 * .tab-content>.active{display:block}) — không viết CSS animation riêng.
 * Double-rAF thêm class "show" sau 1 frame, khớp cách bootstrap's tab.js tự làm để phần tử
 * thật sự có 1 khung hình ở opacity:0 trước khi chuyển sang 1, nếu không trình duyệt gộp
 * 2 lần đổi và mất hẳn hiệu ứng mờ dần (cùng nguyên lý đã dùng ở FaqAccordion.tsx).
 */
export default function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [entering, setEntering] = useState<number | null>(null);

  const selectTab = (i: number) => {
    if (i === active) return;
    setActive(i);
    setEntering(i);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntering(null));
    });
  };

  const paneClass = (i: number) =>
    `tab-pane fade${i === active ? (entering === i ? ' active' : ' show active') : ''}`;

  return (
    <div>
      <ul
        className="nav active-btn-main-primary nav-pills tw-mb-11 tw-gap-3 d-inline-flex flex-wrap bg-transparent tw-rounded-xl tw-p-2 border border-neutral-100 rounded-pill"
        role="tablist"
      >
        {TAB_LABELS.map((label, i) => (
          <li className="nav-item" role="presentation" key={label}>
            <button
              type="button"
              className={`nav-link tw-px-6 tw-py-205 bg-transparent text-primary-new fw-medium text-capitalize rounded-pill${i === active ? ' active' : ''}`}
              role="tab"
              aria-selected={i === active}
              onClick={() => selectTab(i)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content">
        <div className={paneClass(0)} role="tabpanel">
          <div
            className="text-neutral-600 tw-text-lg tw-leading-155 product-description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          <div className="table-responsive tw-mt-8">
            <table className="table">
              <tbody>
                {Object.entries(product.specs).map(([key, value]) => (
                  <tr key={key}>
                    <th className="fw-medium text-neutral-600" style={{ width: '45%' }}>{key}</th>
                    <td className="text-heading">{value}</td>
                  </tr>
                ))}
                {product.sku && (
                  <tr>
                    <th className="fw-medium text-neutral-600">Mã sản phẩm</th>
                    <td className="text-heading">{product.sku}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className={paneClass(1)} role="tabpanel">
          <ul className="d-flex flex-column tw-gap-5 tw-ps-0 mb-0" style={{ listStyle: 'none' }}>
            {additionalInfo(product).map((item) => (
              <li className="d-flex align-items-start tw-gap-3" key={item.label}>
                <span className="d-flex tw-text-2xl text-main-600 flex-shrink-0">
                  <i className="ph-fill ph-check-circle"></i>
                </span>
                <span className="tw-text-lg text-neutral-600">
                  <strong className="text-heading">{item.label}:</strong> {item.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={paneClass(2)} role="tabpanel">
          <div className="text-center py-40">
            <span className="d-flex justify-content-center tw-text-5xl text-neutral-300 tw-mb-5">
              <i className="ph ph-chat-circle-dots"></i>
            </span>
            <p className="tw-text-lg text-neutral-500 mb-0">Chưa có đánh giá nào cho sản phẩm này.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
