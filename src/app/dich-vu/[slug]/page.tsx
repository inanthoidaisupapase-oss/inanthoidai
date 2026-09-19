import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/shared/Breadcrumb';
import GallerySlider from '@/components/shared/GallerySlider';
import WorkingProcess from '@/components/shared/WorkingProcess';
import { getService, getServices } from '@/lib/data';
import { getServiceDetail } from '@/lib/service-details';

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: 'Không tìm thấy dịch vụ' };
  return { title: service.name, description: service.summary };
}

// TODO ảnh: ảnh sản phẩm thực tế theo dịch vụ này — xem docs/IMAGE-GUIDE.md.
// Tạm dùng chung bộ ảnh gallery đã dùng ở trang danh sách dịch vụ (app/dich-vu/page.tsx),
// chưa có ảnh phân loại riêng theo từng dịch vụ.
const galleryImages = [1, 2, 3, 4, 5, 6].map((n) => `/assets/images/thumbs/shop-product-img${n}.png`);

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();
  const detail = getServiceDetail(service);

  return (
    <>
      <Breadcrumb title={service.name} items={[{ label: 'Dịch vụ', href: '/dich-vu' }]} />

      {/* ====================================== Service Details: đối chiếu section.service-details service-details.html =============================== */}
      <section className="service-details pt-120">
        <div className="container max-w-1100-px">
          <div className="">
            <div className="clip-animation image-double-animation overflow-hidden position-relative d-block tw-rounded-lg">
              <img src={service.imageUrl} alt={service.name} data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
              <img src={service.imageUrl} alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
            </div>

            <div className="tw-mt-8">
              <h2 className="text-reveal">{service.name}</h2>
              <p className="text-body tw-text-lg tw-mt-6">{detail.intro}</p>
            </div>

            {/* Grid 4 lợi ích */}
            <div className="tw-mt-15 tw-pt-3">
              <div className="row gy-5">
                {detail.features.map((f) => (
                  <div className="col-xl-3 col-sm-6" key={f.title}>
                    <div className="tw-duration-200 group group-item pb-sm-0 pb-4 animation-item">
                      <div className="max-w-230-px">
                        <span className="d-flex">
                          <img src={`/assets/images/icons/${f.icon}`} alt="" className="text-invert-black group-hover-item-text-invert-main-600 tw-duration-200 animate__bounce" />
                        </span>
                        <div className="tw-mt-12">
                          <h2 className="tw-text-xl tw-leading-155 text-capitalize">{f.title}</h2>
                          <p className="tw-mt-6 text-body tw-text-lg-3">{f.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ưu đãi + checklist 2 cột */}
            <div className="tw-mt-15 tw-mt-10">
              <h2 className="text-34-px">{detail.offerHeading}</h2>
              <p className="text-body tw-text-lg tw-mt-6">{detail.offerText}</p>
              <div className="tw-mt-10 d-flex flex-wrap tw-gap-5 justify-content-between">
                <div className="d-flex flex-column tw-gap-5">
                  {detail.checklist.slice(0, 3).map((item) => (
                    <div className="d-flex align-items-center tw-gap-2" key={item}>
                      <span className="tw-w-7 tw-h-7 tw-rounded-md bg-white text-main-600 d-flex align-items-center justify-content-center shadow-sm">
                        <i className="ph-bold ph-check"></i>
                      </span>
                      <span className="tw-text-xl text-body tw-text-lg-6">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-column tw-gap-5">
                  {detail.checklist.slice(3, 6).map((item) => (
                    <div className="d-flex align-items-center tw-gap-2" key={item}>
                      <span className="tw-w-7 tw-h-7 tw-rounded-md bg-white text-main-600 d-flex align-items-center justify-content-center shadow-sm">
                        <i className="ph-bold ph-check"></i>
                      </span>
                      <span className="tw-text-xl text-body tw-text-lg-6">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid 2 ảnh minh hoạ */}
            <div className="tw-my-10">
              <div className="row gy-4">
                {detail.illustrations.map((src) => (
                  <div className="col-sm-6" key={src}>
                    <div className="clip-animation image-double-animation overflow-hidden position-relative d-block tw-rounded-20-px">
                      <img src={src} alt={service.name} data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                      <img src={src} alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chúng tôi cung cấp gì */}
            <div className="tw-mt-8">
              <h2 className="text-34-px">{detail.provide.heading}</h2>
              {detail.provide.paragraphs.map((p, i) => (
                <p className="text-body tw-text-lg tw-mt-8" key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ====================================== Service Details section end =============================== */}

      <WorkingProcess sectionClassName="working-process pt-120" />

      {/* ================= Gallery: sản phẩm thực tế (đối chiếu section.instagram-post service-details.html) ================= */}
      <section className="instagram-post pt-120 pb-120 px-md-0 px-3">
        <div className="position-relative lg-pt-100-px">
          <h2 className="animated-title text-hover-animation-scale text-heading tw-leading-none text-uppercase text-center text-160-px position-absolute top-0 start-50 translate-middle-x d-lg-block d-none min-w-max">
            <span className="text-reveal">SẢN PHẨM THỰC TẾ</span>
          </h2>

          <GallerySlider images={galleryImages} />
        </div>
      </section>
    </>
  );
}
