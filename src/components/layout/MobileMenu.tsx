'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site, mainNav } from '@/lib/site';

/**
 * Menu mobile. Việc mở/đóng do custom-gsap.js của template đảm nhiệm
 * (bắt sự kiện trên .toggle-mobileMenu, .close-button và .side-overlay,
 * chỉ kích hoạt ở max-width 991px). Việc xổ submenu nằm trong
 * src/lib/template-behaviors.ts, đúng breakpoint <= 991 như main.js gốc.
 */
export default function MobileMenu() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('?')[0]);

  return (
    <div className="mobile-menu d-lg-none d-block scroll-sm position-fixed bg-white tw-w-300-px tw-h-screen overflow-y-auto tw-p-6 tw-z-999 tw--translate-x-full tw-pb-68 ">
      <button
        type="button"
        aria-label="Đóng menu"
        className="close-button position-absolute tw-end-0 top-0 tw-me-2 tw-mt-2 tw-w-605 tw-h-605 rounded-circle d-flex justify-content-center align-items-center text-neutral-900 bg-neutral-200 hover-bg-neutral-900 hover-text-white"
      >
        <i className="ph ph-x"></i>
      </button>

      <div className="mobile-menu__inner">
        <Link href="/" className="mobile-menu__logo">
          {/* TODO ảnh: logo In Ấn Thời Đại — xem docs/IMAGE-GUIDE.md */}
          <img src="/assets/images/logo/logo.png" alt={site.name} />
        </Link>

        <div className="mobile-menu__menu">
          <ul className="nav-menu d-lg-flex align-items-center nav-menu--mobile d-block tw-mt-8">
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
                <li
                  key={item.href}
                  className={`nav-menu__item has-submenu position-relative${active ? ' activePage' : ''}`}
                >
                  <a href="#" onClick={(e) => e.preventDefault()} className="nav-menu__link text-heading tw-py-2 fw-medium w-100 tw-pe-5">
                    {item.label}
                  </a>
                  <ul className="nav-submenu scroll-sm position-absolute start-0 top-100 tw-w-max bg-white tw-rounded-md overflow-hidden tw-p-2 tw-duration-200 tw-z-99">
                    {item.children.map((child) => (
                      <li key={child.href} className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
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

          <div className="tw-mt-8 border-top border-neutral-100 tw-pt-6">
            <a href={`tel:${site.hotlineTel}`} className="d-flex align-items-center tw-gap-2 text-heading fw-semibold">
              <i className="ph-fill ph-phone-call"></i> {site.hotline}
            </a>
            <a href={`mailto:${site.email}`} className="d-flex align-items-center tw-gap-2 text-neutral-500 tw-mt-2">
              <i className="ph-fill ph-envelope-open"></i> {site.email}
            </a>
            <p className="text-neutral-500 tw-mt-2">{site.office}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
