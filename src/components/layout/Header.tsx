'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { site, mainNav } from '@/lib/site';
import { headerCategories, megaMenuCards } from '@/lib/nav-data';
import { useCart } from '@/lib/cart/CartContext';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const [keyword, setKeyword] = useState('');

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('?')[0]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = keyword.trim();
    router.push(q ? `/san-pham?tim=${encodeURIComponent(q)}` : '/san-pham');
  };

  return (
    <>
        {/* ============================ Top header ============================ */}
        <div className="top-header-new bg-main-600 tw-py-4">
          <div className="container max-w-1760-px">
            <div className="d-flex align-items-center justify-content-between tw-gap-4">
              <div className="d-sm-flex align-items-center tw-gap-4 d-none">
                <div className="d-flex align-items-center tw-gap-2">
                  <span className="d-sm-flex d-none text-white tw-text-lg">
                    <i className="ph-fill ph-phone-call"></i>
                  </span>
                  <a href={`tel:${site.hotlineTel}`} className="d-flex text-white hover-common-underline">
                    {site.hotline}
                  </a>
                </div>
                <div className="d-flex align-items-center tw-gap-2">
                  <span className="d-sm-flex d-none text-white tw-text-lg">
                    <i className="ph-fill ph-envelope-open"></i>
                  </span>
                  <a href={`mailto:${site.email}`} className="d-flex text-white hover-common-underline">
                    {site.email}
                  </a>
                </div>
              </div>

              <div className="d-lg-flex align-items-center tw-gap-6 d-none">
                <span className="text-white">Theo dõi chúng tôi -</span>
                <div className="d-flex align-items-center tw-gap-3">
                  <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="tw-text-xl d-flex text-white hover-scale-2 tw-duration-100">
                    <i className="ph-fill ph-facebook-logo"></i>
                  </a>
                  <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="tw-text-xl d-flex text-white hover-scale-2 tw-duration-100">
                    <i className="ph-fill ph-youtube-logo"></i>
                  </a>
                  <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="tw-text-xl d-flex text-white hover-scale-2 tw-duration-100">
                    <i className="ph-fill ph-tiktok-logo"></i>
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-sm-end justify-content-between flex-sm-grow-0 flex-grow-1">
                <div className="d-flex align-items-center tw-gap-2 flex-shrink-0">
                  <span className="d-flex text-white tw-text-lg">
                    <i className="ph ph-clock"></i>
                  </span>
                  <span className="d-flex text-white">{site.workingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================ Middle header ============================ */}
        <div className="middle-header tw-py-5 section-bg border-bottom border-neutral-100">
          <div className="container max-w-1760-px">
            <div className="d-flex align-items-center justify-content-md-start justify-content-between tw-gap-8">
              <div className="logo">
                <Link href="/" className="link">
                  {/* TODO ảnh: logo In Ấn Thời Đại — xem docs/IMAGE-GUIDE.md */}
                  <img src="/assets/images/logo/logo-new.png" alt={site.name} className="max-w-200-px" />
                </Link>
              </div>

              <form onSubmit={onSearch} className="border border-neutral-100 bg-white rounded-pill tw-py-2 tw-px-2 d-md-flex d-none align-items-center tw-gap-4 flex-grow-1">
                <div className="flex-shrink-0">
                  <select
                    aria-label="Danh mục sản phẩm"
                    className="form-select form-control pb-0 pt-0 bg-transparent border-0 text-neutral-500 bg-blue-600 option-bg-white shadow-none tw-pe-105  tw-ps-4"
                    defaultValue=""
                  >
                    <option value="">Tất cả danh mục</option>
                    {headerCategories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <span className="border-end border-neutral-300 tw-h-9 tw-w-px"></span>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="text-neutral-500 form-control border-0 shadow-none"
                  placeholder="Tìm hộp giấy, thùng carton, tem nhãn..."
                  aria-label="Từ khoá tìm kiếm"
                />
                <button type="submit" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-6 tw-pe-405 tw-py-3 flex-shrink-0">
                  <span className="btn-text">Tìm kiếm </span>
                </button>
              </form>

              <div className="d-xl-flex d-none align-items-center tw-gap-4 animation-item">
                <span className="tw-w-13 tw-h-13 border border-neutral-100 d-lg-flex d-none justify-content-center align-items-center text-main-600 rounded-circle flex-shrink-0 flex-grow-1 bg-white">
                  <img src="/assets/images/icons/icon-phone.png" alt="" className="animate__heartBeat" />
                </span>
                <div className="flex-grow-1">
                  <span className="text-neutral-600 tw-text-base fw-semibold d-block">Hotline: {site.hotline}</span>
                  <span className="text-body-3 tw-text-base tw-text-sm">Tư vấn &amp; báo giá miễn phí</span>
                </div>
              </div>

              <div className="d-flex align-items-center tw-gap-4">
                <Link
                  href="/bao-gia"
                  aria-label="Yêu cầu báo giá"
                  className="d-flex align-items-center justify-content-center gap-4 tw-text-3xl text-heading tw-leading-none position-relative hover-text-main-600 hover--translate-y-1 active--translate-y-scale-9 tw-me-4"
                >
                  <i className="ph ph-note-pencil"></i>
                </Link>
                <Link
                  href="/gio-hang"
                  aria-label="Giỏ hàng"
                  className="d-flex align-items-center justify-content-center gap-4 tw-text-3xl text-heading tw-leading-none position-relative hover-text-main-600 hover--translate-y-1 active--translate-y-scale-9 tw-me-4"
                >
                  <i className="ph ph-shopping-cart"></i>
                  <span className="tw-w-6 tw-h-6 d-flex align-items-center justify-content-center rounded-circle bg-primary-new text-white tw-text-xs position-absolute top-0 tw-end-0 tw--me-16-px tw--mt-10-px">
                    {count}
                  </span>
                </Link>
                <a
                  href={`https://zalo.me/${site.zalo.replace(/\s/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Zalo ${site.zalo}`}
                  className="d-flex align-items-center justify-content-center gap-4 tw-text-3xl text-heading tw-leading-none position-relative hover-text-main-600 hover--translate-y-1 active--translate-y-scale-9"
                >
                  <i className="ph ph-chat-circle-dots"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============================ Header nav ============================ */}
        <header className="header bg-white border-bottom border-neutral-100 py-0">
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
                          <span className="d-flex">
                            <i className="ph ph-caret-right"></i>
                          </span>
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
                        if (item.label === 'Sản phẩm') {
                          return (
                            <li key={item.href} className={`nav-menu__item has-submenu${active ? ' activePage' : ''}`}>
                              <a href="#" onClick={(e) => e.preventDefault()} className="nav-menu__link text-heading tw-py-2 fw-medium w-100 tw-pe-5">
                                {item.label}
                              </a>
                              <div className="mega-menu tw-p-6 tw-rounded-lg scroll-sm nav-submenu position-absolute start-0 top-100 tw-w-max bg-white tw-rounded-md tw-duration-200 tw-z-99">
                                <div className="row g-4 row-cols-1 row-cols-lg-3 row-cols-xl-4">
                                  {megaMenuCards.map((card) => (
                                    <div className="col" key={card.href}>
                                      <div className="mega-menu-item group-item">
                                        <div className="position-relative border border-neutral-100 tw-rounded-lg overflow-hidden">
                                          <Link href={card.href} className="d-block">
                                            {/* TODO ảnh: xem docs/IMAGE-GUIDE.md */}
                                            <img src={card.image} alt={card.name} className="tw-h-320-px w-100 object-fit-cover object-top" />
                                          </Link>
                                          <div className="d-lg-flex d-none">
                                            <div className="mega-menu-item__overlay position-absolute top-0 tw-start-0 w-100 h-100 d-flex justify-content-center align-items-center tw-invisible opacity-0 group-hover-item-visible group-hover-item-opacity-1 tw-scale-08 group-hover-item-scale-1 tw-rounded-lg pointer-event-none"></div>
                                            <div className="mega-menu-item__buttons position-absolute top-0 tw-start-0 w-100 h-100 d-flex justify-content-center align-items-center flex-column tw-gap-4 tw-invisible opacity-0 group-hover-item-visible group-hover-item-opacity-1">
                                              <div className="custom-fade-animation" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
                                                <Link href={card.href} className="btn bg-main-600 hover-bg-animation hover-bg-animation-white hover-text-heading">
                                                  <span className="btn-text">Xem sản phẩm</span>
                                                  <span className="btn-icon-animation d-flex">
                                                    <i className="ph-bold ph-arrow-down-right"></i>
                                                  </span>
                                                </Link>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="tw-mt-4 text-center">
                                          <Link href={card.href} className="text-heading hover-text-heading hover-common-underline fw-semibold tw-text-lg text-capitalize line-clamp-1">
                                            {card.name}
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
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
    </>
  );
}
