import Link from 'next/link';

/**
 * section.products-industry-section trong shop-details-new.html — mẫu gốc có 14 ô ngành
 * in ấn chung chung của template (Business Cards, Real Estate, Tradie...), không khớp
 * danh mục thật của Thời Đại. Site hiện chưa có phân loại theo NGÀNH KHÁCH HÀNG riêng —
 * chỉ có 3 danh mục sản phẩm thật (lib/data/seed/categories.json) — nên đổi 14 ô mẫu
 * thành 3 ô lọc theo đúng 3 danh mục đó, gắn với ngành khách hàng thật đã ghi trong mô tả
 * từng danh mục và ở BrandSlider.tsx trang chủ ("thời trang, mỹ phẩm, thực phẩm tới
 * thương mại điện tử"). Không bịa thêm ngành hay danh mục sản phẩm không tồn tại.
 * Icon dùng đúng tên class đã xác nhận có thật trong template (shop-details-new.html).
 */
const industries = [
  {
    icon: 'ph-dress',
    label: 'Thời trang — giày dép, phụ kiện',
    href: '/san-pham?danh-muc=hop-giay',
  },
  {
    icon: 'ph-credit-card',
    label: 'Mỹ phẩm & thương mại điện tử',
    href: '/san-pham?danh-muc=hop-nap-gai',
  },
  {
    icon: 'ph-fork-knife',
    label: 'Thực phẩm & hàng chuyển phát (COD)',
    href: '/san-pham?danh-muc=thung-cod',
  },
];

export default function ProductIndustries() {
  return (
    <section className="products-industry-section section-bg py-120">
      <div className="container">
        <div className="tw-pb-15">
          <h2 className="display-5 fw-bold">Bao bì theo ngành hàng</h2>
        </div>
        <div className="row g-3">
          {industries.map((item) => (
            <div className="col-xl-4 col-md-6" key={item.href}>
              <div className="bg-white tw-py-305 tw-px-6 tw-rounded-xl border border-neutral-100 d-flex align-items-center tw-gap-505 group group-item tw-duration-300 hover-bg-primary-new justify-content-between h-100">
                <div className="d-flex align-items-center tw-gap-4">
                  <span className="category-sidebar-btn__text d-flex text-primary-new tw-duration-300 tw-text-3xl group-hover-text-white">
                    <i className={`ph ${item.icon}`}></i>
                  </span>
                  <span className="category-sidebar-btn__icon text-neutral-600 fw-medium tw-duration-300 text-start group-hover-text-white tw-text-lg">
                    {item.label}
                  </span>
                </div>
                <div className="">
                  <Link href={item.href} className="text-primary-new tw-duration-300 tw-text-2xl group-hover-text-white d-flex hover-scale-108">
                    <i className="ph ph-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
