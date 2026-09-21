import Link from 'next/link';
import { getCategories, getProducts } from '@/lib/data';

/**
 * 6 nhóm sản phẩm hiển thị ở trang chủ: 3 danh mục thật có sẵn hàng + 3 nhóm in theo yêu cầu.
 * Cố định 6 vì chỉ có 6 ảnh placeholder top-categories-new-img1..6.png của template — categories.json
 * đã có 12 danh mục (9 danh mục sau chưa có sản phẩm/ảnh thật) nên KHÔNG map trực tiếp toàn bộ
 * getCategories() vào đây, chỉ lấy đúng 3 danh mục đang có hàng thật.
 */
const extraGroups = [
  { name: 'Túi xách giấy', href: '/san-pham?danh-muc=tui-xach-giay', note: 'In theo yêu cầu', image: 'top-categories-new-img4.png' },
  { name: 'Tem, nhãn, decal', href: '/san-pham?danh-muc=tem-nhan-decal', note: 'In theo yêu cầu', image: 'top-categories-new-img5.png' },
  { name: 'Catalogue & brochure', href: '/san-pham?danh-muc=catalogue-brochure', note: 'In theo yêu cầu', image: 'top-categories-new-img6.png' },
];

export default async function TopCategories() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const categoriesWithStock = categories
    .filter((c) => products.some((p) => p.categorySlug === c.slug))
    .slice(0, 3);

  const cards = [
    ...categoriesWithStock.map((c, i) => ({
      name: c.name,
      href: `/san-pham?danh-muc=${c.slug}`,
      note: `${products.filter((p) => p.categorySlug === c.slug).length} sản phẩm có sẵn`,
      image: `top-categories-new-img${i + 1}.png`,
    })),
    ...extraGroups,
  ];

  return (
    <section className="top-categories-new py-120 section-bg-gradient-two position-relative overflow-hidden">
      <h2 className="text-220-px text-uppercase text-stroke d-lg-inline-block d-none writing-mode-lr position-absolute top-0 start-0 tw-me-13 tw-duration-300 tw-mb-12 z-0">
        Sản phẩm
      </h2>

      <img src="/assets/images/shapes/boxed-shape.png" alt="" className="position-absolute tw-start-0 top-0 z-n1 d-md-block d-none" />
      <img src="/assets/images/shapes/boxed-shape.png" alt="" className="position-absolute tw-end-0 top-0 z-n1 d-md-block d-none" />
      <img src="/assets/images/shapes/curve-star-shape.png" alt="" className="position-absolute tw-end-0 top-0 z-n1 d-md-block d-none tw-mt-17 tw-me-17 animate__wobble__two" />
      <div className="position-absolute z-n1 end-0 bottom-0 tw-pb-15 tw-mb-5 tw-pe-15 tw-me-5 d-lg-block d-none">
        <img src="/assets/images/shapes/banner-element-img4.png" alt="" className="animation-rotate-right" />
      </div>

      <div className="container">
        <div className="row gy-4 tw-mb-15">
          <div className="col-lg-5">
            <div className="">
              <div className="bg-white rounded-pill border border-neutral-100 tw-py-105 tw-px-4 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                <div className="d-flex align-items-center tw-gap-205">
                  <span className="text-primary-new d-sm-flex d-none tw-text-xl">
                    <i className="ph-fill ph-check-circle"></i>
                  </span>
                  <span className="text-primary-new tw-text-lg text-sm-res-14-px fw-semibold text-center">Khám phá</span>
                </div>
                <span className="border-end border-neutral-300 tw-h-5 tw-w-px"></span>
                <span className="text-neutral-500 tw-text-lg text-sm-res-14-px fw-normal text-center">Nhóm sản phẩm chính</span>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="">
              <h2 className="text-reveal fw-semibold tw-mt-4 h1">Từ hộp giấy đóng gói tới ấn phẩm nhận diện thương hiệu.</h2>
            </div>
          </div>
        </div>

        <div className="row gy-4">
          <div className="col-lg-6">
            <div className="row gy-4">
              {cards.map((card, i) => (
                <div
                  className="col-sm-6"
                  key={card.name}
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay={i % 2 === 0 ? 400 : 600}
                >
                  <div className="tw-rounded-2xl bg-white overflow-hidden border border-neutral-100 tw-p-4 image-double-animation h-100">
                    <Link href={card.href} className="clip-animation overflow-hidden position-relative d-block tw-rounded-xl">
                      {/* TODO ảnh: ảnh thật nhóm {card.name} — xem docs/IMAGE-GUIDE.md */}
                      <img src={`/assets/images/thumbs/${card.image}`} alt={card.name} data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                      <img src={`/assets/images/thumbs/${card.image}`} alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                    </Link>
                    <div className="tw-mt-4 d-flex align-items-center justify-content-between tw-gap-4 tw-px-2">
                      <div className="">
                        <h2 className="tw-text-lg tw-mb-205">
                          <Link href={card.href} className="hover-common-underline hover-text-heading text-heading">{card.name}</Link>
                        </h2>
                        <span className="text-neutral-500 tw-text-sm">{card.note}</span>
                      </div>
                      <div className="flex-shrink-0">
                        <Link href={card.href} aria-label={card.name} className="btn bg-main-600 gradient-outline-bg-white hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-8 tw-h-8 d-flex justify-content-center align-items-center tw-text-base text-white">
                          <i className="ph-bold ph-caret-right z-1 text-gradient-main tw-duration-300"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="h-100 position-relative">
              <div className="clip-animation overflow-hidden position-relative d-block tw-rounded-2xl h-100 overflow-hidden">
                {/* TODO ảnh: ảnh xưởng sản xuất hoặc bộ sản phẩm tiêu biểu — xem docs/IMAGE-GUIDE.md */}
                <img src="/assets/images/thumbs/top-categories-new-main-img.png" alt="Xưởng sản xuất bao bì giấy" data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                <img src="/assets/images/thumbs/top-categories-new-main-img.png" alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
              </div>
              <div className="position-absolute bottom-0 start-0 z-1 tw-ps-40-px tw-pe-4 tw-pb-48-px">
                <div className="blur-bg-white rounded-pill tw-py-105 tw-px-4 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                  <div className="d-flex align-items-center tw-gap-205">
                    <span className="text-secondary-new d-sm-flex d-none tw-text-xl">
                      <i className="ph-fill ph-check-circle"></i>
                    </span>
                    <span className="text-secondary-new tw-text-lg text-sm-res-14-px fw-semibold text-center">100 hộp</span>
                  </div>
                  <span className="border-end border-neutral-300 tw-h-5 tw-w-px"></span>
                  <span className="text-white tw-text-lg text-sm-res-14-px fw-normal text-center">Số lượng đặt tối thiểu</span>
                </div>
                <h2 className="display-5 text-white tw-mb-10 tw-mt-4 text-reveal fw-semibold">Sản xuất trực tiếp tại xưởng, không qua trung gian</h2>
                <div className="custom-fade-animation" data-delay=".7" data-fade-from="bottom" data-ease="bounce">
                  <Link href="/san-pham" className="btn bg-primary-new hover-bg-animation hover-bg-animation-main-600 hover-text-white">
                    <span className="btn-text">Xem bảng giá &amp; đặt hàng</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="custom-fade-animation d-flex justify-content-center tw-mt-10" data-delay=".8" data-fade-from="bottom" data-ease="bounce">
          <Link href="/san-pham" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-2 tw-pe-6 tw-py-3 py-sm-2">
            <span className="btn-icon-animation d-flex align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-white rounded-circle">
              <i className="ph-bold ph-arrow-right text-gradient-main"></i>
            </span>
            <span className="btn-text">Xem tất cả sản phẩm</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
