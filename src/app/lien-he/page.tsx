import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import ContactForm from '@/components/shared/ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: `Liên hệ In Ấn Thời Đại — ${site.office}. Hotline ${site.hotline}, email ${site.email}.`,
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumb title="Liên hệ" />

      <section className="py-120">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-5">
              <h2 className="h2 tw-mb-6">Thông tin liên hệ</h2>

              <div className="d-flex flex-column tw-gap-6">
                <div className="d-flex align-items-start tw-gap-4">
                  <span className="tw-w-12 tw-h-12 bg-main-600 text-white rounded-circle d-flex justify-content-center align-items-center flex-shrink-0 tw-text-xl">
                    <i className="ph-fill ph-buildings"></i>
                  </span>
                  <div>
                    <h3 className="h6 tw-mb-1">Văn phòng giao dịch</h3>
                    <p className="text-neutral-500 mb-0">{site.office}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start tw-gap-4">
                  <span className="tw-w-12 tw-h-12 bg-main-600 text-white rounded-circle d-flex justify-content-center align-items-center flex-shrink-0 tw-text-xl">
                    <i className="ph-fill ph-factory"></i>
                  </span>
                  <div>
                    <h3 className="h6 tw-mb-1">Xưởng sản xuất</h3>
                    <p className="text-neutral-500 mb-0">{site.factory}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start tw-gap-4">
                  <span className="tw-w-12 tw-h-12 bg-main-600 text-white rounded-circle d-flex justify-content-center align-items-center flex-shrink-0 tw-text-xl">
                    <i className="ph-fill ph-phone-call"></i>
                  </span>
                  <div>
                    <h3 className="h6 tw-mb-1">Điện thoại</h3>
                    <p className="text-neutral-500 mb-0">
                      Hotline: <a href={`tel:${site.hotlineTel}`} className="text-main-600 hover-common-underline">{site.hotline}</a><br />
                      Văn phòng: <a href={`tel:${site.officePhoneTel}`} className="text-main-600 hover-common-underline">{site.officePhone}</a><br />
                      Zalo đặt hàng: <a href={`https://zalo.me/${site.zalo.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-main-600 hover-common-underline">{site.zalo}</a> (Ms. Tuyền)
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start tw-gap-4">
                  <span className="tw-w-12 tw-h-12 bg-main-600 text-white rounded-circle d-flex justify-content-center align-items-center flex-shrink-0 tw-text-xl">
                    <i className="ph-fill ph-envelope-open"></i>
                  </span>
                  <div>
                    <h3 className="h6 tw-mb-1">Email</h3>
                    <p className="text-neutral-500 mb-0">
                      <a href={`mailto:${site.email}`} className="text-main-600 hover-common-underline">{site.email}</a><br />
                      <a href={`mailto:${site.email2}`} className="text-main-600 hover-common-underline">{site.email2}</a>
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start tw-gap-4">
                  <span className="tw-w-12 tw-h-12 bg-main-600 text-white rounded-circle d-flex justify-content-center align-items-center flex-shrink-0 tw-text-xl">
                    <i className="ph-fill ph-clock"></i>
                  </span>
                  <div>
                    <h3 className="h6 tw-mb-1">Giờ làm việc</h3>
                    <p className="text-neutral-500 mb-0">{site.workingHours}</p>
                  </div>
                </div>

                <div className="d-flex align-items-center tw-gap-4">
                  <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="tw-w-11 tw-h-11 bg-neutral-100 text-heading rounded-circle d-flex justify-content-center align-items-center tw-text-xl hover-bg-main-600 hover-text-white">
                    <i className="ph-fill ph-facebook-logo"></i>
                  </a>
                  <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                    className="tw-w-11 tw-h-11 bg-neutral-100 text-heading rounded-circle d-flex justify-content-center align-items-center tw-text-xl hover-bg-main-600 hover-text-white">
                    <i className="ph-fill ph-youtube-logo"></i>
                  </a>
                  <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                    className="tw-w-11 tw-h-11 bg-neutral-100 text-heading rounded-circle d-flex justify-content-center align-items-center tw-text-xl hover-bg-main-600 hover-text-white">
                    <i className="ph-fill ph-tiktok-logo"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="bg-neutral-50 tw-rounded-2xl tw-p-8">
                <h2 className="h2 tw-mb-6">Gửi tin nhắn cho chúng tôi</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
