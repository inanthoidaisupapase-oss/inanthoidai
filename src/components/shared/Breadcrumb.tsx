import { Fragment } from 'react';
import Link from 'next/link';

/** Breadcrumb của template (section.breadcrumb trong các trang con của Printop) */
export default function Breadcrumb({
  title,
  items = [],
}: {
  title: string;
  items?: { label: string; href: string }[];
}) {
  return (
    <section
      className="breadcrumb py-80 background-img bg-img section-animation-onload "
      data-background-image="/assets/images/bg/breadcrumb-gradient-bg.png"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div>
              <h1 className="text-38-px text-center tw-mb-4">{title}</h1>
              <ul className="d-flex align-items-center justify-content-center tw-gap-5 flex-wrap">
                <li>
                  <Link href="/" className="hover--translate-y-1 hover-common-underline text-neutral-600 hover-text-heading text-uppercase">
                    <i className="ph ph-house"></i> TRANG CHỦ
                  </Link>
                </li>
                {items.map((item) => (
                  <Fragment key={item.href}>
                    <li className="text-neutral-400 d-flex">
                      <i className="ph-fill ph-caret-double-right"></i>
                    </li>
                    <li>
                      <Link href={item.href} className="hover--translate-y-1 hover-common-underline text-neutral-600 hover-text-heading text-uppercase">
                        {item.label}
                      </Link>
                    </li>
                  </Fragment>
                ))}
                <li className="text-neutral-400 d-flex">
                  <i className="ph-fill ph-caret-double-right"></i>
                </li>
                <li>
                  <span className="text-main-600 text-uppercase"> {title} </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
