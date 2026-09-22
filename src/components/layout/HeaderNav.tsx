'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNav } from '@/lib/site';
import { headerCategories } from '@/lib/nav-data';

/**
 * Thanh nav (class .header, toggle .fixed-header khi scrollTop >= 260 — xem
 * scrollEffects() trong template-behaviors.ts). Đặt ngoài #smooth-wrapper, KHÔNG lồng
 * trong #smooth-content: custom-gsap.js gọi ScrollSmoother.create({ effects: true, ... })
 * áp transform (matrix3d) lên #smooth-content để giả lập cuộn mượt, mà theo CSS spec,
 * ancestor có transform tạo containing block mới cho position: fixed/sticky — header nằm
 * trong đó thì class .fixed-header (position: sticky) sẽ kẹt theo transform của cha thay
 * vì dính lên viewport.
 *
 * Đặt SAU component Header (top-header-new + middle-header) trong layout.tsx, KHÔNG bọc
 * chung 1 wrapper với Header: sticky cần ancestor cao bằng <body> làm containing block —
 * nếu gộp chung 1 div chỉ cao ~220px (top-header + middle-header + nav) thì div đó đã cuộn
 * khỏi viewport từ lâu trước khi chạm ngưỡng scrollY >= 260, kéo nav biến mất theo thay vì
 * dính được. Đứng độc lập, con trực tiếp của <body>, containing block là cả trang nên dính
 * được ở bất kỳ vị trí cuộn nào. headerOffset() trong template-behaviors.ts bù padding-top
 * cho #smooth-content bằng tổng chiều cao top-header-new + middle-header + header này.
 *
 * position-sticky + tw-z-99 (2 utility class có sẵn trong main.css/bootstrap.min.css,
 * không thêm class mới): #smooth-wrapper được GSAP set position: fixed lúc runtime, còn
 * header lúc CHƯA cuộn qua ngưỡng 260px (chưa có class .fixed-header) mặc định là
 * position: static — theo thứ tự stacking chuẩn CSS2.1, phần tử static luôn vẽ DƯỚI phần
 * tử positioned, nên nếu không set sẵn position + z-index, #smooth-wrapper (dù trong suốt,
 * đã có padding-top bù) vẫn "che" mất header về mặt hit-test, khiến toàn bộ nút bấm trong
 * header (category-button, nav-menu, toggle-mobileMenu...) không bấm được ở trạng thái đầu
 * trang. .position-sticky của bootstrap dùng !important nhưng chỉ khoá value "sticky" —
 * không có inset-block-start nên chưa dính gì cả (tương đương relative); khi cuộn qua 260px,
 * class .fixed-header (main.css) cộng thêm inset-block-start: 0 + z-index: 9 (khác thuộc
 * tính, không bị !important chặn) thì mới thật sự dính lên viewport.
 */
export default function HeaderNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('?')[0]);

  return (
    <header className="header bg-white border-bottom border-neutral-100 py-0 position-sticky tw-z-99">
      <div className="container max-w-1760-px">
        <div className="d-flex justify-content-between position-relative align-items-center">
          <div className="d-flex tw-gap-7 align-items-center">
            <div className="flex-shrink-0">
              <button type="button" className="category-button d-flex align-items-center tw-gap-3 text-heading hover-text-main-600 bg-white tw-px-5 tw-py-405 tw-transition-all fw-medium tw-text-base border-start border-end border-neutral-100">
                <span className="tw-text-lg tw-leading-none d-xl-flex d-none"><i className="ph-bold ph-squares-four"></i></span>
                <span className="">Danh mục sản phẩm</span>
                <span className="tw-leading-none icon tw-transition-all"><i className="ph-bold ph-caret-down"></i></span>
              </button>

              <div className="category-dropdown border border-neutral-100 bg-white w-100 position-absolute inset-block-start-100 inset-inline-start-0 tw-z-99 tw-duration-300 tw-max-h-670-px overflow-y-auto scroll-sm">
                <div className="">
                  {headerCategories.map((c) => (
                    <Link
                      key={c.slug}
                      href={c.href}
                      className="tw-py-305 tw-px-6 d-flex align-items-center justify-content-between text-neutral-500 hover-bg-neutral-100 hover-text-heading fw-semibold border-bottom border-neutral-100 hover-scale-099"
                    >
                      <div className="d-flex align-items-center tw-gap-2">
                        <span className="fw-medium">{c.name}</span>
                      </div>
                      {c.slug !== 'tat-ca-san-pham' && (
                        <span className="d-flex">
                          <i className="ph ph-caret-right"></i>
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="">
              <div className="header-menu d-lg-block d-none">
                <ul className="nav-menu d-lg-flex align-items-center tw-gap-6">
                  {mainNav.map((item) => {
                    const active = isActive(item.href);
                    if (!item.children) {
                      return (
                        <li key={item.href} className={`nav-menu__item${active ? ' activePage' : ''}`}>
                          <Link href={item.href} className="nav-menu__link text-heading tw-py-3 fw-medium w-100">
                            {item.label}
                          </Link>
                        </li>
                      );
                    }
                    return (
                      <li key={item.href} className={`nav-menu__item has-submenu position-relative${active ? ' activePage' : ''}`}>
                        <a href="#" onClick={(e) => e.preventDefault()} className="nav-menu__link text-heading tw-py-2 fw-medium w-100 tw-pe-5">
                          {item.label}
                        </a>
                        <ul className="nav-submenu scroll-sm position-absolute start-0 top-100 tw-w-max bg-white tw-rounded-md overflow-hidden tw-p-2 tw-duration-200 tw-z-99">
                          {item.children.map((child) => (
                            <li className="nav-submenu__item" key={child.href}>
                              <Link href={child.href} className="nav-submenu__link hover-bg-neutral-100 text-heading fw-medium w-100 d-block tw-py-2 tw-px-305 tw-rounded">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="d-lg-flex d-none align-items-center tw-gap-6">
            <Link href="/bang-gia" className="text-neutral-600 hover-common-underline hover-text-heading">Bảng giá</Link>
            <Link href="/cau-hoi-thuong-gap" className="text-neutral-600 hover-common-underline hover-text-heading">Câu hỏi thường gặp</Link>
          </div>

          <button type="button" className="toggle-mobileMenu leading-none d-lg-none d-flex text-neutral-800 tw-text-9" aria-label="Mở menu">
            <i className="ph ph-list"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
