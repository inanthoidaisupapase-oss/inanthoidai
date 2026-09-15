import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { getServices } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Dịch vụ in ấn',
  description:
    'In offset, in flexo, thiết kế bao bì và gia công sau in — trọn gói tại xưởng In Ấn Thời Đại, TP.HCM.',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Breadcrumb title="Dịch vụ" />

      <section className="py-120">
        <div className="container">
          <p className="tw-text-xl text-neutral-600 max-w-800-px tw-mb-15">
            Thiết kế, in và gia công sau in đều làm tại xưởng nên không phải chuyển qua nhiều nơi —
            rút ngắn thời gian giao hàng và giữ được chất lượng đồng nhất giữa các lô.
          </p>

          <div className="row gy-5">
            {services.map((service) => (
              <div className="col-lg-6" key={service.slug}>
                <div className="tw-rounded-2xl border border-neutral-100 overflow-hidden h-100 image-double-animation">
                  <Link href={`/dich-vu/${service.slug}`} className="clip-animation overflow-hidden position-relative d-block">
                    {/* TODO ảnh: ảnh thật của dịch vụ — xem docs/IMAGE-GUIDE.md */}
                    <img src={service.imageUrl} alt={service.name} data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                    <img src={service.imageUrl} alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                  </Link>
                  <div className="tw-p-8">
                    <span className="d-flex tw-text-3xl text-main-600 tw-mb-4"><i className={service.icon}></i></span>
                    <h2 className="h3 tw-mb-4">
                      <Link href={`/dich-vu/${service.slug}`} className="text-heading hover-common-underline">{service.name}</Link>
                    </h2>
                    <p className="text-neutral-500 tw-text-lg tw-leading-155">{service.summary}</p>
                    <Link href={`/dich-vu/${service.slug}`} className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-mt-6">
                      <span className="btn-text">Xem chi tiết</span>
                      <span className="btn-icon-animation d-flex"><i className="ph-bold ph-arrow-up-right"></i></span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
