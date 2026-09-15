import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { getService, getServices } from '@/lib/data';
import { site } from '@/lib/site';

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

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();
  const others = (await getServices()).filter((s) => s.slug !== slug);

  return (
    <>
      <Breadcrumb title={service.name} items={[{ label: 'Dịch vụ', href: '/dich-vu' }]} />

      <section className="py-120">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-8">
              <div className="tw-rounded-2xl overflow-hidden tw-mb-10">
                {/* TODO ảnh: ảnh thật của dịch vụ — xem docs/IMAGE-GUIDE.md */}
                <img src={service.imageUrl} alt={service.name} className="w-100 h-100 object-fit-cover" />
              </div>
              <p className="tw-text-xl text-neutral-600 tw-leading-155 tw-mb-8">{service.summary}</p>
              <div className="post-content tw-text-lg text-neutral-600 tw-leading-155" dangerouslySetInnerHTML={{ __html: service.description }} />
            </div>

            <div className="col-lg-4">
              <div className="bg-neutral-50 tw-rounded-2xl tw-p-8 tw-mb-8">
                <h3 className="h4 tw-mb-5">Dịch vụ khác</h3>
                <ul className="d-flex flex-column tw-gap-3">
                  {others.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/dich-vu/${s.slug}`} className="d-flex align-items-center tw-gap-3 text-neutral-600 hover-text-main-600">
                        <span className="d-flex tw-text-xl text-main-600"><i className={s.icon}></i></span>
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-main-600 tw-rounded-2xl tw-p-8">
                <h3 className="h4 text-white tw-mb-4">Cần báo giá cho dịch vụ này?</h3>
                <p className="text-white tw-mb-6 opacity-75">
                  Gửi quy cách và số lượng, chúng tôi báo giá trong ngày làm việc.
                </p>
                <Link href="/bao-gia" className="btn bg-white text-heading hover-bg-animation hover-bg-animation-white d-block text-center tw-mb-3">
                  <span className="btn-text">Gửi yêu cầu báo giá</span>
                </Link>
                <a href={`tel:${site.hotlineTel}`} className="d-block text-center text-white fw-semibold">
                  hoặc gọi {site.hotline}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
